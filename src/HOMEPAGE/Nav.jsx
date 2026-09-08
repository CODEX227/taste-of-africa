import {
  FaChevronDown,
  FaBars,
  FaBell,
  FaHome,
  FaBook,
  FaPenFancy,
  FaCamera,
  FaChevronUp,
  FaShoppingCart,
  FaChair,
  FaPhone,
  FaPhoneAlt,
  FaMinus,
  FaCopy,
  FaTruckLoading,
  FaTruckMoving
} from "react-icons/fa";
import { FiSettings, FiLogOut, FiShoppingCart, FiClock } from "react-icons/fi";
import { IoCallOutline, IoFastFood, IoNotificationsOutline, IoTicket, IoTicketOutline, IoWarningOutline  } from "react-icons/io5";
import { useEffect, useState } from "react";
import { dec, removecart, signout, inc, delNots } from "../../DATABASE/handleUser";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { MdDeliveryDining } from "react-icons/md";

const Nav = ({ info, information }) => {
  const [menuopen, setmenuopen] = useState(false);
  const [profopen, setprofopen] = useState(false);
  const [opennots, setopennots] = useState(false)
  const [num, setnum] = useState({})
  const navigate = useNavigate()
  const [bg, setbg] = useState('')
  const [select, setselect] = useState({})
  const [edit, setedit] = useState(false)
  const [checks, setChecks] = useState({});





  return (
    <>
      <nav className="navbar">
        <img src={information.web.images.navImg} className="navimg" />

        <ul className="links">
        <Link  className='links-child' to='/homepage'>Home</Link>
        <Link  className='links-child' to="/order">Menu</Link>
        <Link  className='links-child' to="/Yorders">Orders</Link>
        <Link  className='links-child' to="/contact">Contact</Link>
        </ul>


        <div className="re-play">
          <div className="toggs">
                <div className="signal-con"><IoNotificationsOutline onClick={() => {setopennots(!opennots)}} size={16} className="sml" />{ (information.users.notification || information.GeneralNotifications) && <span className="signal"></span>}</div>
                <div className="signal-con"><FiClock size ={16} onClick={() => {navigate('/history')}} className="sml"/><span style={{backgroundColor : "greenyellow"}} className="signal"></span></div>
                <div className="signal-con"><FiShoppingCart size={16} onClick={() => {navigate('/cart')}} className="sml"/>{ information.cart !== null && <span className="signal"></span> }</div>
              <FaBars 
              size={20}
              className="menu-i"
              onClick={() => {
                setmenuopen(true);
              }}
            />
            </div>
            <div className="profile-con">
            <div
              className="profile-free"
              onClick={() => {
                setprofopen(!profopen);
              }}
            >
              <div className="profile-img" style={{backgroundImage : `url(${information.users.profile.profileImgSrc})`}}>
              </div>

              {profopen ? (
                <FaChevronUp size={12} />
              ) : (
                <FaChevronDown size={12} />
              )}
            </div>

            {profopen && (
              <div className="drop-menu-free">
                <ul>
                  <div style={{backgroundImage : `url(${information.users.profile.profileImgSrc})`, width : '100px', height : "100px", borderRadius : "100%", backgroundPosition : "center", backgroundSize : "cover", border : "0.02px solid rgb(0, 0, 0, .2)", margin : "auto"}}></div>
                  <li className="drop-links" style={{fontWeight : 'bolder', width : "fit-content", margin : "auto"}}>
                    <p className="menu-name">
                      {information.users.name}
                    </p>
                  </li>

                  <li className="drop-links"  style={{fontWeight : 'bolder', width : "fit-content", margin : "auto", marginTop : '-12px', marginBottom : '12px'}}>
                    <p className="menu-email">{info.email}</p>
                  </li>

                  <li className="drop-link">
                    <FiSettings size={14} />
                    <Link to ='/settings'>Settings</Link>
                  </li>

                  <li
                    className="drop-link out"
                    onClick={() => {
                      navigate("/");
                      signout()
                    }}
                  >
                    <FiLogOut size={14} className="drop-i" />
                    <Link>Sign out</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </nav>
      {
        menuopen && (
           <div className="whole-menu-con" onClick={((e) => {if(e.target.className == 'whole-menu-con' || 'blah'){setmenuopen(false)}})}><div className="whole-menu">

                <div className="blah">
                  <Link to='/homepage' className="whole-menu-each">
                    <FaHome size={16} className="whole-menu-i"/>
                    <p>Home</p>
                </Link>

                <Link to='/order' className="whole-menu-each">
                    <FaBook size={16} className="whole-menu-i"/>
                    <p>Menu</p>
                </Link>

                <Link to='/Yorders' className="whole-menu-each">
                    <FaTruckMoving size={16} className="whole-menu-i"/>
                    <p>Orders</p>
                </Link>

                <Link className="whole-menu-each" to="/contact">
                    <FaPhoneAlt size={16} className="whole-menu-i"/>
                    <p>Contact</p>
                </Link>
                </div>

                <div className="whole-menu-profile">
                  <div className="side-prof-con">
                    <div className="SPC-prof-img" style={{width : '80px', height : "80px", backgroundImage : `url(${information.users.profile.profileImgSrc})`, backgroundPosition : 'center', backgroundSize : 'cover', borderRadius : '100%', border : '0.02px solid rgba(0, 0, 0, 0.2)'}}></div>
                    <p className="whole-menu-name" style={{color : "#c43000"}}>{information.users.name}</p>
                    <p className="whole-menu-email">{information.users.email}</p>
                  </div>
                   <div className="whole-menu-btns">
                            <li className="drop-link">
                          <FiSettings size={14} />
                          <Link to = '/settings'>Settings</Link>
                        </li>

                        <li
                          className="drop-link out"
                          onClick={() => {
                            navigate("/");
                            signout()
                          }}
                        >
                          <FiLogOut size={14} className="drop-i" />
                          <Link>Sign out</Link>
                        </li>
                   </div>
                </div>

           </div></div>
        )
      }
      

        {
          opennots ? <div className="notification-con" onClick={(e) => {if(e.target.className == "notification-con"){
              setopennots(false)
            }}}>
            <div className="notification">
              <div className="notification-head">
                  <h5 className="nots-name" style={{fontSize :'clamp(12px, 1vw, 16px)'}}><FaBell size={12} />NOTIFICATION</h5>
                  <button className="nots-cancel" onClick={() => {setopennots(false)}}>X</button>
              </div>
              { information.users && [...(information.users.notification ? Object.entries(information.users.notification) : []),...(information.GeneralNotifications ? Object.entries(information.GeneralNotifications) : [])].length > 0? 
                    <div>
                        {[...(information.users.notification ? Object.entries(information.users.notification) : []),...(information.GeneralNotifications ? Object.entries(information.GeneralNotifications) : [])].map(([key, each]) => {
                return (
                  <div className="messages" key={key}>
                  <p className="mes-1" style={{fontSize :'clamp(10px, 1vw, 12px)'}}>{each.type == 'order' ? <MdDeliveryDining size={10} /> : each.type == 'reservations' ? <IoFastFood size={10} /> : each.type == 'coupon' ?<IoTicket size={10} />:each.type == 'warning' ? <IoWarningOutline size={10} /> : ''} {each.type}</p>
                  <p className="mes-2" style={{fontSize :'clamp(9px, 1vw, 11px)'}}>{each.message} {each.type == "coupon" && `and it will expire by ${new Date(each.time).toLocaleString()}`}</p>
                  <div  style={{width : '100%', display:'flex', justifyContent :'end'}}>
                  {each.type == "coupon" && <button onClick={() => { console.log(window.isSecureContext); navigator.clipboard.writeText(information.coupons[each.coupon_token].code);}} style={{border : 'none', backgroundColor : 'transparent', width: "fit-content", width: 'fit-content', marginRight : "20px", color : 'red', display : 'flex', height : "fit-content", alignItems : 'center', gap : '10px', fontSize : 'clamp(8px, 1vw, 10px)'}} >Copy Token <FaCopy size={8} /></button>}
                  {each.type == "coupon" && <button onClick={() => { console.log(window.isSecureContext); navigator.clipboard.writeText(each.coupon_token);}} style={{border : 'none', backgroundColor : 'transparent', width: "fit-content", width: 'fit-content', marginRight : "20px", color : 'red', display : 'flex', height : "fit-content", alignItems : 'center', gap : '10px', fontSize : 'clamp(8px, 1vw, 10px)'}} >Copy CID <FaCopy size={8} /></button>}
                  {each.type == "order" && <FaMinus size={8} style={{width: 'fit-content', marginRight : "20px", color : 'red'}}  onClick={() => {delNots(info.uid, key)}}/>}
                  </div>
                  </div>
                )
              })}
                    </div>
              : (!information.users.notification && !information.GeneralNotifications) ? <p className="nonots">no notifications</p> : null}
                           
        </div>
          </div> : null
        }

    </>
  );
};

export default Nav;