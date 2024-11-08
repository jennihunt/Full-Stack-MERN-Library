import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../Components/Header/header";
import { useNavigate } from "react-router-dom";
import "./search.css";

export default function PatronSearch() {
    const [bookList, setBookList] = useState([]);
    const [search, setSearch] = useState("");
    const [searchArr, setSearchArr] = useState();
    const [name, setName] = useState([])

    const navigate = useNavigate();

    useEffect(() => {

        axios
            .get("http://localhost:8080/checkIn")
            .then((res) => {
                setName(res.data);
                // sets the checkout info to be displayed under the name state
            })
            .catch((err) => {
                console.log("Error fetching data:", err)
            });
    }, []);


    function searchIt() {//search by check in name
        let a = name.filter((person) => {
            // console.log(book["author"].includes(search))looks for allgenres that include
            return person["LastName"].toUpperCase().startsWith(search.toUpperCase())
            //this looks for all genres that begin with
        })
        setSearchArr(a)
        return a
    }

    const addBookback = (id) => {
        let oficalID = ''
        // console.log(id.length)
        bookList.filter((book) => {
            if (book.bookID == id) {
                console.log(book.bookID)
                console.log(id)
                oficalID = book._id
                book.avaliable = true;
            }
        })
        // console.log(oficalID)
        axios
            .put(`http://localhost:8080/update/${oficalID}`,
                bookList.find((book) => book.bookID == id)
            )
            .then((res) => {
                console.log(res.data)
                console.log("Book updated: " + res.data);
            })
            .catch((err) => {
                console.log(err);
            });

        axios
            .delete(`http://localhost:8080/checkIn/${id}`)
            .then((res) => {
                console.log("Checkout deleted: " + res.data)
                setSearchArr(searchArr.filter((person) => {
                    return person.bookID !== id
                }))

            })
            .catch((err) => {
                console.log(err);
            });
    }
    return (
        <>
            <Header id="header1" message={"Search Checked Out Books By Patrons LastName"}></Header>

            <input id="searchInput" type="search" name="search" placeholder="Patron's Last Name" onChange={(e) => setSearch(e.target.value)} />

            <input id="searchInput" className="clickBtn" type="submit" value="Search Patron's " onClick={() => searchIt()} />

            <ul id="myList">
                {searchArr ? searchArr.map((book, index) => {
                    return (

                        <div key={book._id}>
                            <span id="author"> <b>{book.LastName}, {book.FirstName}</b></span><br />
                            <h3 id="title"><u><i> Building:</i></u> {book.BuildingName}</h3>
                            <span id="title"><b>Checked out the following:</b></span><br />
                            <span id="title"><u>Author:</u> {book.authorLast}, {book.authorFirst}</span><br />
                            <span id="title"><u>Title:</u> "{book.title}" </span><br />
                            <span id="title"><u>Book-Id# :</u> {book.bookID}</span><br />
                            <span id="title"><u>Genre:</u> {book.genre}</span><br />
                            <span id="title"><u>Due back on:</u> {new Date(book.dueDate).getTime() - new Date().getTime() <= 0?<i id="red">{book.dueDate}</i>:book.dueDate}</span><br />
                            <button id="duebutton" onClick={() => addBookback(book.bookID)}>Check books back in</button>

                            <hr />
                        </div>
                    )
                }) : ""}
            </ul><br />
        </>
    )
}
