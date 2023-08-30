import React from "react";

interface ButtonProps {
    children: React.ReactNode; // Define children prop
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    full?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ children, onClick, full }) => {
    return (
        <button
            className={`
            ${full ? "w-full" : "w-1/3"}
            mt-3
            h-2/5
            bg-yellow-200
            text-amber-500
            p-4
            rounded-full
            `}
        >
            {children} {/* Render the children */}
        </button>
    );
};
