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

    const [isPlayerOpen, setIsPlayerOpen] = useState(false);

    const handleButtonClick = () => {
        setIsPlayerOpen(true); // Open Player when button is clicked
    };

    return (
        <>
            <nav>
                <UserProfile />
            </nav>

            < div className="mx-12 ">
                    <div className="flex justify-center">
                        <button className="m-4 h-60 w-80 font-semibold bg-green-600 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out">Music</button>
                        <button className="m-4 h-60 w-80 font-semibold bg-green-600 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out">Podcasts</button>
                        <Link href="/shelf">
                            <button className="m-4 h-60 w-80 font-semibold bg-green-600 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out">Books</button>
                        </Link>
                    </div>
                    <div className="flex justify-center">
                        <button className="m-4 h-60 w-80 font-semibold bg-green-600 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out">My<br/>Playlists</button>

                        <button className="m-4 h-60 w-80 font-semibold bg-green-600 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out">Followed<br/>Playlists</button>

                        <Link href="/browse">
                            <button className="m-4 h-60 w-80 font-semibold bg-green-600 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out">Browse <br/> &rarr;</button>
                        </Link>
                    </div>
                    {/*<Display />*/}
                    <button className="m-8 p-8 bg-green-600" onClick={handleButtonClick}>Open Player</button>
                    {isPlayerOpen && (
                        <Player accessToken={accessToken}/>
                    )}
            </div>
        </>
    )
}