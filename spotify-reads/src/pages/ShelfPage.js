import React from "react";
import Nav from "../components/Nav";
import BookShelf from "../components/BookShelf";
import Queue from "../components/Queue";
import ReadingList from "../components/ReadingList";

import Bookshelf from "../images/Bookshelf.jpg"
import "../styles/App.css";
import "../styles/Shelf.css"

export default function ShelfPage() {
    return(
        <>
        <Nav />
            <div className="shelf">
            <section className="img--section">
                <img src={Bookshelf} alt="astronaut lying down reading a book" className="shelf--img"></img>
            </section>

            <hr className="shelf--hr"/>

            <section className='bookshelf--section'>
                <div className="shelf--time">
                    <strong><p>Total Time:</p>
                    00:00</strong>
                </div>
                <h2 className="bookshelf--h2">Bookshelf</h2>
                <BookShelf />
            </section>

            <hr className="shelf--hr"/>

            <section className='queue--section'>
                <div className="shelf--time">
                    <strong><p>Total Time:</p>
                    00:00</strong>
                </div>
                <h3 className="queue--h3">Queue</h3>
                
                <Queue />
            </section>

            <hr className="shelf--hr"/>

            <section className='readinglist--section'>

            <h3 className="readinglist--h3">Reading List</h3>

                <ReadingList />
            </section>
        </div>
        </>
    )
}