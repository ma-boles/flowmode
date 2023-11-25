import React from "react";
import BookSection from "./BookSection";

export default function Queue() {
    const books = [
        { id: 'book5', title:"Book 5", author:"Author 5", book_time:"7hr 45min" },
        { id: 'book6', title:"Book 6", author:"Author 6", book_time:"7hr 45min" }
    ]

    return (
        <>
            <div className="queue--container">
                <BookSection books={books}/>
            </div>
        </>
    )
}
