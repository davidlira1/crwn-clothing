import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAwYiRRze1uRX7wuGNdBYLss1WeoBiLmAs",
    authDomain: "crwn-clothing-97480.firebaseapp.com",
    projectId: "crwn-clothing-97480",
    storageBucket: "crwn-clothing-97480.appspot.com",
    messagingSenderId: "1095243162642",
    appId: "1:1095243162642:web:1ee4e7ed9579dd9989a4cb",
    measurementId: "G-XKP001FJYF"
  };

export const createUserProfileDocument = async(userAuth, additionalData) => {
  console.log(userAuth)
  if(!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if(!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch(error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

