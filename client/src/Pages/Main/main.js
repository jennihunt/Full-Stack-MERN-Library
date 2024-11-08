import Header from "../../Components/Header/header";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./main.css";

export default function Main() {
    const [bookList, setBookList] = useState([])

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

    return (
        <div >
            <Header id="mainHeader" message={"Welcome to our Library"}></Header>
            <Header id="mainheader2" message={"Search By Genres"}></Header><br /><br />
         
            <div id="linkDiv">           
            <Link to={"/AfricanAm"} className={"mainBtn"}>African American</Link>
            <Link to={"/AfricanAmHistory"} className={"mainBtn"}>African American History</Link>
            <Link to={"/Bio"} className={"mainBtn"}>Biography</Link>
            <Link to={"/careerReady"} className={"mainBtn"}>Career Ready</Link>
            <Link to={"/Classics"} className={"mainBtn"}>Classics</Link>
            <Link to={"/Fantasy"} className={"mainBtn"}>Fantasy</Link>
            <Link to={"/Fiction"} className={"mainBtn"}>Fiction</Link>
            <Link to={"/Horror"} className={"mainBtn"}>Horror</Link>
            <Link to={"/LifeFic"} className={"mainBtn"}>Life Fiction</Link>
            <Link to={"/Medical"} className={"mainBtn"}>Medical</Link>
            <Link to={"/MovieTv"} className={"mainBtn"}>Movie/Tv</Link>
            <Link to={"/Non-Fict"} className={"mainBtn"}>Non-Fiction</Link>
            <Link to={"/Other"} className={"mainBtn"}>Other</Link>
            <Link to={"/Reference"} className={"mainBtn"}>Reference</Link> 
            <Link to={"/Religious"} className={"mainBtn"}>Religious Fiction</Link>
            <Link to={"/Romance"} className={"mainBtn"}>Romance</Link>
            <Link to={"/Spanish"} className={"mainBtn"}>Spanish</Link>
            <Link to={"/Suspense"} className={"mainBtn"}>Suspense</Link>
            </div>

            <Header id="main2Header2" message={"All Books In Library"}></Header>
            <div id="mappeditems">
                <hr/>            
                {bookList.map(e => (

                    <div id="each-Item" key={e.id}>
                        <span id="taskSpan">📚Author: {e.authorLast},{e.authorFirst}</span><br />
                        <span>Title: "{e.title}"</span><br />
                        <span>Genre: {e.genre}</span><br />
                        <span>Book-ID#: {e.bookID}</span><br />
                        <div id="backofcard">{e.title}</div>
                    </div>
                ))}

            </div>    

            <Link to={"/searchABookname"} className={"mainBtn"}>Search Books By Name</Link>

        </div>
    )
}
