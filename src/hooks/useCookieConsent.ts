import { useCallback, useSyncExternalStore } from 'react';

const STORAGE_KEY = 'cookie-consent_r_dev';

export type CookieConsent = 'accepted' | 'declined' | null;

type Snapshot = 'accepted' | 'declined' | 'none' | 'unknown';

const listeners = new Set<() => void>();

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  window.addEventListener('storage', listener);

  return () => {
    listeners.delete(listener);
    window.removeEventListener('storage', listener);
  };
};

const getSnapshot = (): Snapshot =>
  (localStorage.getItem(STORAGE_KEY) as Snapshot) ?? 'none';

const getServerSnapshot = (): Snapshot => 'unknown';

const save = (value: Exclude<CookieConsent, null>) => {
  localStorage.setItem(STORAGE_KEY, value);
  listeners.forEach((listener) => listener());
};

export function useCookieConsent() {
  const snapshot = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const accept = useCallback(() => save('accepted'), []);
  const decline = useCallback(() => save('declined'), []);

  const consent: CookieConsent =
    snapshot === 'accepted' || snapshot === 'declined' ? snapshot : null;

  return { consent, visible: snapshot === 'none', accept, decline };
}
