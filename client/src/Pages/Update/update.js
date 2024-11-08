import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../Components/Header/header";
import "./update.css";
import Alert from 'react-bootstrap/Alert';
import { useNavigate, useParams } from "react-router-dom";

export default function Update() {

    const [bookList, setBookList] = useState([]);
    const [show, setShow] = useState(false);
    const [allbookList, setAllBookList] = useState([]);
    const [usedBookTitle, setusedBookTitle] = useState()
    const [usedBookAuthor, setusedBookAuthor] = useState()

    const { id } = useParams();
    const navigate = useNavigate()

    useEffect(() => {
        axios
            .get(`http://localhost:8080/update/${id}`)//find the current book info that we are editing on this page
            .then((res) => {
                console.log(res.data)
                setBookList(res.data)
            })
            .catch((err) => {
                console.error("Error fetching data:", err)
            });

        axios
            .get("http://localhost:8080/inventory")//Finds all the books in the library so we can eventually make sure the bookid we update dosnt match any other bookid's in the inventory of all the books
            .then((res) => {
                setAllBookList(res.data)
            })
            .catch((err) => {
                console.error("Error fetching data:", err)
            });
    }, []);
    // console.log(bookList)

    const handleAddAuthorFirst = (e) => {
        setBookList({ ...bookList, authorFirst: e.target.value });
    };
    const handleAddAuthorLast = (e) => {
        setBookList({ ...bookList, authorLast: e.target.value });
    };

    const handleAddTitle = (e) => {
        setBookList({ ...bookList, title: e.target.value });
    };

    const handleAddBookID = (e) => {
        if (e.target.value !== " ") {
            for (let each of allbookList) {
                if (e.target.value == each.bookID) {
                    // if the bookId has been used, this stops the function from changing the bookID and pops up an alert that says why,then stops the ()from preceeding
                    setusedBookTitle(each.title)
                    setusedBookAuthor(each.authorFirst + " " + each.authorLast)
                    setBookList({ ...bookList, bookID: e.target.value })

                    setShow(true);
                    return
                }
            }
        }//if above function dosnt stop function the next happens which updates the bookinfo 
        if (e.target.value !== " ") {
            setShow(false)
            setusedBookTitle()
            setusedBookAuthor()
            // bookList.bookID=e.target.value 
            setBookList({ ...bookList, bookID: e.target.value })
            return
        }
    }

    const handleAddGenre = (e) => {
        setBookList({ ...bookList, genre: e.target.value });
    };
    const handleAddAvailability = (e) => {
        setBookList({ ...bookList, avaliable: e.target.value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        // below allows data to show up on page
        // setBookList([...bookList, { title: title, author: author,genre:genre, bookID: bookID, avaliable: avaliable }])
        const updatedBook = {
            title: bookList.title,
            authorFirst: bookList.authorFirst,
            authorLast: bookList.authorLast,
            genre: bookList.genre,
            bookID: bookList.bookID,
            avaliable: bookList.avaliable
        };

        axios
            .put(`http://localhost:8080/update/${id}`, updatedBook)
            .then((res) => {
                console.log("Post response:", res.data);
                navigate("/")
            })
            .catch((error) => {
                console.log("Error:", error);
            });
    };

    return (
        <>
            <Header id="header1" message={"Update Book In Inventory"}></Header>
            <h1 id="updateTitle">Update "{bookList.title}"</h1>
            <form id="addbookform" onSubmit={handleSubmit}>

                <label htmlFor="Title" className="description">Book Title:
                    <input
                        type="text"
                        className="title"
                        value={bookList.title}
                        required
                        onChange={handleAddTitle}//update booklist title
                    /></label><br />

                <label htmlFor="AuthorFirst" className="description">Authors First Name:<br />
                    <i> First Name</i>
                    <input
                        type="text"
                        className="author"
                        value={bookList.authorFirst}
                        required
                        onChange={handleAddAuthorFirst}
                    /></label><br />

                <label htmlFor="AuthorLast" className="description">Authors Last Name:<br />
                    <i>Last Name</i>
                    <input
                        type="text"
                        className="author"
                        value={bookList.authorLast}
                        required
                        onChange={handleAddAuthorLast}
                    /></label><br />

                <label htmlFor="genre" className="description" >Assign Book ID:
                    <input
                        type="number"
                        className="description"
                        value={bookList.bookID}
                        required
                        onChange={handleAddBookID}
                    /></label><br />
                    
                <Alert variant="danger" show={show} onClose={() => setShow(false)} dismissible>
                    <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                    <p>
                        This Book Id has already been used on the book <u>{usedBookTitle}</u> by <u>{usedBookAuthor}</u>. To avoid any errors change the id to unused id#
                    </p>
                </Alert>

                <label htmlFor="genre" className="description">Choose a Genre:
                    <select id="genre" className="description" name="genre" onChange={handleAddGenre} required>
                        <option value={bookList.genre}>current genre..{bookList.genre}</option>
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
                    </select></label><br /><br />

                <label htmlFor="genre" className="description">Choose Availability:
                    <select id="genre" className="description" name="available" onChange={handleAddAvailability} required>
                        <option value={bookList.avaliable == true ? "yes" : "no"}> current avaliability {bookList.avaliable == true ? "Available" : "checked Out"}</option>
                        <option value={true}>Available to Check out</option>
                        <option value={false}>Checked Out</option>
                    </select></label><br /><br />

                <button className="inventoryBtn" type="submit" >
                    Update Book in dataBase...
                </button>
            </form>
        </>
    )
}

