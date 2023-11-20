import React from "react";
import Landing from "../components/Landing";
import Works from "../components/Works";

export default function LandingPage() {
    return(
        <>
        <section className='landing--section'>
            <Landing />
        </section>
            <Works />
        </>
    )
}