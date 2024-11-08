import "./searchAdd.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../Components/Header/header";
import Alert from 'react-bootstrap/Alert';

export default function Add() {
    const [bookList, setBookList] = useState([]);
    const [title, setTitle] = useState('');
    const [authorFirst, setAuthorFirst] = useState('');
    const [authorLast, setAuthorLast] = useState('');
    const [genre, setGenre] = useState('');
    const [bookID, setbookID] = useState();
    const [show, setShow] = useState(false);
    const [showCheck, setShowCheck] = useState(false);
    const [avaliable, setAvaliable] = useState(true);

    const [usedBookTitle, setusedBookTitle] = useState();
    const [usedBookAuthor, setusedBookAuthor] = useState();

    useEffect(() => {
        axios
            .get("http://localhost:8080/inventory")
            .then((res) => {
                setBookList(res.data)
            })
            .catch((err) => {
                console.error("Error fetching data:", err)
            });
    }, []);

    // This checks to see if the book id has been used yet
    const handleBookID = (e) => {
        if (e.target.value !== " ") {
            for (let each of bookList) {
                if (e.target.value == each.bookID) {
                    // if the bookId has been used, this stops the function from changing the bookID and pops up an alert that says why,then stops the ()from preceeding
                    setbookID()
                    setusedBookTitle(each.title)//shows book the id is used on
                    setusedBookAuthor(each.authorFirst + " " + each.authorLast)
                    setShow(true);//shows error message
                    return
                }
            }
        }//if above function dosnt stop function the next happens which updates the bookinfo 
        if (e.target.value !== " ") {
            setShow(false)
            setusedBookTitle()
            setusedBookAuthor()
            setbookID(e.target.value)
            return
        }
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        // below allows data to show up on page
        // setBookList([...bookList, { title: title, author: author,genre:genre, bookID: bookID, avaliable: avaliable }])

        if (genre.length < 1) {
            setShowCheck(true)
        }
        else {

            const newBook = {
                title: title,
                authorFirst: authorFirst,
                authorLast: authorLast,
                genre: genre,
                bookID: bookID,
                avaliable: avaliable
            };

            axios
                .post("http://localhost:8080/inventory", newBook)
                .then((res) => {
                    console.log("Post response:", res.data);
                })
                .catch((error) => {
                    console.log("Error:", error);
                });

            setTitle("");
            setAuthorFirst("");
            setAuthorLast("");
            setbookID(0);
            setGenre("");
        };
    }

   

    return (
        <>
            <Header id="header1Add" message={"Add Book To Inventory"} ></Header>
            <Header id="header2" message={"AddBooks"}></Header><br /><br />

            <form id="addbookform" onSubmit={handleSubmit}>
                <label htmlFor="Title" className="description">Book Title:
                    <input
                        type="text"
                        className="title"
                        placeholder="title..."
                        value={title}
                        required
                        onChange={(e) => setTitle(e.target.value)}
                    /></label><br />

                <label htmlFor="Author" className="description">Authors First Name:<br />
                    <input
                        type="text"
                        className="author"
                        placeholder="Author..."
                        value={authorFirst}
                        required
                        onChange={(e) => setAuthorFirst(e.target.value)}
                    /></label><br />

                <label htmlFor="Author" className="description">Authors Last Name:<br />
                    <input
                        type="text"
                        className="author"
                        placeholder="Author..."
                        value={authorLast}
                        required
                        onChange={(e) => setAuthorLast(e.target.value)}
                    /></label><br />

                <label htmlFor="genre" className="description" >Assign Book ID:
                    <input
                        type="number"
                        className="description"
                        placeholder="book ID number"
                        value={bookID}
                        required
                        onChange={handleBookID}
                    /></label><br />

                <Alert variant="danger" show={show} onClose={() => setShow(false)} dismissible>
                    <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                    <p>
                        This Book Id has already been used on the book <u>{usedBookTitle}</u> by <u>{usedBookAuthor}</u>. To avoid any errors change the id to unused id#
                    </p>
                </Alert>

                <label htmlFor="genre" className="description">Choose a Genre:
                    <select id="genre" className="description" name="genre" onChange={(e) => setGenre(e.target.value)} required>
                        <option  >Choose One Genre...</option>
                        <option value="African American">African American</option>
                        <option value="African American History">African American History</option>
                        <option value="Biography">Biography</option>
                        <option value="Career Ready">Career Ready</option>
                        <option value="Classics">Classics</option>
                        <option value="Fantasy">Fantasy</option>
                        <option value="Fiction">Fiction</option>
                        <option value="Horror">Horror</option>
                        <option value="Life Fiction">Life Fiction</option>
                        <option value="Medical">Medical</option>
                        <option value="Movies-and-TV">Movies and TV</option>
                        <option value="Non-Fiction">Non-Fiction</option>
                        <option value="Reference">Reference</option>
                        <option value="Religious">Religious</option>
                        <option value="Romance">Romance</option>
                        <option value="Spanish">Spanish</option>
                        <option value="Suspense">Suspense</option>
                        <option value="Other">Other..</option>
                    </select></label>
                <Alert variant="danger" show={showCheck} onClose={() => setShowCheck(false)} dismissible>
                    <Alert.Heading>Oh snap,  </Alert.Heading>
                    <p>
                      Before submitting! Please Check one genre option above!
                    </p>
                </Alert>
                <br/><br/>

                <button className="inventoryBtn" type="submit" >
                    ADD Book to dataBase...
                </button>
            </form>
        </>
    )
}

