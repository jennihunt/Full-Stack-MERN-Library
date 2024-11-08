import { useState, useEffect } from "react";
import axios from "axios";
import "./genre.css"
import Header from "../../src/Components/Header/header";
import { useNavigate } from "react-router-dom";

export default function AfricanAmTitles() {
    const navigate = useNavigate();
    const [bookList, setBookList] = useState([]);
   
    

    useEffect(() => {
        axios
            .get("http://localhost:8080/inventory/African American")
            .then((res) => {
                setBookList(res.data)
            })
            .catch((err) => {
                console.error("Error fetching data:", err)
            });

    }, []);

    const handleDelete = (id) => {
        axios
            .delete(`http://localhost:8080/inventory/${id}`)
            .then((res) => {
                console.log("Book deleted: " + res.data)
                setBookList(bookList.filter((book) => book.bookID !== id));
            })
            .catch((err) => {
                console.log(err);
            });
    };
 
    const handleUpdate=(id)=>{

        navigate(`/inventoryUpdate/${id}`);
    }
   
    return (
        <>
            <Header id="header1" message={"African American"}></Header>
            <ul id="myList">
                {bookList.length>0?bookList.map((book, index) => {
                    
                    return (

                        <div key={book._id}>
                            <button id="deleteIt" onClick={() => handleDelete(book.bookID)} >
                                Delete🗑
                            </button>
                            <button className="updatebtn" onClick={()=>handleUpdate(book._id)}>Edit Book Info</button><br/>
                            <span id="author">📚Author: {book.authorLast}, {book.authorFirst}</span><br />
                            <span id="title">Title: "{book.title}" </span><br />   
                            <span id="title">BookID: "{book.bookID}" </span><br />                      
                            <span id="description">Genre: {book.genre}</span><br/>
                            <span id="description">Book Available: {book.avaliable?"Yes":"NO"}</span><br/>
                            <hr/>
                        </div>

                    )
                
                }):<div id="noBookMsg"><h1>NO Books</h1></div>}
            </ul><br/>
            




      </>
    )
}

