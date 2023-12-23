import React from "react";
import { ShelfProvider } from "../contexts/ShelfContext";

export default function MyApp({ Component, pageProps }) {
    return (
        <ShelfProvider>
            <Component {...pageProps} />
        </ShelfProvider>
    );
};
