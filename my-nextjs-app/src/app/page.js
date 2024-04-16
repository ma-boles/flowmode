'use client';

import React from "react";
import { signIn, signOut, useSession, SessionProvider } from "next-auth/react";
import './styles/styles.css';
import Link from "next/link";


export default function HomePage(){
    
    const metadata = {
        title: 'Home | Spotify Reads',
        description: 'Keep track of your monthly Spotify audiobooks'
    };

    return(
        <div>
        <section className='text-center mx-auto w-full max-w-6xl min-h-screen h-auto flex items-center justify-center landing'>
            <div>
                <h1 className="p-0 text-8xl">
                <span className="font-bold  text-green-500">flow</span><span className="font-light">mode</span></h1>
                <h1 className="pt-4 pl-12 pr-12 text-3xl font-semibold">Boost your productivity with use of Spotify's audio to guide your work and rest intervals for optimal <span className="font-bold text-green-500">focus</span> and <span className="font-bold text-green-500">refresh</span>.</h1>
            </div>
        </section>

        <section className="text-center w-full   min-h-screen h-auto items-center justify-center">

            <h1 className="mb-6 pb-4">How it works</h1>

                <div className="inline-flex flex-wrap justify-evenly w-full">
                    <div className="m-8 p-8 w-64 h-68 rounded-lg works--card">
                        <div className="mx-auto mb-3 w-12 border-2 border-single border-white">
                            1<br/>
                        </div>
                        <h3 className="mb-2 font-bold">Explore Spotify Catalogue:</h3>
                        <p>Explore the Spotify catalogue to discover a wide range of playlists, podcasts, audiobooks, and songs.</p>
                    </div>

                    <div className="m-8 p-8 w-64 h-68 rounded-lg works--card">
                        <div className="mx-auto mb-3 w-12 border-2 border-single border-white">
                            2<br/>
                        </div>
                        <h3 className="mb-2 font-bold">Make a Selection:</h3>
                        <p>Select something to listen to during you work interval.</p>
                    </div>

                    <div className="m-8 p-8 w-64 h-68 rounded-lg works--card">
                        <div className="mx-auto mb-3 w-12 border-2 border-single border-white">
                            3<br/>
                        </div>
                        <h3 className="mb-2 font-bold">Set work + rest intervals:</h3>
                        <p>Set time intervals for both work and rest. Then set reminders to track remaining time.</p>
                    </div>

                    <div className="m-8 p-8 w-64 h-68 rounded-lg works--card">
                        <div className="mx-auto mb-3 w-12 border-2 border-single border-white">
                            4<br/>
                        </div> 
                        <h3 className="m-auto pt-3 font-semibold text-center text-4xl">Listen and get into <span className="text-green-500 font-bold">flow</span><span className="font-light">mode</span>!</h3>
                    </div>
                </div>
                <div>

                <Link href="/shelf">
                    <button className="py-2 px-20 mt-10 mb-6 bg-transparent border-2 border-double border-white rounded-full">
                        Log In
                    </button>
                </Link>
                </div>
                
            </section>
        </div>
    );
};

{/*<img src="/LandingImg5.jpg" alt="astronaut reading a book" className="w-full h-auto" />*/}