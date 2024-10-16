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

export default function Profile() {

    const { data: session, status } = useSession();
    const accessToken = session?.accessToken;
    const { updateFavorites, favoritesList, addFavorite, removeFavorite } = usePlaylistContext();

    const [viewMode, setViewMode] = useState('userOwnedPlaylists');
    const [isDisplayOpen, setIsDisplayOpen] = useState(false);
    const [showCard, setShowCard] = useState('flow');
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [isVisible, setIsVisible] = useState(true);
    const myDisplayRef = useRef(null);
    const [favorites, setFavorites] = useState([]);
    const [mostRecentlyPlayed, setMostRecentlyPlayed] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingCheckUser, setLoadingCheckUser] = useState(false);
    const [loadingDataUpdate, setLoadingDataUpdate] = useState(false);

    if (status === "loading") {
        return  <div className="flex items-center justify-center h-screen">
                    <div className="p-6 rounded-lg loader"></div>
                </div>
    }

    // profile check
    const handleUserCheck = async () => {
        setLoadingCheckUser(true) // Starts loading spinner

        if(!session) {
            console.error('No session data available');
            setLoadingCheckUser(false); // Stops loading spinner
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

            if(response.ok) {
                const result = await response.json();
                if(result.isUser) {
                    await handleDataUpdate(); // Call data update to update UI
                    setIsVisible(false);
                } else {
                    alert('User profile not found');
                }
            } else {
                console.error('API endpoint request failed with status:', response.status)
            }
        } catch (error) {
            console.error('Error checking user:', error);
            alert('Network error. Please check your connection.');
        } finally {
            setLoadingCheckUser(false); // Stops loading spinner after API call
        }
    };

    const handleDataUpdate = async () => {
        console.log('Data update initiated...')
        setLoadingDataUpdate(true);
        try {
            await updateFavorites();
        } catch (error) {
            console.error('Error updating favorites list:', error);
        } finally {
            setLoadingDataUpdate(false);
        }
    }

    const handleAddToFavorites = (playlist) => {
        const title = playlist.name;
        if(title) {
            addFavorite(title); // Call context function to add favorite
        } else {
            console.log('Playlist does not have a valid name');
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

            <div className="justify-center mx-12">
                <div /* top section */ className="flex flex-wrap mt-12 justify-center">
                    <div /* user data div */ className="relative items-center justify-center">

                    {isVisible && (
                        <div /* update buttons */ className="absolute inset-0 flex flex-col justify-center items-center text-center bg-black bg-opacity-80 z-10">
                            <button className="mt-12 p-4 w-40 bg-green-600 font-bold border-2 border-green-600 rounded-md hover:bg-green-500 transition duration-300 ease-in-out flex justify-center items-center" onClick={handleUserCheck} disabled={loadingCheckUser}>
                                {loadingCheckUser ? (
                                    <div className="spinner"></div>
                                ) :  (
                                    'Check User'
                                )}
                            </button>
                            <p className="m-2 text-lg font-semibold">*Requires the creation of a <button className="font-bold hover:underline" onClick={() => setIsOpen(true)}>profile</button>.</p>
                        </div>
                    )}
                            <div /* buttons div */ className="flex justify-center">
                                <button className={`px-16 py-1 mb-2 w-1/2 border-r border-solid border-white  hover:bg-blue-600 ${showCard === 'flow' ? 'bg-blue-600' : 'bg-transparent'}`} onClick={handleFlowCard}>Flow</button>
                                <button className={`px-16 mb-2 w-1/2 border-l border-solid border-white hover:bg-blue-600 ${showCard === 'rest' ? 'bg-blue-600' : 'bg-transparent'}`} onClick={handleRestCard}>Rest</button>
                                <button className="ml-2 mb-2 px-2 border border-gray-600 rounded-sm hover:bg-gray-600 update" onClick={handleDataUpdate} disabled={loadingDataUpdate}>
                                    {loadingDataUpdate ? (
                                        <div className="spinner "></div>
                                    ) : (
                                        <div className="border-4 border-white/80 rounded-full w-5 h-5"></div>
                                    )}
                                </button>
                                <span className="bg-white text-black update-tooltip">
                                    Refresh
                                </span>
                            </div>
                            {showCard === 'flow' &&
                                <FlowCard favoritesList={favoritesList} data={mostRecentlyPlayed}/>
                            }
                            {showCard === 'rest' &&
                                <RestCard favoritesList={favoritesList} data={mostRecentlyPlayed}/>
                            }
                        </div>
                        <div className="mx-2 flex flex-col justify-center items-center">
                            <button className="mx-4 mb-4 h-40 w-80 font-semibold bg-blue-700 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out border-2 border-transparent focus:border-white" onClick={displayUserOwnedPlaylists}>My<br/>Playlists</button>
                            <button className="mx-4 mt-4 h-40 w-80 font-semibold bg-blue-700 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out border-2 border-transparent focus:border-white" onClick={displayFollowedPlaylists}>All<br/>Playlists</button>
                        </div>
                </div>

                {isDisplayOpen && (
                    <PlaylistProvider>
                        <div ref={myDisplayRef} style={{ marginTop: '50px' }}>
                            <Display
                            viewMode={viewMode}
                            isDisplayOpen={isDisplayOpen}
                            setIsDisplayOpen={setIsDisplayOpen}
                            handleAddToFavorites={handleAddToFavorites}
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
