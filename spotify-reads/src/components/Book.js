import React from "react";
import ellipsis from "../images/ellipsis-solid.svg"

export default function Book() {

    function handleEllipsisClick () {
        var bookAdd = document.getElementById("book--add");
        bookAdd.style.display = (bookAdd.style.display === 'none') ? 'block' : 'none'
    };

    function add (){
        var addOptions = document.getElementById("addlist--add--options");
        addOptions.style.display = (addOptions.style.display === 'none') ? 'block' : 'none'
    }
    
    return (
        <>
            <div className="book--container">
                book img<br/>
                book title<br/>
                author<br/>
                <img src={ellipsis} alt="ellipsis" className="book--ellipsis" onClick={handleEllipsisClick}></img>
            </div>

            <div className="book--add" id="book--add">

                <ul className="addlist">
                    <li className="addlist--add">
                        <button className="addlist--button" onClick={add}>Add</button></li>

                    <div className="addlist--add--options" id="addlist--add--options">
                        <li className="addlist--li">
                            <button className="addlist--button">Add to Bookshelf
                                </button></li>
                        <li className="addlist--li">
                            <button className="addlist--button">Add to Queue</button></li>
                        <li className="addlist--li">
                            <button className="addlist--button">Add to Reading List</button></li>
                    </div>

                    <li className="addlist--remove">
                        <button className="addlist--button">Remove</button></li>
                </ul>

            </div>
        </>
    )
}