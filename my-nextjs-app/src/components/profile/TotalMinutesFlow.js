import React, { useState } from "react";

export default function TotalMinutesFlow () {

    return (
        <>
            <div className="mx-4"> 

                <div className="my-2 flex justify-between border border-gray-700  bg-gray-700 rounded-sm opacity-90">
                    <div className="py-2 px-6">
                         <h2 className="mx-2 mt-1 font-bold text-2xl">Day:</h2>
                    </div>
                    <div className="py-2 px-6">
                        <h2 className="text-4xl text-center">07:30</h2>
                    </div>
                </div>

                <div className="my-2 flex justify-between bg-gray-700 border border-gray-700 rounded-sm opacity-90">
                    <div className="py-2 px-6">
                        <h2 className="mx-2 mt-1 font-bold text-2xl">Week:</h2>
                    </div>
                    <div className="py-2 px-6">
                        <h2 className="text-4xl">15:20</h2>
                    </div>
                </div>

                <div className="my-2 flex justify-between bg-gray-700 border border-gray-700 rounded-sm opacity-90">
                    <div className="py-2 px-6">
                        <h2 className="mx-2 mt-1 font-bold text-2xl">Month:</h2>
                    </div>
                    <div className="py-2 px-6">
                        <h2 className="text-4xl">30:15</h2>
                    </div>
                </div>

            </div>
        </>
    )
}