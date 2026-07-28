type PlayButtonSize = "xs" | "sm" | "lg";

interface PlayButtonProps {
  as?: "button" | "span";
  size?: PlayButtonSize;
  playing?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  ariaLabel?: string;
  className?: string;
}

const sizeClass: Record<PlayButtonSize, string> = {
  xs: "h-8 w-8",
  sm: "h-13 w-13",
  lg: "h-14 w-14",
};

const iconSize: Record<PlayButtonSize, number> = {
  xs: 16,
  sm: 30,
  lg: 28,
};

export function PlayButton({
  as = "button",
  size = "lg",
  playing = false,
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
      {playing ? (
        <>
          <rect x="4" y="2.5" width="3" height="11" rx="1" fill="currentColor" />
          <rect x="9" y="2.5" width="3" height="11" rx="1" fill="currentColor" />
        </>
      ) : (
        <path d="M4 2.5V13.5L13 8L4 2.5Z" fill="currentColor" />
      )}
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
