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
import { useTemplateContext } from "../contexts/TemplatesContext";
import Favorites from "@/components/profile/Favorites";
import Templates from "@/components/profile/Templates";
import UserData from "@/components/profile/UserData";

export default function Profile() {

    const { data: session, status } = useSession();
    const accessToken = session?.accessToken;
    const { updateFavorites, favoritesList, addFavorite, removeFavorite } = usePlaylistContext();
    const { templatesList, updateTemplates } = useTemplateContext();

    const [viewMode, setViewMode] = useState('userOwnedPlaylists');
    const [isDisplayOpen, setIsDisplayOpen] = useState(false);
    const [showCard, setShowCard] = useState('templates');
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
            await updateTemplates();
        } catch (error) {
            console.error('Error updating favorites/templates list:', error);
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
    const handleTemplatesCard = () => {
        setShowCard('templates')
    };

    const handleFavoritesCard = () => {
        setShowCard('favorites')
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
            {/* mx-12 */}
            <div className="justify-center ml-48 mb-48">
                <h1 className="m-4 font-bold text-4xl">Profile</h1>
                <div className="flex justify-center items-center p-4 bg-black bg-opacity-30 rounded-2xl">
                    <button className="mx-4 w-1/4 h-24 font-semibold bg-blue-700 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out border-2 border-transparent focus:border-white" onClick={displayUserOwnedPlaylists}>My<br/>Playlists</button>
                    <button className="w-1/4 h-24 font-semibold bg-blue-700 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out border-2 border-transparent focus:border-white" onClick={displayFollowedPlaylists}>All<br/>Playlists</button>
                    <button className="mx-4 w-1/4 h-24 font-semibold bg-blue-700 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out border-2 border-transparent focus:border-white" >Stats</button>
                </div>
                {/* mt-12 */}
                <div /* top section */ className="flex flex-wrap justify-center">

                    <div /* user data div */ className="flex relative items-center justify-center">

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

                            <div className="flex mt-8">
                                <Templates templatesList={templatesList}/>
                                <Favorites favoritesList={favoritesList}/>
                            </div>
                            <div>
                                <div className="flex justify-between">
                                    <h2 className="p-2 font-semibold text-xl">Recently Played</h2>
                                    <div /* buttons div */ className="my-auto">
                                    <button className="ml-2 mb-2 px-2 border border-gray-600 rounded-sm hover:bg-gray-600 update" onClick={handleDataUpdate} disabled={loadingDataUpdate}>
                                        {loadingDataUpdate ? (
                                            <div className="spinner"></div>
                                        ) : (
                                            <div className="border-4 border-white/80 rounded-full w-5 h-5"></div>
                                        )}
                                    </button>
                                    <span className="bg-white text-black update-tooltip">
                                        Refresh
                                    </span>
                                    </div>
                                </div>
                                <FlowCard data={mostRecentlyPlayed} />
                                <RestCard data={mostRecentlyPlayed}/>
                            </div>

                           {/* <div className="flex">
                                <div>
                                    {showCard === 'templates' &&
                                        <Templates templatesList={templatesList} />
                                    }
                                    {showCard === 'favorites' &&
                                        <Favorites favoritesList={favoritesList} />
                                    }
                                </div>
                                <div className="ml-4">
                                    <h2 className="text-xl font-semibold text-center">Recently Played</h2>
                                    <FlowCard data={mostRecentlyPlayed}/>
                                    <RestCard data={mostRecentlyPlayed}/>
                                </div>
                            </div>*/}
                        </div>
                        {/*<UserData />*/}
                        
                       {/* <div className="mx-2 flex flex-col justify-center items-center">
                            <button className="mx-2 mb-4 w-80 h-1/2 font-semibold bg-blue-700 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out border-2 border-transparent focus:border-white" onClick={displayUserOwnedPlaylists}>My<br/>Playlists</button>
                            <button className="mx-2 w-80 h-1/2 font-semibold bg-blue-700 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out border-2 border-transparent focus:border-white" onClick={displayFollowedPlaylists}>All<br/>Playlists</button>
                            <button className="mx-2 mt-4 w-80 h-1/2 font-semibold bg-blue-700 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out border-2 border-transparent focus:border-white" >Stats</button>
                        </div>*/}
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
