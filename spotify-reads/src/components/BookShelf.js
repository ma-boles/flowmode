import React from "react";
import Book from "./Book";

export default function BookShelf() {
    return (
        <>
            <div className="bookshelf--container">
                <Book title="Book 1" author="Author 1" book_time="10hr 25min"/>
                <Book title="Book 2" author="Author 2" book_time="10hr 25min"/>
                
            </div>
        </>
    )
}
