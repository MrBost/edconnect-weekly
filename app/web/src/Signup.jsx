import Layout from "./shared/Layout";
import { useState, useEffect } from "react";
import { Button, Container, Col, Form, Alert } from "react-bootstrap";
import { useHistory } from "react-router-dom";

export default () => {
    const [programs, setPrograms] = useState([]);
    const [graduationYears, setGraduationYears] = useState([]);
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [matricNo, setMatricNo] = useState("");
    const [prog, setProg] = useState("");
    const [gradYear, setGradYear] = useState("");
    const [alert, setAlert] = useState([]);
    const [showAlert, setShowAlert] = useState(false);



    useEffect(() => {
        async function fetchPrograms() {
            const response = await fetch('/api/programs', {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'GET'
            });
            const json = await response.json();
            setPrograms(json);


        }
        fetchPrograms();
        async function fetchGraduationYears() {
            const response = await fetch('/api/graduationYears', {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'GET'
            });
            const json = await response.json();
            setGraduationYears(json);


        }
        fetchGraduationYears();
    }, []);

    let history = useHistory();


    const handleChange = (e) => {
        const { name, value } = e.target
        if (name == 'firstName') {
            setFirstname(value) 
        } else if (name == 'lastName') {
            setLastname(value)
        } else if (name == 'email') {
            setEmail(value)
        } else if (name == 'password') {
            setPassword(value)
        } else if (name == 'matricNo') {
            setMatricNo(value)
        } else if (name == 'program') {
            setProg(value)
        } else if (name == 'graduationYear') {
            setGradYear(value)
        }

    }

    //set cookie
    function setCookie(cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toGMTString();
        document.cookie = "uid=" + cvalue + ";" + expires + ";path=/";
        console.log('document.cookie', document.cookie);
    }

    const signupFormSubmit = (e) => { 
        e.preventDefault();

        let dataObj = {
            "firstname": firstname,
            "lastname": lastname,
            "email": email,
            "password": password,
            "matricNumber": matricNo,
            "program": prog,
            "graduationYear": gradYear
        };

        fetch('/api/register', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(dataObj)
        }).then(response => {
            return response.json();

        }).then(data => {
            if (data.status == 'ok') {
                let uid = data.data['id'];
                setCookie(uid, 7);
                history.push("/");
            } else {
                setShowAlert(true);
                setAlert(data.errors) 
            }

        }).catch(error => {
            console.log('error', error);
        }); 
    }

    return (
        <Layout>
            <>

                <Container style={{ paddingTop: 5 + '%' }}>
                    <h3 className="mx-auto w-75">Sign Up</h3>

                    <div className="row mx-auto w-75">
                        <Alert variant="danger" name="error-alert" className="alert-danger" show={showAlert}>
                            {alert.map(al => {
                                return (
                                    <>
                                        {al}
                                        <br />
                                    </>
                                );
                            })}
                        </Alert>
                        <Form id="signupForm">
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridFirstname">
                                    <Form.Label>First name</Form.Label>
                                    <Form.Control placeholder="First name" name="firstName" onChange={handleChange} />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridLastname">
                                    <Form.Label>Last name</Form.Label>
                                    <Form.Control name="lastName" placeholder="Last name" onChange={handleChange} />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control name="email" type="email" placeholder="Your email address" onChange={handleChange} />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control name="password" type="password" placeholder="Your password" onChange={handleChange} />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridProgram">
                                    <Form.Label>Program</Form.Label>
                                    <Form.Control name="program" as="select" defaultValue="Choose..." onChange={handleChange}  >
                                        <option>Choose...</option>
                                        {programs.map((program,index) => <option key={index} value={program}>{program}</option>)}
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridMatricNo">
                                    <Form.Label>Matric number</Form.Label>
                                    <Form.Control name="matricNo" placeholder="e.g 16/2020" onChange={handleChange} />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridGraduationYear">
                                    <Form.Label>Graduation Year</Form.Label>
                                    <Form.Control name="graduationYear" as="select" defaultValue="Choose..." onChange={handleChange} >
                                        <option>Choose...</option>
                                        {graduationYears.map((year,index) => <option key={index} value={year}>{year}</option>)}
                                    </Form.Control>
                                </Form.Group>
                            </Form.Row>
                            <Button variant="primary" id="submit-signup" type="submit" onClick={signupFormSubmit}>Sign Up</Button>
                        </Form>

                    </div>

                </Container>

            </>
        </Layout>

    )
}



