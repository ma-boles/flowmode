import React from "react";

export default function TotalMinutes () {

    const click = () => {
        alert('click')
    };

    return (
        <>
            <div className="border-8 border-solid border-white rounded-lg opacity-50">
                <div className="px-2 flex w-full justify-between">
                    <button className="mt-2 w-24 border border-sold border-blue-300 hover:bg-blue-600" onClick={click}>Today</button>
                    <button className="mt-2 w-24 border border-solid border-blue-300  hover:bg-blue-600">This Week</button>
                    <button className="mt-2 w-24 border border-solid border-blue-300  hover:bg-blue-600">This Month</button>
                </div>
                <div className="px-8 py-6 mb-0 mx-8 ">
                    <h2 className="m-2 font-bold text-2xl opacity-90">Minutes of <br /> Focused Work:</h2>
                    <hr />
                    <h2 className="mx-2 mt-6 mb-2 font-bold text-2xl opacity-90"><span className="text-4xl">00 </span>HR <br /> <span className="text-4xl">00</span> MIN</h2>
                </div>
            </div>
        </>
    )
}