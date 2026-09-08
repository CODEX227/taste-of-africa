import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { sendV, signin } from "../DATABASE/handleUser";
import Logerr from "./MESSAGES/err";
import { FaEye, FaEyeSlash, FaSpinner } from "react-icons/fa";

const Signin = ({db}) => {
    const [loading, setloading] = useState(false)
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [err, seterr] = useState("")
    const [mes, setmes] = useState("")
    const [step, setStep] = useState("submit")
    const navigate = useNavigate()
    const [data, setdata] = useState({})
    const [showPassword, setShowPassword] = useState(false)
    useEffect(() => {console.log(step)},[step])
    const signinUser = () => {
        setloading(true)
        seterr("")
        setmes("")
        signin(email, password).then(data => {
            setloading(false)
            setdata(data)
            if(data.user.emailVerified && data){
               const user = data.user.reloadUserInfo.customAttributes
               const refined_user = JSON.parse(user)
               if(refined_user.user == "customer"){
                 navigate("/homepage")
               }
               else if(refined_user.user == ("super_ADMIN" || "ADMIN")){
                 navigate("/admin-dashboard/dashboard")
                 console.log("its an admin")
               }
            }else{
            setStep('verify')
            }
            }).catch(e => {
            setloading(false)
            console.log(e.message)
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
        <div className="usehandler-form">
           <p className="main-form-text">Sign<span>In</span></p>
           <p className="side-form-text"><span>Welcome</span> back <span>!!</span></p>
           <input required onChange={(e) => {
             setemail(e.target.value)
           }} type="email" placeholder="Your email"/>
           <div style={{ position: "relative"}} className="uf-imp">
               <input onChange={(e) => {setpassword(e.target.value)}} placeholder="Your password" type={showPassword ? "text" : "password"} style={{
                   width : '100%'
               }}
               />
           
               {showPassword  ? (
                   <FaEyeSlash
                       onClick={() => setShowPassword(false)}
                       style={{
                           position: "absolute",
                           right: "10px",
                           top: "50%",
                           transform: "translateY(-50%)",
                           cursor: "pointer",
                           color : 'rgb(0, 0, 0, .6)'
                       }}
                       size={15}
                   />
               ) : (
                   <FaEye
                       onClick={() => setShowPassword(true)}
                       style={{
                           position: "absolute",
                           right: "0px",
                           top: "50%",
                           transform: "translateY(-50%)",
                           cursor: "pointer",
                           color : 'rgb(0, 0, 0, .6)',
                           padding : '10px'
                       }}
                       size={15}
                   />
               )}
           </div>
            <div className="link-form">
                <a className="form-link">Forgot password?</a>
                <Link className="form-link" to="/enter">SignUp</Link>
            </div>
            {step === "submit" ? (
    <button
        onClick={() =>{signinUser().then(() => {setStep("verify")});}}
        style={{ width: "100%", borderRadius: "8px" }}
    >
        {loading ? <FaSpinner className="rotate" size={16} /> : "Submit"}
    </button>

) : step === "verify" ? (
    <button
        onClick={() => {
            setloading(true);

            sendV(data).then(() => {
                setloading(false);
                setStep("verified");
            });
        }}
        style={{ width: "100%", borderRadius: "8px" }}
    >
        {loading ? <FaSpinner className="rotate" size={16} /> : "Send Verification"}
    </button>

) : step === "verified" ? (
    <button
        onClick={() => setStep("submit")}
        style={{ width: "100%", borderRadius: "8px" }}
    >
        I have Verified
    </button>
) : null}
            {step == 'verify' && <span style={{
                color : 'rgb(255, 0, 0, .6)', 
                fontSize : 'clamp(8px, 1vw, 11px', 
                width : 'fit-content', 
                margin : '15px auto'
                }}>This account is not yet verified</span>}
        </div>
    </div>
    </> );
}
 
export default Signin;