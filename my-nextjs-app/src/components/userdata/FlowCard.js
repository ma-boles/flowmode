import React from "react";
import TotalMinutesFlow from "./TotalMinutesFlow";

export default function FlowCard() {
    return(
        <>
        <div /* times div */>
            <TotalMinutesFlow />
        </div>

        <div className="py-6 px-12 mx-8 border-8 border-solid border-gray-100 rounded-lg border-opacity-80">
            <h2 className="m-2 font-bold text-2xl opacity-90">Most Recently <br /> Played:</h2>
            <hr />
                <div className="flex flex-col opacity-90">
                    <h2 className="m-2 text-xl font-semibold">Title #1</h2>
                    <h2 className="m-2 text-xl font-semibold">Title #2</h2>
                </div>
        </div>

        </>
    )
}