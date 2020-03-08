import React from "react";

import firebase from "firebase/app";
import "firebase/firestore";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import { MdReportProblem } from "react-icons/md";
import { IconContext } from "react-icons";

import { toast } from 'react-toastify';

import { QUESTIONS_DATABASE } from "../../config/dbName";
import { Answer, AnswerAction } from "../Answer/Answer.types";
import AnswersModal from "../AnswerModal/AnswersModal";
import { Question, questionConverter } from "./Question.types";

import "./QuestionComponent.css";

// onClick={() => setAnswerModalShow(true)}

interface IQuestionProps {
    questionEntity: Question;
}

interface IQuestionState {
    answerModalShow: boolean;
    setAnswerModalShow?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default class QuestionComponent extends React.Component<
    IQuestionProps,
    IQuestionState
> {
    constructor(props: IQuestionProps) {
        super(props);
        this.state = {
            answerModalShow: false
        };
    }

    setAnswerModalShow = (targetState: boolean) => {
        this.setState({
            answerModalShow: targetState
        });
    };

    submitUpdatedAnswer = (action: AnswerAction) => {
        const {
            questionEntity
        } = this.props;

        // TODO: inefficient over time, there's definitely a better way to do this
        // Compute if we have found an accepted answer
        if (action === AnswerAction.Upvote) {
            for (let i = 0; i < questionEntity.answers.length; i++) {
                const ans: Answer = questionEntity.answers[i];
                if (ans.upvotes > 10 && (ans.upvotes / ans.downvotes) > 0.5) {
                    questionEntity.acceptedAnswer = ans;
                    break;
                }
            }
        }

        // TODO: there's definitely a better way to update objects (and arrays)
        // https://cloud.google.com/firestore/docs/manage-data/add-data#custom_objects
        // https://medium.com/@aaron_lu1/firebase-cloud-firestore-add-set-update-delete-get-data-6da566513b1b
        firebase
            .firestore()
            .collection(QUESTIONS_DATABASE)
            .withConverter(questionConverter)
            .doc(questionEntity._id)
            .set(questionEntity, { merge: true })
            .then(() => {
                toast.success(
                    'Successfully ' + action.toString() + ' answer to "' + questionEntity.question + '"',
                    {
                        position: toast.POSITION.TOP_CENTER
                    }
                );
            })
            .catch(function(error) {
                toast.error('Error ' + action.toString() + ' answer to "' + questionEntity.question + '"', {
                    position: toast.POSITION.TOP_CENTER
                });
            });

        return;
    };


    submitQuestionReport = () => {
        toast.info("Report submitted for \"" + this.props.questionEntity.question + "\"", {
            position: toast.POSITION.TOP_CENTER
          });
    }

    renderAcceptedAnswer = () => {
        return (
            <Card className="text-center" border="success">
                <Card.Body>
                    <Card.Title>Accepted Answer</Card.Title>
                    <Card.Text>
                        Some quick example text to build on the card
                        title and make up the bulk of the card's
                        content.
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                    <Card.Link href="#" target="_blank">
                        Answer Source
                    </Card.Link>
                </Card.Footer>
            </Card>
        );
    }

    renderNoAcceptedAnswer = () => {
        const hasBeenAnswered = this.props.questionEntity.answers.length > 0;
        const titleText = (hasBeenAnswered) ? "No Accepted Answer Yet" :  "No Answers Yet";
        const descriptionText = (hasBeenAnswered) ? (
            "Please help by submitting or voting on an answer below!" 
        ) : ( 
            "Please help by submitting the first answer!"
        );

        return (
            <Card className="text-center" border="secondary">
                <Card.Body>
                    <Card.Title>{titleText}</Card.Title>
                    <Card.Text>{descriptionText}</Card.Text>
                </Card.Body>
            </Card>
        );
    }

    render() {
        const { questionEntity } = this.props;

        const answerButtonText = (questionEntity.answers.length > 0) ? "View all Answers" : "Submit an Answer";
        const answerButtonVariant = (questionEntity.acceptedAnswer !== undefined) ? "primary" : "info";

        return (
            <>
                <Card>
                    <Card.Body>
                        {/* TODO: update margin */}
                        <Card.Title style={{ marginBottom: "20px" }}>
                            {questionEntity.question}
                        </Card.Title>

                        {questionEntity.description!.length > 0 && (
                            <Card.Text>{questionEntity.description}</Card.Text>
                        )}

                        {(questionEntity.acceptedAnswer !== undefined && questionEntity.acceptedAnswer !== null) ? (
                            this.renderAcceptedAnswer()
                        ) : (
                            this.renderNoAcceptedAnswer()
                        )}

                        {/* TODO: figure out if I want last updated at? */}
                        {/* <Card.Text>
                            <small className="text-muted">
                                Last updated 3 mins ago
                            </small>
                        </Card.Text> */}
                    </Card.Body>

                    <Card.Body
                        style={{
                            textAlign: "center",
                            paddingTop: "0",
                            paddingBottom: "0"
                        }}
                    >
                        <Button
                            variant={answerButtonVariant}
                            onClick={() => this.setAnswerModalShow(true)}
                        >
                            {answerButtonText}
                        </Button>
                    </Card.Body>

                    <IconContext.Provider
                        value={{
                            className: "MdReportProblemIcon"
                        }}
                    >
                        <div>
                            <MdReportProblem onClick={this.submitQuestionReport} />
                        </div>
                    </IconContext.Provider>
                </Card>

                <AnswersModal
                    questiontext={questionEntity.question}
                    answers={questionEntity.answers}
                    show={this.state.answerModalShow}
                    onHide={() => this.setAnswerModalShow(false)}
                    submitUpdatedAnswer={this.submitUpdatedAnswer}
                />
            </>
        );
    }
}
