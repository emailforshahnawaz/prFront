import React from 'react'
import "./HeadAndFoot.css"

function Footer(props) {
    return (
        <footer className="footer">
            {props.username}
        </footer>
    )
}

export default Footer
