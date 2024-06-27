'use client'
import React, { useEffect, useState, useRef } from "react";
import NavBar from "@/components/nav/NavBar";
import Display from "@/components/playlists/Display";
import Link from "next/link";
import Player from "@/components/player/Player";
import { useSession } from "next-auth/react";
import LastPlayed from "@/components/userdata/LastPlayed";
import TotalMinutesFlow from "@/components/userdata/TotalMinutesFlow";
import TotalMinutesRest from "@/components/userdata/TotalMinutesRest";


export default function Dashboard() {

    const { data: session, status } = useSession();
    const accessToken = session?.accessToken;

    const [viewMode, setViewMode] = useState('userOwnedPlaylists');
    const [isDisplayOpen, setIsDisplayOpen] = useState(false);
    const [showCard, setShowCard] = useState('flow');
    const myDisplayRef = useRef(null);

    if (status === "loading") {
        return  <div className="flex items-center justify-center h-screen">
                    <div className="p-6 rounded-lg loader"></div>
                </div>
    }

    const displayUserOwnedPlaylists = () => {
        setIsDisplayOpen(true);
        setViewMode('userOwnedPlaylists');

        setTimeout(() => {
            if(myDisplayRef.current) {
                myDisplayRef.current.scrollIntoView({ behavior: 'smooth'});
            }
        }, 0)
    };

    const displayFollowedPlaylists = () => {
        setIsDisplayOpen(true);
        setViewMode('followedPlaylists');

        setTimeout(() => {
            if(myDisplayRef.current) {
                myDisplayRef.current.scrollIntoView({ behavior: 'smooth' });
            }
        }, 0)
    };

    const handleFlowCard = () => {
        setShowCard('flow')
    };

    const handleRestCard = () => {
        setShowCard('rest')
    };


    return (
        <>
            <nav>
                <NavBar />
            </nav>

            <div className="m-12">
                {!session ? (
                        <h1 className="text-center">Loading...</h1>
                ): (
                    <h1 className="p-0 mb-14 text-center">Welcome {session.user.name}!</h1>

                )}

                    <div /* top section */ className="mb-16 flex justify-center">
                    

                        <div /* minute totals div */>
                            <div /* buttons div */ className="flex">
                                <button className={`px-16 py-1 mb-2 border-r border-solid border-white  hover:bg-blue-600 ${showCard === 'flow' ? 'bg-blue-600' : 'bg-transparent'}`} onClick={handleFlowCard}>Flow</button>
                                <button className={`px-16 mb-2 border-l border-solid border-white hover:bg-blue-600 ${showCard === 'rest' ? 'bg-blue-600' : 'bg-transparent'}`} onClick={handleRestCard}>Rest</button>
                            </div>

                            {showCard === 'flow' &&
                                <TotalMinutesFlow />
                            }
                            {showCard === 'rest' &&
                                <TotalMinutesRest />
                            }
                        </div>

                        <LastPlayed />

                        <div className="mx-2 flex flex-col justify-center items-center">
                            <button className="mx-4 mb-4 h-32 w-80 font-semibold bg-blue-700 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out border-2 border-transparent focus:border-white" onClick={displayUserOwnedPlaylists}>My<br/>Playlists</button>
                            <button className="mx-4 mt-4 h-32 w-80 font-semibold bg-blue-700 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out border-2 border-transparent focus:border-white" onClick={displayFollowedPlaylists}>All<br/>Playlists</button>
                        </div>
                    </div>

                    {isDisplayOpen && (
                        <div ref={myDisplayRef} style={{ marginTop: '50px' }}>
                            <Display viewMode={viewMode} isDisplayOpen={isDisplayOpen} setIsDisplayOpen={setIsDisplayOpen}/>
                    </div>
                    )}

            </div>
            
            <Player accessToken={accessToken}/>

        </>
    )
}