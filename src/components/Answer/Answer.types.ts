export class Answer {
    constructor(data: any) {
        this.text = data.text;
        this.upvotes = data.upvotes;
        this.downvotes = data.downvotes;
        this.source = data.source;
    }
    text: string;
    upvotes: number;
    downvotes: number;
    source: string;
}

export enum AnswerAction {
    Create = "created",
    Upvote = "upvoted",
    Downvote = "downvoted"
}

export const answerConverter = {
    toFirestore(a: Answer): firebase.firestore.DocumentData {
        return {
            text: a.text,
            source: a.source,
            upvotes: a.upvotes,
            downvotes: a.downvotes,
        };
    },
    fromFirestore(
        snapshot: firebase.firestore.QueryDocumentSnapshot,
        options: firebase.firestore.SnapshotOptions
    ): Answer {
        return new Answer(snapshot.data(options)!);
    }
};