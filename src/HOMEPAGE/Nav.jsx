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
  FaPhoneAlt
} from "react-icons/fa";
import { FiSettings, FiLogOut, FiShoppingCart, FiClock } from "react-icons/fi";
import { IoCallOutline, IoFastFood, IoNotificationsOutline, IoWarningOutline  } from "react-icons/io5";
import { useEffect, useState } from "react";
import { dec, removecart, signout, inc, delNots } from "../../DATABASE/handleUser";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { MdDeliveryDining } from "react-icons/md";

const Nav = ({ info, information }) => {
  const [menuopen, setmenuopen] = useState(false);
  const [profopen, setprofopen] = useState(false);
  const [opennots, setopennots] = useState(false)
  const [num, setnum] = useState({})
  const [notexist, setnotexist] = useState(false)
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
                <div className="signal-con"><IoNotificationsOutline onClick={() => {setopennots(!opennots)}} size={16} className="sml" />{notexist !== undefined ? <span className="signal"></span> : null}</div>
                <div className="signal-con"><FiClock size ={16} onClick={() => {navigate('/history')}} className="sml"/></div>
                <div className="signal-con"><FiShoppingCart size={16} onClick={() => {navigate('/cart')}} className="sml"/></div>
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
              <div className="profile-img">
                <p>{information.users[info.uid].name.charAt(0)}</p>
              </div>

              <p className="prof-name">
                {information.users[info.uid].name}
              </p>

              {profopen ? (
                <FaChevronUp size={12} />
              ) : (
                <FaChevronDown size={12} />
              )}
            </div>

            {profopen && (
              <div className="drop-menu-free">
                <ul>
                  <li className="drop-links">
                    <p className="menu-name">
                      {information.users[info.uid].name}
                    </p>
                  </li>

                  <li className="drop-links">
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
                    <FiClock size={16} className="whole-menu-i"/>
                    <p>Orders</p>
                </Link>

                <Link className="whole-menu-each" to="/contact">
                    <FaPhoneAlt size={16} className="whole-menu-i"/>
                    <p>Contact</p>
                </Link>
                </div>

                <div className="whole-menu-profile">
                   <div className="pof-syl-dis"><div className="profile-img" style={{backgroundColor : `#${bg}`}}><p>{information.users[info.uid].name.charAt(0)}</p></div><p className="whole-menu-name">{information.users[info.uid].name}</p></div>
                        <p className="whole-menu-email">{information.users[info.uid].email}</p>
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
                                <h5 className="nots-name"><FaBell size={12} />NOTIFICATION</h5>
                                <button className="nots-cancel" onClick={() => {setopennots(false)}}>X</button>
                           </div>
                           { information.notification && information.notification[info.uid] ? 
                                 <div>
                                      {Object.values(information.notification[info.uid]).map((each, index) => {
                              return (
                                <div className="messages" key={index} onClick={() => {delNots(info.uid, each.notId)}}>
                                <p className="mes-1">{each.type == 'order' ? <MdDeliveryDining size={10} /> : each.type == 'reservations' ? <IoFastFood size={10} /> : each.type == 'new food' ?<FaChair size={10} />:each.type == 'warning' ? <IoWarningOutline size={10} /> : ''} {each.type}</p>
                                <p className="mes-2">{each.message}</p>
                              </div>
                              )
                           })}
                                 </div>
                           :<p className="nonots">no notifications</p>}
                           
        </div>
          </div> : null
        }

    </>
  );
};

export default Nav;