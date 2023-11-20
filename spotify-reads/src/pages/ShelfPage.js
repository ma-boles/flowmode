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
        
        <section className="img--section">
            <img src={Bookshelf} alt="astronaut lying down reading a book" className="shelf--img"></img>
        </section>
        
        <section className='bookshelf--section'>
            <h2 className="bookshelf--h2">Bookshelf</h2>
            <BookShelf />
        </section>

        <section className='queue--section'>
            <h3 className="queue--h3">Queue</h3>
            <Queue />
        </section>


        <section className='readinglist--section'>
        <h3 className="readinglist--h3">Reading List</h3>

            <ReadingList />
        </section>
        
        </>
    )
}