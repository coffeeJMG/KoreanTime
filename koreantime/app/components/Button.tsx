import React from "react";
import { colors } from "../types/constant";

interface ButtonProps {
    children: React.ReactNode; // Define children prop
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    full?: boolean;
    disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
    children,
    onClick,
    full,

    disabled,
}) => {
    return (
        <button
            className={`
            ${full ? "w-full" : "w-1/3"}
            mt-3
            h-2/5
            ${colors.inputColor}
            ${colors.textColor}
            p-4
            relative
            disabled:opacity-70
            disabled:cursor-not-allowed
            rounded-lg
            hover:scale-[0.98]
            transition
            
            `}
            onClick={onClick}
        >
            {children} {/* Render the children */}
        </button>
    );
};
