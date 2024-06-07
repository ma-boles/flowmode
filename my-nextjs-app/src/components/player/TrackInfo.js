import React from "react";

export const TrackInfo = ({ playerState }) => {
    // check if playerState is null
    if(!playerState) {
        return <div>Empty</div>;
    }

    // check if track_window is null
    if (!playerState.track_window) {
        return <div>Empty</div>;
    }
    // extract track info from playerState
    const { track_window } = playerState;
    const currentTrack = track_window.current_track;
   
    return (
        <div>
            {currentTrack && (
                <>
                    <div>
                        <h2 className="font-bold">{currentTrack.name}</h2>
                        <h2>{currentTrack.artists[0].name}</h2>
                    </div>
                </>
            )}
        </div>
    );
};