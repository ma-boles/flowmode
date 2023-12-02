import React, { useState } from "react";
import Book from "./Book";
import EllipsisButton from "./EllipsisButton";

export default function ReadingList({ books, onMoveBook, onRemove, shelfName }) {

    const [ bookEllipsisVisibility, setBookEllipsisVisibility ] = useState({});

    const handleEllipsisClick =(bookId, isEllipsisVisible) => {
        setBookEllipsisVisibility((prevVisibility) => ({
            ...prevVisibility,
            [bookId]: isEllipsisVisible,
        }));
    };
    
    const handdleRemoveClick = (book) => {
        onRemove(book, shelfName);
    };

    return (
        <>
            <div className="readinglist--container">
            {books.map((book) => (
                <div key={book.id} className="ellipsis--div">
                <Book 
                key={book.id} 
                book={book} 
                onMoveBook={onMoveBook} 
                />
                <EllipsisButton 
                book={book.id}
                onRemove={handdleRemoveClick}
                onEllipsisClick={(isEllipsisVisible) => 
                handleEllipsisClick(book.id, isEllipsisVisible)}/>
                </div>
            ))}
            </div>
        </>
    )
}
