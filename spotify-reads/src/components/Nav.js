import React from 'react';
import "../styles/styles.css";
/*import '../styles/Nav.css';*/

export default function Nav({ scrollToRef }) {

    function changeText() {
        var timeRemaining = document.getElementById('time');
        timeRemaining.textContent = '00:00';
    }

    return(
        <>
            <section className='flex justify-between items-center w-full'>
                <div className='logo--section'>
                    <p className='pt-4 font-bold text-lg mt-2 ml-4'>Spotify Reads</p>
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