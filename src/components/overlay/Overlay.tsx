// Overlay.tsx
import React                            from 'react'
import                                       './Overlay.css'
interface OverlayProps {
  heading?: string;
  onClose: () => void;
  children?: any;
}

const Overlay: React.FC<OverlayProps> = ({ onClose, children, heading }) => {
  return (
    <div className="overlay">
      <div className="overlay-content">
        <h1 className="heading">{heading}</h1>
        <button className="close-button" onClick={onClose}>
          <span className="material-symbols-outlined">close</span>
        </button>
        <div className="overlay-desc">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Overlay;
