import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { signin } from "../DATABASE/handleUser";
import Logerr from "./MESSAGES/err";
import { FaSpinner } from "react-icons/fa";

const Signin = ({db}) => {
    const [loading, setloading] = useState(false)
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [err, seterr] = useState("")
    const [mes, setmes] = useState("")
    const navigate = useNavigate()
    
    const signinUser = () => {
        setloading(true)
        seterr("")
        setmes("")
         signin(email, password).then(data => {
            setloading(false)
            if(db.users[data && data.user.uid].role == "admin"){
                navigate("/admin-dashboard/dashboard")
            }else if(data && db.users[data.user.uid].role == "customer"){
                navigate("/homepage")
            }
         }).catch(e => {
            setloading(false)
            console.log(e.code)
            if(e.code == "auth/network-request-failed"){
                seterr("network error")
                setmes("Unable to connect. Please check your internet connection and try again.")
            }
            if(e.code == "auth/invalid-credential"){
                seterr("invalid credentials")
                setmes("please input the correct details for an existing account or signup")
            }
            if(e.code == "auth/user-disabled"){
                seterr("User error")
                setmes("this account has been disabled by the admin of tase of africa. please kindly contact or chat up the restaurant for moe information")
            }
         })
    }
    return ( <>
    {
        err ? <Logerr err ={err} message={mes}/>:null
    }
    <div className="usehandler" style={{
        backgroundImage:`url(https://res.cloudinary.com/qnmxixxc/image/upload/v1784150142/akoq2cuvmyuq1aplbqkn.png)`,
    }}>
        <form onSubmit={(e) => {
            e.preventDefault()
            signinUser()
        }}>
           <p className="main-form-text">Sign<span>In</span></p>
           <p className="side-form-text"><span>Welcome</span> back <span>!!</span></p>
           <input required onChange={(e) => {
             setemail(e.target.value)
           }} type="email" placeholder="Your email"/>
           <input required onChange={(e) => {
              setpassword(e.target.value)
           }} type="password" placeholder="Your password"/>
            <div className="link-form">
                <a className="form-link">Forgot password?</a>
                <Link className="form-link" to="/enter">SignUp</Link>
            </div>
           <button>{loading ? <FaSpinner className="rotate" size={16} /> :"submit"}</button>
        </form>
    </div>
    </> );
}
 
export default Signin;