import React from 'react';
import Link from 'next/link';
import '@/app/styles/styles.css'

export default function NavBar({ accessToken, scrollToRef }) {

    /*const accessToken = accessToken;*/

    function changeText() {
        var timeRemaining = document.getElementById('time');
        timeRemaining.textContent = '00:00';
    }

    return(
        <div>
            <section className='flex justify-between my-0 mx-4 w-full'>
                <div className='mt-4 ml-4'>
                    <p className='mt-2 ml-4 font-bold text-base'>Spotify Reads</p>
                    {/*<UserProfile accessToken={accessToken}/>*/}
                </div>
                <div className='links--section'>
                    <ul className='mr-8 list-none'>
                        <li onClick={() => scrollToRef('Bookshelf')}>Bookshelf</li>
                        <li onClick={() => scrollToRef('Queue')}>Queue</li>
                        <li onClick={() => scrollToRef('ReadingList')}>Reading List</li>

                        <Link href="/browse"><li>Browse</li></Link>
                        <Link href="/dashboard"><li>Dashboard</li></Link>

                        <li className='p-1 text-center text-base bg-transparent w-20 border-solid border-2 border-neutral-100 cursor-pointer' id='time' onClick={changeText}>
                            <p className=' text-sm'>Time Left</p></li>
                    </ul>
                </div>
            </section>
        </div>
    )
}