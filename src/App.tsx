import React from "react";
import "./App.css";

import firebase from "firebase/app";
import "firebase/firestore";

import Button from "react-bootstrap/Button";
import CardColumns from "react-bootstrap/CardColumns";

import { toast } from "react-toastify";

import SearchBar from "./components/SearchBar/SearchBar";
import QuestionModal from "./components/QuestionModal/QuestionModal";

import { Answer } from "./components/Answer/Answer.types";
import QuestionComponent from "./components/Question/QuestionComponent";
import { Question } from "./components/Question/Question.types";
import { QUESTIONS_DATABASE } from "./config/dbName";

// TODO: pass in or load answers
interface IAppProps {}

interface IAppState {
    questionEntities: Question[];
    questionModalShow: boolean;
}

export default class App extends React.Component<IAppProps, IAppState> {
    // instantiate firebase handlers
    constructor(props: IAppProps) {
        super(props);
        this.state = {
            questionEntities: [] as Question[],
            questionModalShow: false
        };
    }

    loadQuestions = () => {
        firebase
            .firestore()
            .collection(QUESTIONS_DATABASE)
            .onSnapshot(querySnapshot => {
                this.setState({
                    questionEntities: [] as Question[]
                });
                querySnapshot.forEach(doc => {
                    let data = doc.data();
                    data["id"] = doc.id;
                    const question: Question = new Question(data);
                    this.setState({
                        questionEntities: [
                            ...this.state.questionEntities,
                            question
                        ]
                    });
                });
            });
    };

    submitQuestion = (question: string, desc: string) => {
        // Add a new document with a generated id.
        firebase
            .firestore()
            .collection(QUESTIONS_DATABASE)
            .add({
                keywords: question.split(" "),
                question: question,
                description: desc,
                answers: [] as Answer[]
            })
            .then(() => {
                toast.success(
                    'Successfully added question: "' + question + '"',
                    {
                        position: toast.POSITION.TOP_CENTER
                    }
                );
            })
            .then(() => {
                this.loadQuestions();
            })
            .catch(function(error) {
                toast.error('Error adding question: "' + question + '"', {
                    position: toast.POSITION.TOP_CENTER
                });
            });

        return;
    };

    setQuestionModalShow = (targetState: boolean) => {
        this.setState({
            questionModalShow: targetState
        });
    };

    componentDidMount() {
        this.loadQuestions();
    }

    clearSearchResults = () => {
        this.loadQuestions();
    }

    searchFunction = async (query: string) => {
        const snapshot = await firebase.firestore().collection(QUESTIONS_DATABASE)
            .where('keywords', 'array-contains', query.toLowerCase())
            .get();
        console.log(snapshot);
        const results: Question[] = snapshot.docs.map(doc => {
            return new Question(doc.data());
        });

        this.setState({
            questionEntities: results
        });
    };

    /** TODOs
     *
     * - Add last updated time
     *
     * - Change the answer data passed into the modal!
     */
    render() {
        return (
            <>
                <div className="App">
                    <Button
                        variant="primary"
                        style={{ float: "right", position: "relative" }}
                        onClick={() => this.setQuestionModalShow(true)}
                    >
                        Ask a Question
                    </Button>

                    <SearchBar searchFunction={this.searchFunction} clearSearchResults={this.clearSearchResults} />

                    <CardColumns>
                        {/* TODO: add a default state when there are no questions? */}
                        {this.state.questionEntities.map(question => {
                            return (
                                <QuestionComponent
                                    questionEntity={question}
                                />
                            );
                        })}
                    </CardColumns>
                </div>

                <QuestionModal
                    show={this.state.questionModalShow}
                    onHide={() => this.setQuestionModalShow(false)}
                    submitQuestion={this.submitQuestion}
                />
            </>
        );
    }
}
