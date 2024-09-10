import React, { useState } from "react";

export default function TotalMinutesRest () {
    const [restCard, setRestCard] = useState('today');

    const showRestDay = () => {
        setRestCard('today')
    };

    const showRestWeek = () => {
        setRestCard('week')
    };

    const showRestMonth = () => {
        setRestCard('month')
    };

    return (
        <>
            <div className="mx-4">

            <div className="my-2 flex justify-between bg-gray-700 border border-gray-700 rounded-sm opacity-90">
                    <div className="py-2 px-6">
                         <h2 className="mx-2 mt-1 font-bold text-2xl">Day:</h2>
                    </div>
                    <div className="py-2 px-6">
                        <h2 className="text-4xl text-center">00:30</h2>
                    </div>
                </div>

                <div className="my-2 flex justify-between bg-gray-700 border border-gray-700 rounded-sm opacity-90">
                    <div className="py-2 px-6">
                        <h2 className="mx-2 mt-1 font-bold text-2xl">Week:</h2>
                    </div>
                    <div className="py-2 px-6">
                        <h2 className="text-4xl">10:20</h2>
                    </div>
                </div>

                <div className="my-2 flex justify-between bg-gray-700 border border-gray-700 rounded-sm opacity-90">
                    <div className="py-2 px-6">
                        <h2 className="mx-2 mt-1 font-bold text-2xl">Month:</h2>
                    </div>
                    <div className="py-2 px-6">
                        <h2 className="text-4xl">20:15</h2>
                    </div>
                </div>

            </div>
        </>
    )
}


                {/*<div /* buttons div *//* className="px-2 flex w-full justify-between">
                    <button className={`mt-2 w-24 border border-solid border-blue-300 hover:bg-blue-600 ${restCard === 'today' ? 'bg-blue-600'  : 'bg-transparent'}`}
                    onClick={showRestDay}
                    >Today</button>
                    <button className={`mt-2 w-24 border border-solid border-blue-300  hover:bg-blue-600 
                    ${restCard === 'week' ? 'bg-blue-600' : 'bg-transparent'}`} 
                    onClick={showRestWeek}
                    >This Week</button>
                    <button className={`mt-2 w-24 border border-solid border-blue-300  hover:bg-blue-600 
                    ${restCard === 'month' ? 'bg-blue-600' : 'bg-transparent'}`} 
                    onClick={showRestMonth}
                    >This Month</button>
                </div>*/}

           {/* {restCard === 'today' &&
            <>
                <div className="px-8 py-3 mb-0 mx-8 opacity-90">
                    <h2 className="mx-2 mt-1 font-bold text-2xl">Total Minutes:</h2>
                    <hr />
                    <h2 className="mx-2 mt-6 mb-2 font-bold text-2xl opacity-90"><span className="text-4xl">00 </span>HR <br /> <span className="text-4xl">10</span> MIN</h2>
                </div>
            </>
            }

            {restCard === 'week' &&
            <>
                <div className="px-8 py-3 mb-0 mx-8 opacity-90">
                    <h2 className="mx-2 mt-1 font-bold text-2xl">Total Minutes:</h2>
                    <hr />
                    <h2 className="mx-2 mt-6 mb-2 font-bold text-2xl opacity-90"><span className="text-4xl">00 </span>HR <br /> <span className="text-4xl">20</span> MIN</h2>
                </div>
            </>
            }

            {restCard === 'month' &&
            <>
                <div className="px-8 py-3 mb-0 mx-8 opacity-90">
                    <h2 className="mx-2 mt-1 font-bold text-2xl">Total Minutes:</h2>
                    <hr />
                    <h2 className="mx-2 mt-6 mb-2 font-bold text-2xl opacity-90"><span className="text-4xl">00 </span>HR <br /> <span className="text-4xl">30</span> MIN</h2>
                </div>
            </>
            }*/}