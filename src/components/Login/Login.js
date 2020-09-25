import { MDBBtn } from 'mdbreact';
import React, { useContext, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { googleSignIn, googleSignOut, signInWithFb, createUserWithEmailAndPassword, signInWithEmailAndPassword, initializeFirebaseLogin } from './LogInManager';
import { UserContext } from '../../App';
import google from '../../Images/icons/google.png';
import fb from '../../Images/icons/fb.png';
import './Login.css'
import { nameCheck, emailCheck,  passwordCheck } from './ValidationCheck';



const Login = () => {
    initializeFirebaseLogin();

    //------- login message may come or not . for that use state---------------------------- 
    const [nameWarning, setNameWarning] = useState("")
    const [emailWarning, setEmailWarning] = useState("")
    const [passwordWarning, setPasswordWarning] = useState("")
    const [passConfMessage, setPassConfMessage] = useState("")
    const [errmsg, setErrMsg] = useState("")

    const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({
        isLogIn: false,
        displayName: '',
        photo: '',
        email: '',
        password: '',
        confirmPassword: false,
        success: false,
        error: ''
    })
    const [loggedInUser, setLoggedInUser] = useContext(UserContext); 
    const [loader, setLoader] = useState(false);

    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } }

//------Handle response of firebase -------------------------------------------
    const handleResponse = (res, redirect) => { 
       
        if (res.error) {
            document.getElementById("form").reset();
            newUser && setErrMsg(res.error)
            !newUser && setErrMsg(res.error)
        } else {
           
            setUser(res);
            setLoggedInUser(res)
            setLoggedInUser(res)
            setLoader(false)
            redirect && history.replace(from);

            newUser && setErrMsg("")
            !newUser && setErrMsg("")
        }
    }

    //------------------- Handle Google Sign In--------------------------------------------
    const googleSignInHandle = () => { 
        googleSignIn()
            .then(res => {
                res && handleResponse(res, true);
            })
    }

    const fbSignInHandle = () => { //--------------------- facebook login
        signInWithFb()
            .then(res => {
                handleResponse(res, true)
            })
    }

    // -------------- handle submit--------------------------------
    const handleSubmit = (e) => { 
        console.log("submitting.....", user)
        setErrMsg("")
        setLoader(true);
        setTimeout(() => {
            setLoader(false);
        }, 5000)


        //-------incase of new user ,use have to create new user with email and password---------------------------------
        if (newUser && user.name && user.email && user.password) { 
            if (user.confirmPassword) {
                createUserWithEmailAndPassword(user.name, user.email, user.password)
                    .then(res => {
                        handleResponse(res, true);
                    })
            }
        }

        //---------incase of exiting user user will Log in with his/her email and password
        if (!newUser && user.password && user.email) { 
            signInWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    handleResponse(res, true);
                })
        }
        e.preventDefault();
    }

    //------- form validation ( name, email and password) ----------

    const saveFormData = (e) => { 
        const newUserInfo = { ...user };
        newUserInfo[e.target.name] = e.target.value;
        setUser(newUserInfo);
        console.log("updated info", user, newUserInfo)
    }
    const clearInputData = (e, msg) => { 
        const newUserInfo = { ...user };
        newUserInfo[e.target.name] = "";
        setUser(newUserInfo);
    }
    //---------- Name Validation Check ----------------
    const nameChecking = (e) => { 
        const valid = nameCheck(e);
        const msg = "Name length must be greater than 4"
        if (valid) {
            saveFormData(e)
            setNameWarning("")
        } else {
            clearInputData(e, msg)
            setNameWarning(msg)
        }
    }

    //---------- Email Validation Check ----------------
    const emailChecking = (e) => { 
        const valid = emailCheck(e);
        if (valid) {
            saveFormData(e)
            setEmailWarning("")
        } else {
            clearInputData(e)
            setEmailWarning("Please Enter Valid Email Address")
        }
    }
 //---------- Password Validation Check ----------------
    const passwordChecking = (e) => { 
        const valid = passwordCheck(e);
        if (valid) {
            saveFormData(e)
            setPasswordWarning("")
        } else {
            clearInputData(e)
            setPasswordWarning("Password length must be greater than 4 and must include a number")
        }
    }
//------------------- check whether both password is matched or not--------------------------
    const confirmPasswordCheck = (e) => { 
        if (e.target.value === user.password) {
            const newUserInfo = { ...user };
            newUserInfo[e.target.name] = true;
            setUser(newUserInfo);
            setPassConfMessage("");
        } else {
            const newUserInfo = { ...user };
            newUserInfo[e.target.name] = false;
            setUser(newUserInfo);
            setPassConfMessage("Password doesn't match!!!!!");
        }
    }




    return (
        <div className="login d-flex justify-content-center p-5">
            <div className="login-form w-50 p-5">

                <div className="center float-left">
                    {newUser ? <h3>Create an account</h3> : <h3>Log In</h3>} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {
                        loader &&
                        <div className="spinner-border text-primary" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    }
                    <br/><br/>
                </div>

                     {/* Handle Form Submit Code  */}
                <form onSubmit={handleSubmit} id="form">
                    {newUser && <> <input className="form-control"  name="name" type="text" onChange={nameChecking} placeholder="Enter Your Name" required /><br />
                        {nameWarning.length > 0 ? <small style={{ color: 'red' }}>{nameWarning} <br /><br /></small> : <small></small>}
                    </>}

                    <input className="form-control"  name="email" type="text" onChange={emailChecking} placeholder="Enter Your Email" required />  <br />
                    {emailWarning.length > 0 ? <small style={{ color: 'red' }}>{emailWarning} <br /><br /></small> : <small></small>}

                    <input className="form-control"  name="password" type="password" onChange={passwordChecking} placeholder="Enter Password" required />  <br />
                    {passwordWarning.length > 0 ? <small style={{ color: 'red' }}>{passwordWarning} <br /><br /></small> : <small></small>}

                    {newUser && <> <input className="form-control" onChange={confirmPasswordCheck} name="confirmPassword" type="password" placeholder="Re-enter Password" required /><br />
                        {passConfMessage.length > 0 ? <small style={{ color: 'red' }}>{passConfMessage} <br /><br /></small> : <small></small>}
                    </>}

                    {!newUser && <><input type="checkbox" /> Remember me </>}
                    

                    <MDBBtn className="w-100" color="amber" type="submit">
                        {newUser ? 'Create New Account' : 'Log In'}
                    </MDBBtn>

                    {
                        newUser
                            ?
                            <> <span>Already have an account?</span> <button className="button" type="button" style={{ color: 'orange' }} onClick={() => setNewUser(!newUser)}>Login</button> </>
                            :
                            <> <span>Don't have an account?</span> <button className="button" type="button" style={{ color: 'orange' }} onClick={() => setNewUser(!newUser)}>Create an account</button> </>
                    }

                </form>
                
                <br />
                

                <div className="d-flex justify-content-center text-mute">Or</div>
                <br />

                {/* ---------Login Using Facebook  ----- */}
                <div className="fb-google-login px-5 py-2">
                    <button className="button ml-3" onClick={fbSignInHandle}>
                        <img src={fb} height="28" alt="" /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        Continue with Facebook
                    </button>
                </div>
                <br />

                {/* -------- Login Using Google------------------- */}
                <div className="fb-google-login px-5 py-2">
                    <button className="button ml-3" onClick={googleSignInHandle}>
                        <img src={google} height="25" alt="" /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        Continue with Google
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;