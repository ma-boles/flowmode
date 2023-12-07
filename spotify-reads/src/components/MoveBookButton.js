import React from "react";
import { useShelfContext } from "./ShelfContext";
import "../styles/Book.css";
import plus from "../images/plus-solid.svg";
import remove from "../images/trash-solid.svg";

export default function MoveBookButton({ book, shelfName
    , targetShelf, actionType, onMoveBook, onRemove }) {
        const { handleRemoveBook } = useShelfContext();

    const handleButtonClick = () => {
        if(actionType === 'move') {
            // add logic for moving a book
            onMoveBook(book, targetShelf);
        } else if (actionType === 'remove') {
            //logic for removing book
            handleRemoveBook(book, shelfName);
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