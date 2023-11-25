import React, { useState } from "react";
import Book from "./Book";

export default function BookSection({ books }) {
    const [ bookStates, setBookStates ] = useState(() => {
        const initialState = new Map();
        books.forEach((book) => {
            initialState.set(book.id, { isEllipsisVisible: false, isAddOptionsVisible: false });
        });
        return initialState;
    });

    const handleEllipsisClick = (bookId) => {
        setBookStates((prevState) => {
            const newState = new Map(prevState);
            const bookState = newState.get(bookId);
            newState.set(bookId, { ...bookState, isEllipsisVisible: !bookState.isEllipsisVisible });
            return newState;
        });
    };

    const toggleAddOptions = (bookId) => {
        setBookStates((prevState) => {
            const newState = new Map(prevState);
            const bookState = newState.get(bookId);
            newState.set(bookId, { ...bookState, isAddOptionsVisible: !bookState.isAddOptionsVisible });
            return newState;
        });
    };

    return(
        <>
        {books.map((book) => (
            <Book
            key={book.id}
            title={book.title}
            author={book.author}
            book_time={book.book_time}
            handleEllipsisClick={() => handleEllipsisClick(book.id)}
            toggleAddOptions={() => toggleAddOptions(book.id)}
            />
        ))}
        </>
    )
}