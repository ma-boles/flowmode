import React, { createContext, useContext, useState } from "react";

const PlaylistContext = createContext();

export const usePlaylistContext = () => useContext(PlaylistContext);

export const PlaylistProvider = ({ children }) => {
    const [flowPlaylistId, setFlowPlaylistId] = useState(null);
    const [restPlaylistId, setRestPlaylistId] = useState(null);

    const onSelectFlow = (playlistId) => {
        setFlowPlaylistId(playlistId);
    };

    const onSelectRest = (playlistId) => {
        setRestPlaylistId(playlistId);
    };

    const onSelectPreview = () => {
        console.log('Preview selected');
    };

    return (
        <PlaylistContext.Provider
            value={(
                flowPlaylistId,
                restPlaylistId,
                onSelectFlow,
                onSelectRest,
                onSelectPreview
            )}
        >
            {children}
        </PlaylistContext.Provider>
    )
};

export default PlaylistContext;
