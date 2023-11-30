import React from "react";
import "../styles/Book.css"

import cover from "../images/image-solid.svg";


export default function Book({ book, isEllipsisVisible }) {

    const ellipsisStyles = {
        display: isEllipsisVisible ? 'block' : 'none',
    };

    return (
        <>
        <div className="book--container">

            <div className="book--card">
                <img src={cover} alt="book cover" className="book--cover"></img>

                <div className="book--info">
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