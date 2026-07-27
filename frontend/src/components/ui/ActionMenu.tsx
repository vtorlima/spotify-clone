import { useEffect, useRef, useState, type ReactNode } from "react";
import { FiMoreHorizontal } from "react-icons/fi";

export interface ActionMenuItem {
  id: string;
  label: string;
  icon?: ReactNode;
  disabled?: boolean;
  variant?: "default" | "danger";
  onSelect?: () => void;
}

interface ActionMenuProps {
  ariaLabel: string;
  items: ActionMenuItem[];
}

export function ActionMenu({ ariaLabel, items }: ActionMenuProps) {
  const [isOpen, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  function handleItemSelect(item: ActionMenuItem) {
    if (item.disabled) {
      return;
    }

    item.onSelect?.();
    setOpen(false);
  }

  return (
    <div ref={containerRef} className="relative inline-block">
      <button
        type="button"
        aria-label={ariaLabel}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        onClick={() => setOpen((current) => !current)}
        className="flex h-10 w-10 items-center justify-center rounded-full text-text-subdued transition hover:bg-background-highlight hover:text-text-base"
      >
        <FiMoreHorizontal className="text-[20px]" />
      </button>

      {isOpen && (
        <ul
          role="menu"
          className="absolute left-0 top-full z-10 mt-2 w-56 rounded-md bg-popup-bg py-2 shadow-2xl"
        >
          {items.map((item) => (
            <li key={item.id} role="none">
              <button
                type="button"
                role="menuitem"
                disabled={item.disabled}
                onClick={() => handleItemSelect(item)}
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
      )}
    </div>
  );
}
