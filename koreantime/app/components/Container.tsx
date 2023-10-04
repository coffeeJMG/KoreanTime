"use client";

interface ContainerProps {
    children: React.ReactNode;
}

export const Container: React.FC<ContainerProps> = ({ children }) => {
    return (
        <>
            <div className="mx-auto px-4">{children}</div>
        </>
    );
};
