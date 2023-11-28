import React from "react";
import Book from "./Book";


export default function Queue({ books, onMoveBook, onRemove}) {
    
    return (
        <>
            <div className="queue--container">
                {books.map((book) => {
                    <Book key={book.id} book={book} onMoveBook={onMoveBook} onRemove={onRemove}
                    />
                })}
            </div>
        </>
    )
}
