import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";


const firebaseConfig = {
  apiKey: "AIzaSyDZbE2bvqyEb1jxexRiwY8P1Ui684auosY",
  authDomain: "netflix-clone-f31ee.firebaseapp.com",
  projectId: "netflix-clone-f31ee",
  storageBucket: "netflix-clone-f31ee.firebasestorage.app",
  messagingSenderId: "187424741765",
  appId: "1:187424741765:web:a1d2ad03a8418891fb4cec"
};

const app = initializeApp(firebaseConfig); 
const auth = getAuth(app);
const db = getFirestore(app);

// user sign-up function
const signup = async (name, email, password)=>{
    try {
        const response = await createUserWithEmailAndPassword(auth, email, password);
        const user = response.user
        await addDoc(collection(db, "user"), {  
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        } );
    } catch (error) {
        console.log(error);
       toast.error(error.code.split('/')[1].split('-').join(" "))
    }
}

// user sign-in function/ user login function
const login = async (email, password)=>{
    try {
        await signInWithEmailAndPassword(auth, email, password);
        //from this line user will be login with our website
    } catch (error) {
        console.log(error)
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

// logout function
const logout = ()=>{
    signOut(auth);
}

export {auth, db, signup, login, logout}
