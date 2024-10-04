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
    const { updateFavorites, favoritesList, addFavorite, removeFavorite } = usePlaylistContext();
    //const { onSelectFlow, onSelectRest, onSelectPreview } = usePlaylistContext();

    const [viewMode, setViewMode] = useState('userOwnedPlaylists');
    const [isDisplayOpen, setIsDisplayOpen] = useState(false);
    const [showCard, setShowCard] = useState('flow');
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [isVisible, setIsVisible] = useState(true);
    const myDisplayRef = useRef(null);
    //const [data, setData] = useState([]);
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
        addFavorite(title);
    };
/*
    // Handle user updates

    const handleDataUpdate = async () => {
        setLoadingDataUpdate(true);

        try {
            // Make the API call to fetch data from the backend
            const response = await fetch('/api/display-data');
            const result = await response.json();

            // If successful, update the state with the new data
            if(response.ok) {
                setMostRecentlyPlayed(result.mostRecentlyPlayed || []);
                setFavorites(result.favorites || []);
            } else {
                console.error('Error fetching data:', result.error );
            }
        } catch(error) {
            console.error('Failed to fetch data:', error);
        } finally {
            setLoadingDataUpdate(false);
        }
    };
*/
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
                                <button className="ml-2 mb-2 px-2 border border-gray-600 rounded-sm hover:bg-gray-600" onClick={handleDataUpdate} disabled={loadingDataUpdate}>
                                   {/* {loadingDataUpdate ? 'Loading...' : '#'} */}
                                   {loadingDataUpdate ? (
                                    <div className="spinner"></div>
                                   ): (
                                    <div className="refresh"></div>
                                   )}
                                </button>
                            </div>

                            {showCard === 'flow' &&
                                <FlowCard favorites={favorites} data={mostRecentlyPlayed}/>
                            }
                            {showCard === 'rest' &&
                                <RestCard favorites={favorites} data={mostRecentlyPlayed}/>
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
