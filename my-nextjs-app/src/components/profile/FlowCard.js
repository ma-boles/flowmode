import React, { useState } from "react";
import TotalMinutesFlow from "./TotalMinutesFlow";
import Favorites from "./Favorites";

export default function FlowCard({ data }) {

    console.log('Fetched data:', data);
    
    return(
        <div className="flex">
            <div className="flex px-4 py-6 flow-card">
                <div /* times div */>
                    <TotalMinutesFlow />
                </div>

            <div className="mx-4">
                <h2 className="px-10 my-4 font-bold text-2xl opacity-90">Recently Played:</h2>

            {/* Map through fetched data */}
            {Array.isArray(data) && data.length > 0 ? (
                data.map((item, index) => (
                    <div key={index} className="flex flex-col m-2 border border-white rounded-sm opacity-90 cursor-pointer">
                        <h2 className="m-2 text-xl font-semibold">{item.flow?.title || 'No recent titles'}</h2>
                    </div>
                ))
            ) : (
                <p>No data available</p>
            )}
            </div>

            </div>

            <Favorites />

        </div>
    )
}