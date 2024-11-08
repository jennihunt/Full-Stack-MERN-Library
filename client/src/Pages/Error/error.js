import React from "react"
import "./error.css"
import Photo from "../../Components/Photo/photo"
import scream from "../../Components/assets/images/scream.jpg"
import { Link } from "react-router-dom";


export default function Oops(){
    return (
        <div id="errorDiv">
        <h1 id="error">This Page Does Not  Exsist</h1> 
        <Photo id="screaming" source={scream} alt="oops"/>
        <Link to={"/"} className={"mainBtn"}>Go to Main Page</Link>
        <br/><br/>
        </div>
        
    )
}