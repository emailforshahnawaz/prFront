import { useEffect, useState } from "react";
import "./App.css";
import Auth from "./Auth";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import HomeLayout from "./HomeLayout";
function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData,setUserData] = useState({});
  const loggedInHandler = (r) => {
    setLoggedIn(true);
    setUserData(r);
  }
  const logoutHandler = ()=>{
    localStorage.removeItem("letsLearnJWT");
    setLoggedIn(false);
    setUserData(null);
  }
  useEffect(()=>{
    if(localStorage.getItem("letsLearnJWT")!==null){
      console.log(localStorage.getItem("letsLearnJWT")!==null);
      setLoggedIn(true);
      fetch("http://localhost:9999/userinfo",{
        method:"GET",
        credentials: "include",
        headers:{
          "x-jtoken":localStorage.getItem("letsLearnJWT"),
        }
      }).then(r=>r.json())
      .then(r=>{
        console.log(r);
        setUserData(r);
      })
    }
  },[])
  
  return (
    <Router>
      <Switch>
        <Route path="/">
          {loggedIn ? <HomeLayout logoutHandler={logoutHandler} user={userData && userData.user} /> : <Auth loggedInHandler={loggedInHandler} />}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
