import * as React from "react"

import { cn } from "@/lib/utils"

interface InputProps extends React.ComponentProps<"input"> {
  icon1?: React.ReactNode;
  icon2?: React.ReactNode;
}


const Input = React.forwardRef<HTMLInputElement, InputProps> (
  ({ className, type,icon1,icon2, ...props }, ref) => {
    return (
   <div className="flex w-full rounded-md border border-input items-center  px-2 py-1">
  {icon1 && icon1}
      <input
        type={type}
        className={cn(
          "flex h-8 w-full bg-transparent px-2 py-0  text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm ",
          className
        )}
        ref={ref}
        {...props}
      />
      {icon2 && icon2}
   </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
