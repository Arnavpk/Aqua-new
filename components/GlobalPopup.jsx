'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

export function GlobalPopup({ popup }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!popup) return;

    // Check if already dismissed this session
    const dismissed = sessionStorage.getItem('popup_dismissed');
    if (dismissed) return;

    // Small delay for better UX — let the page load first
    const timer = setTimeout(() => setVisible(true), 800);
    return () => clearTimeout(timer);
  }, [popup]);

  const close = useCallback(() => {
    setVisible(false);
    sessionStorage.setItem('popup_dismissed', '1');
  }, []);

  // Lock body scroll when popup is open
  useEffect(() => {
    if (visible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [visible]);

  if (!popup || !visible) return null;

  const ImageContent = (
    <Image
      src={popup.image}
      alt="Aqua Imagicaa"
      width={800}
      height={1000}
      className="popup-img"
      priority
    />
  );

  
  return (
    <div className="popup-overlay" onClick={close}>
      <div className="popup-modal" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="popup-close"
          onClick={close}
          aria-label="Close popup"
        >
          ✕
        </button>
        {popup.link ? (
          <a href={popup.link} target="_blank" rel="noopener noreferrer" onClick={close}>
            {ImageContent}
          </a>
        ) : (
          ImageContent
        )}
      </div>
    </div>
  );
}