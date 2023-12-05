import React, { useEffect, useRef, useState } from "react";
import { ShelfProvider } from "../components/ShelfContext";
import { useShelfContext } from "../components/ShelfContext";
import Nav from "../components/Nav";
import BookShelf from "../components/BookShelf";
import Queue from "../components/Queue";
import ReadingList from "../components/ReadingList";
import arrow from "../images/circle-arrow-up-solid.svg";

import Collection from "../images/Collection.jpg";
import "../styles/App.css";
import "../styles/Shelf.css";

export default function ShelfPage() {
    const { shelves, handleMoveBook, handleRemoveBook, setShelves } = useShelfContext();

    useEffect(() => {
        console.log('Updated Shelves:', shelves);
    }, [shelves]);


    return(
        <ShelfProvider>
            <div>
                <ShelfPageContent setShelves={setShelves}/>
            </div>
        </ShelfProvider>
    )
};

function ShelfPageContent ({ setShelves }) {

    const { shelves, handleMoveBook, handleRemoveBook } = useShelfContext();

    useEffect(() => {
        console.log('Shelves updated:', shelves);
    }, [shelves]);
    
//function to calculate total time for shelf
const calculateTotalTime = (books) => {
    let totalHours = 0;
    let totalMinutes = 0;

    for (const book of books) {
        const [hoursStr, minutesStr] = book.book_time.split('hr ');

        // extract hours
        const hours = parseInt(hoursStr, 10) || 0;
        totalHours += hours;

        //extract minutes
        const minutesMatch = minutesStr.match(/\d+/); //extract digits from string
        const minutes = parseInt(minutesMatch, 10) || 0;
        totalMinutes += minutes;
        
    }

    totalHours += Math.floor(totalMinutes/60);
    totalMinutes %= 60;

   
    return {
        hours: totalHours, 
        minutes: totalMinutes,
    };
};

//function to update the total time for each shelf
const updateTotalTimes = () => {
    const updatedShelves = {...shelves};

    for (const shelf in updatedShelves) {
        updatedShelves[shelf].totalTime = calculateTotalTime(updatedShelves[shelf]);
    }

    setShelves(updatedShelves);
};

useEffect(() => {
    updateTotalTimes();
}, []);


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


    return (
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
        {shelves.bookshelf && shelves.bookshelf.totalTime ? `${shelves.bookshelf.totalTime.hours}hr ${shelves.bookshelf.totalTime.minutes}min` : '00:00' }</strong>
    </div>
    <h2 className="bookshelf--h2">Bookshelf</h2>

        <BookShelf 
        title="Bookshelf"
        books={shelves.bookshelf}
        onMoveBook={handleMoveBook}
        onRemove={handleRemoveBook}
        shelfName="bookshelf"
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
        {shelves.queue && shelves.queue.totalTime ? `${shelves.queue.totalTime.hours}hr ${shelves.queue.totalTime.minutes}min` : '00:00' }</strong>
    </div>
    <h3 className="queue--h3">Queue</h3>

        <Queue 
        title="Queue"
        books={shelves.queue}
        onMoveBook={handleMoveBook}
        onRemove={handleRemoveBook}
        shelfName="queue"
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
        shelfName="readingList"
        />

    <div className="top--button--div">
        <button className="top--button" onClick={scrollToTop}>
            <img src={arrow} alt="scroll to top" className="img--arrow"></img>
        </button>
    </div>
</section>
</div>
        </>
    );
};


// create a copy of the shelves array with modified shelf
{/*const updatedShelves = {
    ...prevShelves,
    [shelfName]: currentShelfBooks,

};
console.log('updatedShelves:', updatedShelves);
    return updatedShelves
    
});*/}