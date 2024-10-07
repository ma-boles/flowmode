import React, { useState } from "react";
import { playSong } from "@/app/lib/playerApi";
import { useSession } from "next-auth/react";
import usePlayer from "@/app/hooks/usePlayer";
import { usePlaylistContext } from "@/app/contexts/PlaylistContext";

export default function ItemCardButton ({ playlist, onSelectFlow, onSelectRest, onSelectPreview, flowPlaylistId, restPlaylistId, previewId, flowPlaylistName, restPlaylistName, title, handleAddToFavorites }) {
    const { addFavorite, favoritesList } = usePlaylistContext();
    const [newFavorite, setNewFavorite] = useState('');
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
    //console.log('add function:', addFavorite)

    const handleFavorites = () => {
        console.log(`Button clicked to add favorite: ${title}`);
        handleAddToFavorites(playlist); // Add the title to favorites
       // handleFavoritesClick(playlist.name);

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

                        <button className={`py-1 font-semibold active:bg-red-500 focus:bg-red-500 hover:bg-gray-500`} onClick={handleFavorites}>
                            <img src="heart-regular (1).svg" className="m-auto mb-1 w-5 h-5 invert"></img>
                        </button>
                </div>
            </div>
    )
};