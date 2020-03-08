// import moment from 'moment';
import { Answer, answerConverter } from '../Answer/Answer.types';

export class Question {
    constructor(data: any) {
        this._id = data.id;
        this.question = data.question;
        this.description = data.description;
        // this.lastUpdated = data.lastUpdated;
        // TODO: construct Answer objects
        this.acceptedAnswer = data.acceptedAnswer;
        this.answers = data.answers.map((x: any) => {
            return new Answer(x);
        });
    }

    _id: string;
    question: string;
    description?: string;
    // lastUpdated: moment.Moment;
    acceptedAnswer?: Answer;
    answers: Answer[];
}

export const questionConverter = {
    toFirestore(q: Question): firebase.firestore.DocumentData {
        let acceptedAnswer = null;
        if ((q.acceptedAnswer !== undefined) &&
            (q.acceptedAnswer !== null)) {
            acceptedAnswer = answerConverter.toFirestore(q.acceptedAnswer);
        }

        let description = undefined;
        if (q.description !== undefined) {
            description = q.description;
        }

        return {
            id: q._id,
            question: q.question,
            description: description,
            acceptedAnswer: acceptedAnswer,
            answers: q.answers.map(x => answerConverter.toFirestore(x))
        };
    },
    fromFirestore(
        snapshot: firebase.firestore.QueryDocumentSnapshot,
        options: firebase.firestore.SnapshotOptions
    ): Question {
        return new Question(snapshot.data(options)!);
    }
};