import React, { useState } from "react";
import BookSection from "./BookSection";

export default function ShelfSection({ title, books, onAddToBookshelf, onAddToQueue, onAddToReadingList }) {

    const [ bookStates, setBookStates ] = useState(
        books.reduce((acc, book) => {
            acc[book.id] = { isEllipsisVisible: false, isAddOptionsVisible: false };
            return acc;
        }, {})
    );

    const handleEllipsisClick = (bookId) => {
        setBookStates((prevStates) => ({
            ...prevStates,
            [bookId]: {...prevStates[bookId], isEllipsisVisible: !prevStates[bookId].isEllipsisVisible },
        }));
    };

    const toggleAddOptions = (bookId) => {
        setBookStates((prevStates) => ({
            ...prevStates,
            [bookId]: {...prevStates[bookId], isAddOptionsVisible: !prevStates[bookId].isAddOptionsVisible },
        }));
    };


    // add logic 
    const handleAddToBookshelf = (book) => {
        //check if the book is already in shelf
        if(!bookshelfBooks.some((b) => b.id === book.id)) {
            //add book to shelf 
            setBookshelfBooks((prevBooks) => [...prevBooks, book]);
            console.log('Book added to bookshelf:', book);
        } else {
            console.log('Book is already in bookshelf:', book);
        }
    };

    const handleAddToQueue = (book) => {
        if(!queueBooks.some((b) => b.id === book.id)) {
            setQueueBooks((prevBooks) => [...prevBooks, book]);
            console.log('Book added to queue:', book);
        } else {
            console.log('Book already in queue:', book);
        }
    };

    const handleAddToReadingList = (book) => {
        if(!readingListBooks.some((b) => b.id === book.id)) {
            setReadingListBooks((prevBooks) => [...prevBooks, book]);
            console.log('Book added to reading list:', book);
        } else {
            console.log('Book already in reading list:', book);
        }
    };
    

    // remove logic
    const handleRemoveFromBookshelf = (book) => {
        setBookshelfBooks((prevBooks) => prevBooks.filter((b) => b.id !== book.id));
        console.log('Book removed from shelf:', book);
    };

    const handleRemoveFromQueue = (book) => {
        setQueueBooks((prevBooks) => prevBooks.filter((b) => b.id !== book.id ));
        console.log('Book removed from queue:', book);
    };

    const handleRemoveFromReadingList = (book) => {
        setReadingListBooks((prevBooks) => prevBooks.filter((b) => b.id !== book.id));
        console.log('Book removed from reading list:', book);
    };

    return(
        <>
        <BookSection
        title={title}
        books={books}
        bookStates={bookStates}
        handleEllipsisClick={handleEllipsisClick}
        toggleAddOptions={toggleAddOptions}
        onAddToBookshelf={onAddToBookshelf}
        onAddToQueue={onAddToQueue}
        onAddToReadingList={onAddToReadingList}/>
        </>
    )
}