import React, { useEffect, useState } from "react";
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
                                <div key={index} className="flex m-2 border-b border-l border-t border-white rounded-sm justify-between opacity-90 cursor-pointer">
                                    <h2 className="m-2 text-lg font-semibold">{item.title || 'No titles added'}</h2>
                                    <button className="p-2 border-r-2 border-l-2 border-red-600 rounded-sm hover:bg-red-600" onClick={() => removeFavorite(item.title)}>
                                    -
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

        /*
         //Function to update MongoDB with favorites title
         async function handleRemoveFavoriteClick(favoritesTitle) {
            // Validate favorites title before sending request
            if(!favoritesTitle) {
                console.error('Favorites title is missing.');
                return;
            }
    
            console.log('Removing title from favorites:', favoritesTitle);
            try {
                const response = await fetch('/api/remove-favorite', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        favoritesTitle,
                    }),
                });
    
                if(!response.ok) {
                    throw new Error('Failed to remove title from favorites');
                }
    
                const result = await response.json();
                console.log('Removal successful:', result);

                // trigger a refresh of favorites titles
                setFavoritesList(prevFavorites => {
                    console.log('Previous favorites:', prevFavorites);
                    console.log('Removing title:', favoritesTitle);

                    const updatedFavorites = prevFavorites.filter(item => item.title.trim() !== favoritesTitle.trim());
                    console.log('Updated favorites:', updatedFavorites);

                    return updatedFavorites;
            });
            } catch(error) {
                console.error('Error removing title from favorites', error);
            }
        };*/




         /*//const [loading, setLoading] = useState(false);
    const [favoritesList, setFavoritesList] = useState(favorites || []);
    const { removeFavorite/*, favoritesList*//* } = usePlaylistContext();*/

            
       /*  //Function to update MongoDB with favorites title
         async function handleRemoveFavoriteClick(favoritesTitle) {
            // Validate favorites title before sending request
            if(!favoritesTitle) {
                console.error('Favorites title is missing.');
                return;
            }
    
            console.log('Removing title from favorites:', favoritesTitle);
            try {
                const response = await fetch('/api/remove-favorite', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        favoritesTitle,
                    }),
                });
    
                if(!response.ok) {
                    throw new Error('Failed to remove title from favorites');
                }
    
                const result = await response.json();
                console.log('Removal successful:', result);

                // trigger a refresh of favorites titles
                setFavoritesList(prevFavorites => {
                    console.log('Previous favorites:', prevFavorites);
                    console.log('Removing title:', favoritesTitle);

                    const updatedFavorites = prevFavorites.filter(item => item.title.trim() !== favoritesTitle.trim());
                    console.log('Updated favorites:', updatedFavorites);

                    return updatedFavorites;
            });
            } catch(error) {
                console.error('Error removing title from favorites', error);
            }
        };*/
    // Set favorite title for deletion when the button is clicked 
   /* const handleRemoveFavorite = async (favoritesTitle) => {
        console.log('Removing from favorites:', favoritesTitle);
        await removeFavorite(favoritesTitle);
        handleDataUpdate();
    };*/
       