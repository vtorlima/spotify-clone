import { FiAlertCircle, FiCheckCircle, FiX } from "react-icons/fi";
import { useToast } from "../../hooks/useToast";

export function ToastViewport() {
  const { toasts, dismissToast } = useToast();

  if (toasts.length === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-28 left-1/2 z-[60] flex -translate-x-1/2 flex-col items-center gap-2 px-4">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          role="status"
          className="flex min-w-72 items-center gap-3 rounded-md bg-popup-bg px-4 py-3 shadow-2xl"
        >
          {toast.variant === "success" ? (
            <FiCheckCircle className="shrink-0 text-[18px] text-accent" />
          ) : (
            <FiAlertCircle className="shrink-0 text-[18px] text-red-400" />
          )}
          <span className="min-w-0 flex-1 text-12px text-text-base">
            {toast.message}
          </span>
          <button
            type="button"
            onClick={() => dismissToast(toast.id)}
            aria-label="Fechar aviso"
            className="text-text-subdued transition hover:text-text-base"
          >
            <FiX className="text-[16px]" />
          </button>
        </div>
      ))}
    </div>
  );
}
