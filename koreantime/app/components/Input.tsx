import React from "react";

export interface InputProps {
    onChange: (...event: any[]) => void;
    onBlur: (...event: any[]) => void;
    name: string;
    min?: string | number;
    max?: string | number;
    disabled?: boolean;
    placeholder: string;
    type: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    (
        { onChange, onBlur, name, min, max, disabled, placeholder, type },
        ref
    ) => {
        return (
            <input
                type={type}
                name={name}
                onChange={onChange}
                onBlur={onBlur}
                ref={ref}
                min={min}
                max={max}
                disabled={disabled}
                placeholder={placeholder}
                className="mt-3 p-4 bg-yellow-200 hover:outline-none outline-none placeholder-amber-500"
            />
        );
    }
);
