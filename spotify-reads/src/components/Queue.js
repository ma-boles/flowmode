import React from "react";
import Book from "./Book";

export default function Queue() {
    return (
        <>
            <div className="queue--container">
                <Book title="Book 5" author="Author 5" book_time="7hr 45min"/>
                <Book title="Book 6" author="Author 6" book_time="7hr 45min"/>
            </div>
        </>
    )
}
