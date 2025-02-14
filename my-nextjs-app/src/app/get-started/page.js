'use client'
import React from "react";
import NavBar from "@/components/nav/NavBar";
import Footer from "@/components/footer/Footer";
import { useSession } from "next-auth/react";


export default function getStarted() {

    const { data: session, status } = useSession();
    const accessToken = session?.accessToken;

    return (

    <>
    <div className="flex overflow-y-auto">
        <NavBar />

        <div className={`p-2 h-screen flex-grow w-[1130px] overflow-x-scroll ${
                session ? 'ml-56' : 'ml-0'
              }`}>
            <div /* features */ > 
                <h2 className="py-4 mt-8 mb-4 text-center font-bold text-4xl underline">Key Features:</h2>
                <div className="inline-flex flex-wrap justify-evenly w-full">
                    <div className="m-4 p-8 w-80 bg-blue-600 bg-opacity-70 rounded-2xl shadow-2xl">
                        <h3 className="mb-2 font-bold text-xl underline">Promote Productivity:</h3>
                        <p className="text-lg">We provide a tool that helps users maintain high levels of productivity through the use of personalized work and break intervals.</p>
                    </div>

                    <div className="m-4 p-8 w-80 bg-blue-600 bg-opacity-70 rounded-2xl shadow-2xl">
                        <h3 className="mb-2 font-bold text-xl underline">Enhance Focus:</h3>
                        <p className="text-lg">Our web app allows users to choose their preferred audio whether it's music, audiobooks, or podcasts, helping them to stay focused and engaged during work sessions.</p>
                    </div>

                    <div className="m-4 p-8 w-80 bg-blue-600 bg-opacity-70 rounded-2xl shadow-2xl">
                        <h3 className="mb-2 font-bold text-xl underline">Encourage Regular Breaks:</h3>
                        <p className="text-xl">We remind users to take regular breaks, preventing fatigue and promoting well-being.</p>
                    </div>

                    <div className="m-8 p-8 w-120 border-2 border-white bg-black bg-opacity-70 rounded-2xl shadow-2xl">
                        <h3 className="mb-2 font-bold text-xl underline">Offer Flexibility and Personalization:</h3>
                        <p className="text-xl">We offer a flexible and customizable approach to time management with the creation of a user profile, catering to individual preferences and needs, unlike any other pomodoro timer on the market.</p> <br/><br />
                        <h3 className="mb-2 font-bold text-xl underline">Customizable Templates:</h3>
                        <p className="text-xl">Allows users to create and save templates for easy setup with one click.</p>
                    </div>
                </div>
            </div>
            <div /* account */ className="m-8 p-10 bg-blue-600 bg-opacity-70 rounded-lg">
                <h2 className="mb-8 font-bold text-3xl text-center">Profile</h2>
                    <p className="text-xl">Set up a profile to keep track of most recently listened to selections, favorites, and saved templates.</p><br />
                    <p className="text-xl">Profile can be created by navigating to the <span className="font-bold">Create Profile</span> link in the side menu. Spotify ID, name, and email address registered with Spotify will be used to create user profile.</p><br />
                    <p className="text-xl">Profile can be deleted by navigating to the <span className="font-bold">Create Profile</span> tab and clicking on the delete button in the prompt.</p>
            </div>
        </div>
    </div>
    <Footer />

    </>
    )
}

  {/*<div /* get started *//* className="rounded-lg">
                <h2 className="mb-8 font-semibold text-3xl">Get Started:</h2>
                <ul className="start--ul">
                    <li className="start--li">Explore the Spotify catalogue.</li>
                    <li className="start--li">Choose something to listen to while in flow.</li>
                    <li className="start--li">Set time intevals for both flow and rest. Also, set reminders if you would like to keep tack of remaining time.</li>
                    <li className="start--li">Listen and get into flow!</li>
                </ul>
            </div>*/}