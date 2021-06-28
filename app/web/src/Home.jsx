import Layout from "./shared/Layout";
import React,{ useState, useEffect } from "react";
import { Jumbotron, Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

export default () => {
    const [projects, setProjects] = useState([]);
    useEffect (()=>{   
            async function fetchProjects() {
                const response = await fetch('/api/projects',{
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    method: 'GET' 
                });
                const json = await response.json(); 
                    setProjects(json.slice(0,4));
                
                
            }
            fetchProjects();   
},[]);

    return (
        <Layout>
            <>
                <Jumbotron>
                    <div>
                        <h1>Welcome to Project Explorer</h1>
                    </div>
                    <p>Project Explorer is a repository for final year projects across all departments at your institution. You can submit your project and search projects by others to learn from.</p>
                    <div>
                        <Button href="/signup" variant="primary" className="mr-4">Get Started</Button>
                        <Button href="/login" variant="secondary">Login</Button>
                    </div>
                </Jumbotron>

                <Container>
                    <Row>   
                    {projects.map(data => (
                    <Col key={data.id}>
                        <div className="project">
                            <h5>
                                <Link to={`/projects/${data.id}`}>{data.name}</Link>
                            </h5>
                            <h6 key={data.createdBy}>{data.authors.map(author=>author)}</h6>
                            <p>{data.abstract}</p>
                            <div key={data.name}>
                                {data.tags.map(tag=><a href="#">{tag}</a>)}
                            </div>
                        </div>
                        
                        
                        </Col>
                    ))}
                        
                    </Row>
                </Container>

            </>
        </Layout>

    )
}



