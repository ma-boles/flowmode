import React from "react";
import TotalMinutesRest from "./TotalMinutesRest";
import Favorites from "./Favorites";

export default function RestCard({ data, favoritesList }) {

    return(
        <div className="flex">
            <div className="flex px-4 py-6 flow-card">
                {/*<div>
                    <TotalMinutesRest />
                </div>*/}
                <div className="w-80">
                        <h2 className="mb-2 text-center font-bold text-xl opacity-90">Recently Played:</h2>
                        {data.length > 0 ? (
                            data.map((item, index) => (
                            <div key={index} className="flex flex-col m-2 border border-white rounded-sm opacity-90 cursor-pointer hover:bg-blue-600">
                                {/* Display relevant data here */}
                                {/*<p>{item.flow.title}</p>  Assuming the object has a 'title' field */}
                                <h2 className="m-2 text-xl font-semibold">{item.rest?.title || 'No recent titles'}</h2>
                            </div>
                        ))
                    ) : (
                        <p>No recent titles</p>
                    )}
                </div>
            </div>

            <Favorites favoritesList={favoritesList}/>

        </div>
    )
}