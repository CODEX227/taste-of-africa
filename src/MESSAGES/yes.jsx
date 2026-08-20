import { FaCheck } from "react-icons/fa";

const Yes = ({message}) => {
    return ( 
        <>
           {message ? (<div className="success">
              <p className="success-mes">{message}</p>
              <FaCheck size={20} className="suc-i"/>
           </div>) : null}
        </>
     );
}
 
export default Yes;