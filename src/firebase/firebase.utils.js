import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth'


const config = {
  apiKey: "AIzaSyBvK31_BqykLEFy20EU5i-JW6c9T4qcCiI",
  authDomain: "crwn-db-7b4d4.firebaseapp.com",
  projectId: "crwn-db-7b4d4",
  storageBucket: "crwn-db-7b4d4.appspot.com",
  messagingSenderId: "643929749084",
  appId: "1:643929749084:web:bdce1b5f3f762f77ab1899"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if(!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  
  const snapShot = await userRef.get();

  if(!snapShot.exists){
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ propmt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;