import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyBunxKvlhmJPehaRMmrG9n8p_wWMm58daE",
  authDomain: "netflix-clone-e905e.firebaseapp.com",
  projectId: "netflix-clone-e905e",
  storageBucket: "netflix-clone-e905e.appspot.com",
  messagingSenderId: "653383293519",
  appId: "1:653383293519:web:e676566ceb47e8a046e83a"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signUp = async (name,email,password) =>{
    try {
        const res = await createUserWithEmailAndPassword(auth,email,password);
        const user = res.user;
        await addDoc(collection(db, 'user'), {
            uid: user.uid,
            name,
            autProvider: "local",
            email,
        });
    } catch (error) {
        console.log(error)
        toast.error(error.code.split('/')[1].split('-').join(" "))
    }
}

const login = async(email,password) => {
    try {
         await signInWithEmailAndPassword(auth, email, password)        
    } catch (error) {
        console.log(error)
        toast.error(error.code.split('/')[1].split('-').join(" "))
    }
}

const logout =  () => {
    signOut(auth);
}

export {auth, db, login, signUp, logout} ;  