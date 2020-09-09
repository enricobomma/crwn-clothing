import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth'


const config = {
    apiKey: "AIzaSyBgogY8tDudiTW6WiFmu5TXvvnTAdKuTDE",
    authDomain: "crown-db-88786.firebaseapp.com",
    databaseURL: "https://crown-db-88786.firebaseio.com",
    projectId: "crown-db-88786",
    storageBucket: "crown-db-88786.appspot.com",
    messagingSenderId: "1096105258673",
    appId: "1:1096105258673:web:4434ec5fc31dcd6e7ffc90",
    measurementId: "G-QHMKZGDFHW"
}

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();
    if(!snapShot.exists)
    {
        const { email} = userAuth;
        const displayName = additionalData;
        console.log("additionalData", additionalData);
        const createdAt = new Date();
        console.log("DisplayName in firebase and email", displayName, email);
        try {
            await userRef.set({
                // displayName, email, createdAt, ...userRef.additionalData
                displayName, email, createdAt
            })
        } catch (error) {
            console.log("Error creating user ", error.message);
        }
    }

    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({'prompt': 'select_account'});

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

