import { Outlet } from "react-router";
import { useState, useEffect } from "react";
import Loader from "../LOADER/loader";
import Logerr from "../MESSAGES/err";

const Alayout = ({info, information, neterr}) => {
        const [ready,setready] = useState(false)
        const [Uerr, setUerr] = useState(false)
        useEffect(() => {
            if(Object.keys(information).length > 0 && info !== null){
                setready(true)
                console.log('yep')
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
            : neterr ? <Logerr err = "network error" message= "please check your internet connection" goto= "-1" linktext = "back"/> : null
        }
        {
        ready ?
                        <div>
                            { information.users[info.uid].role == "admin" &&
                                        (
                                            <>
                                                <Outlet />
                                            </>
                                    )
                            }
                        </div>:<Loader/>
         }
      </>
     );
}
 
export default Alayout;