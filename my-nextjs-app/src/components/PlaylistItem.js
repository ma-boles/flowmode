import React from "react";
import { usePlaylistContext  } from "@/app/contexts/PlaylistContext";

export default function PlaylistItem ({ playlist, displayStyle, cleanDescription }) {
    const { onSelectFlow, onSelectRest, onSelectPreview } = usePlaylistContext();

    return (
        <>
            <li key={playlist.id} className={`bg-gray-700 ${displayStyle === 'grid' ? 'playlistCard' : 'playlistCardList'}`}>
            <button className={`text-2xl font-bold ${displayStyle === 'grid' ? 'pb-2' : 'hidden'} ellipsisButton`}>&#8230;</button>
                <div className={`${displayStyle === 'list' ? 'flex w-1/4' : 'div'}`}>
                
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
                
                   <div className={`hidden absolute ellipsis--content ${displayStyle === 'list' ? 'm-auto w-1/6' : 'div w-5/6'}`}>
                        <ul className="text-center border border-solid border-gray-500 rounded-sm ">
                            <li className="py-1 border-b border-solid border-gray-500 hover:bg-gray-500" onClick={() => onSelectFlow(playlist.id)}>Flow</li>
                            <li className="py-1 border-b border-solid border-gray-500 hover:bg-gray-500" onClick={() => onSelectRest(playlist.id)}>Rest</li>
                            <li className=" py-1 hover:bg-gray-500" onClick={() => console.log('Preview')}>Preview</li>
                        </ul>
                    </div>
                    <button className={`text-3xl font-bold ${displayStyle === 'list' ? 'transform rotate-90 ml-2': 'hidden'} ellipsisButtonList`}>&#8230;</button>
            </li>
        </>
    )
}
/*top-0 right-0 mt-2 mr-2*/