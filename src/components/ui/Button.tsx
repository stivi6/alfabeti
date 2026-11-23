import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { buttonClasses, type ButtonSize, type ButtonVariant } from './buttonStyles';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  leadingIcon,
  trailingIcon,
  className,
  children,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button type={type} className={buttonClasses(variant, size, className)} {...props}>
      {leadingIcon}
      {children}
      {trailingIcon}
    </button>
  );
}
