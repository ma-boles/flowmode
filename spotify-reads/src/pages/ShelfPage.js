import React from "react";
import BookShelf from "../components/BookShelf";
import Queue from "../components/Queue";
import WishList from "../components/WishList";
import Footer from "../components/Footer";

import "../styles/App/css";
import "../styles/Shelf.css"

export default function ShelfPage() {
    return(
        <>
        <BookShelf />
        <Queue />
        <WishList />
        <Footer />
        </>
    )
}