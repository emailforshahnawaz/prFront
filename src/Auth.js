import React, { useState } from 'react'
import LogIn from './LogIn';
import SignUp from './SignUp';
import './Auth.css';

function Auth(props) {
    const [renderSignUP, setRenderSignUP] = useState(false);
    const [error, setError] = useState(props.error)
    const loginHandler = async (username, pwd) => {
        authHandler("http://localhost:9999/login",JSON.stringify({username,pwd}));
      };
      const signupHandler = async (userObj) =>{
        const {fname,lname,username,email,pwd} = userObj;
        authHandler("http://localhost:9999/signup",JSON.stringify({fname,lname,username,email,pwd}));
    
      }
      const isNoU = val => val===null || val === undefined;
      const authHandler = async (url,body) =>{
        // console.log("auth");
        fetch(url,{
          method:"POST",
          body:body,
          headers:{
            "Content-Type":"application/json"
          }
        })
        .then(r=>r.json())
        .then(r=>{
          // console.log(r);
          if(isNoU(r.er)) {
            props.loggedInHandler(r);
            localStorage.setItem("letsLearnJWT",r.token)
          }else{
            setError(r.er);
          }
        })
      }
    return (
      <div className="auth">
       <div> <button
          onClick={() => {
            setRenderSignUP(true);
            setError(null);
          }}
        >
          Sign Up
        </button>
        <button
          onClick={() => {
            setRenderSignUP(false);
            setError(null);
          }}
        >
          Log In
        </button>
        </div>
        {renderSignUP ? (
          <SignUp signupHandler={signupHandler} error={error} />
        ) : (
          <LogIn loginHandler={loginHandler} error={error} />
        )}
      </div>
    );
}

export default Auth;
