import React from 'react'
import { Link } from 'react-router-dom'
function QuestionItem(props) {
    

    return (
        <div className="qts-item-container">
        <Link to={`/question/${props.item._id}`}>
        
        <div style={{height:"200px",width:"300px",margin:"10px", backgroundColor:"lightblue"}}>
            <h1 style={{margin:"5px"}}>{props.item.title}</h1>
        </div>
        </Link>
        </div>
        

    )
}

export default QuestionItem
