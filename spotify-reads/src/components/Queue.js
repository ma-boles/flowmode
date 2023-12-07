import React, { useState } from "react";
import Book from "./Book";
import EllipsisButton from "./EllipsisButton";


export default function Queue({ books, onMoveBook, onRemove, shelfName }) {

    const [ bookEllipsisVisibility, setBookEllipsisVisibility ] = useState({});

    const handleEllipsisClick =(bookId, isEllipsisVisible) => {
        setBookEllipsisVisibility((prevVisibility) => ({
            ...prevVisibility,
            [bookId]: isEllipsisVisible,
        }));
    };
    
    const handleRemoveClick = (book) => {
        onRemove(book, shelfName);
    };

    return (
        <>
            <div className="queue--container">
                {books.map((book) => (
                    <div key={book.id} className="ellipsis--div">
                        <Book 
                        key={book.id} 
                        book={book} 
                        onMoveBook={onMoveBook} 
                        />
                        <EllipsisButton 
                        book={book.id}
                        shelfName="queue"
                        onRemove={handleRemoveClick}
                        onEllipsisClick={(isEllipsisVisible) => 
                        handleEllipsisClick(book.id, isEllipsisVisible)}
                        />
                    </div>
                ))}
            </div>
        </>
    )
}
