import type { ReactNode } from "react";

export interface MenuItem {
  id: string;
  label: string;
  icon?: ReactNode;
  disabled?: boolean;
  variant?: "default" | "danger";
  onSelect?: () => void;
}
