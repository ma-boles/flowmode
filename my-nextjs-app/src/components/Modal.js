import { useSession } from "next-auth/react";
import React, { useState } from "react";
import axios from "axios";

export default function Modal ({ setIsOpen }) {
    const { data: session } = useSession();
    const [accountStatus, setAccountStatus] = useState('');
    const [showHeading, setShowHeading] = useState(true);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleTrack = async () => {
        if(!session) {
            alert('Log in required');
            return;
        }

        const { user } = session;

        try {
            const response = await axios.post('/api/create-account', {
                spotifyId: user.id,
                spotifyName: user.name,
                email: user.email
            });

            if(response.status === 201) {
                setAccountStatus('created');
                setShowHeading(false);
                setShowSuccess(true);
            } else if (response.status === 200) {
                setAccountStatus('');
                alert('User account already exists');
            }
        } catch(error) {
            console.error('Error creating user account', error);
            alert('Failed to create user account');
        }
    };

    const handleDontTrack = async () => {
        if(!session) {
            alert('Log in required');
            return;
        }

        const { user } = session;

        try {
            const response = await axios.delete('/api/create-account', {
                data: { email: user.email } // sending email in the reuest body
            });

            if (response.status === 200) {
                setAccountStatus('deleted');
                setShowHeading(false);
                setShowSuccess(true);
            } else if (response.status === 404) {
                setAccountStatus('');
                alert('User account not found');
            }
        } catch (error) {
            console.error('Error deleting user account', error);
            alert('Failed to delete user account');
        }
    };

    return (
        <div className="border border-solid border-white rounded-sm modal" /*onClick={() => setIsOpen(false)}*/>
            <div className={`flex justify-end ${accountStatus === 'created' ? 'bg-green-600' : accountStatus === 'deleted' ? 'bg-red-600' : 'bg-transparent'}`}>
                <span className="px-2 py-1 m-2 cursor-pointer text-xs rounded-sm hover:bg-red-600" onClick={() => setIsOpen(false)}>X</span>
            </div>

    {showHeading && (
        <div className="mb-8 text-center">
                <h1 className="px-8 py-4 text-6xl"><span className="text-green-600 font-bold">flow</span><span className="font-thin">mode</span></h1>
            </div>
    )}

        {showSuccess && (
            <div /* success div */ className={`${accountStatus === 'created' ? 'bg-green-600' : 'bg-red-600'}`}>
                <div /* success img*/ className="flex justify-center items-center">
                    <div className={`checkmark-container ${accountStatus === 'created' ? 'bg-green-600' : accountStatus === 'deleted' ? 'bg-red-600' : 'bg-gray-600'}`}>
                        <img src="circle-check-regular.svg" alt="checkmark" className="checkmark-img"></img>
                    </div>
                </div>
                <div /* success text */ className="mt-4">
                    <h2 className="text-center text-2xl font-semibold"> Success! </h2>
                    {accountStatus === 'created' && <p className="my-4 px-6 text-center font-medium text-xl">You have successfully created a user account!</p>}
                    {accountStatus === 'deleted' && <p className="my-4 px-6 text-center font-medium text-xl">You have successfully deleted your user account!</p>}
                </div>
            </div>
        )}

        {showHeading && (
            <div className="pt-4 bg-white border border-solid border-slate-800 text-center rounded-md">
                    <h2 className="m-6 text-black text-xl font-semibold">Keep track of your total time in flow per day/week/month?</h2>
                <div className="m-8 pt-2 flex justify-around">
                    <button className="p-2 w-32 bg-red-600 rounded-md hover:bg-gray-800 transition duration-300 ease-in-out" onClick={handleDontTrack}>Don't Track</button>
                    <button className="p-2 w-32 bg-green-600 rounded-md hover:bg-gray-800 transition duration-300 ease-in-out" onClick={handleTrack}>Track</button>
                </div>
            </div>
            )}
        </div>
    )
}