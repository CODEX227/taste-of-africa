import { FaBars, FaBell, FaBook, FaChevronDown, FaChevronUp, FaCreditCard, FaHome, FaStar, FaUser, FaUtensils } from "react-icons/fa";
import prof from "../assets/prof.png"
import { useEffect, useState } from "react";
import { IoSettingsSharp, IoTicket } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import { NavLink } from "react-router-dom";

const Anavbar = ({AUTH, DB, sidefrom}) => {
    const [side, setside] = useState(false)
    useEffect(() => {
        sidefrom(side)
    },[side])
    useEffect(() => {
       console.log ("auth" ,AUTH)
    },[AUTH])
    return ( 
        <>
        <div className="admin-navbar">
            <div><FaBars size = {18} className="dash-i" onClick={() => {setside(!side)}}/></div>
            <div className="left-admin-nav">
                <div className="admin-nots"><FaBell size ={16} /></div>
                <div className="admin-profile-con">
                    <span className="admin-prof-img" style={{backgroundImage : `url(${DB.users[AUTH.uid].profile.profileImgSrc})`}}></span>
                    <span className="q-A">
                        <span className="q-A-head">{DB.users[AUTH.uid].name}</span>
                        <span className="q-A-mini">{DB.users[AUTH.uid].role}</span>
                    </span>
                </div>
            </div>
        </div>

        </>
     );
}
 
export default Anavbar;