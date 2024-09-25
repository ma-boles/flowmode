import React, { useSession, useState } from "react";

export default function ProfilePlaylistCard({ playlist, onSelectFlow, onSelectRest, flowPlaylistId, restPlaylistId }) {

    /*const [addedType, setAddedType] = useState(null);
    const { data: session } = useSession;
    const accessToken = session.accessToken;

    const handleFlowClick = () => {
        if (playlist.id === flowPlaylistId) {
            setAddedType(null);
        } else {
            onSelectFlow(playlist.id, playlist.name);
            setAddedType('flow');
        }
    };

    const handleRestClick = () => {
        if (playlist.id === restPlaylistId) {
            setAddedType(null);
        } else {
            onSelectRest(playlist.id, playlist.name);
            setAddedType('rest');
        }
    };*/

     //Function to update MongoDB with favorites title
     async function handleRemoveFavoriteClick(favoritesTitle) {
        // Validate favorites title before sending request
        if(!favoritesTitle) {
            console.error('Favorites title is missing.');
            return;
        }

        console.log('Removing title from favorites:', favoritesTitle);
        try {
            const response = await fetch('/api/remove-favorite', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    favoritesTitle,
                }),
            });

            if(!response.ok) {
                throw new Error('Failed to remove title from favorites');
            }

            const result = await response.json();
            console.log('Removal successful:', result);
        } catch(error) {
            console.error('Error removing title from favorites', error);
        }
    };

    // Set favorite title for deletion when the button is clicked 
    const handleRemoveFavorite = () => {
        console.log('Removing from favorites:', playlist.id, playlist.name);
        handleRemoveFavoriteClick(playlist.name);
    };


    return (
        <>
            <div className="flex w-60">
                <div className="m-auto w-full">
                    <ul className="mx-2 w-100">
                        <li className="flex py-1 px-2 m-2 border border-white justify-between">
                            <span>Title 1</span>
                            <button className="px-1 bg-red-600 border border-white " onClick={handleRemoveFavorite}>
                                -
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}