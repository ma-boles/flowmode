import React from "react";
import Logo from "../images/Landing1.jpg"

export default function Landing() {
    return (
        <>
        <h2 className="text-right text-lg text-black font-bold">Spotify Reads</h2>

        <section className="mx-auto">
            <img src={Logo} alt="astronaut reading a book" className="mx-auto h-auto"/>
        </section>
        </>
    )
}
