import { useState } from "react";
import { Button, Container, Col, Form, Alert } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Layout from "./shared/Layout";

export default () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [alert, setAlert] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    let history = useHistory();

    const handleChange = (e) => {
        const { name, value } = e.target
        if (name == 'email') {
            setEmail(value)
        } else if (name == 'password') {
            setPassword(value)
        }
    }

    const handleLogin = (e) => {
        e.preventDefault();
        let formObj = {
            'email': email,
            'password': password
        };
        fetch('/api/login', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(formObj)
        }).then(response => {
            if (response.status === 200) { 
                return response.json();
            } else {
                setShowAlert(true);
                setAlert("Invalid email/password")
            }
        })
            .then(data => { 
                console.log(data)
                let uid = data.data['id'];
                setCookie(uid, 7);
                history.push("/");

            })
            .catch(e=>{
                console.log(e)
            })
    }
    //set cookie
    function setCookie(cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toGMTString();
        document.cookie = "uid=" + cvalue + ";" + expires + ";path=/";
        console.log('document.cookie', document.cookie);
    }

    return (

        <Layout>
            <>
                <Container style={{ paddingTop: 5 + '%' }}>
                    <Form className="mx-auto w-75">
                        <h3>Login</h3>
                        <Alert variant="danger" name="error-alert" className="alert-danger" show={showAlert}>
                            {alert}
                        </Alert>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control placeholder="Enter email" name="email" onChange={handleChange} />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control name="password" placeholder="Password" onChange={handleChange} />
                            </Form.Group>
                        </Form.Row>
                        <Button variant="primary" type="submit" onClick={handleLogin}>Login</Button>

                    </Form>
                </Container>
            </>
        </Layout>
    )
}



