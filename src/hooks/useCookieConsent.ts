import { useState, useCallback } from 'react';

const STORAGE_KEY = 'cookie-consent_r_dev';

export type CookieConsent = 'accepted' | 'declined' | null;

function getStoredConsent(): CookieConsent {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(STORAGE_KEY) as CookieConsent;
}

export function useCookieConsent() {
  const [consent, setConsent] = useState<CookieConsent>(getStoredConsent);
  const [visible, setVisible] = useState(() => !getStoredConsent());

  const accept = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, 'accepted');
    setConsent('accepted');
    setVisible(false);
  }, []);

  const decline = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, 'declined');
    setConsent('declined');
    setVisible(false);
  }, []);

  return { consent, visible, accept, decline };
}
