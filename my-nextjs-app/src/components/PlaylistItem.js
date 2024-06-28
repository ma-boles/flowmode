import React from "react";
import { usePlaylistContext  } from "@/app/contexts/PlaylistContext";

export default function PlaylistItem ({ playlist, displayStyle, cleanDescription }) {
    const { onSelectFlow, onSelectRest, onSelectPreview } = usePlaylistContext();

    return (
        <>
            <li key={playlist.id} className={`bg-gray-700 ${displayStyle === 'grid' ? 'playlistCard' : 'playlistCardList'}`}>
                <div className={`${displayStyle === 'list' ? 'w-1/4' : 'div'}`}>
                <button className={`absolute ${displayStyle === 'grid' ? 'top-0 right-0 mt-2 mr-2' : 'left-9 mt-2 ml-2'} ellipsisButton`}>
                    <span>&#8230;</span>
                    <div className="ellipsis-content">
                        <ul>
                            <li onClick={() => onSelectFlow(playlist.id)}>Flow</li>
                            <li onClick={() => onSelectRest(playlist.id)}>Rest</li>
                            <li onClick={() => console.log('Preview')}>Preview</li>
                        </ul>
                    </div>
                </button>
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
            </li>
        </>
    )
}