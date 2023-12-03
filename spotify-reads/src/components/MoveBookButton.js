import React from "react";
import "../styles/Book.css"
import plus from "../images/plus-solid.svg";
import remove from "../images/trash-solid.svg"

export default function MoveBookButton({ book, targetShelf, actionType, onMoveBook, onRemove }) {

    const handleButtonClick = () => {
        if(actionType === 'move') {
            onMoveBook(book, targetShelf);
        } else if (actionType === 'remove') {
            onRemove(book, targetShelf);
        }
    };

    return(
        <>
            <button onClick={handleButtonClick} className="move--button">
                {actionType === 'move' ? <img src={plus} alt="add" className="book--icon"></img> : <img src={remove} alt="remove" className="book--icon"></img> }
                {actionType === 'move' ? `Add to ${targetShelf}`: 'Remove'}
            </button>
        </>
    );
};