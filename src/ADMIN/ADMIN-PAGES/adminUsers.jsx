import { useState } from "react";
import { FaChevronDown, FaChevronUp, FaEllipsisV } from "react-icons/fa";
import { FiUser, FiUserCheck, FiUserMinus, FiUserPlus } from "react-icons/fi";

const Ausers = ({DB, AUTH}) => {
    const [openAction, setopenAction] = useState("")
    const [deleteMessage, setdeleteMessage] = useState("")


    async function dissableAccount(id) {
    const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/dissableAccount`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                uid: id
            })
        }
    );
    const data = await response.json();
    console.log(data);
}

    async function enableAccount(id) {
    const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/enableAccount`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                uid: id
            })
        }
    );
    const data = await response.json();
    console.log(data);
}
    return ( 
        <div className="A-users">
            <div className="dash-head">
            <div className="dash-head-left">
                        <span className="dash-big">Manage Users</span>
                        <span className="dash-mini">Manage and view all customers accounts</span>
            </div>
           </div>

           <div className="dash-cards">
            <div className="dash-card-each" data-aos = "fade-down" data-aos-delay = '100'>
                                            <div className="each-card-top">
                                                    <FiUser size={18} style={{
                                                        color : 'rgb(0, 0, 0)',
                                                        padding: '12px',
                                                        backgroundColor : 'rgb(0, 0, 0, .15)',
                                                        borderRadius: '8px'
                                                        }}/>
                                                    <div className="each-card-top-left">
                                                        <div className="e-c-t-l-head">All Users</div>
                                                        <div className="e-c-t-l-big">312</div>
                                                        <div className="each-card-top">
                                                            <div className="inc-percentage"><FaChevronDown size={7}/>34.11%</div>
                                                            <span className="too-mini">per last 1 month</span>
                                                        </div>
                                                    </div>
                                            </div>
                </div>
                <div className="dash-card-each" data-aos = "fade-down" data-aos-delay = '300'>
                                            <div className="each-card-top">
                                                    <FiUserCheck size={18} style={{
                                                        color : 'rgb(0, 33, 141)',
                                                        padding: '12px',
                                                        backgroundColor : 'rgb(0, 33, 141, .15)',
                                                        borderRadius: '8px'
                                                        }}/>
                                                    <div className="each-card-top-left">
                                                        <div className="e-c-t-l-head">New Users</div>
                                                        <div className="e-c-t-l-big">34</div>
                                                        <div className="each-card-top">
                                                            <div className="inc-percentage"><FaChevronDown size={7}/>31.14%%</div>
                                                            <span className="too-mini">per last 1 month</span>
                                                        </div>
                                                    </div>
                                            </div>

                </div>
                <div className="dash-card-each" data-aos = "fade-down" data-aos-delay = '500'>
                                            <div className="each-card-top">
                                                    <FiUserPlus size={18} style={{
                                                        color : 'rgb(0, 94, 0)',
                                                        padding: '12px',
                                                        backgroundColor : 'rgb(0, 94, 0, .15)',
                                                        borderRadius: '8px'
                                                        }}/>
                                                    <div className="each-card-top-left">
                                                        <div className="e-c-t-l-head">Active Users</div>
                                                        <div className="e-c-t-l-big">234</div>
                                                        <div className="each-card-top">
                                                        <div className="inc-percentage"><FaChevronUp size={7}/>21.5%</div>
                                                        <span className="too-mini">per last 1 month</span>
                                                    </div>
                                                    </div>
                                            </div>
                </div>
                <div className="dash-card-each" data-aos = "fade-down" data-aos-delay = '700'>
                                            <div className="each-card-top">
                                                    <FiUserMinus size={18} style={{
                                                        color : 'rgb(94, 0, 0)',
                                                        padding: '12px',
                                                        backgroundColor : 'rgb(94, 0, 0, .15)',
                                                        borderRadius: '8px'
                                                        }}/>
                                                    <div className="each-card-top-left">
                                                        <div className="e-c-t-l-head">Inactive Users</div>
                                                        <div className="e-c-t-l-big">12</div>
                                                        <div className="each-card-top">
                                                            <div className="inc-percentage"><FaChevronDown size={7}/>2.34</div>
                                                            <span className="too-mini">per last 1 month</span>
                                                        </div>
                                                    </div>
                                            </div>
                </div>
           </div>

           <div className="user-preview">
              <div className="up-head-con">
                <p className="up-head">All Users</p>
                <input type="search"  placeholder="search user"/>
              </div>
              <div className="up-main-box">
                {Object.values(DB.users).map((each, i) => {
                    return(
                 <div className="each-up" key={each.Uid}>
                    <div className="each-up-inside">
                        <div className="up-primary-details">
                            <div className="up-profile-img" style={{backgroundImage : `url(${each.profile.profileImgSrc})`, border : '0.02px solid grey'}}></div>
                            <div className="up-p-txt">
                                <span className="uppt-uid">
                                    {each.Uid.toUpperCase()}
                                </span>
                                <span className="uppt-mini">
                                    {each.name}
                                </span>
                                {each.role == "customer" ? <span className="uppt-mini" style={{color : 'green'}}>
                                    Customer
                                </span> : each.role == "admin" ?  <span className="uppt-mini" style={{color : 'orangered'}}>
                                    Admin
                                </span> : null}
                            </div>
                        </div>
                       <div className="xra-uppt-details">
                            <div className="uppt-show-con">
                                  <FaEllipsisV size={15} className="uppt-i" onClick={() => {setopenAction(each.Uid)}}/>
                                 { openAction == each.Uid ? <div className="xra-uppt-details-main">
                                            {deleteMessage && <div className="foodDerr-con">
                                                <div className="foodDerr">
                                                <span>Do you want to {each.active == true ? "Disable" : each.active == false ? "Enable" : null} this Account owned by <span style={{color : '#c43000'}}>{each.name.toUpperCase()}</span></span>
                                                <div className="fde-btns">
                                                    <button onClick={() => {setdeleteMessage(false)}}>Cancel</button>
                                                    { each.active == true ?  <button style={{
                                                        backgroundColor : '#c43000', 
                                                        color : 'white'
                                                        }} onClick={()=> {dissableAccount(openAction).then(() => {setdeleteMessage(false)}).catch(e => {console.log(e)})}}>Disable</button> : each.active == false ?
                                                        <button style={{
                                                        backgroundColor : '#c43000',
                                                        color : 'white'
                                                        }} onClick={()=> {enableAccount(openAction).then(() => {setdeleteMessage(false)}).catch(e => {console.log(e)})}}>Enable</button> : null 
                                                    }
                                                </div>
                                            </div>
                                            </div>}
                                     <div className="xudm-btn"><button onClick={() => {setopenAction("")}}>X</button></div>
                                     <button className="xudm-btns"><a  style={{width : '100%', height : '100%', color : 'rgb(0, 0, 0, .8'}} href={`https://wa.me/${each?.delivery?.phone}`} target="_blank">
                                        WhatsApp
                                    </a></button>
                                     <button style={{color : 'rgb(0, 0, 0, .8'}} className="xudm-btns" onClick={() => {navigator.clipboard.writeText(each?.delivery?.phone);}}>Copy User Contact</button>
                                     {each.active == true ? <button className="xudm-btns xudm-diff" onClick={() => {setdeleteMessage(true)}}>Dissable Account</button>: each.active == false ? <button className="xudm-btns xudm-diff enable-btn" onClick={() => {setdeleteMessage(true)}}>Enable Account</button> : null}
                                  </div> : null}
                            </div>
                        </div> 
                    </div>
                </div>
                   )
                }
              )
            }
              </div>
           </div>
        </div>
     );
}
 
export default Ausers;