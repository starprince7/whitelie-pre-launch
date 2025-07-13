import React from 'react';
import { Input, InputProps, Textarea, TextAreaProps } from '@heroui/react';

// Extend InputProps with our custom defaults
export interface FormInputProps extends Omit<InputProps, 'ref'> {
  label?: string;
  error?: string;
}

// Custom Input component that applies our design system defaults
export const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="hero-input-wrapper">
        {label && (
          <label className="hero-label">
            {label}
          </label>
        )}
        <Input
          ref={ref}
          variant="bordered"
          labelPlacement="outside"
          className={`${className}`}
          errorMessage={error}
          {...props}
        />
      </div>
    );
  }
);

FormInput.displayName = 'FormInput';

// Extend TextAreaProps with our custom defaults
export interface FormTextAreaProps extends Omit<TextAreaProps, 'ref'> {
  label?: string;
  error?: string;
}

// Custom Textarea component with same styling principles
export const FormTextArea = React.forwardRef<HTMLTextAreaElement, FormTextAreaProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="hero-input-wrapper">
        {label && (
          <label className="hero-label">
            {label}
          </label>
        )}
        <Textarea
          ref={ref}
          variant="bordered"
          className={`${className}`}
          errorMessage={error}
          {...props}
        />
      </div>
    );
  }
);

FormTextArea.displayName = 'FormTextArea';
