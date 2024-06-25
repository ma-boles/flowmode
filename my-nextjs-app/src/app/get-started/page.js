'use client'
import React from "react";
import UserProfile from "@/components/profile/UserProfile";

export default function getStarted() {
    return (
        <div>
        <div>
            <UserProfile />
        </div>

        <div /* get started */ className="m-20">
            <h2 className="mb-8 font-semibold text-3xl">How to Get Started:</h2>
            <ul className="getStarted--ul">
                <li className="getStarted--li">Explore the Spotify catalogue.</li>
                <li className="getStarted--li">Choose something to listen to while in flow.</li>
                <li className="getStarted--li">Set time intevals for both flow and refresh. Also, set reminders if you would like to keep tack of remaining time.</li>
                <li className="getStarted--li">Listen and get into flow!</li>
            </ul>
        </div>
        <div /* account */ className="mx-20 ">
            <h2 className="mb-8 font-semibold text-3xl">Account</h2>
                <p className="text-xl">Set up an account to keep metrics on how many minutes per day, week, and month are spent in flow and rest. Also, keep track of most recently listened to items.</p><br />
                <p className="text-xl">Account can be created by navigating to the <span className="font-bold">Account</span> link in the top left pulldown menu. Spotify ID, name, and email address registered with Spotify will be used to create user account.</p><br />
                <p className="text-xl">Account can be deleted by navigating to the <span className="font-bold">Account</span> tab and clicking on the delete button in the prompt.</p>
        </div>
        <div /* features */ className="m-20 "> 
            <h2 className="mb-8 font-semibold text-3xl">Key Features:</h2>
            <ul className="getStarted--ul">
                <li className="getStarted--li"><span className="font-bold">Promote Productivity:</span> We provide a tool that helps users maintain high levels of productivity through the use of personalized work and break intervals.</li>
                <li className="getStarted--li"><span className="font-bold">Enhance Focus:</span> Our web app allows users to choose their preferred audio whether it's music, audiobooks, or podcasts, helping them to stay focused and engaged during work sessions.</li>
                <li className="getStarted--li"><span className="font-bold">Encourage Regular Breaks:</span> We remind users to take regular breaks, preventing fatigue and promoting well-being.</li>
                <li className="getStarted--li"><span className="font-bold">Offer Flexibility and Personalization:</span> We offer a flexible and customizable approach to time management, catering to individual preferences and needs, unlike any other pomodoro timers on the market.</li>
            </ul>
            </div>
    </div>

    )
}
