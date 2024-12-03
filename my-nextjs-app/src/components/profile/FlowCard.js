import React from "react";
import Favorites from "./Favorites";

export default function FlowCard({ data, favoritesList }) {

    return(
        <div className="flex h-40">
            <div className="flex px-4 py-2 mb-2 mx-1 border-2 border-green-600 border-opacity-50 bg-white bg-opacity-5 rounded-2xl">
                <div className="w-80">
                    <h2 className="mb-2 text-center font-semibold text-xl opacity-90">Flow</h2>
                    {data.length > 0 ? (
                        data.map((item, index) => (
                        <div key={index} className="flex flex-col m-2 border border-white rounded-sm opacity-90 cursor-pointer hover:bg-blue-600">
                            <h2 className="m-2 text-xl font-semibold">{item.flow?.title || 'No recent titles'}</h2>
                        </div>
                    ))
                ) : (
                    <p>No recent titles</p>
                )}
                </div>
            </div>

          {/*  <Favorites favoritesList={favoritesList}/>*/}

        </div>
    )
}