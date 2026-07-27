import {
  createContext,
  useCallback,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type ToastVariant = "success" | "error";

export interface Toast {
  id: number;
  message: string;
  variant: ToastVariant;
}

interface ToastContextValue {
  toasts: Toast[];
  showToast: (message: string, variant?: ToastVariant) => void;
  dismissToast: (id: number) => void;
}

export const ToastContext = createContext<ToastContextValue | null>(null);

let nextToastId = 1;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const dismissToast = useCallback((id: number) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback(
    (message: string, variant: ToastVariant = "success") => {
      const id = nextToastId;
      nextToastId += 1;
      setToasts((current) => [...current, { id, message, variant }]);
      window.setTimeout(() => {
        dismissToast(id);
      }, 4000);
    },
    [dismissToast]
  );

  const value = useMemo(
    () => ({
      toasts,
      showToast,
      dismissToast,
    }),
    [toasts, showToast, dismissToast]
  );

  return (
    <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
  );
}
