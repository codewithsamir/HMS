import { cn } from "@/lib/utils";

interface SpinnerProps {
  size?: number; // Customize size
  className?: string; // Additional styles
}

const Spinner = ({ size = 24, className }: SpinnerProps) => {
  return (
    <div
      className={cn(
        "animate-spin rounded-full border-4 border-gray-300 border-t-primary",
        className
      )}
      style={{ width: size, height: size, borderTopColor: "currentColor" }}
    />
  );
};

export default Spinner;
