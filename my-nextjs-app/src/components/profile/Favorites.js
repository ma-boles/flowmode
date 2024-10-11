import React from "react";
import { usePlaylistContext } from "@/app/contexts/PlaylistContext";

export default function Favorites() {
    const { favoritesList, removeFavorite } = usePlaylistContext();

    //console.log(favoritesList);
   
           return (
               <div className="w-80 text-center p-2 bg-black bg-opacity-20">
                   <h2 className="my-2 text-xl font-bold">Favorites</h2>
                   <div className="flex">
                        <div className="w-full py-1 px-1">
                            {favoritesList && favoritesList.length > 0 ? (
                                favoritesList.map((item, index) => (
                                <div key={index} className="flex m-2 border border-white rounded-sm justify-between opacity-90 cursor-pointer">
                                    <h2 className="m-2 text-lg font-semibold">{item.title || 'No titles added'}</h2>
                                    <button className="my-auto mr-2 w-6 h-6 bg-red-600 rounded-md hover:bg-green-600" onClick={() => removeFavorite(item.title)}>
                                        <img src="result.svg" className="m-auto w-6 h-6 invert"></img>
                                    </button>
                                </div>
                                    ))
                                ) : (
                                    <p>No Titles Added</p>
                                )}
                        </div>
                   </div>
               </div>
           );
        }