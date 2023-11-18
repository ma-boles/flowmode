import React from "react";
import '../styles/App.css';
import Logo from "../images/edit.jpg"

export default function Landing() {
    return (
        <>
        <section className="landing">
            <div className="header">
                <h1>Keep track of <br></br>
                your monthly <br></br>
                <strong>Spotify audiobooks</strong>
                </h1>
            </div>
            <img src={Logo} alt="astronaut reading a book" />
        </section>
        </>
    )
}
