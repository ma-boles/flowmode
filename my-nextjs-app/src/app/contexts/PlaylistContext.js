'use client'
import React, { createContext, useContext, useState, useEffect } from "react";
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
        console.log('Flow playlist name (Context):', id, name);
    };

    const handleSetRestPlaylist = (id, name) => {
        setRestPlaylistId(id);
        setRestPlaylistName(name);
        console.log('Rest playlist name (Context):', id, name);
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
          
          const response = await fetch('/api/favorite', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ favoritesTitle: title }),
          });
    
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }

          // Update local state
          setFavoritesList((prevFavorites) => {
            if(!prevFavorites.some((item) => item.title === title )) {
              // Create new array with new title added
              const updatedFavorites = [{ title }, ...prevFavorites];
              console.log("Updated favorites before capping:", updatedFavorites);

              // Cap list at 5 by removing oldest if necessary
              const finalFavorites = updatedFavorites.slice(0,5);
              console.log('Final favorite list after capping:', finalFavorites);
              return finalFavorites;
            }
            console.log('Title already exists. Previous favorites:', prevFavorites);
            return prevFavorites;
          });
        } catch (error) {
          console.error('Error adding favorite:', error);
        }
      };

      // Assuming favoritesList is your state variable for the favorites
      useEffect(() => {
        console.log("Updated favorites list:", favoritesList);
      }, [favoritesList]); // This will run every time favoritesList changes
    
      const removeFavorite = async (favoritesId) => {
        if (!favoritesId) {
          console.log('No favorites ID provided');
          return; // Prevent removing empty titles
        }
        try {
          const response = await fetch(`/api/favorite?favoritesId=${favoritesId}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
          });
    
          if (!response.ok){
            throw new Error('Failed to remove favorite');
          }
          // Update the local state
          const { favorites } = await response.json();
          setFavoritesList((prevFavorites) =>
            prevFavorites.filter((item) => item._id !== favoritesId));

          console.log(`Updated favorites list: ${favorites}`);

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