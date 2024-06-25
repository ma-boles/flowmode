import { useSession } from "next-auth/react";
import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";

export default function Modal ({ setIsOpen }) {
    const { data: session } = useSession();
    const [accountStatus, setAccountStatus] = useState('');
    const [warningStatus, setWarningStatus] = useState('');
    const [failStatus, setFailStatus] = useState('');

    const [showHeading, setShowHeading] = useState(true);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showFail, setShowFail] = useState(false);
    const [showWarning, setShowWarning] = useState(false);


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
                setWarningStatus('already exists');
                setShowHeading(false);
                setShowWarning(true);
            }
        } catch(error) {
            console.error('Error creating user account', error);
            setFailStatus('not created')
            setShowHeading(false);
            setShowFail(true);
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
                data: { email: user.email } // sending email in the request body
            });

            if (response.status === 200) {
                setAccountStatus('deleted');
                setShowHeading(false);
                setShowSuccess(true);
            }
        } catch (error) {
            if(error.response && error.response.status === 404) {
                console.log('Setting warning status for 404');
                setWarningStatus('not found');
                setShowHeading(false);
                setShowWarning(true);
            } else {
                console.error('Error deleting user account', error);
                setFailStatus('not deleted');
                setShowHeading(false);
                setShowFail(true);
            }
        }
    };

    const getBackgroundColor = () => {
        if(accountStatus === 'created' || accountStatus === 'deleted') {
            return 'bg-green-600';
        }
        if(failStatus === 'not created' || failStatus === 'not deleted') {
            return 'bg-red-600';
        }
        if(warningStatus === 'not found' || warningStatus === 'already exists') {
            return 'bg-orange-600'
        }
        return 'bg-transparent';
    };

    return (
        <div className="border border-solid border-white rounded-sm modal" /*onClick={() => setIsOpen(false)}*/>
            <div className={`flex justify-end ${getBackgroundColor()}`}>
                <span className="px-2 py-1 m-2 cursor-pointer text-xs rounded-sm hover:bg-red-600" onClick={() => setIsOpen(false)}>X</span>
            </div>

    {showHeading && (
        <div className="mb-8 text-center">
                <h1 className="px-8 py-4 text-6xl"><span className="text-green-600 font-bold">flow</span><span className="font-thin">mode</span></h1>
            </div>
    )}

        {showSuccess && (
            <div /* success div */ className="bg-green-600">
                <div /* success img*/ className="flex justify-center items-center">
                    <div className="bg-green-600 checkmark-container">
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

        {showWarning && (
            <div /* warning div */ className="bg-orange-600">
             <div /* warning img*/ className="flex justify-center items-center">
                 <div className='checkmark-container bg-orange-600'>
                     <img src="circle-exclamation-solid.svg" alt="checkmark" className="checkmark-img"></img>
                 </div>
             </div>
             <div /* warning text */ className="mt-4">
                {warningStatus === 'already exists' && <h2 className="my-4 px-6 text-center font-bold text-xl">User account already exists!</h2>}
                {warningStatus === 'not found' && <h2 className="my-4 px-6 text-center font-bold text-xl">User account not found!</h2>}
             </div>
         </div>
        )}

        {showFail && (
            <div /* fail div */ className="bg-red-600">
                <div /* fail img*/ className="flex justify-center items-center">
                    <div className='bg-red-600 checkmark-container'>
                        <img src="circle-xmark-regular.svg" alt="checkmark" className="checkmark-img"></img>
                    </div>
                </div>
                <div /* fail text */ className="mt-4">
                    <h2 className="text-center text-2xl font-semibold"> Warning! </h2>
                    {failStatus === 'not created' && <p className="my-4 px-6 text-center font-medium text-xl">Failed to create account.</p>}
                    {failStatus === 'not deleted' && <p className="my-4 px-6 text-center font-medium text-xl">Failed to delete account.</p>}
                </div>
            </div>
        )}

        {showHeading && (
            <div className="pt-4 bg-white border border-solid border-slate-800 text-center rounded-md">
                <h2 className=" text-black text-xl font-semibold">Create an <Link href='/get-started'className="text-xl font-bold underline text-green-700">Account</Link>?</h2>
                    <h2 className="mx-6 mt-2 text-black text-xl">Keep track of your total time in flow + rest per day/week/month?</h2>
                <div className="m-8 pt-2 flex justify-around">
                    <button className="p-2 w-32 bg-red-600 rounded-md hover:bg-gray-800 transition duration-300 ease-in-out" onClick={handleDontTrack}>Cancel</button>
                    <button className="p-2 w-32 bg-green-600 rounded-md hover:bg-gray-800 transition duration-300 ease-in-out" onClick={handleTrack}>Create</button>
                </div>
            </div>
            )}
        </div>
    )
}