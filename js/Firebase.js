import firebase from 'firebase';
import 'firebase/firestore';

//Firebase verbindung https://console.firebase.google.com/project/reacttest-e4ed3/overview
const config = {
    apiKey: "AIzaSyCnFKIbGdD759pC0Idj79yfGoTmeDygHNo",
    authDomain: "reacttest-e4ed3.firebaseapp.com",
    databaseURL: "https://reacttest-e4ed3.firebaseio.com",
    projectId: "reacttest-e4ed3",
    storageBucket: "reacttest-e4ed3.appspot.com",
    messagingSenderId: "558727092530",
    appId: "1:558727092530:web:a46e48d6b949b0987fdf2b"
};
var isInitialised = false;
export default class Firebase {
    static db;

    static init() {
        //if (firebase.app.length === 0) {
        if (!isInitialised) {
            firebase.initializeApp(config);
            isInitialised = true;
        }
        Firebase.db = firebase.firestore();
    }
}
