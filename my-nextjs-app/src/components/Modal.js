import React from "react";

export default function Modal ({ setIsOpen }) {
    return (
        <div className="border border-solid border-white rounded-md modal" onClick={() => setIsOpen(false)}>
            <div className="my-8 text-center">
                <h1 className="p-8 text-6xl"><span className="text-green-600 font-bold">flow</span><span className="font-thin">mode</span></h1>
            </div>
            <div className="pt-4 bg-white text-center">
                <h2 className="m-6 text-black text-xl font-semibold">Keep track of your total time in flow per day/week/month.</h2>
                <div className="m-8 pt-2 flex justify-around">
                    <button className="p-2 w-32 bg-red-600 rounded-md hover:bg-gray-800 transition duration-300 ease-in-out">Don't Track</button>
                    <button className="p-2 w-32 bg-green-600 rounded-md hover:bg-gray-800 transition duration-300 ease-in-out">Track</button>
                </div>
            </div>
        </div>
    )
}