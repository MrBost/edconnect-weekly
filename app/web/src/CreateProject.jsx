import Layout from "./shared/Layout";
import {Alert, Form, Col, Button, Container} from 'react-bootstrap'
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

export default () => {

    const [name, setName] = useState("");
    const [abstract, setAbstract] = useState("");
    const [authors, setAuthors] = useState([]);
    const [tags, setTags] = useState([]);
    const [alert, setAlert] = useState([]);
    const [showAlert, setShowAlert] = useState(false);
    let history = useHistory();

    const handleChange = (e) => {
        const { name, value } = e.target
        if (name === 'name') {
            setName(value)
        } else if (name === 'abstract') {
            setAbstract(value)
        }  else if (name === 'authors') {
            setAuthors(value)
        }  else if (name === 'tags') {
            setTags(value)
        } 
    }

    useEffect(()=>{
        let uid = '';
        document.cookie
        .split('; ')
        .filter(row => {
            if(row.startsWith('uid=')){
             uid = row.split('=')[1];
            }})
            console.log(uid)
        
        if(uid == ''){
            history.push("/login");
        }
    },[])

    const handleCreateProject = (e)=>{ 
              e.preventDefault();  
              let formObj ={
                "name": name,
                "abstract": abstract,
                "authors": authors.split(","),
                "tags": tags.split(",")
              };
              fetch('/api/projects',{
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(formObj)
            }).then(response=> {  
                    return response.json(); 
                })
            .then(data=>{    
                if(data.status=='ok'){ 
                    history.push("/");
                } else {
                    setShowAlert(true);
                    setAlert(data.errors); 
                }
                 
                
            }) 
      }

    return (
        <Layout>
            <>
            <Container style={{paddingTop: 5 + '%'}}>
            <h3 className="mx-auto w-75">Submit Project</h3>
            <Alert variant="danger" name="error-alert" className="alert-danger" show={showAlert}>
                            {alert.map(al=>{
                                return (
                                    <>
                                    {al} <br />
                                    </>
                                )
                            })}
                        </Alert>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridProjectname">
                                <Form.Label>Project Name</Form.Label>
                                <Form.Control placeholder="Enter project name" name="name" onChange={handleChange} />
                            </Form.Group>
                            <Form.Group controlId="formGridAbstract">
                                <Form.Label>Project abstract</Form.Label>
                                <Form.Control as="textarea" rows={5}  name="abstract" onChange={handleChange} />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridAuthors">
                                <Form.Label>Author(s)</Form.Label>
                                <Form.Control placeholder="Enter author names (separated by comma)" name="authors" onChange={handleChange} />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridTags">
                                <Form.Label>Tag(s)</Form.Label>
                                <Form.Control placeholder="Use # to tag project with different topics (e.g #javascript #mongodb)" name="tags" onChange={handleChange} />
                            </Form.Group>
                        </Form.Row>
                        <Button variant="primary" type="submit" onClick={handleCreateProject}>Continue</Button>
            </Container>   
            </>   
        </Layout>
    )
}



