import { Route, Routes } from "react-router";
import Adashboard from "./ADMIN-PAGES/adminDashboard";
import Anavbar from "./adminNavbar";
import Asidebar from "./adminSidebar";
import Ausers from "./ADMIN-PAGES/adminUsers";
import Aorder from "./ADMIN-PAGES/adminOrder";
import Acoupons from "./ADMIN-PAGES/adminCoupons";
import Amenu from "./ADMIN-PAGES/adminMenu";
import Areviews from "./ADMIN-PAGES/adminReviews";
import Aacc from "./ADMIN-PAGES/adminAcc";
import { useState } from "react";


const Ahome = ({AUTH, DB, sidefrom}) => {
    const [side, setside] = useState(false)
    function sidefrom(data){
        setside(data)
    }
    return ( 
        <div className="admin-block" onClick={() => {setside(false)}}>
            <div className="sidebar-admin">
                <Asidebar AUTH = {AUTH} DB = {DB} side = {side}/>
            </div>
            <div className="left-admin">
                <Anavbar AUTH = {AUTH} DB = {DB} sidefrom = {sidefrom}/>
                <div className="left-down">
                    <Routes>
                        <Route path="/dashboard" exact element = {<Adashboard AUTH = {AUTH} DB = {DB}/>}/>
                        <Route path="/users" exact element = {<Ausers AUTH = {AUTH} DB = {DB}/>}/>
                        <Route path="/orders" exact element = {<Aorder AUTH = {AUTH} DB = {DB}/>} />
                        <Route path="/coupons" exact element = {<Acoupons AUTH = {AUTH} DB = {DB}/>} />
                        <Route path="/reviews" exact element = {<Areviews AUTH = {AUTH} DB = {DB}/>} />
                        <Route path="/admin-settings" exact element = {<Aacc AUTH = {AUTH} DB = {DB}/>} />
                        <Route path="/menu" exact element = {<Amenu AUTH = {AUTH} DB = {DB} /> }/>
                    </Routes>
                </div>
            </div>
        </div>
     );
}
 
export default Ahome;