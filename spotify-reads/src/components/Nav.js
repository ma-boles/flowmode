import React from 'react';
import '../styles/Nav.css';

export default function Nav() {
    return(
        <>
            <section className='nav'>
                <p className='logo--p'>Spotify Reads</p>

                <ul>
                    <a><li>Book Shelf</li></a>
                    <a><li>Queue</li></a>
                    <a><li>Wish List</li></a>
                    <li className='time'>Time Left</li>
                </ul>
            </section>
        </>
    )
}