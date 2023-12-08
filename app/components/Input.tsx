import cn from "classnames";
import React from "react";

export interface InputComponentProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  type: React.HTMLInputTypeAttribute;
  leftIcon?: JSX.Element;
  rightIcon?: JSX.Element;
  onIconClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Input = React.forwardRef<HTMLInputElement, InputComponentProps>(
  ({ type, placeholder, leftIcon, rightIcon, onIconClick, ...rest }, ref) => {
    return (
      <div className="relative">
        {leftIcon ? (
          <span className="absolute inset-y-0 left-0 flex items-center pl-2">
            <button
              onClick={(e) => {
                e.preventDefault();
                if (onIconClick) onIconClick(e);
              }}
              className={cn("p-1 focus:outline-none focus:shadow-outline", {
                "cursor-default": !onIconClick,
              })}
            >
              {leftIcon}
            </button>
          </span>
        ) : null}
        <input
          ref={ref}
          type={type}
          placeholder={placeholder}
          className={cn("input input-bordered input-primary w-full", {
            "pl-10": leftIcon,
            "pr-10": rightIcon,
          })}
          {...rest}
        />
        {rightIcon ? (
          <span className="absolute inset-y-0 right-0 flex items-center pr-2">
            <button
              onClick={(e) => {
                e.preventDefault();
                if (onIconClick) onIconClick(e);
              }}
              className={cn("p-1 focus:outline-none focus:shadow-outline", {
                "cursor-default": !onIconClick,
              })}
            >
              {rightIcon}
            </button>
          </span>
        ) : null}
      </div>
    );
  }
);
