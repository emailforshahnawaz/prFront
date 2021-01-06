import React, { useEffect, useState } from 'react';
import './Profilepage.css';
import image from "./srk.jpg"

import {useDispatch,useSelector} from "react-redux";
import {ProfileSlice} from "./store/ProfileSlice";
import {updateProfileInfo}  from "./store/ProfileSlice";
import { storeProfileInfo} from "./store/ProfileSlice";
export default  function Profilepage(props){
    const [editmode,setEditmode]=useState(false);
    const dispatch=useDispatch();
    const [fname,setfname]=useState(props.user.fname||null)
    const [lname,setlname]=useState(props.user.lname||null)
    const [username,setusername]=useState(props.user.username||null)
    const [email,setemail]=useState(props.user.email||null)
    const [dob,setdob]=useState(props.user.dob||null)
    const [gender,setgender]=useState(props.user.gender||null)
    const [city,setcity]=useState(props.user.city||null)
    const [country,setcountry]=useState(props.user.country||null)
    const [gitlink,setgitlink]=useState(props.user.gitlink||null)
    const [education,seteducation]=useState(props.user.education||null)


    useEffect(()=>{
         dispatch(storeProfileInfo(props.user.username))
    },[])
     
    //const fname=useSelector(gs=>gs.profile);
    const profiledata=useSelector(gs=>gs)
    const profileData=profiledata[0]
    //console.log("fname from profile.js ",fname);
    const updateUserProfile=()=>{
        const payload={
            fname:fname,
            lname:lname,
            username:username,
            email:email,
            dob:dob||null,
            city:city||null,
            country:country||null,
            gender:gender||null,
            gitlink:gitlink||null,
            education:education||null
        }
        dispatch(updateProfileInfo(payload)).then(()=>setEditmode(false))
        
    }
    return(
       <>{editmode?<>
   <div className="profile-wrapper1">
            <div style={{position:"relative"}}>
            <div className="photo">
            <img  style={{width:"100%",height:"100%"}} src={image}></img>
            </div>
            <div style={{color:"white",position:"absolute",left:"15px",bottom:"15px"}}> 
           <b> {fname}
            {` ${lname}`}</b>
            </div>
            </div>
            <i className="fa fa-user" ></i><input disabled={true} value= {username}></input><br></br>
       
       <i className="fa fa-envelope" ></i><input placeholder="email" onChange={(e)=>{setemail(e.target.value)}} value= {email}></input><br></br>
       <i class="fa fa-calendar" aria-hidden="true"></i><input type="date" onChange={(e)=>{setdob(e.target.value)}} value= {dob}></input><br></br>
       <i className="fa fa-male"></i><input placeholder="gender" onChange={(e)=>{setgender(e.target.value)}} value= {gender}></input><br></br>
       <i className="fa fa-map-marker" aria-hidden="true"></i><input placeholder="city" onChange={(e)=>{setcity(e.target.value)}} value= {city}></input><br></br>
       <i class="fa fa-globe" aria-hidden="true"></i><input placeholder="country"  onChange={(e)=>{setcountry(e.target.value)}} value= {country}></input><br></br>
       <i className="fa fa-github" aria-hidden="true"></i><input placeholder="git link" onChange={(e)=>{setgitlink(e.target.value)}} value= {gitlink}></input><br></br>
       <i className="fa fa-graduation-cap" aria-hidden="true"></i><input placeholder="qualification" onChange={(e)=>{seteducation(e.target.value)}} value= {education}></input>
       <button onClick={updateUserProfile} className="edit-profile">Save profile</button></div></>:
        <div className="profile-wrapper">
            <div style={{position:"relative"}}>
            <div className="photo">
                <img  style={{width:"100%",height:"100%"}} src={image}></img></div>
            <div style={{color:"white",position:"absolute",left:"15px",bottom:"15px"}}> 
           <b> {fname}
            {` ${lname}`}</b>
            </div>
            </div>
            <i className="fa fa-user" ></i>{username}<br></br>
            <i className="fa fa-envelope" ></i>{email}<br></br>
            {gender?<> <i className="fa fa-female"></i>{gender}<br></br></>:null}
            {dob?<><i class="fa fa-calendar" aria-hidden="true"></i>{dob}<br></br></>:null}
            {city||country?<><i className="fa fa-map-marker" aria-hidden="true"></i>{city} {country }</>:null}
            <hr></hr>
            {education?<><i className="fa fa-graduation-cap" aria-hidden="true"></i>{education}<br></br></>:null}
            {gitlink?<><i className="fa fa-github" aria-hidden="true"></i>{gitlink}<br></br></>:null}
            <button onClick={()=>setEditmode(true)} className="edit-profile">edit profile</button>
            
        </div>
}</>
    )
}