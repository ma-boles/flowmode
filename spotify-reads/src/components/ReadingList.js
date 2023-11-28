import React from "react";
import Book from "./Book";

export default function ReadingList({ books, onMoveBook, onRemove }) {
    
    return (
        <>
            <div className="readinglist--container">
            {books.map((book) => {
                <Book 
                key={book.id} 
                book={book} 
                onMoveBook={() => onMoveBook(book, 'someTargetShelf')} 
                onRemove={() => onRemove(book)}/>
            })}
            </div>
        </>
    )
}
