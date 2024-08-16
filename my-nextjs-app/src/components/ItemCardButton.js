import React, { useState } from "react";
import { playSong } from "@/app/lib/playerApi";
import { useSession } from "next-auth/react";
import usePlayer from "@/app/hooks/usePlayer";
import { PlaylistContext } from "@/app/contexts/PlaylistContext";

export default function ItemCardButton ({ playlist, onSelectFlow, onSelectRest, onSelectPreview, flowPlaylistId, restPlaylistId, previewId, flowPlaylistName, restPlaylistName }) {
    const { data: session } = useSession();
    const accessToken = session.accessToken;

    const [addedType, setAddedType] = useState(null);

    /*const handleFlowClick = () => {
        if (isFlowAdded) {
          // Unselect flow playlist if it's already selected
          onSelectFlow(null, null);
        } else {
          onSelectFlow(playlist.id, playlist.name);
        }
      };*/

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

    const getButtonClass = (isAdded) => {
        return isAdded ? 'bg-green-500' : 'hover:border border-white'
    };

    return(
            <div className="ellipsis--grid--div">
                <button className={`text-2xl font-bold ellipsis--grid--button`}>&#8230;</button>
                <div className="ellipsis--grid--content text-center">
                    <ul>
                        <li className={`py-1 font-semibold border-b border-solid border-gray-500 ${getButtonClass(isFlowAdded || addedType === 'flow' )} `}
                            onClick={isFlowAdded || addedType === 'flow' ? null : handleFlowClick}>
                            {isFlowAdded || addedType === 'flow' ? 'Added' : 'Flow'} {/*isFlowAdded || addedType === 'flow' && <span className="checkmark"></span>*/}
                        </li>

                        <li className={`py-1 font-semibold border-b border-solid border-gray-500 ${getButtonClass(isRestAdded || addedType === 'rest')} `}
                            onClick={isRestAdded || addedType === 'rest' ? null : handleRestClick}>
                            {isRestAdded || addedType === 'rest' ? 'Added' : 'Rest'} {/*isRestAdded || addedType === 'rest' && <span className="checkmark"></span>*/}
                        </li>
                    </ul>
                </div>
            </div>
    )
};