import React from "react";
import { NavLink } from "react-router-dom";
import NavDropdown from 'react-bootstrap/NavDropdown';
import "./nav.css"
export default function Navbar() {
    return (
        <nav>
            <ul id="nav-ul">
                <li>
                    <NavLink to='/'>Home</NavLink>
                </li>
                 <li>
                    <NavLink to="/Add">ADD Books</NavLink>
                </li>
                <li>
                    <NavLink to="/dueDates">All Books Checked Out</NavLink>
                </li>
                <li>
                    <NavLink to="/overDue">OverDue Books</NavLink>
                </li>
               

                <NavDropdown title="CheckOut / Search" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">
                        <NavLink to="/searchALastname">Search By AuthorLastName/<i>Check-Out</i></NavLink>
                    </NavDropdown.Item>

                    <NavDropdown.Item href="#action/3.2">
                        <NavLink to="/searchAFirstname">Search By AuthorFirstName/<i>Check-Out</i></NavLink>
                    </NavDropdown.Item>

                    <NavDropdown.Item href="#action/3.3">
                        <NavLink to="/searchABookname">Search By Book Name/<i>Check-Out or Check-In</i></NavLink>
                    </NavDropdown.Item>

                    <NavDropdown.Item href="#action/3.4">
                        <NavLink to="/searchPatronLastname">Search Checked-Out books by Patrons LastName/<i>Check-In</i></NavLink>
                    </NavDropdown.Item>

                    <NavDropdown.Item href="#action/3.5">
                    <NavLink to="/searchRestrictedPatrons">Search/Add Restricted Patrons</NavLink>
                    </NavDropdown.Item>

                </NavDropdown>
                           
            </ul>

        </nav>
    )
}