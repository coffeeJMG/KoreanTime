import React from "react";

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
            bg-yellow-200
            text-amber-500
            p-4
            relative
            disabled:opacity-70
            disabled:cursor-not-allowed
            rounded-lg
            hover:opacity-80
            transition
            
           
            `}
            onClick={onClick}
        >
            {children} {/* Render the children */}
        </button>
    );
};
