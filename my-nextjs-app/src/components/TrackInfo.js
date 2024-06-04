import { PlayerContext } from "@/app/contexts/PlayerContext";
import { useState, useEffect, useContext } from "react";
import { usePlayer } from "@/app/providers/PlayerProvider";

export const TrackInfo = () => {
    const playerState = usePlayer();

    if(!playerState || !playerState.track_window){
        return null;
    }

    const { current_track } = playerState.track_window;
    const trackName = current_track?.name || 'Unknown Track';
    const artistName = current_track?.artists?.[0]?.name || 'Unknown Artist';
    //const { playerState } = useContext(PlayerContext);
    //const [trackName, setTrackName] = useState('');
    //const [artistName, setArtistName]= useState('');

    /*useEffect (() => {
        if (playerState && playerState.track_window && playerState.track_window.current_track) {
            const currentTrack = playerState.track_window.current_track;
            setTrackName(currentTrack.name);
            setArtistName(currentTrack.artists[0].name);
        }
    }, [playerState]);*/

    return (
        <div>
            <h2>{trackName}</h2>
            <h2>{artistName}</h2>
        </div>
    );
};