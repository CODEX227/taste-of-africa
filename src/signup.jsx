import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { adddata, sendV, signin, signup } from "../DATABASE/handleUser";
import Logerr from "./MESSAGES/err";
import { FaEye, FaEyeSlash, FaSpinner } from "react-icons/fa";

const Signup = () => {
    const [loading, setloading] = useState(false)
    const navigate = useNavigate()
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [name, setname] = useState("")
    const [err, seterr] = useState("")
    const [mes, setmes] = useState("")
    const [Vm,setVm] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    async function set_custom_claims(id){
    const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/custom_claims`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                uid: id,
                user : "super_ADMIN"
            })
        }
    );
    const data = await response.json();
    console.log(data);
}


    const signupUser = () => {
        setloading(true)
         signup(email, password).then(data => {
            if(data){
                console.log(data.user.uid)
                set_custom_claims(data.user.uid)
                seterr("")
                setmes("")
                adddata(data.user.uid, data.user.email, name).then(() => { 
                  sendV(data).then(() => {setVm(true)}).catch(e => {console.log(e.message)})
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
        <div className="usehandler-form">
           <p className="main-form-text">Sign<span>Up</span></p>
           <p className="side-form-text"><span>Make</span> & <span>Move</span> your diets with us<span>.</span></p>
           <input required value={name} onChange={(e)=> {
             setname(e.target.value)
           }} type="text" placeholder="Your username"/>
           <input required value={email} onChange={(e)=>{
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
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
                color : 'rgb(0, 0, 0, .6)'
            }}
            size={15}
        />
    )}
</div>
           <div className="link-form">
            <a className="form-link">Continue with GOOGLE</a>
            <Link className="form-link" to="/">SignIn</Link>
            </div>
            {Vm && <span style={{color : 'lightgreen', opacity : '.7', fontSize : 'clamp(8px, 1vw, 12px', width : 'fit-content', margin : 'auto'}}>A verification link has been sent to this email</span>}
           {!Vm ? <button onClick={() => {signupUser()}} style={{width : '100%', borderRadius : '8px'}}>{loading ? <FaSpinner className="rotate" size={16} /> :"submit"}</button> : Vm ? <button onClick={() => {navigate('/')}} style={{width : '100%', borderRadius : '8px'}}>I have verified</button> : null}
        </div>
    </div>
    </> );
}
 
export default Signup;