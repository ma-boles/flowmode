'use client'
import React, { useEffect, useState } from "react";
import UserProfile from "@/components/profile/UserProfile";
import Display from "@/components/playlists/Display";
import Link from "next/link";
import Player from "@/components/Player";
import { useSession } from "next-auth/react";


export default function Dashboard() {

    const { data: session } = useSession();
    const accessToken = session?.accessToken;

    const [viewMode, setViewMode] = useState('userOwnedPlaylists');
    {/*const [isPlayerOpen, setIsPlayerOpen] = useState(false);*/}
    const [isDisplayOpen, setIsDisplayOpen] = useState(false);

    /*const handleButtonClick = () => {
        setIsPlayerOpen(true); // Open Player when button is clicked
    };*/

    const displayUserOwnedPlaylists = () => {
        setIsDisplayOpen(true);
        setViewMode('userOwnedPlaylists');
    };
    const displayFollowedPlaylists = () => {
        setIsDisplayOpen(true);
        setViewMode('followedPlaylists');
    };


    return (
        <>
            <nav>
                <UserProfile />
            </nav>

            <div className="m-12">
                <h1 className="p-0 mb-14 text-center">Welcome, {/*{session.user.sub}*/}!</h1>
                    <div /* top section */ className="mb-16 flex justify-center">
                        <div className="px-12 py-6 mb-0 mx-8 border-8 border-solid border-white rounded-lg opacity-50">
                            <h2 className="m-2 font-bold text-2xl opacity-90">Minutes of <br /> Focused Work:</h2>
                            <hr />
                            <h2 className="mx-2 mt-8 font-bold text-2xl opacity-90"><span className="text-4xl">00 </span>HR <br /> <span className="text-4xl">00</span> MIN</h2>
                        </div>
                        <div className="py-6 px-12 mx-8 border-8 border-solid border-white rounded-lg opacity-50">
                            <h2 className="m-2 font-bold text-2xl opacity-90">Most Recently <br /> Played:</h2>
                            <hr />
                            <div className="flex flex-col">
                                <h2 className="m-2 text-xl font-semibold">Title #1</h2>
                                <h2 className="m-2 text-xl font-semibold">Title #2</h2>
                                <h2 className="m-2 text-xl font-semibold">Title #3</h2>
                            </div>
                        </div>
                        <div className="mx-2 flex flex-col justify-center items-center">
                            <button className="mx-4 mb-4 h-32 w-80 font-semibold bg-green-600 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out active:bg-blue-700 focus:bg-blue-700" onClick={displayUserOwnedPlaylists}>My<br/>Playlists</button>
                            <button className="mx-4 mt-4 h-32 w-80 font-semibold bg-green-600 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out active:bg-blue-700 focus:bg-blue-700" onClick={displayFollowedPlaylists}>All<br/>Playlists</button>
                        </div>
                    </div>

                    {isDisplayOpen && (
                        <Display viewMode={viewMode} />
                    )}

                   {/* <button className="m-8 p-8 bg-green-600" onClick={handleButtonClick}>Open Player</button>
                    {isPlayerOpen && (
                        <Player accessToken={accessToken}/>
                    )}*/}
            </div>
        </>
    )
}