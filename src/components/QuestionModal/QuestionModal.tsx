import React from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

// import { toast } from 'react-toastify';

// TODO: pass in or load answers
interface IAnswersModalProps {
    show: boolean;
    onHide: () => void;
    submitQuestion: (question: string, desc: string) => void;
}

interface IAnswersModalState {
    validQuestionInput: boolean;
    questionText: string;
    descriptionText: string;
}

export default class AnswersModal extends React.Component<
    IAnswersModalProps,
    IAnswersModalState
> {
    // instantiate firebase handlers
    constructor(props: IAnswersModalProps) {
        super(props);
        this.state = {
            validQuestionInput: false,
            questionText: "",
            descriptionText: ""
        };
    }

    onChangeTextInput = (text: string, entity: string) => {
        if (entity === "question") {
            this.setState({
                validQuestionInput: text.length > 0 ? true : false,
                questionText: text
            });
        } else if (entity === "description") {
            this.setState({
                descriptionText: text
            });
        }
    };

    submitQuestion = () => {
        const {
            questionText, 
            descriptionText
        } = this.state;

        this.props.submitQuestion(questionText, descriptionText);

        this.setState({
            validQuestionInput: false,
        });

        this.props.onHide();
    }

    onComponentDidMount = () => {
        this.setState({
            validQuestionInput: false,
            questionText: "",
            descriptionText: ""
        });
    };

    render() {
        return (
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Submit a New Question
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="form.ControlTextarea">
                            <Form.Label>Question</Form.Label>
                            <Form.Control
                                type="plaintext"
                                onChange={(e: any) => {
                                    this.onChangeTextInput(e.target.value, "question");
                                }}
                            />
                        </Form.Group>

                        <Form.Group controlId="form.TextArea">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows="3"
                                onChange={(e: any) => {
                                    this.onChangeTextInput(e.target.value, "description");
                                }}
                            />
                        </Form.Group>
                    </Form>

                    <Button
                        variant="primary"
                        type="button"
                        style={{ float: "right" }}
                        disabled={!this.state.validQuestionInput}
                        onClick={this.submitQuestion}
                    >
                        Submit Question
                    </Button>
                </Modal.Body>
            </Modal>
        );
    }
}
