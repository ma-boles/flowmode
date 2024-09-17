'use client'
import React, { useState, useRef } from "react";
import NavBar from "@/components/nav/NavBar";
import Display from "@/components/playlists/Display";
import Player from "@/components/player/Player";
import { useSession } from "next-auth/react";
import { PlaylistProvider, usePlaylistContext } from "../contexts/PlaylistContext";
import FlowCard from "@/components/profile/FlowCard";
import RestCard from "@/components/profile/RestCard";
import Account from "@/components/modals/AccountModal";
import Favorites from "@/components/profile/Favorites";

export default function Profile() {

    const { data: session, status } = useSession();
    const accessToken = session?.accessToken;
    //const { onSelectFlow, onSelectRest, onSelectPreview } = usePlaylistContext();

    const [viewMode, setViewMode] = useState('userOwnedPlaylists');
    const [isDisplayOpen, setIsDisplayOpen] = useState(false);
    const [showCard, setShowCard] = useState('flow');
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [isVisible, setIsVisible] = useState(true);
    const myDisplayRef = useRef(null);

    if (status === "loading") {
        return  <div className="flex items-center justify-center h-screen">
                    <div className="p-6 rounded-lg loader"></div>
                </div>
    }

    // profile check
    const handleUserCheck = async () => {
        if(!session) {
            console.error('No session data available');
            return;
        }

        const { user } = session;

        try {
            const response = await fetch('/api/check-user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    spotifyId: user.id,
                    email: user.email,
                }),
            });

            const result = await response.json();

            if(result.isUser) {
                setIsVisible(false);
            } else {
                alert('User profile not found');
            }
        } catch (error) {
            console.error('Error checking user:', error);
        }
    };

    // times data
    const handleFlowCard = () => {
        setShowCard('flow')
    };

    const handleRestCard = () => {
        setShowCard('rest')
    };

    // playlist display
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
                <NavBar />
            </nav>

            <div className="mx-12 mb-8 mt-16">
               {/* {!session ? (
                        <h2 className="text-center">Loading...</h2>
                ): (
                    <h1 className="pb-12 pt-0 text-5xl text-center">Welcome {session.user.name}!</h1>

                )}*/}

                <div /* top section */ className="mb-16 mt-8 flex justify-center">

                    <div /* minute totals div */ className="relative items-center justify-center">

                    {isVisible && (
                        <div /* update buttons */ className="absolute inset-0 text-center bg-black bg-opacity-80 z-10">
                            <button className="mt-28 p-4 bg-green-600 font-bold border-2 border-green-600 rounded-md hover:bg-green-500 transition duration-300 ease-in-out" onClick={handleUserCheck}>Update Totals</button>
                            <p className="m-2 text-lg font-semibold">*Requires the creation of a <button className="font-bold hover:underline" onClick={() => setIsOpen(true)}>profile</button>.</p>
                        </div>
                    )}

                            <div /* buttons div */ className="flex justify-center">
                                <button className={`px-16 py-1 mb-2 w-1/2 border-r border-solid border-white  hover:bg-blue-600 ${showCard === 'flow' ? 'bg-blue-600' : 'bg-transparent'}`} onClick={handleFlowCard}>Flow</button>
                                <button className={`px-16 mb-2 w-1/2 border-l border-solid border-white hover:bg-blue-600 ${showCard === 'rest' ? 'bg-blue-600' : 'bg-transparent'}`} onClick={handleRestCard}>Rest</button>
                            </div>

                            {showCard === 'flow' &&
                                <FlowCard />
                            }
                            {showCard === 'rest' &&
                                <RestCard />
                            }

                        </div>

                        <div className="mx-2 flex flex-col justify-center items-center">
                            <button className="mx-4 mb-4 h-32 w-80 font-semibold bg-blue-700 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out border-2 border-transparent focus:border-white" onClick={displayUserOwnedPlaylists}>My<br/>Playlists</button>
                            <button className="mx-4 mt-4 h-32 w-80 font-semibold bg-blue-700 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out border-2 border-transparent focus:border-white" onClick={displayFollowedPlaylists}>All<br/>Playlists</button>
                        </div>
                </div>

                {isDisplayOpen && (
                    <PlaylistProvider>
                        <div ref={myDisplayRef} style={{ marginTop: '50px' }}>
                            <Display
                            viewMode={viewMode}
                            isDisplayOpen={isDisplayOpen}
                            setIsDisplayOpen={setIsDisplayOpen}
                            />
                        </div>
                    </PlaylistProvider>
                    )}
            </div>

            {/* Account modal */}
            <div className="centered">
                {isOpen && <Account setIsOpen={setIsOpen} />}
            </div>

            <Player accessToken={accessToken}/>
        </>
    )
}