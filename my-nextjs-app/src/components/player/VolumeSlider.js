import React, { useContext, useEffect, useState } from "react";
import { PlayerContext } from "@/app/providers/PlayerProvider";

export default function VolumeSlider() {

    const { player } = useContext(PlayerContext);
    //const { player } = usePlayer();

    const [volume, setVolume] = useState(0.5);

    const handleVolumeChange = () => {
            const newVolume = parseFloat(event.target.value);
            setVolume(newVolume);
            if(player) {
            player.setVolume(newVolume); // Adjusts volume on player
        }
    };

    return (
        <>
            <div className="flex justify-center items-center">
            <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                disabled={!player} // Disable slider if player is not ready
                />
                </div>
        </>

    )
}