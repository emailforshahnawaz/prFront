import React, { useEffect, useState } from "react";
import "./Pagination.css";
function Pagination(props) {
  const [page, setPage] = useState([1, 2, 3]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageclickcallback = (pageNo) => {
      if(pageNo==="Last"){
          pageNo = props.total;
      }
      else if(pageNo === "First"){
          pageNo = 1;
      }
    let pageDiv;
    if (pageNo < props.total && pageNo >1) {
    pageDiv = [-1, 0, 1];
    }
    else if(pageNo ===1) {
        pageDiv = [0,1,2]
    }else {
        pageDiv = [-2,-1,0]
    }
    setPage(pageDiv.map((i) => pageNo + i));
    setCurrentPage(Number(pageNo));
  };
  useEffect(() => {
    props.changePage(currentPage);
  }, [currentPage]);
  return (
    <div className="pagination-container">
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        {props.renderComponent({
          active:currentPage===1,
          pageclickcallback,
          item: "First",
        })}
        ....
        {page.map(
          (item) =>
            props.renderComponent({ active:item===currentPage, pageclickcallback, item })
          // <Pagediv idx={crntpage} pageclickcallback={pageclick} item={item} />
        )}
        ....
        {props.renderComponent({
          active:currentPage===props.total,
          pageclickcallback,
          item: "Last",
        })}
      </div>
    :
    </div>
  );
}

export default Pagination;
