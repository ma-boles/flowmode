import React from 'react';
import '../styles/Nav.css';

export default function Nav() {

    function changeText() {
        var timeRemaining = document.getElementById('time');
        timeRemaining.textContent = '00:00';
    }

    return(
        <>
            <section className='nav'>
                <p className='logo--p'>Spotify Reads</p>

                <ul>
                    <a><li>Book Shelf</li></a>
                    <a><li>Queue</li></a>
                    <a><li>Wish List</li></a>
                    <li className='time' id='time' onClick={changeText}>Time Left</li>
                </ul>
            </section>
        </>
    )
}