import React from "react";
import "../styles/styles.css";
/*import "../styles/Book.css"*/

import cover from "../images/image-solid.svg";


export default function Book({ book, isEllipsisVisible }) {

    const ellipsisStyles = {
        display: isEllipsisVisible ? 'block' : 'none',
    };

    return (
        <>
        <div className="text-center inline-block">

            <div className="text-center mt-4 mr-4 ml-4 mb-0 rounded-lg h-68 w-48">
                <img src={cover} alt="book cover" className="h-40"></img>

                <div className="text-left mx-4">
                    {book.title}<br/>
                    {book.author}<br/><br/>
                    <strong><p className="book--p--time">{book.book_time}</p></strong>
                </div>
            </div>
            <br/>
        </div>
        </>
    )
}