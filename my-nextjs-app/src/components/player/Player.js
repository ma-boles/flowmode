import React, { createContext, useContext, useState } from "react";
import { PlayerContext } from "@/app/contexts/PlayerContext";
import { usePlayer } from "@/app/providers/PlayerProvider";
import { TrackInfo } from "./TrackInfo";
import "@/app/styles/styles.css"


export default function Player() {
    const { player, playerState } = usePlayer();
    // Check if the player is currently playing something
   // const isPlaying = playerState && playerState.isPlaying;

   const [selectedItem, setSelectedItem] = useState(null);

    const handlePlayPause = () => {
        try {
            if (player && player.togglePlay) {
                console.log('Toggle play initiated');
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

            <div className="w-4/5 flex justify-center border border-solid border-white rounded-t-lg mx-auto flowDiv">
                <div className="w-1/3 my-4 flex flex-col justify-center items-center" /* work */>
                    <h2 className="text-xl font-bold">Work:</h2>
                    <div className="flex justify-center items-center">
                        <input className="inputTimer"
                        type="number"
                        placeholder="00"
                        min="0"
                        max="10"
                        />
                    <p>HR</p>
                        <input className="inputTimer"
                        type="number"
                        placeholder="00"
                        min="0"
                        max="59"
                        />
                    <p>MIN</p>
                    </div>
                </div>

                <div className="w-1/3 flex flex-col justify-center items-center" /* rest */>
                    <h2 className="text-xl font-bold">Rest:</h2>
                    <div className="flex justify-center items-center">
                        <input className="inputTimer"
                        type="number"
                        placeholder="00"
                        min="1"
                        max="59"
                        />
                    <p>MIN</p>
                    </div>
                </div>

                <div className="w-1/3 flex justify-center items-center" /* intervals */>
                    <div className="flex justify-center items-center">
                    <h2 className="text-xl">Number of <br /> Intervals:</h2>
                        <input className="inputTimer"
                        type="number"
                        placeholder="1"
                        min="1"
                        max="10"/>
                    </div>
                </div>
            </div>
            <div className="w-4/5 m-auto mb-4 p-4 flex justify-end items-center border border-solid border-white rounded-b-lg flowDiv2"/* buttons */>
                <button className="mx-4 py-1 px-6 text-gray font-bold bg-blue-500 border border-solid border-blue-300 hover:bg-blue-700">RESET</button>
                <button className="mx-4 py-1 px-8 text-gray font-bold bg-blue-500 border border-solid border-blue-300 hover:bg-blue-700">SET</button>
            </div>


            <div className="flex justify-center">

                <div className="flex items-center justify-center w-48 p-4 border-t border-l border-b border-white border-opacity-100 bg-transparent rounded-l-lg" style={{display: 'grid', placeItems: 'left'}}>
                    <TrackInfo playerState={playerState}/>
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