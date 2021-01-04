import React, { useState } from 'react'
import Input from './Input'
const addShadow = {
    width: "30em",
    border: "0px",
    "boxShadow":
      "0 0 0 1px rgba(16, 22, 26, 0.1), 0 0 0 rgba(16, 22, 26, 0), 0 1px 1px rgba(16, 22, 26, 0.2)",
  };
function Goals(props) {
    const [goals, setGoal] = useState(["",]);
    const changeAt = (e,i)=>{
        goals[i] = e.target.value;
        setGoals([...goals]);

    }
    const setGoals = (goal)=>{
        setGoal(goal);
        props.setGoalsHandler(goal);
    }
    const addAt = (idx)=>{
        console.log('adding ... ');
        goals.splice(idx+1,0,"");
        setGoals([...goals])
    }
    const deleteAt = (idx)=>{
        setGoals(goals.filter((i,id)=>id!==idx))
    }
    return (
      <div className="goal-container">
        <h4>Add Goals</h4>
        {goals.map((i,idx)=>{
           return (
             <div className="goal-item" key={idx}>
               <Input
                 label={`Goal ${idx + 1}`}
                 style={{ height: "1em" }}
                 value={goals[idx]}
                 onChange={(event) => changeAt(event, idx)}
                 className="addShadow"
               />
               <div className="goal-btn-div">
                 <button className="goal-btn" onClick={()=>addAt(idx)}>+</button>
                 <button className="goal-btn" disabled={goals.length<=1} onClick={()=>deleteAt(idx)}> -</button>
               </div>
             </div>
           );
        })}
      </div>
    );
}

export default Goals
