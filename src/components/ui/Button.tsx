import { cn } from "../../lib/utils";

// ✅ Variants with strict typing
const variants = {
  primary: "bg-ink text-hl hover:bg-zinc-800 border-transparent",
  ghost: "bg-white text-ink-2 border-line hover:border-ink-2",
  hl: "bg-hl text-ink font-bold hover:bg-yellow-300 border-transparent",
  outlineLight:
    "bg-transparent text-ink-4 border-zinc-600 hover:text-white hover:border-zinc-400",
} as const;

// ✅ Sizes
const sizes = {
  sm: "px-4 py-2 text-sm rounded-lg",
  md: "px-5 py-2.5 text-sm rounded-[9px]",
  lg: "px-8 py-[15px] text-base rounded-[10px]",
} as const;

// ✅ TYPES (THIS is what you were missing)
type Variant = keyof typeof variants;
type Size = keyof typeof sizes;

type ButtonProps = {
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
};

// ✅ COMPONENT
const Button = ({
  children,
  variant = "primary",
  size = "md",
  className,
  onClick,
  type = "button",
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={cn(
        "border transition-all duration-200",
        variants[variant],
        sizes[size],
        className,
      )}
    >
      {children}
    </button>
  );
};

export default Button;
