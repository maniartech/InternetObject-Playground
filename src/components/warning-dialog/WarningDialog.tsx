import './WarningDialog.css';

interface WarningDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message: string;
}

export default function WarningDialog({ isOpen, onClose, title = "Warning", message }: WarningDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="warning-dialog-overlay" onClick={onClose}>
      <div className="warning-dialog-content" onClick={e => e.stopPropagation()}>
        <button className="warning-dialog-close" onClick={onClose}>×</button>

        <div className="warning-dialog-header">
          <div className="warning-icon-large">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
              <line x1="12" y1="9" x2="12" y2="13"></line>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
          </div>
          <h2>{title}</h2>
        </div>

        <div className="warning-dialog-body">
          <p className="warning-message">
            {message}
          </p>

          <div className="warning-actions">
            <button
              className="warning-btn"
              onClick={onClose}
            >
              Got it
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
