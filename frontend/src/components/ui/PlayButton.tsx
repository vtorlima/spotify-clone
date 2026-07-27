type PlayButtonSize = "sm" | "lg";

interface PlayButtonProps {
  as?: "button" | "span";
  size?: PlayButtonSize;
  onClick?: () => void;
  disabled?: boolean;
  ariaLabel?: string;
  className?: string;
}

const sizeClass: Record<PlayButtonSize, string> = {
  sm: "h-13 w-13",
  lg: "h-14 w-14",
};

const iconSize: Record<PlayButtonSize, number> = {
  sm: 30,
  lg: 28,
};

export function PlayButton({
  as = "button",
  size = "lg",
  onClick,
  disabled = false,
  ariaLabel = "Tocar",
  className = "",
}: PlayButtonProps) {
  const icon = (
    <svg
      width={iconSize[size]}
      height={iconSize[size]}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path d="M4 2.5V13.5L13 8L4 2.5Z" fill="currentColor" />
    </svg>
  );

  const baseClass = `flex items-center justify-center rounded-full bg-accent text-black transition ${sizeClass[size]} ${className}`;

  if (as === "span") {
    return (
      <span aria-hidden="true" className={baseClass}>
        {icon}
      </span>
    );
  }

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClass} hover:scale-105 hover:brightness-110 disabled:cursor-default disabled:opacity-50 disabled:hover:scale-100`}
    >
      {icon}
    </button>
  );
}
