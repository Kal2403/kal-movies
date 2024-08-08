import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyCtjwz6B0zS1kBRnOzuDxXrWVaqNh2NjLA",
  authDomain: "netflix-clone-e5c0d.firebaseapp.com",
  projectId: "netflix-clone-e5c0d",
  storageBucket: "netflix-clone-e5c0d.appspot.com",
  messagingSenderId: "864802708445",
  appId: "1:864802708445:web:2dee50c94bf2aac3357434",
  measurementId: "G-0GYFW9P33K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

const signUp = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password)
        const user = res.user;
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const logOut = () => {
    signOut(auth);
}

export {auth, db, login, signUp, logOut};
