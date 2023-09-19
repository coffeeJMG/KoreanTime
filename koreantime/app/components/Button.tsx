import React from "react";
import { colors, size } from "../types/constant";

interface ButtonProps {
    children: React.ReactNode; // Define children prop
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    full?: boolean;
    disabled?: boolean;
    big?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
    children,
    onClick,
    full,
    big,
    disabled,
}) => {
    return (
        <button
            className={`
            ${full ? "w-full" : "w-1/3"}
            mt-3
            h-5/4
            ${colors.inputColor}
            ${colors.textColor}
            p-4
            relative
            ${disabled ? "opacity-70 cursor-not-allowed" : ""}
            disabled={disabled}
            rounded-lg
            hover:scale-[0.98]
            transition
            disabled
            ${big ? `${size.titleSize}` : null}`}
            onClick={onClick}
        >
            {children}
        </button>
    );
};
