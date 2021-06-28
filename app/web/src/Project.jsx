import Layout from "./shared/Layout";
import { Container, Row, Col, Nav, Form, Button } from "react-bootstrap";
import { useParams } from "react-router";
import React, { useState, useEffect } from "react";

export default () => {
    const [name, setName] = useState("");
    const [abstract, setAbstract] = useState("");
    const [authors, setAuthors] = useState([]);
    const [tags, setTags] = useState([]);
    const [user, setUser] = useState("");
    let param = useParams();

    useEffect(() => {
        const viewProjectById = async () => {
            let url = `/api/projects/${param['id']}`;
            await fetch(url, {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'GET'
            }).then(response => response.json())
                .then(res => {
                    setName(res.name);
                    setAbstract(res.abstract);
                    setAuthors(res.authors);
                    setTags(res.tags);


                    fetch(`/api/users/${res.createdBy}`)
                        .then(res => res.json())
                        .then((res) => {
                            setUser(`${res.firstname } ${res.lastname}`)
                        })
                        .catch(e => console.log(e))
                })
        }
        viewProjectById();
    }, [])


    return (
        <Layout>
            <>
                <Container>
                    <Row style={{ paddingTop: 2 + '%', marginLeft: 13 + '%' }}>
                        <h5 id="project_name">{name}</h5>
                    </Row>
                </Container>
                <Container className="bg-light p-2">
                    <Row>
                        <Col>
                            <p>Created By</p>
                            <p id="project_author">{user}</p>

                        </Col>
                        <Col>
                            <p>Date Created</p>
                            <p>2021-03-27</p>
                        </Col>
                        <Col>
                            <p>Last Updated</p>
                            <p>2021-03-27</p>
                        </Col>
                        <Col className="pb-2 d-flex justify-content-end">
                            <Nav variant="pills" className="justify-content-end">
                                <Nav.Item>
                                    <Nav.Link href="#" className="btn btn-primary">Edit Project</Nav.Link>
                                </Nav.Item>

                            </Nav>
                        </Col>
                    </Row>
                </Container>

                <Container>
                    <Row>
                        <Col classNameName="pt-5">
                            <h5>Project Abstract</h5>
                            <hr></hr>
                            <div className="form-group" id="project_abstract">
                                <p>{abstract}</p>
                            </div>


                            <Form.Group controlId="formGridProjectabstract">
                                <Form.Label>Project abstract</Form.Label>
                                <Form.Control as="textarea" rows={5} placeholder="Project 1 is a very interesting project" name="abstract" />
                            </Form.Group>
                            <Form.Group controlId="formGridProjectcomments">
                                <Form.Label>Comments</Form.Label>
                                <Form.Control as="textarea" placeholder="Leave a comment" name="comments" />
                            </Form.Group>
                            <Button variant="primary" type="submit">Save</Button>
                            <hr></hr>
                            <p classNameName="d-flex justify-content-center">No comments added yet</p>
                        </Col>
                        <Col classNameName="pt-5">
                            <h5>Project Details</h5>
                            <hr></hr>
                            <div className="card">
                                <div className="card-header" id="project_authors">
                                    <h6>Author(s)</h6>
                                </div>
                                <div className="card-body">
                                    {authors.map(author => {
                                        return (
                                            <>
                                                <p>{author}</p>
                                            </>
                                        )
                                    })}
                                </div>
                                <div className="card-footer" id="project_tags">
                                    {tags.map(tag => {
                                        return (
                                            <>
                                                <p>{tag}</p>
                                            </>
                                        )

                                    })}

                                </div>
                            </div>
                            <div className="card">
                                <div className="card-header">
                                    <h6>Project files</h6>
                                </div>
                                <div className="card-body d-flex justify-content-center">
                                    <p>No file uploaded yet</p>
                                </div>
                            </div>
                        </Col>
                    </Row>

                </Container>
            </>
        </Layout>
    )
}



