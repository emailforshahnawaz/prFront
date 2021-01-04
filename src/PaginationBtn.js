import React from 'react'

function PaginationBtn(props) {
  const pageclick = () => {
    props.pageclickcallback(props.item);
  };
  return (
    <span
      onClick={pageclick}
      className={props.active ? "pageBtn active" :"pageBtn"}
    >
      {props.item}
    </span>
  );
}

export default PaginationBtn
