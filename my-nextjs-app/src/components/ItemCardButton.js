import React, { useState } from "react";
import { playSong } from "@/app/lib/playerApi";
import { playMedia } from "@/app/lib/playerApi";
import { useSession } from "next-auth/react";
import usePlayer from "@/app/hooks/usePlayer";
import { fetchDevices } from "@/app/providers/PlayerProvider";
export default function ItemCardButton ({ playlist, onSelectFlow, onSelectRest, onSelectPreview, flowPlaylistId, restPlaylistId, previewId }) {
    const { data: session } = useSession();
    const accessToken = session.accessToken;
    const [addedType, setAddedType] = useState(null);

    //const { fetchDevices } = usePlayer();

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

    const handlePreviewClick = () => {
        if(playlist.id === previewId) {
            setAddedType(null);
        } else {
            onSelectPreview(playlist.id, playlist.name);
            setAddedType('preview');
        }
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
                            <span className="button play"></span>
                            </li>
                    </ul>
                </div>
            </div>
    )
};

// onClick={isPreviewAdded || addedType === 'preview' ? null : handlePreviewClick}>
/*{isPreviewAdded || addedType === 'preview' ? 'Pause' : 'Play' }*/



 /*const handlePreviewClick = async(playlist, accessToken) => {
        //const mediaType = validMediaTypes.includes(item.type) ? item.type : 'playlist';
        console.log('Previewing:', playlist.type, playlist.name, playlist.uri);

        try {
            if(!playlist || !playlist.id || !playlist.type) {
                console.error('Invalid playlist data:', playlist);
                return;
            }

            await fetchDevices(accessToken);

            const validMediaTypes = ['track', 'album', 'playlist', 'podcast', 'audiobook'];
            const mediaType = validMediaTypes.includes(playlist) ? playlist.type : 'playlist';

            onSelectPreview(playlist.id, playlist.name);
            setAddedType('preview');

            await playMedia(mediaType, playlist.id, accessToken)

        } catch (error) {
            console.error('Error in handlePreviewClick:', error)
        }
        //console.log('Access token:', accessToken);
        //await playSong(playlist.uri, accessToken);
    };*/