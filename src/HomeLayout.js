import React, { useEffect, useState } from 'react'
import { Route, Switch } from 'react-router-dom';
import CreateQuestion from './CreateQuestion';
import Footer from './Footer'
import Header from './Header'
import Home from './Home';
import Pool from './Pool';
import Question from './Question';
import Review from './Review';
import Tab from './Tab';
import Profilepage from './Profilepage';

function HomeLayout(props) {
     const username = (props.user && props.user.username) || "Let's Learn from Each other";
     const [loader,setloader]=useState(true);
     const [tabView, setTabView] = useState(<Home/>)
     useEffect(()=>{
         console.log("from use effect of home layout props is ",props.user)
        if(props.user===undefined||props.user===""||props.user===null){
            console.log("inside if condition of use effect");
            setloader(true);
        }else{
        setloader(false);
        }
     },[props])
     const tabHandler = (idx)=>{
        
         if(idx===2){
             setTabView(<Review/>);
         }
         else if(idx===1){
             setTabView(<Pool/>)
         }
         else {
             setTabView(<Home/>)
         }
     }
    
    return (
        <>
        
        <Header user={props.user} logoutHandler={props.logoutHandler}/>
        <Switch>
            <Route path="/createQuestion">
                <CreateQuestion/> 
            </Route>
            <Route path="/question/:id">
                <Question />
            </Route>
            <Route path="/profile">
               {loader?null:<Profilepage user={props.user} />}
            </Route>
            <Route exact path="/">
                <Tab options={["Questions","Pool","Review"]} tabHandler={tabHandler}/>
                { tabView}
            </Route>
        </Switch>
        <Footer username={username} />
        </>
    )
}

export default HomeLayout;
