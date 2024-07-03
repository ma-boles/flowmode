import React, { createContext, useContext, useState } from "react";

const PlaylistContext = createContext();

export const usePlaylistContext = () => useContext(PlaylistContext);

export const PlaylistProvider = ({ children }) => {
    const [flowPlaylistId, setFlowPlaylistId] = useState(null);
    const [restPlaylistId, setRestPlaylistId] = useState(null);
    const [previewId, setPreviewId] = useState(null);
    const [flowPlaylistName, setFlowPlaylistName] = useState('');
    const [restPlaylistName, setRestPlaylistName] = useState('');
    const [previewName, setPreviewName] = useState('');

    const handleSetFlowPLaylist = (id, name) => {
        setFlowPlaylistId(id);
        setFlowPlaylistName(name);
        console.log('Flow playlist name:', name);
    };

    const handleSetRestPlaylist = (id, name) => {
        setRestPlaylistId(id);
        setRestPlaylistName(name);
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
                handleSetFlowPLaylist,
                handleSetRestPlaylist,
                handleSetPreview
            }}
        >
            {children}
        </PlaylistContext.Provider>
    )
};

export default PlaylistContext;
