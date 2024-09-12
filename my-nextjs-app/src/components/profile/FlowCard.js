import React, { useState } from "react";
import TotalMinutesFlow from "./TotalMinutesFlow";

export default function FlowCard() {

    const [flowTitle, setFlowTitle] = useState('Title');
    const [flowTitle2, setFlowTitle2] = useState('Title 2');

    return(
        <>
        <div className="flex px-4 py-6 flow-card">
            <div /* times div */>
                <TotalMinutesFlow />
            </div>

            <div className="mx-4">
                <h2 className="px-10 my-4 font-bold text-2xl opacity-90">Recently Played:</h2>
                    <div className="flex flex-col m-2 border border-white rounded-sm opacity-90 cursor-pointer">
                        <h2 className="m-2 text-xl font-semibold">{flowTitle}</h2>
                    </div>
                    <div className="flex flex-col m-2 border border-white rounded-sm opacity-90 cursor-pointer">
                        <h2 className="m-2 text-xl font-semibold">{flowTitle2}</h2>
                    </div>
            </div>
        </div>

        </>
    )
}