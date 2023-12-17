import React from "react";
import Landing from "../components/components/Landing";
import Works from "../components/components/Works";

import '../styles/App.css';

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