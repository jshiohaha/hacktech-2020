import React from "react";
// import logo from "./logo.svg";
import "./App.css";

import Button from 'react-bootstrap/Button'
import Card  from "react-bootstrap/Card";
import CardColumns from 'react-bootstrap/CardColumns';

function App() {
    return (
        <div className="App">
            <CardColumns>
                <Card border="success">
                    <Card.Body>
                        <Card.Title>
                            Card title that wraps to a new line
                        </Card.Title>
                        <Card.Text>
                            This is a longer card with supporting text below as
                            a natural lead-in to additional content. This
                            content is a little bit longer.
                        </Card.Text>

                        <Card.Text>
                            <small className="text-muted">
                                Last updated 3 mins ago
                            </small>
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                      <Button variant="success" style={{ width: "100px", marginRight: "15px" }}>Agree</Button>
                      <Button variant="danger" style={{ width: "100px" }}>Disagree</Button>
                    </Card.Footer>
                </Card>

            </CardColumns>
        </div>
    );
}

export default App;
