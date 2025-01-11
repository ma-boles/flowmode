import React from "react";
import { usePlaylistContext } from "@/app/contexts/PlaylistContext";

export default function Favorites() {
    const { favoritesList, removeFavorite } = usePlaylistContext();

    const handleRemoveFavorite = () => {
        removeFavorite(item.favoritesId)
    };

    //console.log(favoritesList);

           return (
            <>
               <div className="p-2 mx-1 mt-2 text-center rounded-2xl bg-black bg-opacity-40 card-border">
                <h1 className="p-2 text-2xl font-semibold text-left">Favorites</h1>
                   <div className="flex">
                        <div className="w-full pb-2 p-1">
                            {favoritesList && favoritesList.length > 0 ? (
                                favoritesList.map((item, index) => (
                                <div key={index} className="flex mb-1 border border-white rounded-sm justify-between opacity-90 cursor-pointer">
                                    <h2 className="m-2 text-lg font-semibold">{item.title || 'No titles added'}</h2>
                                    <button className="my-auto mr-2 w-6 h-6 bg-red-600 rounded-md hover:bg-green-600" onClick={handleRemoveFavorite}>
                                        <img src="result.svg" className="m-auto w-6 h-6 invert"></img>
                                    </button>
                                </div>
                                    ))
                                ) : (
                                    <p className="text-left">No Titles Added</p>
                                )}
                        </div>
                   </div>
               </div>
               </>
           );
        }