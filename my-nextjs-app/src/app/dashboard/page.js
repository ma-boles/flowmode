'use client'
import React, { useEffect, useState, useRef } from "react";
import UserProfile from "@/components/profile/UserProfile";
import Display from "@/components/playlists/Display";
import Link from "next/link";
import Player from "@/components/player/Player";
import { useSession } from "next-auth/react";
import TotalMinutes from "@/components/userdata/TotalMinutes";
import LastPlayed from "@/components/userdata/LastPlayed";


export default function Dashboard() {

    const { data: session, status } = useSession();
    const accessToken = session?.accessToken;

    const [viewMode, setViewMode] = useState('userOwnedPlaylists');
    {/*const [isPlayerOpen, setIsPlayerOpen] = useState(false);*/}
    const [isDisplayOpen, setIsDisplayOpen] = useState(false);
    const myDisplayRef = useRef(null);

    if (status === "loading") {
        return  <div className="flex items-center justify-center h-screen">
                    <div className="p-6 rounded-lg loader"></div>
                </div>;
    }
    /*const handleButtonClick = () => {
        setIsPlayerOpen(true); // Open Player when button is clicked
    };*/

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


    return (
        <>
            <nav>
                <UserProfile />
            </nav>

            <div className="m-12">
                {!session ? (
                    <h1 className="text-center">Loading...</h1>
                ): (
                    <h1 className="p-0 mb-14 text-center">Welcome {session.user.name}!</h1>

                )}
                    <div /* top section */ className="mb-16 flex justify-center">
                        <TotalMinutes />
                        <LastPlayed />
                        <div className="mx-2 flex flex-col justify-center items-center">
                            <button className="mx-4 mb-4 h-32 w-80 font-semibold bg-green-600 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out active:bg-blue-700 focus:bg-blue-700" onClick={displayUserOwnedPlaylists}>My<br/>Playlists</button>
                            <button className="mx-4 mt-4 h-32 w-80 font-semibold bg-green-600 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out active:bg-blue-700 focus:bg-blue-700" onClick={displayFollowedPlaylists}>All<br/>Playlists</button>
                        </div>
                    </div>

                    {isDisplayOpen && (
                        <div ref={myDisplayRef} style={{ marginTop: '50px' }}>
                            <Display viewMode={viewMode} isDisplayOpen={isDisplayOpen} setIsDisplayOpen={setIsDisplayOpen}/>
                    </div>
                    )}

                   {/* <button className="m-8 p-8 bg-green-600" onClick={handleButtonClick}>Open Player</button>
                    {isPlayerOpen && (
                        <Player accessToken={accessToken}/>
                    )}*/}
            </div>
        </>
    )
}