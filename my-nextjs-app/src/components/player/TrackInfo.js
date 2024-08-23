import React, { useContext, useEffect, useState } from "react";
import { PlayerContext } from "@/app/providers/PlayerProvider";
import usePlayer from "@/app/hooks/usePlayer";

export const TrackInfo = () => {
    const { playerState } = useContext(PlayerContext);


    if (!playerState || !playerState.track_window) {
        return <div>Loading track info...</div>;
    }

    const { track_window } = playerState;
    const currentTrack = track_window.current_track;

    if (!currentTrack) {
        return <div>No track playing</div>;
    }


    return (
        <div>
            {currentTrack && (
                <>
                    <div className="h-18 text-left">
                        <h2 className="font-bold truncate-text">{currentTrack.name}</h2>
                        <h2 className="truncate-text">{currentTrack.artists[0].name}</h2>
                    </div>
                </>
            )}
        </div>
    );
};

    //const [currentTrack, setCurrentTrack] = useState(null);

    //console.log('Current playerState:', playerState);

    /*useEffect(() => {
        if (playerState && playerState.track_window) {
            setCurrentTrack(playerState.track_window.current_track);
        }
    }, [playerState]);*/

/*if(!playerState) {
        return <div>Loading...</div>;
    }

    if(!playerState.track_window) {
        return <div>Loading track info...</div>;
    }

    if(!currentTrack) {
        return <div>No track playing</div>;
    }

   /* if(!playerState) {
        return <div>Loading...</div>;
    }

    // check if playerState or track_window is null
    if(!playerState.track_window) {
        return <div>Loading track info...</div>;
    }

    // extract track info from playerState
    const { track_window } = playerState;
    const currentTrack = track_window.current_track;

    if(!currentTrack) {
        return <div>No track playing</div>;
    }*/