import React from 'react';

export default function Nav({ scrollToRef }) {

    function changeText() {
        var timeRemaining = document.getElementById('time');
        timeRemaining.textContent = '00:00';
    }

    return(
        <>
            <section className='nav flex items-center w-full my-0 mx-4'>
                <div className='mt-4 ml-4'>
                    <p className='pt-20 font-bold text-lg mt-8 ml-8'>Spotify Reads</p>
                </div>
                <div className='links--section'>
                    <ul className='list-none mr-8'>
                        <li onClick={() => scrollToRef('Bookshelf')}>Bookshelf</li>
                        <li onClick={() => scrollToRef('Queue')}>Queue</li>
                        <li onClick={() => scrollToRef('ReadingList')}>Reading List</li>

                        <li>Catalogue</li>

                        <li className='bg-transparent p-1 border-1 border-double border-whitesmoke text-base w-20 text-center cursor-pointer' id='time' onClick={changeText}>Time Left</li>
                    </ul>
                </div>
            </section>
        </>
    )
}