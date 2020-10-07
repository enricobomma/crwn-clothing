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
    console.log("userAuth", userAuth);
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
};

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);
    const batch = firestore.batch();

    objectsToAdd.forEach(obj => {
        const newDocref = collectionRef.doc(); 
        batch.set(newDocref, obj);
    });

    return await batch.commit();
};

export const convertCollectionsSnapshotToMap = (collections) => {
    const transformedCollection = collections.docs.map(doc => {
        const { title, items } = doc.data();
        return {
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title,
            items
        }
    });
    return transformedCollection.reduce((accumulator, collection) => {
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator;
    }, {});
    
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();


export const getCurrentUser = () => {
    return new Promise((resolve,reject) => {
        const unsubscribe = auth.onAuthStateChanged(userAuth => {
            unsubscribe();
            resolve(userAuth);
        }, reject);
    });
}

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({'prompt': 'select_account'});

export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;

