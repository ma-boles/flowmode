import React from "react";
import MoveBookButton from "./MoveBookButton";
import "../styles/Book.css"

import ellipsis from "../images/ellipsis-solid.svg";
import cover from "../images/image-solid.svg";
/*import plus from "../images/plus-solid.svg";*/
import remove from "../images/trash-solid.svg"

export default function Book({ book, id, title, author, book_time, onMoveBook, onRemove, isEllipsisVisible, handleEllipsisClick }) {

    const ellipsisStyles = {
        display: isEllipsisVisible ? 'block' : 'none',
    };

    return (
        <>
        <div className="book--container">

            <div className="book--card">
                <img src={cover} alt="book cover" className="book--cover"></img>

                <div className="book--info">
                
                    {title}<br/>
                    {author}<br/><br/>
                    <strong><p className="book--p--time">{book_time}</p></strong>

                </div>
            </div>

            <img src={ellipsis} alt="ellipsis" className="book--ellipsis" onClick={handleEllipsisClick}></img><br/>

            <div className= "book--add" id={`book--add ${id}`} style={ellipsisStyles}>

                <ul className="addlist">

                    <li className="addlist--li">
                        <MoveBookButton book={book} targetShelf="Bookshelf" actionType="move" onMoveBook={onMoveBook}/>
                        {/*<button className="addlist--button" onClick={onAddToBookshelf}>Add to Bookshelf</button>*/}
                    </li>
                    <li className="addlist--li">
                        <MoveBookButton book={book} targetShelf="Queue" actionType="move" onMoveBook={onMoveBook}/>
                        {/*<button className="addlist--button" onClick={onAddToQueue}>Add to Queue</button>*/}
                    </li>
                    <li className="addlist--li">
                        <MoveBookButton book={book} targetShelf="Reading List" actionType="move" onMoveBook={onMoveBook}/>
                        {/*<button className="addlist--button" onClick={onAddToReadingList}>Add to Reading List</button>*/}
                    </li>

                    <li className="addlist--remove">
                        <MoveBookButton book={book} actionType="remove" onRemove={onRemove}/>
                        {/*<button className="addlist--button" onClick={onRemove}>
                            <img src={remove} className="book--icon" alt="remove"></img>Remove</button>*/}
                    </li>

                </ul>
            </div> 
        </div>
        </>
    )
}

    /*
    function handleEllipsisClick () {
        var bookAdd = document.getElementById("book--add");
        bookAdd.style.display = (bookAdd.style.display === 'none') ? 'block' : 'none'
    };

    function add (){
        var addOptions = document.getElementById("addlist--add--options");
        addOptions.style.display = (addOptions.style.display === 'none') ? 'block' : 'none'
    }*/

    /*const book = { id, title, author, book_time};
    const [ isEllipsisVisible, setEllipsisVisible ] = useState(false);
    const [ isAddOptionsVisible, setAddOptionsVisible ] = useState(false);

     const handleEllipsisClick = () => {
        setEllipsisVisible(!isEllipsisVisible);
    };

    const toggleAddOptions = () => {
        setAddOptionsVisible(!isAddOptionsVisible);
    };
    

   
    };*/


    /*<div className= "book--add" id={`book--add ${id}`} style={ellipsisStyles}>

                <ul className="addlist">
                    <li className="addlist--add">
                        <button className= "addlist--button" onClick={toggleAddOptions}>
                            <img src={plus} className="book--icon" alt="add"></img>
                            Add</button>
                    </li>

                    <li className="addlist--remove">
                        <button className="addlist--button" onClick={onRemove}>
                            <img src={remove} className="book--icon" alt="remove"></img>Remove</button>
                    </li>
                </ul>
            </div> 

            <div className= "addlist--add--options" id={`addlist--add--options ${id}`} style={addOptionsStyles}>
                <li className="addlist--li">
                    <button className="addlist--button" onClick={onAddToBookshelf}>Add to Bookshelf</button>
                </li>
                <li className="addlist--li">
                    <button className="addlist--button" onClick={onAddToQueue}>Add to Queue</button>
                </li>
                <li className="addlist--li">
                    <button className="addlist--button" onClick={onAddToReadingList}>Add to Reading List</button>
                </li>
    </div>*/

    /*const addOptionsStyles = {
        display: isAddOptionsVisible ? 'block' : 'none',
    };*/
    /*, toggleAddOptions*/
    /*isAddOptionsVisible,*/