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

        // Optimistically update the local state
        setFavoritesList((prevFavorites) => [...prevFavorites, { title: title }]);

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
          // Update local state
          const { favorites } = await response.json();

          setFavoritesList((prevFavorites) => {
            if(!prevFavorites.some((item) => item.title === title)) {
              return [...prevFavorites, { title }];
            }
            return prevFavorites;
          })
          console.log(`Updated favorites list: ${favorites}`);
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
            body: JSON.stringify({ favoritesTitle: title }),
          });
    
          if (!response.ok){
            throw new Error('Network response was not ok');
          }
          // Update the local state
          const { favorites } = await response.json();
          setFavoritesList((prevFavorites) =>
            prevFavorites.filter((item) => item.title !== title));

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