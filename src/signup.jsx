import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { adddata, signup } from "../DATABASE/handleUser";
import Logerr from "./MESSAGES/err";
import { FaSpinner } from "react-icons/fa";

const Signup = () => {
    const [loading, setloading] = useState(false)
    const navigate = useNavigate()
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [name, setname] = useState("")
    const [err, seterr] = useState("")
    const [mes, setmes] = useState("")

    const signupUser = () => {
        setloading(true)
         signup(email, password).then(data => {
            console.log(data)
            if(data){
                setloading(false)
                seterr("")
                setmes("")
                navigate('/')
                adddata(data.user.uid, data.user.email, name).then(() => {}).catch(e => {

                })
            }
         }).catch(e => {
            setloading(false)
            console.log(e)
            if(e.code == "auth/network-request-failed"){
                seterr("network error")
                setmes("please check your internet connection and re-submit")
            }
            if(e.code == "auth/network-request-failed"){
                seterr("network error")
                setmes("please check your internet connection and re-submit")
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
        <form onSubmit={(e)=> {
            e.preventDefault()
            signupUser()

           }}>
           <p className="main-form-text">Sign<span>Up</span></p>
           <p className="side-form-text"><span>Make</span> & <span>Move</span> your diets with us<span>.</span></p>
           <input required value={name} onChange={(e)=> {
             setname(e.target.value)
           }} type="text" placeholder="Your username"/>
           <input required value={email} onChange={(e)=>{
            setemail(e.target.value)
           }} type="email" placeholder="Your email"/>
           <input required value={password} onChange={(e)=>{
            setpassword(e.target.value)
           }} type="password" autoComplete="current-password" placeholder="Your password"/>
           <div className="link-form">
            <a className="form-link">Continue with GOOGLE</a>
            <Link className="form-link" to="/">SignIn</Link>
            </div>
           <button>{loading ? <FaSpinner className="rotate" size={16} /> :"submit"}</button>
        </form>
    </div>
    </> );
}
 
export default Signup;