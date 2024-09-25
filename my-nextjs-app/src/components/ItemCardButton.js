import React, { useState } from "react";
import { playSong } from "@/app/lib/playerApi";
import { useSession } from "next-auth/react";
import usePlayer from "@/app/hooks/usePlayer";
import { PlaylistContext, usePlaylistContext } from "@/app/contexts/PlaylistContext";

export default function ItemCardButton ({ playlist, onSelectFlow, onSelectRest, onSelectPreview, flowPlaylistId, restPlaylistId, previewId, flowPlaylistName, restPlaylistName }) {
    const { data: session } = useSession();
    const accessToken = session.accessToken;
    const { handleFavorite } = usePlaylistContext();
    const [addedType, setAddedType] = useState(null);

    const handleFlowClick = () => {
        if (playlist.id === flowPlaylistId) {
            setAddedType(null);
        } else {
            onSelectFlow(playlist.id, playlist.name);
            setAddedType('flow');
        }
        // add code to unselect on second click
    };

    const handleRestClick = () => {
        if (playlist.id === restPlaylistId) {
            setAddedType(null);
        } else {
            onSelectRest(playlist.id, playlist.name);
            setAddedType('rest');
        }
        // add code to unselect on second click
    };


     //Function to update MongoDB with favorites title
     async function handleFavoritesClick(favoritesTitle) {

        // Validate favorites title before sending request
        if(!favoritesTitle) {
            console.error('Favorites title is missing.');
            return;
        }

        console.log('Sending favorites title from button click:', favoritesTitle);
        try {
            const response = await fetch('/api/add-favorite', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    favoritesTitle,
                }),
            });

            if(!response.ok) {
                throw new Error('Failed to update recently played info');
            }

            const result = await response.json();
            console.log('Update successful:', result);
        } catch(error) {
            console.error('Error adding favorites title', error);
        }
    };

    // Set favorite title when the button is clicked 
    const handleAddToFavorites = () => {
        console.log( 'Adding to favorites:', playlist.id, playlist.name);
        //handleFavorite(playlist.id, playlist.name);
        handleFavoritesClick(playlist.name);
    };


    const isFlowAdded = playlist.id === flowPlaylistId && playlist.name === flowPlaylistName;
    const isRestAdded = playlist.id === restPlaylistId && playlist.name === restPlaylistName;
    const isPreviewAdded = playlist.id === previewId;


    return(
            <div className="ellipsis--grid--div">
                <button className={`text-2xl font-bold ellipsis--grid--button`}>&#8230;</button>
                <div className="flex flex-col ellipsis--grid--content">
                        <button className={`py-1 font-semibold border-b border-solid border-gray-500 active:bg-green-500 focus:bg-green-500 hover:bg-gray-500`}
                            onClick={isFlowAdded || addedType === 'flow' ? null : handleFlowClick}>
                            Flow
                        </button>

                        <button className={`py-1 font-semibold border-b border-solid border-gray-500  active:bg-blue-600 focus:bg-blue-600 hover:bg-gray-500`}
                            onClick={isRestAdded || addedType === 'rest' ? null : handleRestClick}>
                            Rest
                        </button>

                        <button className={`py-1 font-semibold active:bg-red-500 focus:bg-red-500 hover:bg-gray-500`} onClick={handleAddToFavorites}>
                            <img src="heart-regular (1).svg" className="m-auto mb-1 w-5 h-5 invert"></img>
                        </button>
                </div>
            </div>
    )
};