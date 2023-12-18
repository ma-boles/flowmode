import React from "react";
import "../styles/styles.css";

import BrowseImg from "../images/Browse1.jpg"

export default function Browse() {
    return(
        <>
            <section className="mx-auto w-full max-w-6xl  min-h-screen h-auto flex items-center justify-center">
                <img src={BrowseImg} alt="stack of books" className="w-full h-auto"></img>
            </section>
        </>
    )
}