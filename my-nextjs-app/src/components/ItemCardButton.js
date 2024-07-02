import React from "react";
import { usePlaylistContext } from "@/app/contexts/PlaylistContext";

export default function ItemCardButton ({ category, playlist, onSelectFlow, onSelectPreview, onSelectRest }) {
    const { onSelectFlow, onSelectRest, onSelectPreview } = usePlaylistContext();

    return(
            <div className="ellipsis--grid--div">
                <button className={`text-2xl font-bold ellipsis--grid--button`}>&#8230;</button>
                <div className="ellipsis--grid--content text-center">
                    <ul>
                        {(category === 'playlist' || 'episode' || 'audiobook') && (
                            <>
                                <li className="py-1 font-semibold border-b border-solid border-gray-500 hover:bg-blue-500" onClick={() => onSelectFlow(playlist.id)}>Flow</li>
                                <li className="py-1 font-semibold border-b border-solid border-gray-500 hover:bg-blue-500" onClick={() => onSelectRest(playlist.id)}>Rest</li>
                            </>
                         )}
                        {(category === 'song' || 'album' || 'audiobook' || 'episode') && (
                            <li className="py-1 font-semibold hover:bg-blue-500" onClick={() => onSelectPreview(playlist.id)}>Preview</li>
                        )}
                    </ul>
                </div>
            </div>
    )
};