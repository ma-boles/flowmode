import React from "react";

export default function Player() {
    return (
        <div className="playerBackground">
            <h1 className="text-center">Work Mode</h1>
            <div className="p-24 bg-transparent rounded-md">
                <div className="p-16 m-8 bg-blue-600 rounded-full text-center">pomodoro circle/progress bar
                </div>
            <div className="flex justify-center border-black">
                <div className="flex px-32 justify-between border border-black border-opacity-100 bg-transparent rounded-l-lg">
                    <button className="m-8 py-1 px-6 bg-blue-600">
                        <BackwardIcon />
                    </button>
                    <button className="m-8 py-1 px-6 bg-blue-600">
                        <PlayPauseIcon />
                    </button>
                    <button className="m-8 py-1 px-6 bg-blue-600">
                        <ForwardIcon />
                    </button>
                </div>
                <div className="border border-black border-opacity-100 bg-transparent rounded-r-lg">
                    <button className="mt-8 py-1 px-6 bg-blue-600">Volume controls</button>
                </div>
            </div>
            </div>
        </div>
    )
}