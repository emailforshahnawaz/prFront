import {createSlice,createAsyncThunk } from "@reduxjs/toolkit"
export const storeProfileInfo=createAsyncThunk(
    'user/storeprofileinfo',
    async(arg,thunkAPI)=>{
        console.log("arg value from thunk action async fn ",arg);
        try{
        const userdata=await fetch("http://localhost:9999/profile",{
            credentials:"include",
            method:"post",
            headers:{
                "x-jtoken": localStorage.getItem("letsLearnJWT"),
              },
            body:JSON.stringify({username:arg})
        }).then(r=>r.json());
        console.log("user data logged from thunkk action ",userdata);
        return userdata;
    }catch(e){
        console.log("error in calling /profile endpoint ",e);
    }
    }
)

export const updateProfileInfo=createAsyncThunk(
    'user/updateprofileinfo',
    async(arg,thunkAPI)=>{
        //console.log("arg value from thunk action async fn ",arg);
        console.log("json of sent data ",JSON.stringify(arg))
        try{
        const userdata=await fetch("http://localhost:9999/updateprofile",{
            credentials:"include",
            method:"post",headers:{"content-type":"application/json"},
           
            body:JSON.stringify(arg)
        });
        console.log("userdata from update thunk action is ",userdata)
        return arg;
    }catch(e){
        console.log("error in calling /updateprofile endpoint ",e);
    }
    }
)


export const ProfileSlice=createSlice({
    name:"profile",
    initialState:[],
    reducers:{
    },
    extraReducers:{
        [storeProfileInfo.fulfilled]:(state,action)=>{
            console.log("from full filled")
            console.log("from fullfilled extra reducer action payload value",action.payload)
            state.push(action.payload);
        },
        [storeProfileInfo.pending]:(state,action)=>{
            console.log("from pending")
            console.log("from extra reducer action payload value",action.payload)
            //state.push(action.payload);
        },
        [storeProfileInfo.rejected]:(state,action)=>{
            console.log("from extra reducer rejected state action payload value",action.payload)
            //state.push(action.payload);
        },
        [updateProfileInfo.fulfilled]:(state,action)=>{
            console.log("profile updated successfully");
            const {fname,lname,email,gender,country,city,gitlink,username,dob,education}=action.payload;
            const ud=state.find(s=>s.username===username)
            ud.fname=fname
            ud.education.push(education)
            ud.dob=dob
            ud.lname=lname
            ud.email=email
            ud.gender=gender
            ud.city=city
            ud.country=country
            ud.gitlink=gitlink
        }

    }
})