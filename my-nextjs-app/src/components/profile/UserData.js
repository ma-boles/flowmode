'use client'
import React, { useSession } from "react";
import Favorites from "./Favorites";
import Templates from "./Templates";
import FlowCard from "./FlowCard";
import RestCard from "./RestCard";
import { usePlaylistContext } from "@/app/contexts/PlaylistContext";
import { useTemplateContext } from "@/app/contexts/TemplatesContext";

export default function UserData() {
    const { data: session, status } = useSession();
    const accessToken = session?.accessToken;
    const { favoritesList, updateFavorites, mostRecentlyPlayed } = usePlaylistContext();
    const { templatesList, updateTemplates } = useTemplateContext();
    const [loadingCheckUser, setLoadingCheckUser] = useState(false);
    const [loadingDataUpdate, setLoadingDataUpdate] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [isOpen, setIsOpen] = useState(false);



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


    return (
        <>
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

        <div>
            <Templates templatesList={templatesList}/>
            <Favorites favoritesList={favoritesList}/>
        </div>
        <div>
            <FlowCard data={mostRecentlyPlayed}/>
            <RestCard data={mostRecentlyPlayed}/>
        </div>
        </>
    )
}