'use client'
import { SessionProvider } from "next-auth/react";

const PageWrapper = ({ children, session }) => {
    return (
    <SessionProvider session={session}>
        {children}
    </SessionProvider>
    );
};

export default PageWrapper;