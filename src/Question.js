import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function Question() {
    let {id} = useParams();
    const [question, setQuestion] = useState(null)
    useEffect(() => {
        fetch(`http://localhost:9999/question/${id}`, {
          method: "GET",
          headers:{
            "x-jtoken": localStorage.getItem("letsLearnJWT"),
          }
        })
          .then(async (r) => {
            let jsn = await r.json();
            if (r.ok) {
              console.log(jsn);
              return {resp:jsn, success: true };
            }
            return jsn;
          })
          .then((r) =>{
              if(r.success){
                  setQuestion(r.resp);
              }
          });
    }, [id])
    return (
        <div>
             { question && JSON.stringify(question)}
        </div>
    )
}

export default Question
