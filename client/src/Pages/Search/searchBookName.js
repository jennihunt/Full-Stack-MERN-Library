import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../Components/Header/header";
import Alert from 'react-bootstrap/Alert';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useNavigate } from "react-router-dom";
import "./search.css";
//check for 1st name
export default function SearchBookName() {
    const [bookList, setBookList] = useState([]);
    const [search, setSearch] = useState("");
    const [searchArr, setSearchArr] = useState();
    const [title, setTitle] = useState('');
    const [authorFirst, setAuthorFirst] = useState('');
    const [authorLast, setAuthorLast] = useState('');
    const [genre, setGenre] = useState('');
    const [name, setName] = useState([]);
    const [bookID, setbookID] = useState();
    const [dueDays, setDueDays] = useState(7);
    const [FirstName, setFirstName] = useState("");
    const [LastName, setLastName] = useState("");
    const [BuildingName, setBuildingName] = useState("");
    const [savedBookId, setSavedBookId] = useState()
    const [saved_Id, setSaved_Id] = useState()
    const [restrictedname, setRestrictedName] = useState([]);

    const [showerror, setShowError] = useState(false)
    const [show, setShow] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get("http://localhost:8080/inventory/bookName")
            .then((res) => {
                setBookList(res.data)
            })
            .catch((err) => {
                console.error("Error fetching data:", err)
            })

        axios
            .get("http://localhost:8080/restrictedPatrons")
            .then((res) => {
                setRestrictedName(res.data);
                // sets the checkout info to be displayed under the name state
            })
            .catch((err) => {
                console.log("Error fetching data:", err)
            })

        axios
            .get("http://localhost:8080/checkIn")
            .then((res) => {
                setName(res.data);
                // sets the checkout info to be displayed under the name state
            })
            .catch((err) => {
                console.log("Error fetching data:", err)
            })
    }, []);



    function searchIt() {
        let a = bookList.filter((book) => {
            // console.log(book["author"].includes(search))looks for allgenres that include
            return book["title"].toUpperCase().startsWith(search.toUpperCase())
            //this looks for all genres that begin with()
        })
        setSearchArr(a)
        return a
    }

    const handleCheckout = (id, _id, authorFirst, authorLast, title) => {
        setShow(true)
        setSavedBookId(id)
        setSaved_Id(_id)
        setAuthorFirst(authorFirst);
        setAuthorLast(authorLast);
        setTitle(title);
        bookList.filter((book) => {
            if (book.bookID == id) {
                setAuthorFirst(book.authorFirst);
                setAuthorLast(book.authorLast);
                setTitle(book.title);
                setbookID(book.bookID);
                setGenre(book.genre);
            }
        })
    }

    const handleClose = () => setShow(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        let found = restrictedname.filter((rn) => rn.FirstName == FirstName && rn.LastName == LastName)
        // console.log(found.length)

        if (found.length > 0) {
            setShowError(true);
        }
        else {
            setShowError(false)
            bookList.filter((book) => {
                if (book.bookID == savedBookId) {
                    book.avaliable = !book.avaliable;
                }
            })

            axios
                .put(`http://localhost:8080/update/${saved_Id}`,
                    bookList.find((book) => book._id === saved_Id)
                )
                .then((res) => {
                    console.log("Book updated: " + res.data);
                })
                .catch((err) => {
                    console.log(err);
                });

            let Duedate = new Date();
            Duedate.setDate(Duedate.getDate() + parseFloat(dueDays));

            const studentData = {
                FirstName: FirstName,
                LastName: LastName,
                BuildingName: BuildingName,
                authorFirst: authorFirst,
                authorLast: authorLast,
                title: title,
                bookID: bookID,
                genre: genre,
                dueDate: Duedate.toDateString()
            };
            //Send a Post request to the server using promises
            axios
                .post("http://localhost:8080/checkIn", studentData)
                .then((res) => {
                    console.log("Post response:", res.data);
                })
                .catch((error) => {
                    console.log("Error:", error);
                });
            navigate("/dueDates");
        }
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
                // setSearchArr(searchArr.filter((person) => {
                //     return person.bookID !== id
                // }))
                setSearchArr(searchArr.map((person) => {
                    return person
                }))

            })
            .catch((err) => {
                console.log(err);
            })
    }

    const tryingit = (id) => {
        let a = name.filter((each) => {
            if (each.bookID == id) {
                return each.FirstName
            }
        })
        // console.log(a[0].FirstName + " " + a[0].LastName)
        return a[0].FirstName + " " + a[0].LastName + " due back on " + a[0].dueDate
    }

    return (
        <>
            <Header id="header1" message={"Search By Book Name"}></Header>

            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Check Out Book</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>

                    <form id="checkoutform" onSubmit={handleSubmit}>

                        <h1>The book your checking out is "{title}""  By: {authorLast} , {authorFirst}</h1>

                        <input
                            className="loginInfo"
                            type="text"
                            placeholder="first name"
                            value={FirstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required /><br /><br />

                        <input
                            className="loginInfo"
                            type="text"
                            placeholder="Last Name"
                            value={LastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required /><br /><br />

                        <input
                            className="loginInfo"
                            type="text"
                            placeholder="Building Name"
                            value={BuildingName}
                            onChange={(e) => setBuildingName(e.target.value)}
                            required /><br /><br />


                        <label className="checkoutlabel">Check-Out days
                            <input
                                className="loginInfo"
                                type="number"
                                placeholder="checkout days"
                                value={dueDays}
                                min="7"
                                onChange={(e) => setDueDays(e.target.value)}
                                required /></label><br /><br />
                        <button className="btn" type="submit">submit</button>

                        <Alert variant="danger" show={showerror} onClose={() => setShowError(false)} dismissible>
                            <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                            <p>
                                This Person. is on the restricted list
                            </p>
                        </Alert>
                    </form>
                </Offcanvas.Body>
            </Offcanvas>

            <input id="searchInput" type="search" name="search" placeholder="Book Name" onChange={(e) => setSearch(e.target.value)} />

            <input id="searchInput" className="clickBtn" type="submit" value="Search By Book Name" onClick={() => searchIt()} />

            <ul id="myList">
                {searchArr ? searchArr.map((book, index) => {

                    return (

                        <div key={book._id}>
                            <span id="author">📚Title: <u>"{book.title}" </u></span><br />
                            <span id="title">Author:  {book.authorFirst}, {book.authorLast}</span><br />

                            <span id="description">Book-Id# : {book.bookID}</span><br />
                            <span id="description">Genre: {book.genre}</span><br />

                            {!book.avaliable ?
                                <span id="description">Book Currently Checked Out by: <br /><u> {tryingit(book.bookID) != "" ? tryingit(book.bookID) : ""}</u><br /> <button id="checkOutBtn" onClick={() => addBookback(book.bookID)}>Check book back in</button></span>
                                :
                                <button id="checkOutBtn" onClick={() => handleCheckout(book.bookID, book._id, book.authorFirst, book.authorLast, book.title)}>Check Out</button>}
                            <hr />
                        </div>
                    )
                }) : ""}
            </ul><br />
        </>
    )
}
