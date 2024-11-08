import "./due.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../Components/Header/header";



export default function BooksDue() {
    const [info, setInfo] = useState([]);
    const [bookList, setBookList] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:8080/checkIn")
            .then((res) => {
                // console.log(res.data)
                setInfo(res.data);
            })
            .catch((err) => {
                console.error("Error fetching data:", err)
            });

        axios
            .get("http://localhost:8080/inventory")
            .then((res) => {
                setBookList(res.data)
            })
            .catch((err) => {
                console.log("Error fetching book data", err)
            })

    }, []);

    // console.log(info)
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
                setInfo(
                    info.filter((person) => person.bookID !== id));
            })
            .catch((err) => {
                console.log(err);
            });
    }


    return (
        <>
            <Header id="dueHeader" message={"All Checked out Books"} />

            <ul id="dueList">
                {info.map((names) => {
                    return (

                        <li key={names._id} id="checkoutsticky">
                            <h3 id="studentName">{names.LastName}{" "}{names.FirstName}</h3>
                            <br></br>
                            <div>
                                <h5>Checked Out the following book:</h5>
                                <h6> {names.title}</h6>
                                <h6><i>Author: </i>{names.authorLast + ", " + names.authorFirst}</h6>
                                <h6><i>Building Name: </i>{names.BuildingName}</h6>
                                <h6><i>Id number: </i>{names.bookID}</h6>
                                <h6><i>Genre : </i>{names.genre}</h6>
                                <h6>Due Back On: <u>{new Date(names.dueDate).getTime() - new Date().getTime() <= 0 ? <i id="red">{names.dueDate}</i> : names.dueDate}</u></h6>
                            </div>
                            <button id="duebutton" onClick={() => addBookback(names.bookID)}>Check books back in</button>
                        </li>
                    )
                })}
            </ul>
        </>
    )
}