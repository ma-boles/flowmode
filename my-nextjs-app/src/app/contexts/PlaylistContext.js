'use client'
import React, { createContext, useContext, useState } from "react";

const PlaylistContext = createContext();

export const PlaylistProvider = ({ children }) => {
    const [flowPlaylistId, setFlowPlaylistId] = useState(null);
    const [restPlaylistId, setRestPlaylistId] = useState(null);
    const [previewId, setPreviewId] = useState(null);
    const [favoritesTitleId, setFavoritesTitleId] = useState(null);
    const [flowPlaylistName, setFlowPlaylistName] = useState('');
    const [restPlaylistName, setRestPlaylistName] = useState('');
    const [previewName, setPreviewName] = useState('');
    const [favoritesTitle, setFavoritesTitle] = useState('');

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

    const handleFavorite = (id, name) => {
        setFavoritesTitleId(id);
        setFavoritesTitle(name);
        console.log('Favorites title:', id, name);
    }


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
                favoritesTitle,
                handleSetFlowPlaylist,
                handleSetRestPlaylist,
                handleSetPreview,
                handleFavorite
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
