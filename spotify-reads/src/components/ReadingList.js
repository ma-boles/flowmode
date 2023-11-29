import React, { useState } from "react";
import Book from "./Book";
import EllipsisButton from "./EllipsisButton";

export default function ReadingList({ books, onMoveBook, onRemove }) {

    const [ bookEllipsisVisibility, setBookEllipsisVisibility ] = useState({});

    const handleEllipsisClick =(bookId, isEllipsisVisible) => {
        setBookEllipsisVisibility((prevVisibility) => ({
            ...prevVisibility,
            [bookId]: isEllipsisVisible,
        }));
    };
    
    return (
        <>
            <div className="readinglist--container">
            {books.map((book) => (
                <div key={book.id} className="ellipsis--div">
                <Book 
                key={book.id} 
                book={book} 
                onMoveBook={() => onMoveBook(book, 'someTargetShelf')} 
                onRemove={() => onRemove(book)}
                />
                <EllipsisButton 
                onEllipsisClick={(isEllipsisVisible) => 
                handleEllipsisClick(book.id, isEllipsisVisible)}/>
                </div>
            ))}
            </div>
        </>
    )
}
