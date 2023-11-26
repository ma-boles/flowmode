import React, { useState } from "react";
import BookSection from "./BookSection";

export default function ShelfSection({ title, books }) {

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

    return(
        <>
        <BookSection
        title={title}
        books={books}
        bookStates={bookStates}
        handleEllipsisClick={handleEllipsisClick}
        toggleAddOptions={toggleAddOptions}/>
        </>
    )
}