import React from "react";
import Favorites from "./Favorites";

export default function RestCard({ data, favoritesList }) {

    return(
        <div className="flex">
            <div className="flex px-4 py-6 bg-black bg-opacity-20 border-2 border-white border-opacity-10 rounded-sm">
                <div className="w-80">
                        <h2 className="mb-2 text-center font-bold text-xl opacity-90">Recently Played:</h2>
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
            </div>

            <Favorites favoritesList={favoritesList}/>

        </div>
    )
}