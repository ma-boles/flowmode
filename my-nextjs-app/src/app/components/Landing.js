import React from "react";
import Logo from '../images/LandingImg5.jpg'

export default function Landing() {
    return (
        <>
        <h2 className="text-right text-lg text-black font-bold">Spotify Reads</h2>

        <section className="mx-auto w-full max-w-6xl  min-h-screen h-auto flex items-center justify-center">
            <img src={Logo} alt="astronaut reading a book" className="w-full h-auto"/>
        </section>
        </>
    )
}
