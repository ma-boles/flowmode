import React from "react";
import "../styles/Browse.css";

import Browse from "../images/Browse1.jpg"

export default function BrowsePage() {
    return(
        <>
            <section className="browse--section">
                <img src={Browse} alt="stack of books" className="browse--img"></img>
            </section>
        </>
    )
}