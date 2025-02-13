'use client'
import React from "react";
import NavBar from "@/components/nav/NavBar";
import Footer from "@/components/footer/Footer";
import { useSession } from "next-auth/react";
 

// Add replacement for Player if not signed in
export default function About () {

    const { data: session, status } = useSession();
    const accessToken = session?.accessToken;
    
    return (
        <>
        <div className="flex overflow-y-auto">
            <NavBar />

            <div className={`p-2 h-screen flex-grow w-[1130px] overflow-x-scroll ${
                    session ? 'ml-56' : 'ml-0'
                }`}>

                <div /* mission */ className="rounded-lg">
                    <h2 className="my-4 text-3xl font-bold">Our Mission</h2>
                    <p className="text-xl">At <span className="text-green-600 font-bold">flow</span><span className="font-medium">mode</span>, our mission is to enhance productivity and well-being for those who work long hours. By integrating customizable work timers with Spotify audio, we empower users to stay focused, motivated, and refreshed, fostering a balanced and productive work environment.</p>
                </div>

                <div /* story */ className="rounded-lg">
                    <h2 className="my-4 text-3xl font-bold">Our Story</h2>
                    <p className="text-xl">The idea for <span className="text-green-600 font-bold">flow</span><span className="font-medium">mode</span> originated from my own struggle to mintain focus and productivty during long work hours ofen leading to fatigue and headaches. In an effort to improve my situation, I sought out information pertaining to time management and productivity and discovered the importance of breaks and the Pomodoro technique. After much trial and error, I realized the need for a flexibile tool that would accomaodate different work environments based on user preferences.<br /><br />
                    As a result <span className="text-green-600 font-bold">flow</span><span className="font-medium">mode</span> was developed. It empowers users to customize their environments regaradless of their listening preferences or desired work/rest intervals. <br /><br />

                    Through its development, <span className="text-green-600 font-bold">flow</span><span className="font-medium">mode</span> has evolved as a simple concept to a sophisticated productivity tool. Numerous challenges were overcome, from integrating <span className="font-bold">Spotify</span> functionality to designing an intuitive user interface with the aim of creating a seamless user experience always being the ultimate goal.<br /><br />

                    Looking ahead, we stay commited to continiung to improve and innovate. We aim to make <span className="text-green-600 font-bold">flow</span><span className="font-medium">mode</span> an essential tool for enhancing productivity and well-being in anyone's work routine.
                    </p>
                </div>
            </div>
        </div>
        <Footer />

        </>
    )
}