'use client'
import React from "react";
import { SessionProvider } from "next-auth/react";
import { PlayerProvider } from "@/app/providers/PlayerProvider";

const PageWrapper = ({ children, session }) => {
    return (
    <SessionProvider session={session}>
        <PlayerProvider>
            {children}
        </PlayerProvider>
    </SessionProvider>
    );
};

export default PageWrapper;