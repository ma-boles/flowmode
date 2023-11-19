import React from "react";
import '../styles/App.css';
import Logo from "../images/Landing1.jpg"

export default function Landing() {
    return (
        <>
        <h2 className="landing--h2">Spotify Reads</h2>

        <section className="landing">
            <img src={Logo} alt="astronaut reading a book" />
        </section>
        </>
    )
}
