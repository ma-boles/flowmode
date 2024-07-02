import React, { createContext, useContext, useState } from "react";

const PlaylistContext = createContext();

export const usePlaylistContext = () => useContext(PlaylistContext);

export const PlaylistProvider = ({ children }) => {
    const [flowPlaylistId, setFlowPlaylistId] = useState(null);
    const [restPlaylistId, setRestPlaylistId] = useState(null);
    const [previewId, setPreviewId] = useState(null);

    const onSelectFlow = (playlistId) => {
        setFlowPlaylistId(playlistId);
    };

    const onSelectRest = (playlistId) => {
        setRestPlaylistId(playlistId);
    };

    const onSelectPreview = (playlistId) => {
        setPreviewId(playlistId)
        console.log('Preview selected:', playlistId);
    };

    return (
        <PlaylistContext.Provider
            value={{
                flowPlaylistId,
                restPlaylistId,
                previewId,
                onSelectFlow,
                onSelectRest,
                onSelectPreview
            }}
        >
            {children}
        </PlaylistContext.Provider>
    )
};

export default PlaylistContext;
