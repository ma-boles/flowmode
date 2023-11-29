import React, { useRef, useState } from "react";
import Nav from "../components/Nav";
import BookShelf from "../components/BookShelf";
import Queue from "../components/Queue";
import ReadingList from "../components/ReadingList";
import arrow from "../images/circle-arrow-up-solid.svg";

import Collection from "../images/Collection.jpg";
import "../styles/App.css";
import "../styles/Shelf.css";

export default function ShelfPage( ) {

// book data
const [ shelves, setShelves ] = useState({

    bookshelf: [
        { id: 'book1', title:"Book 1", author:"Author 1", book_time:"10hr 25min" },
        { id: 'book2', title:"Book 2", author:"Author 2", book_time:"10hr 25min" }
    ],
    queue: [
        { id: 'book5', title:"Book 5", author:"Author 5", book_time:"7hr 45min" },
        { id: 'book6', title:"Book 6", author:"Author 6", book_time:"7hr 45min" }
    ],
    readingList: [
        { id:'book3', title:"Book 3", author:"Author 3", book_time:"5hr 20min" },
        { id:'book4', title:"Book 4", author:"Author 4", book_time:"5hr 20min" }
        ],
});

// book add/remove logic
const handleMoveBook = (book, targetShelfIndex) => {
    //find index of book in current shelf
    const currentShelfIndex = shelves.findIndex((shelf) => shelf.some((b) => b.id === book.id));
    //create copies of current and target shelves' book arrays
    const currentShelfBooks = [...shelves[currentShelfIndex]];
    const targetShelfBooks = [...shelves[targetShelfIndex]];
    
    // remove book from current shelf
    const currentIndex = currentShelfBooks.findIndex((b) => b.id === book.id);
    currentShelfBooks.splice(currentIndex, 1);
    // add book to target shelf
    targetShelfBooks.push(book);

    // update state with modified shelves
    setShelves((prevShelves) => {
        const updatedShelves = [...prevShelves];
        updatedShelves[currentShelfIndex] = currentShelfBooks;
        updatedShelves[targetShelfIndex] = targetShelfBooks;
        return updatedShelves;
    })
};

const handleRemoveBook = (book) => {
    // find index of book in current shelf
    const currentShelfIndex = shelves.findIndex((shelf) => shelf.some((b) => b.id === book.id));

    // create copy of currnet shelf books array
    const currentShelfBooks = [...shelves[currentShelfIndex]];

    // remove book from its current shelf
    const currentIndex = currentShelfBooks.findIndex((b) => b.id === book.id);
    currentShelfBooks.splice(currentIndex, 1);
    
    // update state with modified shelf
    setShelves((prevShelves) => {
        const updatedShelves = [...prevShelves];
        updatedShelves[currentShelfIndex] = currentShelfBooks;
        return updatedShelves;
    });
};

// scroll logic
    const bookshelfRef = useRef(null);
    const queueRef = useRef(null);
    const readingListRef = useRef(null);

     const scrollToRef = (section) => {
        if(section === 'Bookshelf') {
            bookshelfRef.current.scrollIntoView({ behavior: 'smooth'});
        } else if (section === 'Queue') {
            queueRef.current.scrollIntoView({ behavior: 'smooth'});
        } else if (section === 'ReadingList') {
            readingListRef.current.scrollIntoView({ behavior: 'smooth'});
        };
    }

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return(
        <>
        <Nav scrollToRef={scrollToRef}/>

            <div className="shelf">
            <section className="img--section">
                <img src={Collection} alt="astronaut lying down reading a book" className="shelf--img"></img>
            </section>

            <hr className="shelf--hr"/>

            <section className='bookshelf--section' ref={bookshelfRef}>
                <div className="shelf--time">
                    <strong><p>Total Time:</p>
                    00:00</strong>
                </div>
                <h2 className="bookshelf--h2">Bookshelf</h2>

                <BookShelf 
                title="Bookshelf"
                books={shelves.bookshelf}
                onMoveBook={handleMoveBook}
                onRemove={handleRemoveBook}
                />

                <div className="top--button--div">
                    <button className="top--button" onClick={scrollToTop}>
                        <img src={arrow} alt="scroll to top" className="img--arrow"></img>
                    </button>
                </div>
            </section>

            <hr className="shelf--hr"/>


            <section className='queue--section' ref={queueRef}>
                <div className="shelf--time">
                    <strong><p>Total Time:</p>
                    00:00</strong>
                </div>
                <h3 className="queue--h3">Queue</h3>

                <Queue 
                title="Queue"
                books={shelves.queue}
                onMoveBook={handleMoveBook}
                onRemove={handleRemoveBook}
                />

                <div className="top--button--div">
                    <button className="top--button" onClick={scrollToTop}>
                        <img src={arrow} alt="scroll to top" className="img--arrow"></img>
                    </button>
                </div>
            </section>

            <hr className="shelf--hr"/>

            <section className='readinglist--section' ref={readingListRef}>
                <h3 className="readinglist--h3">Reading List</h3>

                <ReadingList 
                title="Reading List"
                books={shelves.readingList}
                onMoveBook={handleMoveBook}
                onRemove={handleRemoveBook}
                />

                <div className="top--button--div">
                    <button className="top--button" onClick={scrollToTop}>
                        <img src={arrow} alt="scroll to top" className="img--arrow"></img>
                    </button>
                </div>
            </section>
        </div>
        </>
    )
}
 
   /*const handleAddToShelf = (book, shelfSetter) => {
        shelfSetter((prevBooks) => [...prevBooks, book]);
    };

    const handleRemoveFromShelf = (book, shelfSetter) => {
        shelfSetter((prevBooks) => prevBooks.filter((b) => b !== book));
    };*/