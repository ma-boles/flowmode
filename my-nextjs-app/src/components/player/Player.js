'use client'
import React, { createContext, useContext, useEffect, useState } from "react";
import { PlayerContext } from "@/app/providers/PlayerProvider";
import { useSession } from "next-auth/react";
import usePlayer from "@/app/hooks/usePlayer";
import { skipTrack, previousTrack, togglePlay, toggleShuffle } from "@/app/lib/playerApi";
import { TrackInfo } from "./TrackInfo";
import FlowTimer from "./FlowTimer";
import "@/app/styles/styles.css"


export default function Player() {
    const { data: session } = useSession();
    const accessToken = session?.accessToken;
    const { player, playerState, setTrackInfo } = usePlayer();

    const { paused, context } = playerState || {};

    const [isFlowVisible, setIsFlowVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [isShuffled, setIsShuffled] = useState(false);

    // open flow component
    const handleFlow = () => {
        setIsFlowVisible(!isFlowVisible);
    };


    // handle player controls
    const handleTogglePlay = async() => {
        const playerState = await player.getCurrentState();

        if(!playerState) {
            console.error('No player state available')
            return;
        }

        togglePlay(player, playerState);
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

    const handleToggleShuffle = async () => {
        const newShuffleState = !isShuffled;
        await toggleShuffle(accessToken, newShuffleState);
        setIsShuffled(newShuffleState);
    };

    // conditional styling

    // extract playing status from playerState
    const isPlaying = !paused;
    const isPlaylist = context?.uri?.startsWith('spotify:playlist:');

    const isPlayingPlaylist = isPlaying && isPlaylist;

    // determine is player is active
    const buttonActive = isPlaying ? 'invert-0' : 'invert';

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

                        <button onClick={handlePrevious} className={`playerBtnSm ${isPlayingPlaylist ? 'invert-0' : 'invert'}`}>
                            <img src="backward-step-solid.svg" alt="back" className="btnIconSm"></img>
                        </button>

                        <button onClick={handleTogglePlay} className={`playerBtn ${buttonActive}`}>
                            <img src="/pause-solid.svg" alt="pause" className="btnIcon"></img>
                        </button>

                        <button onClick={handleSkip} className={`playerBtnSm ${isPlayingPlaylist ? 'invert-0' : 'invert'}`}>
                            <img src="forward-step-solid.svg" alt="skip" className="btnIconSm"></img>
                        </button>
                    </div>

                    <div style={{display: 'grid', placeItems: 'center'}}>
                        <div className="mx-4 w-48">
                            <div className="flex justify-evenly">
                                <img src="repeat-solid.svg" alt="repeat" className=" btnIconShuffle"></img>
                                <button onClick={handleToggleShuffle}>
                                    {/* render styles conditionally {isShuffled ? 'Disable Shuffle' : 'Enable Shuffle'}*/}
                                    <img src="shuffle-solid.svg" alt="shuffle" className=" btnIconShuffle"></img>
                                </button>
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