import React, { useState } from 'react'
import Input from './Input'

function SignUp(props) {
    const [userData,setUserData] = useState({fname:"",lname:"",email:"",pwd:"",cpwd:"",username:""})
    const [error,setError] = useState(props.error);
    const isNoU = val => val===null || val === undefined;

    const validateEmail = (email) =>/^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(email)

    const validateAndCallHandler = ()=>{
        setError(props.error);
        for (let k of Object.keys(userData)){
            if(isNoU(userData[k]) || userData[k].trim().length<1){
                setError("Fill all the fields")
                return;
            }
        }
        
        if(!validateEmail(userData.email)){
            setError("Enter valid email address!");
            return ;
        }
        if(userData.pwd.length<8){
          setError("Password must be atleast 8 Characters!");
          return ;
        }
        if(userData.pwd !== userData.cpwd){
          setError("Password does not match!");
          return ;
        }
        props.signupHandler(userData);

        
    }

    return (
      <form className="container">
        <h1>Create an Account</h1>

        <Input
          type="text"
          value={userData.fname}
          label="First Name"
          required
          onChange={(event) =>
            setUserData({ ...userData, fname: event.target.value.trim() })
          }
        />
        <Input
          type="text"
          required
          value={userData.lname}
          label="Last Name"
          onChange={(event) =>
            setUserData({ ...userData, lname: event.target.value.trim() })
          }
        />
        <Input
          type="text"
          required

          value={userData.username}
          label="User Name"
          onChange={(event) =>
            setUserData({ ...userData, username: event.target.value.trim() })
          }
        />
        <Input
          type="email"
          value={userData.email}
          required
          label="Email id"
          onChange={(event) =>
            setUserData({ ...userData, email: event.target.value.trim() })
          }
        />
        <Input
          type="password"
          value={userData.pwd}
          required
          label="Password"
          onChange={(event) =>
            setUserData({ ...userData, pwd: event.target.value.trim() })
          }
        />
        <Input
          type="password"
          required
          value={userData.cpwd}
          label="Confirm Password"
          onChange={(event) =>
            setUserData({ ...userData, cpwd: event.target.value.trim() })
          }
        />
        <button type="submit" onClick={validateAndCallHandler}>Sign Up</button>
        <span className="error">{error}</span>


      </form>
    );
}

export default SignUp
