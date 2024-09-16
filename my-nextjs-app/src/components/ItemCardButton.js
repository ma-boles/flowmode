import React, { useState } from "react";
import { playSong } from "@/app/lib/playerApi";
import { useSession } from "next-auth/react";
import usePlayer from "@/app/hooks/usePlayer";
import { PlaylistContext } from "@/app/contexts/PlaylistContext";

export default function ItemCardButton ({ playlist, onSelectFlow, onSelectRest, onSelectPreview, flowPlaylistId, restPlaylistId, previewId, flowPlaylistName, restPlaylistName }) {
    const { data: session } = useSession();
    const accessToken = session.accessToken;

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

    const isFlowAdded = playlist.id === flowPlaylistId && playlist.name === flowPlaylistName;
    const isRestAdded = playlist.id === restPlaylistId && playlist.name === restPlaylistName;
    const isPreviewAdded = playlist.id === previewId;


    return(
            <div className="ellipsis--grid--div">
                <button className={`text-2xl font-bold ellipsis--grid--button`}>&#8230;</button>
                <div className="flex flex-col ellipsis--grid--content">
                        <button className={`py-1 font-semibold border-b border-solid border-gray-500 active:bg-green-500 focus:bg-green-500 transition duration-150 ease-in-out `}
                            onClick={isFlowAdded || addedType === 'flow' ? null : handleFlowClick}>
                            Flow
                        </button>

                        <button className={`py-1 font-semibold border-b border-solid border-gray-500  active:bg-blue-600 focus:bg-blue-600 transition duration-150 ease-in-out `}
                            onClick={isRestAdded || addedType === 'rest' ? null : handleRestClick}>
                            Rest
                        </button>
                </div>
            </div>
    )
};