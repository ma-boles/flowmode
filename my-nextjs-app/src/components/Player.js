import React, { createContext, useContext, useState } from "react";
import { PlayerContext } from "@/app/contexts/PlayerContext";
import { usePlayer } from "@/app/providers/PlayerProvider";
import "@/app/styles/styles.css"


export default function Player() {
    const { player, playerState } = usePlayer();
    // Check if the player is currently playing something
   // const isPlaying = playerState && playerState.isPlaying;

    const handlePlayPause = () => {
        try {
            if (player && player.togglePlay) {
                player.togglePlay();
            } else {
                console.log('Player or togglePlay method not available.');
            }
        } catch (error) {
            console.error('Error occurred while toggling play/pause:', error);
        }
    };

    const handleSkip = () => {
        try {
            if (player) {
                player.nextTrack();
            } else {
                console.error('Player not available.');
            }
        } catch (error) {
            console.error('Error occurred while skipping track:', error);
        }
    };

    const handleBack = () => {
        try {
            if (player) {
                player.previousTrack();
            } else {
                console.error('Player not available.');
            }
        } catch (error) {
            console.error('Error occurred while going back to previous track:', error);
        }
    };

    console.log('Player:', player);
    console.log('Player state:', playerState);


    return (
        <div className="playBackground">
            <div className="flex justify-center  border-black">
                <div className="flex px-32 justify-between border-t border-l border-b border-white border-opacity-100 bg-transparent rounded-l-lg">
                    <button className="playerBtnSm" onClick={handleBack}>
                        <img src="backward-step-solid.svg" alt="back" className="btnIconSm"></img>
                    </button>

                    <button className="playerBtn" onClick={handlePlayPause}>
                        {playerState === 'playing' ? (
                            <img src="/pause-solid.svg" alt="pause" className="btnIcon"></img>
                        ) : (
                            <img src="/play-solid.svg" alt="play" className="btnIcon"></img>
                        )}
                    </button>

                    <button className="playerBtnSm" onClick={handleSkip}>
                        <img src="forward-step-solid.svg" alt="skip" className="btnIconSm"></img>
                    </button>
                </div>

                <div className="border border-white border-opacity-100 bg-transparent rounded-r-lg" style={{display: 'grid', placeItems: 'center'}}>

                <div className="mx-4">
                    <div className="flex justify-evenly">
                        <img src="repeat-solid.svg" alt="repeat" className=" btnIconShuffle"></img>
                        <img src="shuffle-solid.svg" alt="shuffle" className=" btnIconShuffle"></img>
                        </div>
                    <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    />
                </div>

                </div>
            </div>
        </div>
    )
}