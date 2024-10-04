'use client'
import React, { createContext, useContext, useState } from "react";
import { playSong } from "../lib/playerApi";

const PlaylistContext = createContext();

export const PlaylistProvider = ({ children }) => {
    const [flowPlaylistId, setFlowPlaylistId] = useState(null);
    const [restPlaylistId, setRestPlaylistId] = useState(null);
    const [previewId, setPreviewId] = useState(null);
    const [favoritesTitleId, setFavoritesTitleId] = useState(null);
    const [flowPlaylistName, setFlowPlaylistName] = useState('');
    const [restPlaylistName, setRestPlaylistName] = useState('');
    const [previewName, setPreviewName] = useState('');
    //const [favoritesTitle, setFavoritesTitle] = useState('');
    const [favoritesList, setFavoritesList] = useState([]);

    const handleSetFlowPlaylist = (id, name) => {
        setFlowPlaylistId(id);
        setFlowPlaylistName(name);
        console.log('Flow playlist name:', id, name);
    };

    const handleSetRestPlaylist = (id, name) => {
        setRestPlaylistId(id);
        setRestPlaylistName(name);
        console.log('Rest playlist name:', id, name);
    };

    const handleSetPreview = (id, name) => {
        setPreviewId(id);
        setPreviewName(name);
        console.log('Preview name:', name);
    };

    const updateFavorites = async () => {
        //console.log('Fetching favorites...')
        try {
          const response = await fetch('/api/display-data');
          if (!response.ok) throw new Error('Network response was not ok');
          
          const data = await response.json();
          console.log('Fetched data:', data)
          
          setFavoritesList(data.favorites); // Assuming the response data is an array of favorite titles
        } catch (error) {
          console.error('Error updating data:', error);
        }
      };
    
      const addFavorite = async (title) => {
        if (!title) {
          console.log('No title provided');
          return; // Prevent adding empty titles
        }
        try {
          console.log(`Attempting to add favorite: ${title}`);
          
          const response = await fetch('/api/add-favorite', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ favoritesTitle: title }),
          });
    
          if (!response.ok) { 
            throw new Error('Network response was not ok');
          }
          const { favorites } = await response.json();
          setFavoritesList(favorites);
          console.log(`Updated favorites list: ${favorites}`);
          //console.log(`Added favorite: ${title}`);
        } catch (error) {
          console.error('Error adding favorite:', error);
        }
      };
    
      const removeFavorite = async (title) => {
        if (!title) {
          console.log('No title provided');
          return; // Prevent removing empty titles
        }
        try {
          const response = await fetch('/api/remove-favorite', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title }),
          });
    
          if (!response.ok){
            throw new Error('Network response was not ok');
          } 
          //const result = await response.json();
          // Update the local state
          setFavoritesList((prevFavorites) => 
            prevFavorites.filter((item) => item.title !== title));
          console.log(result.message);
          console.log(`Removed favorite: ${title}`);
        } catch (error) {
          console.error('Error removing favorite:', error);
        }
      };

    return (
        <PlaylistContext.Provider
            value={{
                flowPlaylistId,
                restPlaylistId,
                previewId,
                favoritesTitleId,
                flowPlaylistName,
                restPlaylistName,
                previewName,
                //favoritesTitle,
                favoritesList, 
                addFavorite, 
                removeFavorite,
                updateFavorites,
                handleSetFlowPlaylist,
                handleSetRestPlaylist,
                handleSetPreview,
                //handleFavorite
            }}
        >
            {children}
        </PlaylistContext.Provider>
    )
};

export const usePlaylistContext = () => {
    const context = useContext(PlaylistContext);
    if(!context) {
        throw new Error('usePlaylistContext must be used within a PlaylistProvider');
    }
    return context;
};

    /*const addFavorite = (title) => {
        if(!title || favoritesList.includes(title)) {
            console.error('Invalid title or title already exists:', error);
            return;
        }
        setFavoritesList((prevFavorites) => [...prevFavorites, {title}]);
        console.log('Added to favorites:', title);
    };*/

    
   /* //Function to update MongoDB with favorites title
    async function addFavorite(favoritesTitle) {
        // Validate favorites title before sending request
        if(!favoritesTitle) {
            console.error('Favorites title is missing.');
            return;
        }
    
            try {
                const response = await fetch('/api/add-favorite', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        favoritesTitle,
                    }),
                });
    
                if(!response.ok) {
                    throw new Error('Failed to update recently played info');
                }
    
                const result = await response.json();
                console.log('Update successful:', result);
    
                // Update the UI through context
                //addFavorite(favoritesTitle);
                setFavoritesList(prevFavorites => {
                    console.log('Previous favorites:', prevFavorites);
                    console.log('Adding title:', favoritesTitle);

                    const updatedFavorites = [...prevFavorites,{ title: favoritesTitle }];
                    console.log('Updated favorites:', updatedFavorites);

                    return updatedFavorites;
            });
            } catch(error) {
                console.error('Error adding favorites title', error);
            }
    };


  /*  //Function to update MongoDB with favorites title
    async function removeFavorite(favoritesTitle) {
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