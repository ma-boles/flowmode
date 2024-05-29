'use client'
import React from "react";
import UserProfile from "@/components/profile/UserProfile";


export default function How () {
    return (
        <>
        <div>
            <UserProfile />
        </div>

        <div className="min-h-screen">
            <h1 className="pt-16 text-center">How</h1>

            <div className="inline-flex flex-wrap justify-evenly w-full">
                    <div className="m-8 p-8 w-64 h-68 rounded-lg works--card">
                        <div className="mx-auto mb-3 w-12 border-2 border-single border-white text-center">
                            1<br/>
                        </div>
                        <h3 className="mb-2 font-bold">Explore Spotify Catalogue:</h3>
                        <p>Explore the Spotify catalogue to discover a wide range of playlists, podcasts, audiobooks, and songs.</p>
                    </div>

                    <div className="m-8 p-8 w-64 h-68 rounded-lg works--card">
                        <div className="mx-auto mb-3 w-12 border-2 border-single border-white text-center">
                            2<br/>
                        </div>
                        <h3 className="mb-2 font-bold">Make a Selection:</h3>
                        <p>Select something to listen to during you work interval.</p>
                    </div>

                    <div className="m-8 p-8 w-64 h-68 rounded-lg works--card">
                        <div className="mx-auto mb-3 w-12 border-2 border-single border-white text-center">
                            3<br/>
                        </div>
                        <h3 className="mb-2 font-bold">Set work + rest intervals:</h3>
                        <p>Set time intervals for both work and rest. Then set reminders to track remaining time.</p>
                    </div>

                    <div className="m-8 p-8 w-64 h-68 rounded-lg works--card">
                        <div className="mx-auto mb-3 w-12 border-2 border-single border-white text-center">
                            4<br/>
                        </div>
                        <h3 className="m-auto pt-3 font-semibold text-center text-4xl">Listen and get into <span className="text-green-500 font-bold">flow</span><span className="font-light">mode</span>!</h3>
                    </div>
            </div>
        </div>
        </>
    )
}