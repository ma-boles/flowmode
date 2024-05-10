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
        <div className="playBackground justify-center">


            <div className="w-4/5 mb-4 flex justify-center border border-solid border-white rounded-lg mx-auto flowDiv">
                <div className="w-2/5 my-4 flex flex-col justify-center items-center" /* work */>
                    <h2 className="text-xl font-bold">Work:</h2>
                    <div className="flex justify-center items-center">
                    <input type="number" className="inputTimer" placeholder="00"/> <p>HR</p>
                    <input type="number" className="inputTimer" placeholder="00" />
                    <p>MIN</p>
                    </div>
                </div>
                <div className="w-1/5 flex justify-center items-center"/* flow button */>
                    <button className="py-1 px-6 text-gray font-bold bg-blue-500 border border-solid border-blue-300 hover:bg-blue-700">FLOW</button>
                </div>
                <div  className="w-2/5 flex flex-col justify-center items-center"/* rest */>
                    <h2 className="text-xl font-bold">Rest:</h2>
                    <div className="flex justify-center items-center">
                    <input type="number" className="inputTimer" placeholder="00"/> <p>HR</p>
                    <input type="number" className="inputTimer" placeholder="00" />
                    <p>MIN</p>
                    </div>
                </div>
            </div>

            <div className="flex justify-center">
            
                <div className="p-6 border-t border-l border-b border-white border-opacity-100 bg-transparent rounded-l-lg" style={{display: 'grid', placeItems: 'left'}}>
                    <h2 className="text-xl font-bold">Track Name</h2>
                    <h2>Artist Name</h2>
                </div>

                <div className="flex px-32 justify-between border-t border-l border-b border-white border-opacity-100 bg-transparent">

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