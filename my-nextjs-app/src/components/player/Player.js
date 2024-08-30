'use client'
import React, { createContext, useContext, useEffect, useState } from "react";
import { PlayerContext } from "@/app/providers/PlayerProvider";
import { useSession } from "next-auth/react";
import usePlayer from "@/app/hooks/usePlayer";
import { skipTrack, previousTrack, toggleShuffle, stopPlayback, resumePlayback } from "@/app/lib/playerApi";
import { TrackInfo } from "./TrackInfo";
import FlowTimer from "./FlowTimer";
import "@/app/styles/styles.css"
import VolumeSlider from "./VolumeSlider";


export default function Player() {
    const { data: session } = useSession();
    const accessToken = session?.accessToken;
    const { player, playerState, setTrackInfo } = usePlayer();

    const { paused, context } = playerState || {};

    const [isAudioPlaying, setIsAudioPlaying] = useState(false);
    const [isFlowVisible, setIsFlowVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [isShuffled, setIsShuffled] = useState(false);

    // open flow component
    const handleFlow = () => {
        setIsFlowVisible(!isFlowVisible);
    };


    // handle player controls
    const handleTogglePlay = async() => {
        if(isAudioPlaying) {
            await stopPlayback(accessToken);
        } else {
            await resumePlayback(accessToken);
        }
        setIsAudioPlaying(!isAudioPlaying);
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

    const handleToggleShuffle = async() => {
        await toggleShuffle(accessToken);
        console.log('Shuffle enabled.');
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
                    <div /* flow div */>
                        <FlowTimer />
                    </div>
            }
                <div className="flex justify-between bg-black">

                    <div className="flex items-center justify-center w-48 p-4 bg-transparent 0 rounded-l-lg" style={{display: 'grid', placeItems: 'left'}}>
                       <TrackInfo playerState={playerState}/>
                    </div>

                    <div className="flex px-32 justify-between bg-transparent">

                        <button onClick={handlePrevious} className={`playerBtnSm ${isPlayingPlaylist ? 'invert-0' : 'invert'}`}>
                            <img src="backward-step-solid.svg" alt="back" className="btnIconSm"></img>
                        </button>

                        <button onClick={handleTogglePlay} className={`playerBtn ${buttonActive}`}>
                           <img src={`${isPlaying ? '/pause-solid.svg': '/play-solid.svg'}`} alt={`${isPlaying ? 'pause' : 'play'}`} className="btnIcon"></img>
                        </button>

                        <button onClick={handleSkip} className={`playerBtnSm ${isPlayingPlaylist ? 'invert-0' : 'invert'}`}>
                            <img src="forward-step-solid.svg" alt="skip" className="btnIconSm"></img>
                        </button>
                    </div>

                    <div style={{display: 'grid', placeItems: 'center'}}>
                        <div className="mx-4 w-48">
                            <div className="mb-2 flex justify-evenly">
                                <button className="px-2 py-0 text-3xl rounded-sm hover:bg-gray-700 active:bg-gray-700 focus:bg-gray-700 transition duration-150 ease-in-out">
                                    <img src="repeat-solid.svg" alt="repeat" className="btnIconShuffle"></img>
                                </button>
                                <button onClick={handleToggleShuffle} className="px-2 py-0 text-3xl rounded-sm hover:bg-gray-700 active:bg-gray-700 focus:bg-gray-700 transition duration-150 ease-in-out">
                                    {/* render styles conditionally {isShuffled ? 'Disable Shuffle' : 'Enable Shuffle'}*/}
                                    <img src="shuffle-solid.svg" alt="shuffle" className=" btnIconShuffle"></img>
                                </button>
                                <button className="px-2 py-0 text-3xl rounded-sm hover:bg-gray-700 active:bg-gray-700 focus:bg-gray-700 transition duration-150 ease-in-out" onClick={handleFlow}><span className="text-green-600 font-bold">f</span><span>m</span></button>
                            </div>
                            {/*py-1 font-semibold border-b border-solid border-gray-500  */}
                            <div className="flex justify-center items-center">
                                <VolumeSlider />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}