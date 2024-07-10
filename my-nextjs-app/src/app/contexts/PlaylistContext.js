'use client'
import React, { createContext, useContext, useState } from "react";

const PlaylistContext = createContext();

export const PlaylistProvider = ({ children }) => {
    const [flowPlaylistId, setFlowPlaylistId] = useState(null);
    const [restPlaylistId, setRestPlaylistId] = useState(null);
    const [previewId, setPreviewId] = useState(null);
    const [flowPlaylistName, setFlowPlaylistName] = useState('');
    const [restPlaylistName, setRestPlaylistName] = useState('');
    const [previewName, setPreviewName] = useState('');

    const handleSetFlowPlaylist = (id, name) => {
        //setFlowPlaylistId(id);
        //setFlowPlaylistName(name);
        setFlowPlaylistId(prevId => (prevId === id ? null : id));
        setFlowPlaylistName(prevName => (prevName === name ? null : name));
        console.log('Flow playlist name:', name);
    };

    const handleSetRestPlaylist = (id, name) => {
        //setRestPlaylistId(id);
        //setRestPlaylistName(name);
        setRestPlaylistId(prevId => (prevId === id ? null : id));
        setRestPlaylistName(prevName => (prevName === name ? null : name));
        console.log('Rest playlist name:', name);
    };

    const handleSetPreview = (id, name) => {
        setPreviewId(id);
        setPreviewName(name);
        console.log('Preview name:', name);
    };

    return (
        <PlaylistContext.Provider
            value={{
                flowPlaylistId,
                restPlaylistId,
                previewId,
                flowPlaylistName,
                restPlaylistName,
                previewName,
                handleSetFlowPlaylist,
                handleSetRestPlaylist,
                handleSetPreview
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
