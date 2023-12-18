import React from "react";
import Landing from "../components/Landing";
import Works from "../components/Works";

import '../styles/styles.css'

export default function LandingPage() {
    return(
        <>
        <section className='m-6 text-center'>
            <Landing />
        </section>
            <Works />
        </>
    )
}