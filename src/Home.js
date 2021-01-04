import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import List from './List';
import Pagination from './Pagination';
import PaginationBtn from './PaginationBtn';
import QuestionItem from './QuestionItem';
import "./Questions.css"
function Home(props) {
    const [questions,setQuestions] = useState(["hhh","llll","ddd","ddld"]);
    const [currenPage , setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(null);
    const perPage = 10;
    const changePage = (page)=>{
      setCurrentPage(Number(page));
    }
    useEffect(() => {
        fetch(`http://localhost:9999/questions?offset=${currenPage}`,{
          headers:{
            "x-jtoken": localStorage.getItem("letsLearnJWT"),
          }
        })
          .then((r) => {
            if (r.status !== 200) {
      
              return { ...r.json(), success: false };
            }
            return r.json();
          })
          .then((r) => {
            if (!r.success) {
              r.questions && setQuestions(r.questions);
              r.total && setTotalPage(parseInt(Number(r.total)/perPage));
            }
          });
    }, [currenPage])


    return (
      <>
        <div className="home">
          <div className="right">
            <Link className="sq" to="/createQuestion">
              Add Question
            </Link>
          </div>
          <List items={questions} renderComponent={QuestionItem}>
            Hello
          </List>
        </div>
        {totalPage >1 && (<div>
          <Pagination
            renderComponent={PaginationBtn}
            changePage={changePage}
            total={totalPage}
          />
        </div>)}
      </>
    );
}

export default Home
