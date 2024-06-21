import React, { useEffect, useState } from "react";

export default function FlowTimer({ intervalChange, setIntervalChange }) {
    const [flowTime, setFlowTime] = useState('');
    const [refreshTime, setRefreshTime] = useState('');
    const [isActive, setIsActive] = useState(false);
    const [activeInterval, setActiveInterval] = useState('flow');
    const [countdown, setCountdown] = useState(null);
    const [initialFlowTime, setInitialFlowTime] = useState('');
    const [initialRefreshTime, setInitialRefreshTime] = useState('');

    useEffect(() => {
        let intervalId = null;
        // Clear existing countdwon when timers
        if(countdown) {
            clearInterval(countdown);
        }

        // Set up new countdown
        if(isActive) {
            /*setCountdown(*/
                intervalId = setInterval(() => {
                if(activeInterval === 'flow') {
                    if(flowTime > 0) {
                        setFlowTime((prevTime) => prevTime - 1);
                    } else {
                        // Flow interval is over, switch to refresh interval
                        setActiveInterval('refresh');
                        //setFlowTime(initialFlowTime);
                        //clearInterval(intervalId);
                }
            } else if (activeInterval === 'refresh') {
                if(refreshTime > 0) {
                    setRefreshTime((prevTime) => prevTime - 1);
                } else {
                    // Refesh interval is over, switch to flow interval
                    //setActiveInterval('flow');
                    //setRefreshTime(initialRefreshTime);
                    //clearInterval(intervalId);
                }
            }

            }, 1000)
        //);

    }

    return () => clearInterval(/*countdown*/ intervalId);
    }, [isActive, activeInterval, flowTime, refreshTime, initialFlowTime, initialRefreshTime]);

    const formatTime = (time) => {
        const minutes = Math.floor(time /60);
        return `${minutes}`
    };

    const ToggleTimer = () => {
        setIsActive(!isActive);
    };

    const resetTimer = () => {
        setIsActive(false);
        setActiveInterval('flow');
        setFlowTime(initialFlowTime); // resets to default time
        setRefreshTime(initialRefreshTime); // resets to default time
    };

    const handleFlowTimeChange = (event) => {
        const newValue = Math.min(parseInt(event.target.value),60) * 60; // converts minutes to seconds
        setFlowTime(newValue);
        setInitialFlowTime(newValue);
    };

    const handleRefreshTimeChange = (event) => {
        const newValue = Math.min(parseInt(event.target.value), 60) * 60; // converts minutes to seconds
        setRefreshTime(newValue);
        setInitialRefreshTime(newValue);
    }


    return(
        <>
        <div /* time div */ className="flex justify-evenly">
            <div className="p-16 mt-6">
                <h2 className="font-bold text-2xl text-gray-200">FLOW</h2>
                {isActive ? (
                    <div /* flow time */ className="mt-6 mx-6 mb-2 bg-transparent font-bold text-7xl text-center">
                         {formatTime(flowTime)}
                    </div>
                ) : (
                    <input className="mt-6 mx-6 bg-transparent text-6xl text-center"
                        type="number"
                        value={flowTime / 60}
                        onChange={handleFlowTimeChange}
                        min="1"
                        max="60"
                        placeholder="25"
                        />
                )}

            </div>
            <div className="p-16 mt-6">
                <h2 className="font-bold text-2xl text-gray-200">REFRESH</h2>
                {isActive ? (
                    <div /* refresh time */ className="mt-6 mx-6 mb-2 font-bold text-7xl text-center">
                        {formatTime(refreshTime)}
                    </div>
                ) : (
                    <input className="mt-6 mx-6 bg-transparent text-6xl text-center"
                        type="number"
                        value={refreshTime / 60}
                        onChange={handleRefreshTimeChange}
                        min="1"
                        max="60"
                        placeholder="5"
                        />
                )}
            </div>
        </div>
        <div /* buttons div */ className="flex justify-end mb-2 pr-6">
            <button className="px-8 py-2 m-2 bg-blue-600"onClick={ToggleTimer}>{isActive ? 'Pause' : 'Start'}</button>
            <button className="px-8 py-2 m-2 bg-blue-600"onClick={resetTimer}>Reset</button>
        </div>
        </>
    );
};