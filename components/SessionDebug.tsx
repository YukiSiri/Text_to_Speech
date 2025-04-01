// components/SessionDebug.tsx
'use client';

import { useSession } from "next-auth/react";
import { useEffect } from "react";

export function SessionDebug() {
    const { data: session, status } = useSession();

    useEffect(() => {
        console.log("Session status:", status);
        console.log("Session data:", session);
        console.log("Cookies:", document.cookie);
    }, [session, status]);

    return null;
}