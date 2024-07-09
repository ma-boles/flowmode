'use client'
import React, { createContext, useContext, useState } from "react";
import { PlayerContext } from "@/app/providers/PlayerProvider";
import usePlayer from "@/app/hooks/usePlayer";
import { TrackInfo } from "./TrackInfo";
import FlowTimer from "./FlowTimer";
import "@/app/styles/styles.css"


export default function Player() {
    const { player, playerState, play, pause, next, previous } = usePlayer();
    // Check if the player is currently playing something
    //const isPlaying = playerState && playerState.isPlaying;
    const [isFlowVisible, setIsFlowVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    if(!player || !playerState) {
        return <h2 className="mb-4 text-center text-2xl font-semibold">Player loading...</h2>;
    }

    const handleFlow = () => {
        setIsFlowVisible(!isFlowVisible);
    };

    console.log('Player:', player);
    //console.log('Player state:', playerState);


    return (
        <div className="player">
            <div className="playBackground" /*justify-center*/>
                {isFlowVisible &&
                    <div /* flow div */ >
                        <FlowTimer />
                    </div>
            }
                <div className="flex justify-between">

                    <div className="flex items-center justify-center w-48 p-4 bg-transparent 0 rounded-l-lg" style={{display: 'grid', placeItems: 'left'}}>
                        <TrackInfo playerState={playerState}/>
                    </div>

                    <div className="flex px-32 justify-between bg-transparent">

                        <button className="playerBtnSm" onClick={previous}>
                            <img src="backward-step-solid.svg" alt="back" className="btnIconSm"></img>
                        </button>

                        <button className="playerBtn" onClick={play}>
                            {playerState === 'playing' ? (
                                <img src="/pause-solid.svg" alt="pause" className="btnIcon"></img>
                            ) : (
                                <img src="/play-solid.svg" alt="play" className="btnIcon"></img>
                            )}
                        </button>

                        <button className="playerBtnSm" onClick={next}>
                            <img src="forward-step-solid.svg" alt="skip" className="btnIconSm"></img>
                        </button>
                    </div>

                    <div style={{display: 'grid', placeItems: 'center'}}>
                        <div className="mx-4 w-48">
                            <div className="flex justify-evenly">
                                <img src="repeat-solid.svg" alt="repeat" className=" btnIconShuffle"></img>
                                <img src="shuffle-solid.svg" alt="shuffle" className=" btnIconShuffle"></img>
                                <button className="px-2 py-0 text-3xl rounded-sm hover:bg-gray-700" onClick={handleFlow}><span className="text-green-600 font-bold">f</span><span>m</span></button>
                            </div>

                            <div className="flex justify-center items-center">
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
            </div>
        </div>
    )
}