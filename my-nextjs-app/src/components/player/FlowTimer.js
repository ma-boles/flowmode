import { setSelectionRange } from "@testing-library/user-event/dist/types/event/selection";
import React, { useEffect, useState } from "react";

export default function FlowTimer() {
    const [flowTime, setFlowTime] = useState(25 * 60);
    const [refreshTime, setRefreshTime] = useState(5 * 60);
    const [isActive, setIsActive] = useState(false);
    const [activeInterval, setActiveInterval] = useState('flow');
    const [countdown, setCountdown] = useState(null);

    useEffect(() => {
        // Clear existing countdwon when timers 
        if(countdown) {
            clearInterval(countdown);
        }

        // Set up new countdown
        if(isActive) {
            setCountdown(
                setInterval(() => {
                if(activeInterval === 'flow') {
                    if(flowTime > 0) {
                        setFlowTime((prevTime) => prevTime - 1);
                    } else {
                        // Flow interval is over, switch to refresh interval
                        setActiveInterval('refresh');
                        setFlowTime(25 * 60);
                }
            } else {
                if(refreshTime > 0) {
                    setRefreshTime((prevTime) => prevTime - 1);
                } else {
                    // Refesh interval is over, switch to flow interval
                    setActiveInterval('flow');
                    setRefreshTime(5 * 60);
                }
            }

            }, 1000)
        );
    }

    return () => clearInterval(countdown);
    }, [isActive, activeInterval, flowTime, refreshTime]);

    const formatTime = (time) => {
        const minutes = Math.floor(time /60);
        const seconds = time % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
    };

    const ToggleTimer = () => {
        setIsActive(!isActive);
    };

    const resetTimer = () => {
        setIsActive(false);
        setActiveInterval('flow');
        setFlowTime(25 * 60); // resets to default time
        setRefreshTime(5 * 60); // resets to default time
    };

    const handleFlowTimeChange = (event) => {
        const newValue = parseInt(event.target.value) * 60; // converts minutes to seconds
        setFlowTime(newValue)
        resetTimer();
    };

    const handleRefreshTimeChange = (event) => {
        const newValue = parseInt(event.target.value) * 60; // converts minutes to seconds
        setRefreshTime(newValue);
        resetTimer();
    }
    

    return(
        <>
        <div /* time div */>
            <div className="bg-yellow-600">
                <h2>Flow</h2>
                <label>Time:</label>
                <input 
                    type="number"
                    value={flowTime / 60}
                    onChange={handleFlowTimeChange}
                    min="1"
                    max="60"
                    />
            </div>
            <div className="bg-red-600">
                <h2>Refresh</h2>
                <label>Time:</label>
                <input 
                    type="number"
                    value={refreshTime / 60}
                    onChange={handleRefreshTimeChange}
                    min="1"
                    max="60"
                    />
            </div>
        </div>
        <div /* buttons div */ className="bg-purple-600">
            <button onClick={ToggleTimer}>{isActive ? 'Pause' : 'Start'}</button>
            <button onClick={resetTimer}>Rest</button>
        </div>
        </>
    );
};