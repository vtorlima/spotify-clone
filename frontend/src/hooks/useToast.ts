import { useContext } from "react";
import { ToastContext } from "../stores/ToastContext";

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast precisa estar dentro de ToastProvider.");
  }
  return context;
}
