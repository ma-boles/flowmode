import React, { useState } from "react";
import { playSong } from "@/app/lib/playerApi";
import { useSession } from "next-auth/react";

export default function ItemCardButton ({ playlist, onSelectFlow, onSelectRest, onSelectPreview, flowPlaylistId, restPlaylistId, previewId }) {

    const { accessToken } = useSession();
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

    const handlePreviewClick = async(uri) => {
        console.log('Access token:', accessToken);
        onSelectPreview(playlist.id, playlist.name);
        console.log('Previewing:', playlist.name, playlist.uri);
        setAddedType('preview');
        await playSong(playlist.uri, accessToken);
    };

    const isFlowAdded = playlist.id === flowPlaylistId;
    const isRestAdded = playlist.id === restPlaylistId;
    const isPreviewAdded = playlist.id === previewId;

    const getButtonClass = (isAdded) => {
        return isAdded ? 'bg-green-600' : 'hover:bg-blue-500'
    };

    return(
            <div className="ellipsis--grid--div">
                <button className={`text-2xl font-bold ellipsis--grid--button`}>&#8230;</button>
                <div className="ellipsis--grid--content text-center">
                    <ul>
                        <li className={`py-1 font-semibold border-b border-solid border-gray-500 ${getButtonClass(isFlowAdded || addedType === 'flow')} `}
                            onClick={isFlowAdded || addedType === 'flow' ? null : handleFlowClick}>
                            {/*onClick={isFlowAdded || addedType === 'flow' ? handleFlowClick : handleFlowClick}>*/}
                            {isFlowAdded || addedType === 'flow' ? 'Added' : 'Flow'} {isFlowAdded || addedType === 'flow' && <span className="checkmark"></span>}
                            </li>

                        <li className={`py-1 font-semibold border-b border-solid border-gray-500 ${getButtonClass(isRestAdded || addedType === 'rest')} `}
                            onClick={isRestAdded || addedType === 'rest' ? null : handleRestClick}>
                            {/*onClick={isRestAdded || addedType === 'rest' ? handleRestClick : handleRestClick}>*/}
                            {isRestAdded || addedType === 'rest' ? 'Added' : 'Rest'} {isRestAdded || addedType === 'rest' && <span className="checkmark"></span>}
                            </li>

                        <li className={`py-1 font-semibold ${getButtonClass(isPreviewAdded || addedType === 'preview')} `}
                            onClick={() => {handlePreviewClick(playlist.uri)}}>
                             {isPreviewAdded || addedType === 'preview' && <span className="button play"></span>}
                            </li>
                    </ul>
                </div>
            </div>
    )
};

// onClick={isPreviewAdded || addedType === 'preview' ? null : handlePreviewClick}>
/*{isPreviewAdded || addedType === 'preview' ? 'Pause' : 'Play' }*/