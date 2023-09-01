"use client";

import { useEffect, useState } from "react";

interface ClientOnlyProps {
    children: React.ReactNode;
}

//hydration 오류 해결 컴포넌트
export const ClientOnly: React.FC<ClientOnlyProps> = ({ children }) => {
    const [hasMouned, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    if (!hasMouned) {
        return null;
    }
    return <>{children}</>;
};
