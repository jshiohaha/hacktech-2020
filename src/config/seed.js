const admin = require("firebase-admin");
const ServiceAccount = require("./serviceAccount.json");
const data = require("./seed-data.json");

import { FirebaseConfig } from "./keys";

admin.initializeApp({
    credential: admin.credential.cert(ServiceAccount),
    databaseURL: FirebaseConfig.databaseURL
  });

const COLLECTION_KEY = "questions";

const firestore = admin.firestore();

firestore.settings({
    timestampsInSnapshots: true
});

if (data && (typeof data === "object")) {
    const iterable = data["questions"];
    iterable.forEach(docKey => {
        docKey["keywords"] = docKey["question"].split(" ");

        firestore
            .collection(COLLECTION_KEY)
            .doc(docKey["id"])
            .set(docKey)
            .then(res => {
                console.log("Document " + docKey + " successfully written!");
            })
            .catch(error => {
                console.error("Error writing document: ", error);
            });
    });
}