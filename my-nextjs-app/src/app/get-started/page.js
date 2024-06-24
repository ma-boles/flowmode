import React from "react";
import UserProfile from "@/components/profile/UserProfile";

export default function getStarted() {
    return (
        <>
        <div>
            <UserProfile />
        </div>

        <div /* get started */>
            <h1>How to Get Started:</h1>
            <ol>
                <li>Explore the Spotify catalogue.</li>
                <li>Choose something to listen to while in flow.</li>
                <li>Set time intevals for both flow and refresh. Also, set reminders if you would like to keep tack of remaining time.</li>
                <li>Listen and get into flow!</li>
            </ol>
            <h1>Account</h1>
                <p>Set up an account to keep personal metrics on how many minutes per day, week, and month of focused minutes in flow you have. Also keep track of most recently listened to items.</p>
        </div>
        <div /* features */>
            <h1>Key Features:</h1>
            <ul>
                <li><span className="font-bold">Promote Productivity:</span> We provide a tool that helps users maintain high levels of productivity through the use of personalized work and break intervals.</li>
                <li><span className="font-bold">Enhance Focus:</span> Our web app allows users to choose their preferred audio whether it's music, audiobooks, or podcasts, helping them to stay focused and engaged during work sessions.</li>
                <li><span className="font-bold">Encourage Regular Breaks:</span> We remind users to take regular breaks, preventing fatigue and promoting well-being.</li>
                <li><span className="font-bold">Offer Flexibility and Personalization:</span> We offer a flexible and customizable approach to time management, catering to individual preferences and needs, unlike any other pomodoro timers on the market.</li>
            </ul>
    </div>
    </>
    )
}
