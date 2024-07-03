import React from "react";

export default function ItemCardButton ({ playlist, onSelectFlow, onSelectRest, onSelectPreview }) {

    return(
            <div className="ellipsis--grid--div">
                <button className={`text-2xl font-bold ellipsis--grid--button`}>&#8230;</button>
                <div className="ellipsis--grid--content text-center">
                    <ul>
                        <li className="py-1 font-semibold border-b border-solid border-gray-500 hover:bg-blue-500" onClick={() => onSelectFlow(playlist.id, playlist.name)}>Flow</li>
                        <li className="py-1 font-semibold border-b border-solid border-gray-500 hover:bg-blue-500" onClick={() => onSelectRest(playlist.id, playlist.name)}>Rest</li>
                        <li className="py-1 font-semibold hover:bg-blue-500" onClick={() => onSelectPreview(playlist.id, playlist.name)}>Preview</li>
                    </ul>
                </div>
            </div>
    )
};