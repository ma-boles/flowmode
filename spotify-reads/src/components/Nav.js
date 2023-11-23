import React from 'react';
import '../styles/Nav.css';

export default function Nav({ scrollToRef }) {

    function changeText() {
        var timeRemaining = document.getElementById('time');
        timeRemaining.textContent = '00:00';
    }

    /*const bookshelfHandleScroll = () => {
        myRef.current.scrollIntoView({behavior: 'smooth'});
    }
    function queueHandleScroll() {
        alert("queue")
    }
    function readingListHandleScroll() {
        alert("reading list")
    }*/

    return(
        <>
            <section className='nav'>
                <div className='logo--section'>
                    <p className='logo--p'>Spotify Reads</p>
                </div>
                <div className='links--section'>
                    <ul>
                        <li onClick={() => scrollToRef('Bookshelf')}>Bookshelf</li>
                        <li onClick={() => scrollToRef('Queue')}>Queue</li>
                        <li onClick={() => scrollToRef('ReadingList')}>Reading List</li>

                        <li>Catalogue</li>

                        <li className='time' id='time' onClick={changeText}>Time Left</li>
                    </ul>
                </div>
            </section>
        </>
    )
}