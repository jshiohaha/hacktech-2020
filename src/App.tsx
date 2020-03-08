import React from "react";
import "./App.css";

import Button from "react-bootstrap/Button";
import CardColumns from "react-bootstrap/CardColumns";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";

import LoadingButton from "./components/LoadingButton/LoadingButton";
import QuestionModal from "./components/QuestionModal/QuestionModal";

import { Answer } from "./components/Answer/Answer.types";
import QueryComponent from "./components/Query/QueryComponent";
import { Query } from "./components/Query/Query.types";

function App() {
    const [questionModalShow, setQuestionModalShow] = React.useState(false);

    const data = {
      "question": "Is this a question?",
      "metaText": "This is question meta-text",
      "acceptedAnswer": "",
      "answers": [] as Answer[]
    };

    const submitQuestion = (questionText: string) => {
      console.log(questionText);
      return;
    };

    const submitAnswer = (answer: string, source: string) => {
      console.log("answer: ", answer);
      console.log("source: ", source);

      return;
    };


    /** TODOs
     * 
     * - Add last updated time
     * 
     * - Change the answer data passed into the modal! 
     */
    return (
        <>
            <div className="App">
                <Button
                    variant="primary"
                    style={{ float: "right", position: "relative" }}
                    onClick={() => setQuestionModalShow(true)}
                >
                    Ask a Question
                </Button>
                <div className="search-bar-container">
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder="🔍 Search All Questions"
                            aria-label="Search Text Input"
                            aria-describedby="basic-addon2"
                        />
                        <InputGroup.Append>
                            <LoadingButton />
                        </InputGroup.Append>
                    </InputGroup>
                </div>

                <CardColumns>
                  {
                    [""].map(x => {
                      return <QueryComponent
                        queryEntity={new Query(data)}
                        submitQueryAnswer={submitAnswer}
                      />
                    })
                  }
                </CardColumns>
            </div>

            <QuestionModal
                show={questionModalShow}
                onHide={() => setQuestionModalShow(false)}
                submitQuestion={submitQuestion}
            />  
        </>
    );
}

export default App;
