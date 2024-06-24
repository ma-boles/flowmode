'use client'
import React from "react";
import UserProfile from "@/components/profile/UserProfile";


export default function About () {
    return (
        <>
        <div>
            <UserProfile />
        </div>

        <div className="min-h-screen">
            <div /* mission */>
                <h1>Our Mission</h1>
                <p>At <span>flow</span><span>mode</span>, our mission is to enhance productivity and well-being for those who work long hours. By integrating customizable work timers with Spotify audio, we empower users to stay focused, motivated, and refreshed, fostering a balanced and productive work environment.</p>
            </div>
            
            <div /* story */>
                <h1>Our Story</h1>
                <p>The idea for flowmode originated from my own struggle to mintain focus and productivty during long work hours ofen leading to fatigue and headaches. In an effort to improve my situation, I sought out information pertaining to time management and productivity and discovered the importance of breaks and the Pomodoro technique. After much trial and error, I realized the need for a flexibile tool that would accomaodate different work environments based on user preferences.<br />
                As a result <span>flow</span><span>mode</span> was developed. It empowers users to customize their environments regaradless of their listening preferences or desired work/rest intervals. <br />
                Through its development, <span>flow</span><span>mode</span> has evolved as a simple concept to a sophisticated productivity tool. Numerous challenges were overcome, from integrating Spotify functionality to designing an intuitive user interface with the aim of creating a seamless user experience always being the ultimate goal.<br />
                Looking ahead, we stay commited to continiung to improve and innovate. We aim to make <span>flow</span><span>mode</span> an essential tool for enhancing productivity and well-being in anyone's work routine.
                </p>
            </div>
        </div>
        </>
    )
}