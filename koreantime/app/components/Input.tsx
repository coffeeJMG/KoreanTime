import React from "react";
import { colors } from "../types/constant";

export interface InputProps {
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    onBlur?: (...event: any[]) => void;
    name?: string;
    min?: string | number;
    max?: string | number;
    disabled?: boolean;
    placeholder?: string;
    type?: string;
    small?: boolean;
    value?: string;
    readOnly?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    (
        {
            onChange,
            onBlur,
            name,
            min,
            max,
            disabled,
            placeholder,
            type,
            small,
            value,
            readOnly,
            onKeyPress,
        },
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
                className={`mt-3 p-4 ${
                    colors.inputColor
                } hover:outline-none outline-none ${colors.textColor} ${
                    small ? "w-1/2" : "w-full"
                }`}
                value={value}
                readOnly={readOnly}
                onKeyPress={onKeyPress}
            />
        );
    }
);
