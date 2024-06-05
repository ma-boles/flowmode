import React from "react";

export default function LastPlayed() {
    return(
        <>
            <div className="py-6 px-12 mx-8 border-8 border-solid border-white rounded-lg opacity-50">
                <h2 className="m-2 font-bold text-2xl opacity-90">Most Recently <br /> Played:</h2>
                <hr />
                <div className="flex flex-col">
                    <h2 className="m-2 text-xl font-semibold">Title #1</h2>
                    <h2 className="m-2 text-xl font-semibold">Title #2</h2>
                    <h2 className="m-2 text-xl font-semibold">Title #3</h2>
                </div>
            </div>
        </>
    )
}