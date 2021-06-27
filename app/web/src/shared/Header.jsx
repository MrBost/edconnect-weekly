import React, { useState } from "react"
import { Navbar, Form, FormControl, Button, Nav } from 'react-bootstrap'
import { useHistory } from "react-router-dom";


const Header = (props) => {

    const [username, setUsername] = useState("");
    const [display, setDisplay] = useState(false);
    let history = useHistory();
 
    let uid = "";
    document.cookie
        .split('; ')
        .find(row => {
            if (row.startsWith('uid=')) {
                uid = row.split('=')[1];
            }
        })

    let url = `/api/users/${uid}`;
    if (uid !== '') {
        fetch(url, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'GET'
        }).then(response => {
            return response.json()
        }).then(data => {
            setDisplay(true);
            setUsername(data.firstname);
        })
    } 


    const handleLogout = (e) => { 
        document.cookie = 'uid=; expires=Wed, 19 May 2021 00:00:00 UTC; path=/;';
        history.push("/");
    }

    return (
        <>
            <Navbar bg="primary" variant="dark" className="justify-content-between">
                <Nav>
                    <Navbar.Brand href="/">Project Explorer</Navbar.Brand> 

                    <Form inline>
                        <FormControl type="text" placeholder="Search Projects" />
                        <Button variant="outline-light" type="submit">Search</Button>
                    </Form>
                    <Nav className="disabled">
                        <Nav.Link href="/">Submit</Nav.Link>
                    </Nav>
                </Nav>

                {display ? (

                    <> 
                        <Nav className="justify-content-end">
                            <Nav.Link href="/" onClick={handleLogout}>Logout</Nav.Link>
                            <Nav.Link href="#">Hi, {username}</Nav.Link>
                        </Nav>
                    </>) :
                    (<>
                        <Nav className="justify-content-end">
                            <Nav.Link href="/signup">Sign Up</Nav.Link>
                            <Nav.Link href="/login">Login</Nav.Link>
                        </Nav>
                    </>
                    )
                }




            </Navbar>
        </>
    )
}
export default Header;
