import React, { useEffect, useState } from 'react';
import './Profilepage.css';
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
        }
        dispatch(updateProfileInfo(payload)).then(()=>setEditmode(false))
        
    }
    return(
       <>{editmode?<>
       <div className="profile-wrapper">
       <div className="photo"></div>
       <label>User name</label>:<input disabled={true} value= {username}></input><br></br>
       <label>first name</label>:<input onChange={(e)=>{setfname(e.target.value)}} value= {fname}></input><br></br>
       <label>Last name</label>:<input onChange={(e)=>{setlname(e.target.value)}} value= {lname}></input><br></br>       
       <label>Email    </label>:<input onChange={(e)=>{setemail(e.target.value)}} value= {email}></input><br></br>
       <label>D.O.B    </label>:<input onChange={(e)=>{setdob(e.target.value)}} value= {dob}></input><br></br>
       <label>gender   </label>:<input onChange={(e)=>{setgender(e.target.value)}} value= {gender}></input><br></br>
       <label>City    </label>:<input onChange={(e)=>{setcity(e.target.value)}} value= {city}></input><br></br>
       <label>Country    </label>:<input onChange={(e)=>{setcountry(e.target.value)}} value= {country}></input><br></br>
       <label>Git link    </label>:<input onChange={(e)=>{setgitlink(e.target.value)}} value= {gitlink}></input><br></br>
       <button onClick={updateUserProfile} className="edit-profile">Save profile</button></div></>:
        <div className="profile-wrapper">
            <div className="photo"></div>
            <label>first name</label>:{fname}<br></br>
            <label>Last name</label>:{lname}<br></br>
            <label>User name</label>:{username}<br></br>
            <label>Email    </label>:{email}<br></br>
            {gender?<><label>gender    </label>{gender}<br></br></>:null}
            {city?<><label>city    </label>{city}<br></br></>:null}
            {country?<><label>country    </label>{country}<br></br></>:null}
            {gitlink?<><label>gitlink    </label>{gitlink}<br></br></>:null}
            <button onClick={()=>setEditmode(true)} className="edit-profile">edit profile</button>
            
        </div>
}</>
    )
}