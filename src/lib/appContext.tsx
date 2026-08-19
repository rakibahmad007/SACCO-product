import { type ReactNode, createContext, useContext, useState, useCallback } from 'react';

interface ToastState {
  show: boolean;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message?: string;
}

interface AppContextType {
  toast: ToastState;
  showToast: (type: ToastState['type'], title: string, message?: string) => void;
  hideToast: () => void;
  portal: 'member' | 'admin';
  setPortal: (p: 'member' | 'admin') => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<ToastState>({ show: false, type: 'success', title: '' });
  const [portal, setPortal] = useState<'member' | 'admin'>('member');

  const showToast = useCallback((type: ToastState['type'], title: string, message?: string) => {
    setToast({ show: true, type, title, message });
  }, []);

  const hideToast = useCallback(() => {
    setToast(prev => ({ ...prev, show: false }));
  }, []);

  return (
    <AppContext.Provider value={{ toast, showToast, hideToast, portal, setPortal }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
