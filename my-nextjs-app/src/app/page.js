'use client';
import React from "react";
import { signIn, useSession } from "next-auth/react";
import './styles/styles.css';
import Link from "next/link";
import Footer from "@/components/footer/Footer";


export default function HomePage(){
    const { data: session, status } = useSession();

    const isLoggedIn = status === 'authenticated' && session;

    const metadata = {
        title: 'Home | flowmode',
        description: 'Promote focus and productivity with Spotify audio'
    };


    return(
        <>
            <div className="overflow-hidden mx-auto max-w-6xl flex flex-col text-center items-center justify-center min-h-screen">
                <h1 className="text-8xl leading-none p-4 m-0">
                    <span className="font-bold  text-green-500">flow</span><span className="font-light">mode</span>
                </h1>
                {!isLoggedIn && (
                    <h2 className="text-4xl font-semibold">Boost your productivity with use of Spotify's audio to guide your work and rest intervals for optimal <span className="font-bold text-green-500">focus</span> and <span className="font-bold text-green-500">refresh</span>.</h2>
                )}

            {isLoggedIn && (
                <div className="mt-8 flex justify-evenly">
                    <Link href={'/profile'}>
                        <button className="px-12 py-4 text-lg border-2 border-green-600 font-semibold rounded-full hover:bg-green-600"> &lt;&lt; Profile </button>
                    </Link>
                    <Link href={'/search'}>
                        <button className="px-14 py-4 text-lg border-2 border-green-600 font-semibold rounded-full hover:bg-green-600"> Search &gt;&gt;</button>
                    </Link>
                </div>
                )}

            </div>

    {!isLoggedIn && (
        <section className="text-center w-full min-h-screen h-auto items-center justify-center bg-white bg-opacity-5">

            <h1 className="mb-6 pt-10 pb-4 text-4xl font-bold">How It Works</h1>

                <div className="inline-flex flex-wrap justify-evenly w-full">
                    <div className="m-8 p-8 w-64 h-68 bg-white bg-opacity-20 rounded-2xl shadow-2xl">
                        <div className="mx-auto mb-3 w-12 border-2 border-single border-white">
                            1<br/>
                        </div>
                        <h3 className="mb-2 font-bold text-xl">Explore Catalogue:</h3>
                        <p className="text-lg">Explore the Spotify catalogue to discover a wide range of playlists, podcasts, audiobooks, and songs.</p>
                    </div>

                    <div className="m-8 p-8 w-64 h-68 bg-white bg-opacity-20 rounded-2xl shadow-2xl">
                        <div className="mx-auto mb-3 w-12 border-2 border-single border-white">
                            2<br/>
                        </div>
                        <h3 className="mb-2 font-bold text-xl">Make a Selections:</h3>
                        <p className="text-lg">Select something to listen to during your flow and rest intervals.</p>
                    </div>

                    <div className="m-8 p-8 w-64 h-68 bg-white bg-opacity-20 rounded-2xl shadow-2xl">
                        <div className="mx-auto mb-3 w-12 border-2 border-single border-white">
                            3<br/>
                        </div>
                        <h3 className="mb-2 font-bold text-xl">Set flow/rest time:</h3>
                        <p className="text-xl">Set desired length of time for flow and rest.</p>
                    </div>

                    <div className="m-8 p-8 w-64 h-68 bg-white bg-opacity-20 rounded-2xl shadow-2xl">
                        <div className="mx-auto mb-3 w-12 border-2 border-single border-white">
                            4<br/>
                        </div>
                        <h3 className="m-auto pt-3 font-semibold text-center text-4xl">Listen and get into <span className="text-green-500 font-bold">flow</span><span className="font-light">mode</span>!</h3>
                    </div>
                </div>
                <div /* log in section */ className="mx-10 my-6">
                    <div /* log in buttons */ className="flex justify-center" >
                        <button onClick={() => signIn('spotify')} className="py-4 px-24 mt-6 mb-4 mx-4 border-4 border-green-600 rounded-full font-semibold hover:bg-green-600 transition duration-300 ease-in-out">
                            Log In w/ Spotify
                        </button>
                    </div>
                    <p className="font-normal">*Requires Spotify Premium <Link href="https://open.spotify.com/" target="_blank" rel="noopener noreferrer" className="underline hover:text-purple-500">subscription.</Link></p>
                </div>

            </section>
        )}

        <Footer />

        </>
    );
};