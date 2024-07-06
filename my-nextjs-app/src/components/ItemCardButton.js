import React, { useState } from "react";

export default function ItemCardButton ({ playlist, onSelectFlow, onSelectRest, onSelectPreview }) {

    const [isAdded, setIsAdded] = useState(null);

    handleFlowClick = () => {
        onSelectFlow(playlist.id, playlist.name);
        setIsAdded('flow');
    };

    handleRestClick = () => {
        onSelectRest(playlist.id, playlist.name);
        setIsAdded('rest');
    };

    handlePreviewClick = () => {
        onSelectPreview(playlist.id, playlist.name);
        setIsAdded('preview');
    };

    const isFlowAdded = playlist.id === flowPlaylistId;
    const isRestAdded = playlist.id === restPlaylistId;
    const isPreviewAdded = playlist.id === previewId;

    return(
            <div className="ellipsis--grid--div">
                <button className={`text-2xl font-bold ellipsis--grid--button`}>&#8230;</button>
                <div className="ellipsis--grid--content text-center">
                    <ul>
                        {isAdded === 'flow' && isFlowAdded ? (
                            <li className="py-1 font-semibold border-b border-solid border-gray-500 hover:bg-blue-500">Added</li>
                        ) : (
                            <li className="py-1 font-semibold border-b border-solid border-gray-500 hover:bg-blue-500" onClick={() => handleFlowClick(playlist.id, playlist.name)}>Flow</li>
                        )}

                        {isAdded === 'rest' && isRestAdded ? (
                            <li className="py-1 font-semibold border-b border-solid border-gray-500 hover:bg-blue-500">Added</li>
                        ) : (
                            <li className="py-1 font-semibold border-b border-solid border-gray-500 hover:bg-blue-500" onClick={() => handleRestClick(playlist.id, playlist.name)}>Rest</li>
                        )}
                        {isAdded === 'preview' && isPreviewAdded ? (
                            <li className="py-1 font-semibold border-b border-solid border-gray-500 hover:bg-blue-500">Added</li>
                        ) : (
                            <li className="py-1 font-semibold hover:bg-blue-500" onClick={() => handlePreviewClick(playlist.id, playlist.name)}>Preview</li>
                        )}
                    </ul>
                </div>
            </div>
    )
};