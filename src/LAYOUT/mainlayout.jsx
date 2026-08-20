import { Outlet, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import Nav from "../HOMEPAGE/Nav";
import Loader from "../LOADER/loader";
import Logerr from "../MESSAGES/err";
import { useLocation } from "react-router-dom";

const MainLayout = ({info, information, neterr}) => {
    const location = useLocation()
    const [ready,setready] = useState(false)
    const [Uerr, setUerr] = useState(false)
    useEffect(() => {
        if(Object.keys(information).length > 0 && info !== null){
            setready(true)
        }else if(info == null){
            setUerr(true)
            setready(false)
        }
        if(Uerr){
            
        }
    },[info, information,Uerr])
    return ( 
        <>
        { Uerr ?
            <Logerr err = "user error" message= "please login" goto= "/" linktext = "signIn"/>
            : neterr ? <Logerr err = "network error" message= "Unable to access DATA and Tools, please check the internet connection and reload the page" goto= {location.pathname} linktext = "retry"/> : null
        }
        {
        ready ?
                        <div>
                            { information.users[info.uid].role == "customer" &&
                                        (
                                        <>
                                           <Nav info = {info} information={information} />
                                           <Outlet />
                                        </>
                                    )
                            }
                        </div>:<Loader />
         }
      </>
     );
}
 
export default MainLayout;