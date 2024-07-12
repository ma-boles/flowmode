'use client'
import React, { createContext, useContext, useState } from "react";
import { PlayerContext } from "@/app/providers/PlayerProvider";
import usePlayer from "@/app/hooks/usePlayer";
import { skipTrack, previousTrack, togglePlay } from "@/app/lib/playerApi";
import { TrackInfo } from "./TrackInfo";
import FlowTimer from "./FlowTimer";
import "@/app/styles/styles.css"
import { useSession } from "next-auth/react";


export default function Player() {
    const { accessToken } = useSession();
    const { player, playerState } = usePlayer();

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


    // player controls
    const handleTogglePlay = async() => {
        if(accessToken) {
            await togglePlay(accessToken, playerState);
        } else {
            console.error('No access token available.');
        }
    };

    const handleSkip = async() => {
        if(accessToken) {
            await skipTrack(accessToken);
        } else {
            console.error('No access token available.');
        }
    };

    const handlePrevious = async() => {
        if(accessToken) {
            await previousTrack(accessToken);
        } else {
            console.error('No access token available.');
        }
    };


    // extract playing status from playerState
    const { device } = playerState;
    const isPlaying = device.is_active;

    // determine is player is active
    const buttonActive = isPlaying ? 'invert-0' : 'invert';

    // extract media type from playerState
    const context = playerState.context;

    // determine if media type is playlist
    const playlistStyles = context === 'playlist' ? 'invert-0' : 'invert';

    //console.log('Player:', player);
    console.log('Player state:', playerState);


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

                        <button onClick={handlePrevious} className={`playerBtnSm ${playlistStyles}`}>
                            <img src="backward-step-solid.svg" alt="back" className="btnIconSm"></img>
                        </button>

                        <button onClick={handleTogglePlay} className={`playerBtn ${buttonActive}`}>
                                <img src="/pause-solid.svg" alt="pause" className="btnIcon"></img>
                        </button>

                        <button onClick={handleSkip} className={`playerBtnSm ${playlistStyles}`}>
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