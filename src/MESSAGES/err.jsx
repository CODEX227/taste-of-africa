import { useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

const Logerr = ({err, message, goto, linktext}) => {
    return ( 
        <>
            <div className="err-con">
          <div className="err">
            <button onClick={(e) => {
              e.target.parentElement.parentElement.style.display = "none"
            }}>x</button>
            <p className="err-head">{err}</p>
            <p className="err-message">{message}</p>
            { goto && (<Link className="goto" to = {goto}>{linktext}<FiArrowRight size={12} className="gto-i" /></Link>)}
          </div>
        </div>
        </>
     );
}

export default Logerr;