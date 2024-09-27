import React, { useState } from "react";

export default function Favorites({ favorites }) {

    const [loading, setLoading] = useState(false);
    const [favoritesList, setFavoritesList] = useState(favorites);

    // Function to update favorites
    /*const handleFavoriteUpdate = async () => {
        setLoading(true);
        try {
            // Make the API call to fetch only the favorites data
            const response = await fetch('/api/display-data');
            const result = await response.json();

            // If successful, update only the favorites state
            if(response.ok) {
                setFavoritesUpdate([...result.favorites]);
            } else {
                console.error('Error fetching data:', result.error);
            }
        } catch(error) {
            console.error('Failes to fetch data:', error);
        } finally {
            setLoading(false);
        }
};*/
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
                //await handleFavoriteUpdate();
                setFavoritesList(prevFavorites => 
                    prevFavorites.filter(title => title !== favoritesTitle)
                );
            } catch(error) {
                console.error('Error removing title from favorites', error);
            }
        };
            // Set favorite title for deletion when the button is clicked 
            const handleRemoveFavorite = (favoritesTitle) => {
            console.log('Removing from favorites:', favoritesTitle);
            handleRemoveFavoriteClick(favoritesTitle);

        };
       
           return (
               <div className="w-80 text-center p-2 bg-black bg-opacity-20">
                   <h2 className="my-2 text-xl font-bold">Favorites</h2>
                   <div className="flex">
                        <div className="w-full py-1 px-1">
                            {favorites.length > 0 ? (
                                favorites.map((item, index) => (
                                <div key={index} className="flex m-2 border-b border-l border-t border-white rounded-sm justify-between opacity-90 cursor-pointer">
                                    <h2 className="m-2 text-lg font-semibold">{item.title || 'No titles added'}</h2>
                                    <button className="p-2 border-r-2 border-l-2 border-red-600 rounded-sm hover:bg-red-600" onClick={() => handleRemoveFavorite(item.title)}>
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
