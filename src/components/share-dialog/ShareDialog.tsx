import { useEffect, useRef, useState } from 'react';
import './ShareDialog.css';

interface ShareDialogProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
  showSchema: boolean;
  minifiedOutput: boolean;
  skipErrors: boolean;
}

export default function ShareDialog({
  isOpen,
  onClose,
  url,
  showSchema,
  minifiedOutput,
  skipErrors
}: ShareDialogProps) {
  const [copied, setCopied] = useState(false);
  const [shortUrl, setShortUrl] = useState('');
  const [isShortening, setIsShortening] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const displayUrl = shortUrl || url;

  useEffect(() => {
    if (isOpen) {
      setShortUrl('');
      setCopied(false);
      setIsShortening(false);
      // Focus input when opened
      setTimeout(() => {
        inputRef.current?.select();
      }, 100);
    } else {
      // Cancel any ongoing requests when closed
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
        abortControllerRef.current = null;
      }
      setIsShortening(false);
    }
  }, [isOpen, url]);

  const handleCopy = () => {
    navigator.clipboard.writeText(displayUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleShorten = async () => {
    // Cancel previous request if any
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;
    const signal = controller.signal;

    setIsShortening(true);

    try {
      // Try da.gd first (supports CORS and POST, no preview page)
      try {
        const response = await fetch('https://da.gd/s', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({ url: url }),
          signal
        });

        if (response.ok) {
          const text = await response.text();
          if (!signal.aborted) {
            setShortUrl(text.trim());
            return;
          }
        }
      } catch (error) {
        if (signal.aborted) throw error;
        console.warn('Primary shortener (da.gd) failed:', error);
      }

      // Fallback 1: clck.ru (supports CORS and POST, no preview page)
      try {
        const response = await fetch('https://clck.ru/--', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({ url: url }),
          signal
        });

        if (response.ok) {
          const text = await response.text();
          if (!signal.aborted) {
            setShortUrl(text.trim());
            return;
          }
        }
      } catch (error) {
        if (signal.aborted) throw error;
        console.warn('Fallback shortener (clck.ru) failed:', error);
      }

      // Fallback 2: TinyURL (reliable but has preview page)
      try {
        const response = await fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(url)}`, { signal });
        if (response.ok) {
          const text = await response.text();
          if (!signal.aborted) {
            setShortUrl(text);
          }
        }
      } catch (fallbackError) {
        if (signal.aborted) throw fallbackError;
        console.error('All shorteners failed:', fallbackError);
      }
    } catch (error: any) {
      if (error.name === 'AbortError') {
        console.log('Shortening aborted');
      }
    } finally {
      if (!signal.aborted) {
        setIsShortening(false);
        abortControllerRef.current = null;
      }
    }
  };  if (!isOpen) return null;

  return (
    <div className="share-dialog-overlay" onClick={onClose}>
      <div className="share-dialog-content" onClick={e => e.stopPropagation()}>
        <button className="share-dialog-close" onClick={onClose}>×</button>

        <div className="share-dialog-header">
          <div className="share-icon-large">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="18" cy="5" r="3"></circle>
              <circle cx="6" cy="12" r="3"></circle>
              <circle cx="18" cy="19" r="3"></circle>
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
            </svg>
          </div>
          <h2>Share Internet Object Code</h2>
        </div>

        <div className="share-dialog-body">
          <p className="share-promo">
            Share your Internet Object schema and data with others! <br/>
            <span className="highlight-text">Internet Object: A lean, schema-first, and well-thought alternative to JSON.</span>
          </p>

          <div className="share-input-group">
            <input
              ref={inputRef}
              type="text"
              value={displayUrl}
              readOnly
              aria-label="Share URL"
              onClick={(e) => e.currentTarget.select()}
            />
            {!shortUrl && (
              <button
                className="shorten-btn"
                onClick={handleShorten}
                disabled={isShortening}
                data-tooltip="Generate a short link for easier sharing."
              >
                {isShortening ? <div className="spinner" /> : 'Shorten'}
              </button>
            )}
            <button
              className={`copy-btn ${copied ? 'copied' : ''}`}
              onClick={handleCopy}
            >
              {copied ? 'Copied!' : 'Copy Link'}
            </button>
          </div>

          {!shortUrl && (
            <p className="share-large-data-hint">
              Tip: For large datasets, use the <strong>Shorten</strong> button to generate a compact link.
            </p>
          )}

          <div className="share-options">
            <span className="share-options-label">Included Settings:</span>
            <div className="share-option-tags">
              <span className={`share-option-tag ${showSchema ? 'active' : ''}`}>
                {showSchema ? '✓' : '○'} Separate Schema
              </span>
              <span className={`share-option-tag ${minifiedOutput ? 'active' : ''}`}>
                {minifiedOutput ? '✓' : '○'} Minified
              </span>
              <span className={`share-option-tag ${skipErrors ? 'active' : ''}`}>
                {skipErrors ? '✓' : '○'} Skip Errors
              </span>
            </div>
            <p className="share-options-hint">
              To update these settings, close the dialog, modify the playground configuration, and click the share button again.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
