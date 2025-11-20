import { useEffect, useRef, useState } from 'react';
import './ShareDialog.css';

interface ShareDialogProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
}

export default function ShareDialog({ isOpen, onClose, url }: ShareDialogProps) {
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setCopied(false);
      // Focus input when opened
      setTimeout(() => {
        inputRef.current?.select();
      }, 100);
    }
  }, [isOpen]);

  const handleCopy = () => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  if (!isOpen) return null;

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
          <h2>Share Code</h2>
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
              value={url}
              readOnly
              aria-label="Share URL"
              onClick={(e) => e.currentTarget.select()}
            />
            <button
              className={`copy-btn ${copied ? 'copied' : ''}`}
              onClick={handleCopy}
            >
              {copied ? 'Copied!' : 'Copy Link'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
