import { ArrowLeft } from "lucide-react";

export const FormInput = ({
  id,
  OnChange,
  placeholder,
  type,
  value,
  name,
  className,
}: {
  type: string;
  value?: any;
  placeholder: string;
  OnChange: any;
  id?: string;
  name?: string;
  className?: string;
}) => {
  return (
    <input
      type={type}
      id={id}
      value={value}
      name={name}
      onChange={OnChange}
      className={`pl-10 w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${className}`}
      placeholder={placeholder}
      required
    />
  );
};

export const BackButton = ({ OnClick }: { OnClick: any }) => {
  return (
    <button
      onClick={OnClick}
      className="mr-4 p-2 bg-green-100 text-green-600 rounded-full hover:bg-green-200 transition-colors absolute left-0"
    >
      <ArrowLeft className="h-6 w-6" />
    </button>
  );
};

// Text Area And Button for Uere Review Component
import { TextareaHTMLAttributes, forwardRef } from "react";
import { cn } from "../Lib/Utils";

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-md border border-green-300 bg-transparent px-3 py-2 text-sm placeholder:text-green-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };

import { ButtonHTMLAttributes } from "react";
import { Loader2 } from "lucide-react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
  isLoading?: boolean;
}

const ReviewButton = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      children,
      variant = "default",
      size = "default",
      isLoading,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

    const variants = {
      default: "bg-green-600 text-white hover:bg-green-700",
      outline:
        "border border-green-300 bg-transparent hover:bg-green-50 text-green-700",
      ghost: "hover:bg-green-50 text-green-700",
    };

    const sizes = {
      default: "h-10 py-2 px-4",
      sm: "h-9 px-3",
      lg: "h-11 px-8",
    };

    return (
      <button
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          isLoading ? "opacity-50 cursor-not-allowed" : "",
          className
        )}
        disabled={isLoading}
        ref={ref}
        {...props}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Loading...
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);
ReviewButton.displayName = "Button";

export { ReviewButton };
