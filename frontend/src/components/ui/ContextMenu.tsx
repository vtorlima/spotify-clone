import { useEffect, useRef, type ReactNode } from "react";

export interface ContextMenuItem {
  id: string;
  label: string;
  icon?: ReactNode;
  disabled?: boolean;
  variant?: "default" | "danger";
  onSelect?: () => void;
}

interface ContextMenuProps {
  isOpen: boolean;
  x: number;
  y: number;
  items: ContextMenuItem[];
  onClose: () => void;
}

const MENU_WIDTH = 224; 
const ITEM_HEIGHT = 40;
const MENU_PADDING = 16;

export function ContextMenu({ isOpen, x, y, items, onClose }: ContextMenuProps) {
  const menuRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  function handleSelect(item: ContextMenuItem) {
    if (item.disabled) {
      return;
    }
    item.onSelect?.();
    onClose();
  }

  const estHeight = items.length * ITEM_HEIGHT + MENU_PADDING;
  const left = Math.max(8, Math.min(x, window.innerWidth - MENU_WIDTH - 8));
  const top =
    y + estHeight > window.innerHeight - 8
      ? Math.max(8, y - estHeight)
      : y;

  return (
    <ul
      ref={menuRef}
      role="menu"
      style={{ position: "fixed", top, left }}
      className="z-50 w-56 rounded-md bg-popup-bg py-2 shadow-2xl"
    >
      {items.map((item) => (
        <li key={item.id} role="none">
          <button
            type="button"
            role="menuitem"
            disabled={item.disabled}
            onClick={() => handleSelect(item)}
            className={`flex w-full items-center gap-3 px-4 py-2 text-left text-14px transition disabled:cursor-default disabled:opacity-50 ${
              item.variant === "danger"
                ? "text-red-500 hover:bg-background-highlight"
                : "text-text-base hover:bg-background-highlight"
            }`}
          >
            {item.icon}
            {item.label}
          </button>
        </li>
      ))}
    </ul>
  );
}
