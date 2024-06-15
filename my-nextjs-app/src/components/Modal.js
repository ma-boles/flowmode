import React from "react";

export default function Modal ({ setIsOpen }) {

    const handleTrack = () => {
        alert('tracking')
    };

    const handleDontTrack = () => {
        alert('no tracking')
    };

    return (
        <div className="border border-solid border-white rounded-md modal" /*onClick={() => setIsOpen(false)}*/>
            <div className="flex justify-end">
                <span className="px-2 py-1 m-2 cursor-pointer text-xs rounded-sm hover:bg-red-600" onClick={() => setIsOpen(false)}>X</span>
            </div>

            <div className="mb-8 text-center">
                <h1 className="px-8 py-4 text-6xl"><span className="text-green-600 font-bold">flow</span><span className="font-thin">mode</span></h1>
            </div>
            <div className="pt-4 bg-white border border-solid border-slate-800 text-center rounded-md">
                <h2 className="m-6 text-black text-xl font-semibold">Keep track of your total time in flow per day/week/month?</h2>
                <div className="m-8 pt-2 flex justify-around">
                    <button className="p-2 w-32 bg-red-600 rounded-md hover:bg-gray-800 transition duration-300 ease-in-out" onClick={handleDontTrack}>Don't Track</button>
                    <button className="p-2 w-32 bg-green-600 rounded-md hover:bg-gray-800 transition duration-300 ease-in-out" onClick={handleTrack}>Track</button>
                </div>
            </div>
        </div>
    )
}