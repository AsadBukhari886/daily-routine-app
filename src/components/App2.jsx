import React, { useEffect, useState, useReducer } from 'react';
import Front from '../containers/front/Front';
import Login from './login/Login';
import Navbar from '../containers/navbar/Navbar';
import Daily from '../containers/daily/Daily';
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import Account from '../containers/account/Account';
import { getDatabase, ref, set } from "firebase/database";
import { initializeApp } from "firebase/app";
// import { doc, setDoc } from "firebase/firestore";
import Modal from 'react-modal';
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    FacebookAuthProvider,
    GithubAuthProvider,
    onAuthStateChanged,
    signInWithRedirect
} from "firebase/auth";






const provider = new GoogleAuthProvider();
const provider2 = new FacebookAuthProvider();
const githubProvider = new GithubAuthProvider();



const firebaseConfig = {
    apiKey: "AIzaSyD2OuRhZB9U_2p1QNj2hlwgkAHJ8uSWD6E",
    authDomain: "dailyroutine2-9679b.firebaseapp.com",
    databaseURL: "https://dailyroutine2-9679b-default-rtdb.firebaseio.com",
    projectId: "dailyroutine2-9679b",
    storageBucket: "dailyroutine2-9679b.appspot.com",
    messagingSenderId: "948078012639",
    appId: "1:948078012639:web:2f6bb1ad43446339b9e16a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);


Modal.setAppElement(document.getElementById('root'));
//funcion official starts from here and i want 
//to from here and i am here for you to be open
// it like for a while this is me are you okay
function App2() {
    // let dynamic = <Login />
    let user_auth;
    const [userAuth, setUserAuth] = useState()
    const [dynamic, setdynamic] = useState({
        nav_item: "login",
        component: <Login />,
        link: '/'
    })

    // const [state, dispatch] = useReducer()
    const auth = getAuth();
    useEffect(() => {


        onAuthStateChanged(auth, (user) => {
            if (user !== null) {
                setUserAuth(user);

                const uid = user.uid;
                // console.log("user auhtneticated", uid)
                setdynamic({ nav_item: 'Account', link: '/account', conponent: <Account /> })

            } else {
                setUserAuth(false)
                // console.log(" user logout")
                setdynamic({ nav_item: "login", link: '/', component: <Login /> })
            }
        });
    }, [])

    const [value, setValue] = useState('');
    // let subtitle;
    const [modalIsOpen, setIsOpen] = useState(false);
    const userId = 123;
    const email = "asadbukhar46b754543@gmail.com";

    const signInWithGoogle = () => {
        const auth = getAuth();

        signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const user = result.user;
                // ...
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.email;
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });
    }

    const signInWithFacebook = () => {
        const auth = getAuth();

        signInWithPopup(auth, provider2)
            .then((result) => {
                // The signed-in user info.
                const user = result.user;

                // This gives you a Facebook Access Token. You can use it to access the Facebook API.
                const credential = FacebookAuthProvider.credentialFromResult(result);
                const accessToken = credential.accessToken;

                // ...
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.email;
                // The AuthCredential type that was used.
                const credential = FacebookAuthProvider.credentialFromError(error);

                // ...
            });
    }
    const signInWithGithub = () => {
        const auth = getAuth();
        signInWithPopup(auth, githubProvider)
            .then((result) => {
                // This gives you a GitHub Access Token. You can use it to access the GitHub API.
                const credential = GithubAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;

                // The signed-in user info.
                const user = result.user;
                // console.log(user)
                // ...
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.email;
                // The AuthCredential type that was used.
                const credential = GithubAuthProvider.credentialFromError(error);
                // ...
            });
    }

    async function writeUserData(e) {
        const db = getDatabase();


        setValue(e.target.value)
        // console.log("in", value);
        await set(ref(db, 'pokimon/' + userId + 'asad'), {
            username: e.target.value,
            email: email
        });

    }

    //login portion
    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        // subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
    }
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            padding: "50px",
            border: '1px solid ',
            backgroundColor: '#f5f5f5',

        },
    };

    return <div>
        <Router>
            <Navbar
                openModal={openModal}
                dynamic={dynamic}
                user={userAuth}

            />
            <Routes>
                <Route exact path="/" element={<Front />} />
                <Route exact path={dynamic.link} element={<Account add={writeUserData} />} />
                <Route exact path="/daily" element={<Daily />} />
            </Routes>
            <Login
                openModal={openModal}
                afterOpenModal={afterOpenModal}
                closeModal={closeModal}
                modalIsOpen={modalIsOpen}
                customStyles={customStyles}
                signInWithGoogle={signInWithGoogle}
                signInWithFacebook={signInWithFacebook}
                signInWithGithub={signInWithGithub}
            // subtitle={subtitle}
            />
        </Router>
        <div>
            <input type="text" value={value} onChange={(e) => writeUserData(e)} />
        </div>
        {/* <button onClick={signInWithGoogle}>signInWithGoogle</button><br /><br /> */}
        {/* <button onClick={signInWithFacebook}>signInWithFacebook</button><br /><br /> */}
        {/* <button onClick={signInWithGithub}>signInWithGithub</button><br /><br /> */}
        <button onClick={() => {
            const auth = getAuth();
            auth.signOut();

// signInWithRedirect()
        }}>sign out</button>

    </div>;
}

export default App2;
