import { useEffect, useState, useRef } from 'react';
import './WelcomeNotification.css';

const STORAGE_KEY = 'io-playground-visited';

interface WelcomeNotificationProps {
  onClose?: () => void;
}

function WelcomeNotification({ onClose }: WelcomeNotificationProps): JSX.Element | null {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, right: 0 });

  useEffect(() => {
    // Check if user has visited before
    const hasVisited = localStorage.getItem(STORAGE_KEY);

    if (!hasVisited) {
      // Show notification after a brief delay for better UX
      setTimeout(() => {
        // Find the dropdown menu
        const dropdown = document.getElementById('sample-data-selector');
        if (dropdown) {
          const rect = dropdown.getBoundingClientRect();
          setPosition({
            top: rect.bottom + 15,
            right: window.innerWidth - rect.right
          });
        }
        setIsVisible(true);
      }, 500);
    }
  }, []);

  const handleClose = () => {
    // Mark as visited
    localStorage.setItem(STORAGE_KEY, 'true');
    setIsVisible(false);
    onClose?.();
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className="welcome-notification"
      role="dialog"
      aria-labelledby="welcome-title"
      style={{ top: `${position.top}px`, right: `${position.right}px` }}
    >
      <div className="welcome-content">
        <button
          className="welcome-close"
          onClick={handleClose}
          aria-label="Close welcome notification"
        >
          ×
        </button>
        <h3 id="welcome-title">👋 Welcome to Internet Object Playground!</h3>
        <p>
          Use the dropdown menu above to load various sample data and explore different Internet Object concepts.
        </p>
        <p className="welcome-hint">
          Try selecting from categories like Simple, Types, Schema and Definitions, and Applications to see how Internet Object works!
        </p>
        <button className="welcome-button" onClick={handleClose}>
          Got it!
        </button>
      </div>
    </div>
  );
}

export default WelcomeNotification;
