import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

import firebase from "firebase/app";
import "firebase/firestore";
import { FirebaseConfig } from './config/keys';

firebase.initializeApp(FirebaseConfig);

// This prevents a warning message for changes to firestore timestamp syntax in the console
// Firestore is still in Beta - in the future this won't be necessary
const firestore = firebase.firestore();
const settings = { /* your settings... */ timestampsInSnapshots: true };
firestore.settings(settings);

// Call it once in your app. At the root of your app is the best place
toast.configure({
    autoClose: 5000,
    draggable: false,
    //etc you get the idea
  });

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
