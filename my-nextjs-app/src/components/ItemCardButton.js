import React, { useState } from "react";

export default function ItemCardButton ({ playlist, onSelectFlow, onSelectRest, onSelectPreview, flowPlaylistId, restPlaylistId, previewId }) {

    const [addedType, setAddedType] = useState(null);

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

    const handlePreviewClick = () => {
        onSelectPreview(playlist.id, playlist.name);
        setAddedType('preview');
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
                            onClick={isPreviewAdded || addedType === 'preview' ? null : handlePreviewClick}>
                            {isPreviewAdded || addedType === 'preview' ? 'Added' : 'Preview'} {isPreviewAdded || addedType === 'preview' && <span className="checkmark"></span>}
                            </li>

                    </ul>
                </div>
            </div>
    )
};
/*
    <li className="py-1 font-semibold border-b border-solid border-gray-500 hover:bg-blue-500" onClick={() => handleFlowClick(playlist.id, playlist.name)}>Rest</li>

                        {isAdded === 'rest' && isRestAdded ? (
                            <li className="py-1 font-semibold border-b border-solid border-gray-500 hover:bg-blue-500">Added <span className="checkmark"></span></li>
                        ) : (
                            <li className="py-1 font-semibold border-b border-solid border-gray-500 hover:bg-blue-500" onClick={() => handleRestClick(playlist.id, playlist.name)}>Rest</li>
                        )}
                        <li className="py-1 font-semibold hover:bg-blue-500" 
                        onClick={() => handlePreviewClick(playlist.id, playlist.name)}>Preview</li>
                        
*/