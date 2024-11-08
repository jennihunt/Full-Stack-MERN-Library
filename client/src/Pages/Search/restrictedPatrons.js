import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../Components/Header/header";
import "./search.css"
import { useNavigate } from "react-router-dom";

export default function RestrictedPatronSearch() {
    const [name, setName] = useState([])
    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()
    const [reason, setReason] = useState()
    const [date, setDate] = useState()
    const navigate = useNavigate();

    useEffect(() => {

        axios
            .get("http://localhost:8080/restrictedPatrons")
            .then((res) => {
                setName(res.data);
                // sets the checkout info to be displayed under the name state
            })
            .catch((err) => {
                console.log("Error fetching data:", err)
            });

    }, []);

    const handleCheckout = (id) => {
        axios
            .delete(`http://localhost:8080/restrictedPatrons/${id}`)
            .then((res) => {
                console.log("Restriction deleted:" + res.data)
                setName(name.filter((name) => name._id !== id));
            })
            .catch((err) => {
                console.error(err)
            });
    }


    const addRestrictedPatron = (e) => {
        // e.preventDefault();     
        const RestrictedPatronData = {
            FirstName: firstName,
            LastName: lastName,
            Reason: reason,
            Date: new Date().toDateString()
        };
        //Send a Post request to the server using promises
        axios
            .post("http://localhost:8080/restrictedPatrons", RestrictedPatronData)
            .then((res) => {
                console.log("Post response:", res.data);
            })
            .then(() => {
                setFirstName("")
                setLastName("")
                setReason("")
                setReason("")
            })
            .catch((error) => {
                console.log("Error:", error);
            });

    }


    return (
        <>
            <Header id="header1" message={"Search or Add to Restricted Patrons "}></Header>

            <form id="restrictedForm" onSubmit={addRestrictedPatron}>
                <h1 id="addTitle">Add Restricted Patrons</h1>
                <input
                    name="FirstName"
                    className="loginInfo"
                    type="text"
                    placeholder="first name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required /><br /><br />

                <input
                    name="LastName"
                    className="loginInfo"
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required /><br /><br />

                <input
                    name="logininfo"
                    className="loginInfo"
                    type="text"
                    placeholder="Reason for Restriction"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    required /><br /><br />

                <button className="btn" type="submit">submit</button>
            </form>


            <h1 id="addTitle2">ALL Restricted Patrons</h1>

            <ul id="myList">
                {name ? name.map((person, index) => {
                    return (

                        <div id="restricted" key={person._id}>
                            <span id="author"><b>{person.LastName}, {person.FirstName}</b></span><br/>
                            <span id="title"><b><u>Reason:</u></b><br />{person.Reason}</span><br />
                            <span id="title"><b><u>Restriction started:</u></b><br/>{person.Date}</span><br/>
                            <button id="checkOutBtn" onClick={() => handleCheckout(person._id)}>Delete Restriction</button>
                            <hr />
                        </div>
                    )
                }) : ""}
            </ul><br />
        </>
    )
}
