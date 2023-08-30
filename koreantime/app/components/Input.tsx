import React from "react";

interface InputProps {
    onChange: (...event: any[]) => void;
    onBlur: (...event: any[]) => void;
    name: string;
    min?: string | number;
    max?: string | number;
    disabled?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ onChange, onBlur, name, min, max, disabled }, ref) => {
        return (
            <input
                type="text"
                name={name}
                onChange={onChange}
                onBlur={onBlur}
                ref={ref}
                min={min}
                max={max}
                disabled={disabled}
                className="mt-3 p-4 bg-yellow-200 hover:outline-none outline-none"
            />
        );
    }
);
