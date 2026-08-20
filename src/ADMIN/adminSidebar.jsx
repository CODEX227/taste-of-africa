import { useState } from "react";
import { FaBook, FaHome, FaUser, FaUtensils, FaStar, FaCreditCard } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { IoSettingsSharp, IoTicket } from "react-icons/io5";
import { NavLink, useNavigate } from "react-router-dom";
import { auth, signout } from "../../DATABASE/handleUser";
const Asidebar = ({AUTH, DB, side}) => {
    const navigate = useNavigate()
    return ( 
        <div className = {side ? 'sidebar-admin-main sidebar-admin-open' : 'sidebar-admin-main sidebar-admin-close'}>
            <div className="sidebar-admin-head">
                <span>Taste Of Africa</span>
            </div>
            <div className="sidebar-admin-btns">
                <NavLink className="admin-side-btn" to='/admin-dashboard/dashboard'><FaHome size = {18} />Dashboard</NavLink>
                <NavLink className="admin-side-btn" to = '/admin-dashboard/users'><FaUser size = {16} />Users</NavLink>
                <NavLink className="admin-side-btn" to='/admin-dashboard/menu'><FaBook size = {16} />Menu</NavLink>
                <NavLink className="admin-side-btn" to='/admin-dashboard/orders'><FaUtensils size = {16} />Orders</NavLink>
                <NavLink className="admin-side-btn" to='/admin-dashboard/reviews'><FaStar size = {16} />Reviews</NavLink>
                <NavLink className="admin-side-btn" to='/admin-dashboard/coupons'><IoTicket size = {16} />Coupons</NavLink>
                <NavLink className="admin-side-btn" to='/admin-dashboard/payments'><FaCreditCard size = {16} />Payments</NavLink>
                <NavLink className="admin-side-btn" to='/admin-dashboard/admin-settings'><IoSettingsSharp size = {16} />Settings</NavLink>
            </div>
            <button className="admin-side-del-btn" onClick={() => {signout(auth); navigate("/")}}><FiLogOut size = {16} />Log Out</button>
        </div>
     );
}
 
export default Asidebar;