import React from "react";
import Nav from "../components/Nav";
import BookShelf from "../components/BookShelf";
import Queue from "../components/Queue";
import ReadingList from "../components/ReadingList";

import "../styles/App.css";
import "../styles/Shelf.css"

export default function ShelfPage() {
    return(
        <>
        <Nav />
        
        <section className='bookshelf--section'>
            <h2 className="bookshelf--h2">BookShelf</h2>
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