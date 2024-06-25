import React, { useState } from "react";

export default function TotalMinutesFlow () {
    const [minutesCard, setMinutesCard] = useState('today');

    const showMinutesDay = () => {
        setMinutesCard('today')
    };

    const showMinutesWeek = () => {
        setMinutesCard('week')
    };

    const showMinutesMonth = () => {
        setMinutesCard('month')
    };

    return (
        <>
            <div className="border-8 border-solid border-gray-100 rounded-lg border-opacity-80">

                <div /* buttons div */ className="px-2 flex w-full justify-between">
                    <button className={`mt-2 w-24 border border-solid border-blue-300 hover:bg-blue-600 ${minutesCard === 'today' ? 'bg-blue-600'  : 'bg-transparent'}`}
                    onClick={showMinutesDay}
                    >Today</button>
                    <button className={`mt-2 w-24 border border-solid border-blue-300  hover:bg-blue-600 
                    ${minutesCard === 'week' ? 'bg-blue-600' : 'bg-transparent'}`} 
                    onClick={showMinutesWeek}
                    >This Week</button>
                    <button className={`mt-2 w-24 border border-solid border-blue-300  hover:bg-blue-600 
                    ${minutesCard === 'month' ? 'bg-blue-600' : 'bg-transparent'}`} 
                    onClick={showMinutesMonth}
                    >This Month</button>
                </div>

            {minutesCard === 'today' &&
            <>
                <div className="px-8 py-6 mb-0 mx-8 opacity-90">
                    <h2 className="m-2 font-bold text-2xl">Minutes of <br /> Focused Work:</h2>
                    <hr />
                    <h2 className="mx-2 mt-6 mb-2 font-bold text-2xl opacity-90"><span className="text-4xl">00 </span>HR <br /> <span className="text-4xl">10</span> MIN</h2>
                </div>
            </>
            }

            {minutesCard === 'week' &&
            <>
                <div className="px-8 py-6 mb-0 mx-8 opacity-90">
                    <h2 className="m-2 font-bold text-2xl">Minutes of <br /> Focused Work:</h2>
                    <hr />
                    <h2 className="mx-2 mt-6 mb-2 font-bold text-2xl opacity-90"><span className="text-4xl">00 </span>HR <br /> <span className="text-4xl">20</span> MIN</h2>
                </div>
            </>
            }

            {minutesCard === 'month' &&
            <>
                <div className="px-8 py-6 mb-0 mx-8 opacity-90">
                    <h2 className="m-2 font-bold text-2xl">Minutes of <br /> Focused Work:</h2>
                    <hr />
                    <h2 className="mx-2 mt-6 mb-2 font-bold text-2xl opacity-90"><span className="text-4xl">00 </span>HR <br /> <span className="text-4xl">30</span> MIN</h2>
                </div>
            </>
            }

            </div>
        </>
    )
}