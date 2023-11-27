import React from "react";
import Book from "./Book";

export default function BookSection({ title, books, bookStates,handleEllipsisClick, toggleAddOptions, onRemove }) {

    return(
        <>
        {books.map((book) => (
            <Book
            key={book.id}
            title={book.title}
            author={book.author}
            book_time={book.book_time}
            onAddToBookshelf={onAddToBookshelf(book)}
            onAddToQueue={onAddToQueue(book)}
            onAddToReadingList={onAddToReadingList(book)}
            onRemove={onRemove(book)}
            isEllipsisVisible={bookStates[book.id].isEllipsisVisible}
            isAddOptionsVisible={bookStates[book.id].isAddOptionsVisible}
            handleEllipsisClick={() => handleEllipsisClick(book.id)}
            toggleAddOptions={() => toggleAddOptions(book.id)}
            />
        ))}
        </>
    )
};


/*(() => {
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
        });*/