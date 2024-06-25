'use client'
import React from "react";
import { SessionProvider } from "next-auth/react";
import { PlayerProvider } from "@/app/providers/PlayerProvider";

const PageWrapper = ({ children, session }) => {
    // Check if window is defined (running in the browser)
    const isBrowser = typeof window !== 'undefined';

    // Determine if the current page is the Browse or Dashboard
    const isBrowseOrDashboardPage = isBrowser && ['/search', '/dashboard', '/about' ].includes(window.location.pathname);

    // Conditionally wrap children with PlayerProvider based on the current page
    const wrappedChildren = isBrowseOrDashboardPage ? <PlayerProvider>{children}</PlayerProvider> : children;

    return (
    <SessionProvider session={session}>
        {wrappedChildren}
    </SessionProvider>
    );
};

export default PageWrapper;