import React, {useState} from "react";
import usePlayer from "@/app/hooks/usePlayer";
import { useSession } from "next-auth/react";

export default function PlaylistItem ({ playlist, displayStyle, cleanDescription, onSelectFlow, onSelectRest, onSelectPreview, flowPlaylistId, restPlaylistId, previewId }) {

    const [addedType, setAddedType] = useState(null);
    const { data: session } = useSession();
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
    };

    const isFlowAdded = playlist.id === flowPlaylistId;
    const isRestAdded = playlist.id === restPlaylistId;
    const isPreviewAdded = playlist.id === previewId;

    const getButtonClass = (isAdded) => {
        return isAdded ? 'bg-green-600' : 'hover:bg-blue-500'
    };

    return (
        <>
            <li key={playlist.id} className={`bg-gray-700 ${displayStyle === 'grid' ? 'playlistCard' : 'playlistCardList'}`}>

                    {displayStyle === 'grid' && (
                    <div className="ellipsis--grid--div">
                        <button className={`text-2xl font-bold ellipsis--grid--button`}>&#8230;</button>
                        <div className="ellipsis--grid--content text-center">
                            <ul>
                                <li className={`py-1 font-semibold border-b border-solid border-gray-500 ${getButtonClass(isFlowAdded || addedType === 'flow')}`}
                                onClick={isFlowAdded || addedType === 'flow' ? null : handleFlowClick}>
                                {/*onClick={handleFlowClick}*/}
                                {isFlowAdded || addedType === 'flow' ? 'Added' : 'Flow'} {isFlowAdded || addedType === 'flow' && <span className="checkmark"></span>}
                                </li>

                                <li className={`py-1 font-semibold border-b border-solid border-gray-500 ${getButtonClass(isRestAdded || addedType === 'rest')}`}
                                onClick={isRestAdded || addedType === 'rest' ? null : handleRestClick}>
                                {/*onClick={isRestAdded || addedType === 'rest' ? handleRestClick : handleRestClick}*/}
                                {isRestAdded || addedType === 'rest' ? 'Added' : 'Rest'} {isRestAdded || addedType === 'rest' && <span className="checkmark"></span>}
                                </li>

                                {/*<li className={`py-1 font-semibold ${getButtonClass(isPreviewAdded || addedType === 'preview')}`}
                                onClick={isPreviewAdded || addedType === 'preview' ? null : handlePreviewClick}>
                                {isPreviewAdded || addedType === 'preview' ? 'Added' : 'Preview'} {isPreviewAdded || addedType === 'preview' && <span className="checkmark"></span>}
                                </li>*/}

                            </ul>
                        </div>
                    </div>
                    )}

                <div className={` ${displayStyle === 'list' ? 'flex w-1/4' : 'div'}`}>
                    {playlist.images && playlist.images[0] ? (
                        <img src={playlist.images[0].url}
                        alt={`Cover of ${playlist.name}`}
                        className={`${displayStyle === 'grid' ? 'playlistImg' : 'playlistImgList' }`}
                        />
                        ) : (
                        <div className={`flex justify-center items-center ${displayStyle === 'list' ? 'fallBackImgList' : 'fallBackImg'}`}>
                            <p className="fallBackText">No Image <br />Available</p>
                        </div>
                        )}
                </div>
                <div className={`${displayStyle === 'list' ? 'm-auto w-1/4': 'div'}`}>
                    <h2 className={` ${displayStyle === 'list' ? 'text-xl text-left' : 'text-center'}`}>{cleanDescription(playlist.name)} </h2>
                </div>
                <div className={`mx-4 ${displayStyle === 'list' ? 'm-auto w-2/4' : 'div w-5/6'}`}>
                    <p className={`w-full truncate-text ${displayStyle === 'list' ? 'font-thin text-lg text-left' : 'font-thin text-center'}`}>{cleanDescription(playlist.description)}</p>
                </div>

                {displayStyle === 'list' && (
                    <div className="flex w-60">
                        <div className="cursor-pointer m-auto w-full">
                            <ul className="text-center w-100 border border-solid border-gray-500 rounded-sm ">
                                <li className={`py-1 font-semibold border-b border-solid border-gray-500 hover:bg-blue-500 ${getButtonClass(isFlowAdded || addedType === 'flow')}`}
                                onClick={isFlowAdded || addedType === 'flow' ? null : handleFlowClick}>
                                {isFlowAdded || addedType === 'flow' ? 'Added' : 'Flow'} {isFlowAdded || addedType === 'flow' && <span className="checkmark"></span>}
                                </li>
                                <li className={`py-1 font-semibold border-b border-solid border-gray-500 ${getButtonClass(isRestAdded || addedType === 'rest')}`}
                                onClick={isRestAdded || addedType === 'rest' ? null : handleRestClick}>
                                {isRestAdded || addedType === 'rest' ? 'Added' : 'Rest'} {isRestAdded || addedType === 'rest' && <span className="checkmark"></span>}
                                </li>
                                <li className={`py-1 font-semibold hover:bg-blue-500 ${getButtonClass(isPreviewAdded || addedType === 'preview')}`}
                                onClick={isPreviewAdded || addedType === 'preview' ? null : handlePreviewClick}>
                                {isPreviewAdded || addedType === 'preview' ? 'Added' : 'Preview'} {isPreviewAdded || addedType === 'preview' && <span className="checkmark"></span>}
                                </li>
                            </ul>
                        </div>
                        <button className=" ml-2 w-12 text-3xl font-bold cursor-pointer transform rotate-90">&#8230;</button>
                    </div>
                )}
            </li>
        </>
    )
}