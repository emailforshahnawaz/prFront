import React, { useState } from 'react'
import Input from './Input';

function LogIn(props) {
    const [username, setUsername] = useState("");
    const [pwd, setPwd] = useState("");
    const loginHandler = ()=>{
      if(username.trim().length>0 && pwd.trim().length>0){
        props.loginHandler(username,pwd);

      }
    }
    return (
      <form className="container" onSubmit={(event)=> event.preventDefault()}>
        <h1>Loggin to your Account</h1>
        <Input
          type="text"
          label="Username"
          required
          value={username}
          onChange={(event) => setUsername(event.target.value.trim())}
        />
        <Input
          type="password"
          required
          label="Password"
          value={pwd}
          onChange={(event) => setPwd(event.target.value.trim())}
        />
        <button onClick={loginHandler}>Log In</button>
        <span className="error">{props.error}</span>
      </form>
    );
}

export default LogIn
