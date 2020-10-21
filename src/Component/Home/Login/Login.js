import React, { useContext, useState } from "react";
import "./Login.css";
import LogForm from "./LogForm";
import SignUpForm from "./SignUpForm";
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../Login/firebase.config";
import { UserContext } from "../../../App";
import { useHistory, useLocation } from "react-router-dom";

const Login = () => {
    const [newUser, setNewUser] = useState(false);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    const [currentUser, setCurrentUser] = useState({
        isSignedIn: false,
        email: "",
        password: "",
        error: "",
        success: false,
    });

    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/search" } };

    const handleFormToggle = () => {
        setNewUser(!newUser);
    };


    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }

    const handleFacebookSignIn = () => {
        const provider = new firebase.auth.FacebookAuthProvider();
        firebase
            .auth()
            .signInWithPopup(provider)
            .then((result) => {
                const { displayName, email } = result.user;
                const newUser = {
                    isSignedIn: true,
                    email: email,
                    name: displayName,
                };
                setCurrentUser(newUser);

                setLoggedInUser(newUser);
                history.replace(from);
            })
            .catch((error) => {
                const newUser = { ...currentUser };
                newUser.error = error.message;
                newUser.success = false;
                setLoggedInUser(newUser);
            });
    };

    const handleGoogleSignIn = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase
            .auth()
            .signInWithPopup(provider)
            .then((result) => {
                const { displayName, email } = result.user;
                const newUser = {
                    isSignedIn: true,
                    email: email,
                    name: displayName,
                };
                setCurrentUser(newUser);

                setLoggedInUser(newUser);
                history.replace(from);
            })
            .catch((error) => {
                const newUser = { ...currentUser };
                newUser.error = error.message;
                newUser.success = false;
                setLoggedInUser(newUser);
            });
    };

    const [errors, setErrors] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    let pass1, pass2;
    const handleFormValidation = (event) => {
        let isFieldValid = true;
        const newError = { ...errors };

        if (event.target.name === "name") {
            isFieldValid = event.target.value.length > 2;
            if (!isFieldValid) {
                newError[event.target.name] = "The name you have entered is not valid";
                setErrors(newError);
            } else {
                newError[event.target.name] = "";
                setErrors(newError);
            }
        }

        if (event.target.name === "email") {
            isFieldValid = /\S+@\S+/.test(event.target.value);
            if (!isFieldValid) {
                newError[event.target.name] = "The email you have entered is not valid!";
                setErrors(newError);
            } else {
                newError[event.target.name] = "";
                setErrors(newError);
            }
        }

        if (event.target.name === "password" || event.target.name === "confirmPassword") {
            const isPasswordLengthValid = event.target.value.length > 5;
            const passwordHasNumber = /\d{1}/.test(event.target.value);

            isFieldValid = isPasswordLengthValid && passwordHasNumber;

            if (event.target.name === "password") {
                pass1 = event.target.value;
                if (!isFieldValid) {
                    newError[event.target.name] = "This password is not valid, try entering a valid one!";
                    setErrors(newError);
                } else {
                    newError[event.target.name] = "";
                    setErrors(newError);
                }
            }
            if (event.target.name === "confirmPassword") {
                pass2 = event.target.value;
                if (!isFieldValid && pass1 !== pass2) {
                    newError[event.target.name] = "Password did not match!";
                    setErrors(newError);
                } else {
                    newError[event.target.name] = "";
                    setErrors(newError);
                }
            }
        }

        if (isFieldValid) {
            const newUser = { ...currentUser };
            newUser[event.target.name] = event.target.value;
            setCurrentUser(newUser);
        }
    };

    const handleCreateNewUser = (event) => {
        event.preventDefault();
        if (!currentUser.email && !currentUser.password) {
            const newError = { ...errors };
            newError.name = "Please use a valid name!";
            newError.email = "Please use a valid email!";
            newError.password = "Password did not match";
            newError.confirmPassword = "Password did not match";
            setErrors(newError);
        } else {
            firebase
                .auth()
                .createUserWithEmailAndPassword(currentUser.email, currentUser.password)
                .then((result) => {
                    const { displayName, email } = result.user;
                    const newUser = {
                        email: email,
                        name: displayName,
                        success: true,
                        error: "",
                    };
                    setCurrentUser(newUser);

                    setLoggedInUser(newUser);
                })
                .catch((error) => {
                    const newUser = { ...currentUser };
                    newUser.error = error.message;
                    newUser.success = false;
                    setLoggedInUser(newUser);
                });
        }
    };


    const handleSignIn = (event) => {
        event.preventDefault();
        if (!currentUser.email && !currentUser.password) {
            const newError = { ...errors };
            newError.email = "Please use valid email!";
            newError.password = "Please use valid password!";
            setErrors(newError);
        } else {
            firebase
                .auth()
                .signInWithEmailAndPassword(currentUser.email, currentUser.password)
                .then((result) => {
                    const { displayName, email } = result.user;
                    const newUser = {
                        isSignedIn: true,
                        email: email,
                        name: displayName,
                        success: true,
                        error: "",
                    };
                    setCurrentUser(newUser);

                    setLoggedInUser(newUser);
                    history.replace(from);
                })
                .catch((error) => {
                    const newUser = { ...currentUser };
                    newUser.error = error.message;
                    newUser.success = false;
                    setLoggedInUser(newUser);
                });
        }
    };

    return (
        <section className="loginPart text-center">
            <div className="container">
                {currentUser.success && (
                    <div className="alert alert-success" role="alert">
                        User {!newUser ? "logged in" : "signed up"} successfully
                    </div>
                )}
                {loggedInUser.error && (
                    <div className="alert alert-danger" role="alert">
                        {loggedInUser.error}
                    </div>
                )}
                {newUser ? (
                    <SignUpForm
                        toggleUser={handleFormToggle}
                        validation={handleFormValidation}
                        submit={handleCreateNewUser}
                        errors={errors}
                    ></SignUpForm>
                ) : (
                        <LogForm
                            toggleUser={handleFormToggle}
                            validation={handleFormValidation}
                            submit={handleSignIn}
                            errors={errors}
                        ></LogForm>
                    )}
                <div>
                    <div className="form-divider text-center">
                        <p>Or</p>
                    </div>

                    <div className="otherMediaLogin">
                        <button className="btn btn-secondary" onClick={handleFacebookSignIn}>
                            <span>
                                <img src={require("../../../image/icon/fb.png")} style={{ maxWidth: "35px" }} alt="facebook logo" />
                            </span>
                            <span>Continue with Facebook</span>
                        </button>
                        <button className="btn btn-secondary" onClick={handleGoogleSignIn}>
                            <span>
                                <img src={require("../../../image/icon/google.png")} style={{ maxWidth: "30px" }} alt="google logo" />
                            </span>
                            <span>Continue with Google</span>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};
export default Login;