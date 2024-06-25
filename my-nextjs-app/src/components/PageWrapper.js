'use client'
import React from "react";
import { SessionProvider } from "next-auth/react";
import { PlayerProvider } from "@/app/providers/PlayerProvider";

const PageWrapper = ({ children, session }) => {
    // Check if window is defined (running in the browser)
    const isSearch = typeof window !== 'undefined';

    // Determine if the current page is the Browse or Dashboard
    const isSearchOrDashboardPage = isSearch && ['/search', '/dashboard', '/about' ].includes(window.location.pathname);

    // Conditionally wrap children with PlayerProvider based on the current page
    const wrappedChildren = isSearchOrDashboardPage ? <PlayerProvider>{children}</PlayerProvider> : children;

    return (
    <SessionProvider session={session}>
        {wrappedChildren}
    </SessionProvider>
    );
};

export default PageWrapper;