import React from "react";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";

import validator from "validator";

import AnswerComponent from "../Answer/AnswerComponent";

import "./AnswerModal.css";
import { Answer, AnswerAction } from "../Answer/Answer.types";

// TODO: pass in or load answers
interface IAnswersModalProps {
    questiontext: string;
    answers: Answer[];
    show: boolean;
    onHide: () => void;
    submitUpdatedAnswer: (action: AnswerAction) => void;
    // submitAnswer = (answers: Answer[]) => void;
}

interface IAnswersModalState {
    showAnswerInput: boolean;
    answerInput: string;
    validAnswerInput: boolean;
    urlInput: string;
    validUrlInput: boolean;
}

export default class AnswersModal extends React.Component<
    IAnswersModalProps,
    IAnswersModalState
> {
    constructor(props: IAnswersModalProps) {
        super(props);
        this.state = {
            showAnswerInput: false,
            answerInput: "",
            validAnswerInput: false,
            urlInput: "",
            validUrlInput: false,
        };
    }

    onChangeAnswerInput = (text: string) => {
        const isTextEmpty = text.length > 0 ? true : false;
        this.setState({
            validAnswerInput: isTextEmpty,
            answerInput: text,
        });
    };

    onChangeUrlInput = (text: string) => {
        const isTextEmpty = text.length > 0 ? false : true;
        const isValidUrl = validator.isURL(text);
        this.setState({
            validUrlInput: !isTextEmpty && isValidUrl,
            urlInput: text
        });
    };

    submitUpdatedAnswer = () => {
        this.props.answers.push(new Answer({
            text: this.state.answerInput,
            source: this.state.urlInput,
            upvotes: 0,
            downvotes: 0,
        }));
        this.props.submitUpdatedAnswer(AnswerAction.Create);
    }

    renderAnswerInput = () => {
        return (
            <Form style={{ width: "100%" }}>
                <Form.Group as={Row} controlId="formPlaintextAnswer">
                    <Form.Label column sm="2">
                        Answer
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control
                            className={`${!this.state.validAnswerInput &&
                                "invalid-input"}`}
                            type="plaintext"
                            placeholder="Answer"
                            onChange={(e: any) => {
                                this.onChangeAnswerInput(e.target.value);
                            }}
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formPlaintextLink">
                    <Form.Label column sm="2">
                        Source
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control
                            className={`${!this.state.validUrlInput &&
                                "invalid-input"}`}
                            type="url"
                            placeholder="🔗 Link to Answer Source"
                            onChange={(e: any) => {
                                this.onChangeUrlInput(e.target.value);
                            }}
                        />
                    </Col>
                </Form.Group>

                <Button
                    variant="primary"
                    type="button"
                    style={{ marginRight: "15px" }}
                    disabled={!this.state.validUrlInput}
                    onClick={this.submitUpdatedAnswer}
                >
                    Submit Answer
                </Button>
                <Button
                    variant="danger"
                    type="button"
                    onClick={() => {
                        this.setState({
                            showAnswerInput: (!this.state.showAnswerInput 
                                && !this.state.validAnswerInput)
                        });
                    }}
                >
                    Cancel
                </Button>
            </Form>
        );
    };

    render() {
        const {
            answers,
            questiontext
        } = this.props;

        return (
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Answers for "{questiontext}"
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {(answers.length > 0) ? (
                        answers.map((a: Answer) => {
                            return <AnswerComponent answer={a} submitUpdatedAnswer={this.props.submitUpdatedAnswer} />
                        })
                    ) : (
                        <Card className="text-center">
                            <Card.Body>
                                <Card.Title className="answer-container-empty">No answers yet</Card.Title>
                            </Card.Body>
                        </Card>
                    )}
                </Modal.Body>

                {/* originally dont' show footer */}
                <Modal.Footer style={{ textAlign: "center" }}>
                    {this.state.showAnswerInput ? (
                        this.renderAnswerInput()
                    ) : (
                        <Button
                            variant="primary"
                            onClick={() => {
                                this.setState({
                                    showAnswerInput: true
                                });
                            }}
                        >
                            Submit an Answer
                        </Button>
                    )}
                </Modal.Footer>
            </Modal>
        );
    }
}
