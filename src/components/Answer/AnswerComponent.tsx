import React from "react";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import { Answer, AnswerAction } from "./Answer.types";

import "./AnswerComponent.css";

interface IAnswerProps {
    answer: Answer;
    submitUpdatedAnswer: (action: AnswerAction) => void;
}

interface IAnswerState {}

export default class AnswerComponent extends React.Component<
    IAnswerProps,
    IAnswerState
> {
    answerUpvoteClicked = () => {
        this.props.answer.upvotes += 1;
        this.props.submitUpdatedAnswer(AnswerAction.Upvote);
    };

    answerDownvoteClicked = () => {
        this.props.answer.downvotes += 1;
        this.props.submitUpdatedAnswer(AnswerAction.Downvote);
    };

    render() {
        const { answer } = this.props;

        return (
            // border="success"
            <Card className="answer-container text-center">
                <Card.Body>
                    <Card.Text>{answer.text}</Card.Text>

                    <Card.Link href={`${answer.source}`} target="_blank">
                        Answer Source
                    </Card.Link>
                </Card.Body>
                <Card.Footer>
                    <Button
                        variant="success"
                        style={{ marginRight: "15px" }}
                        onClick={this.answerUpvoteClicked}
                    >
                        {answer.upvotes} | Agree
                    </Button>
                    <Button variant="danger" onClick={this.answerDownvoteClicked}>
                        {answer.downvotes} | Disagree
                    </Button>
                </Card.Footer>
            </Card>
        );
    }
}
