import React from "react";
import TotalMinutesRest from "./TotalMinutesRest";

export default function RestCard() {
    return(
        <>
        <div className="flex px-4 py-6 flow-card">
            <div>
                <TotalMinutesRest />
            </div>

            <div className="mx-4 bg-gray-700 border-4 border-gray-700 rounded-md">
                <h2 className="px-10 my-4 font-bold text-2xl opacity-90">Recently Played:</h2>
                    <div className="flex flex-col m-2 border border-white rounded-sm opacity-90 cursor-pointer">
                        <h2 className="m-2 text-xl font-semibold">Title #1</h2>
                    </div>
                    <div className="flex flex-col m-2 border border-white rounded-sm opacity-90 cursor-pointer">
                        <h2 className="m-2 text-xl font-semibold">Title #2</h2>
                    </div>
            </div>
        </div>
        </>
    )
}