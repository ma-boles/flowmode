import React from "react";
import Favorites from "./Favorites";
import Templates from "./Templates";

export default function RestCard({ data, favoritesList, templatesList }) {

    return(
        <div className="flex">
            <div className="px-4 py-2 w-full border-2 border-blue-600 bg-black bg-opacity-40 rounded-xl">
                        <h2 className="mb-2 text-left font-semibold text-xl opacity-90">Rest</h2>
                        {data.length > 0 ? (
                            data.map((item, index) => (
                            <div key={index} className="flex flex-col m-2 border border-white rounded-sm opacity-90 cursor-pointer hover:bg-blue-600">
                                <h2 className="m-2 text-xl font-semibold">{item.rest?.title || 'No recent titles'}</h2>
                            </div>
                        ))
                    ) : (
                        <p>No recent titles</p>
                    )}
            </div>

           {/* <Templates templatesList={templatesList}/>
            <Favorites favoritesList={favoritesList}/>*/}

        </div>
    )
}