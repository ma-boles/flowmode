import React, { useContext } from "react";
import { PlayerContext } from "@/app/contexts/PlayerContext";
import { usePlayer } from "@/app/providers/PlayerProvider";


export default function Player() {
    // use the usePlayer hook to access player-related data or functions
    //const { accessToken } = usePlayer();
    //const { playerState, initializePlayer, accessToken } = usePlayer();


    return (
        <div className="playerBackground">
            <h1 className="text-center">Flow Mode</h1>
            <div className="p-24 bg-transparent rounded-md">
                <div className="p-16 m-8 bg-blue-600 rounded-full text-center">
                    Progress Bar
                </div>
            <div className="flex justify-center border-black">
                <div className="flex px-32 justify-between border border-black border-opacity-100 bg-transparent rounded-l-lg">
                    <button className="playerBtnSm">
                        <img src="backward-step-solid.svg" alt="back" className="btnIconSm"></img>
                    </button>
                    <button className="playerBtn">
                        <img src="/play-solid.svg" alt="play" className="btnIcon"></img>
                    </button>
                    <button className="playerBtnSm">
                        <img src="forward-step-solid.svg" alt="skip" className="btnIconSm"></img>
                    </button>
                </div>
                <div className="border border-black border-opacity-100 bg-transparent rounded-r-lg">
                    <button className="mt-8 py-1 px-6 bg-blue-600">
                        Volume
                    </button>
                </div>
            </div>
            </div>
        </div>
    )
}