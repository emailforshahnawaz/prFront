import React from 'react'

function List(props) {
    return (
      <div className="list-container">
        {props.items.map((i) => props.renderComponent({ item: i  }))}
      </div>
    );
}

export default List
