import { useEffect, useState } from "react";
import { FaChevronCircleDown, FaChevronCircleLeft, FaChevronCircleRight, FaChevronDown, FaChevronRight, FaPen } from "react-icons/fa";
import { FiChevronLeft, FiPenTool } from "react-icons/fi";
import { IoChatbox, IoChatboxOutline, IoLocationOutline } from "react-icons/io5";
const Aorder = ({AUTH, DB}) => {
    const [page, setpage] = useState(1)
    const [pageQ, setpageQ] = useState(10)
    const [filtered, setfiltered] = useState('')
    const [Sval, setSval] = useState('')
    const Sindex = (page -1)*pageQ
    const Eindex = Sindex + pageQ
    const pageS = Math.ceil(Object.entries(DB.ADMINBLOCK.USERORDERS).filter(([key, value]) => filtered != '' ? value.orderStatus.toLocaleLowerCase() == filtered.toLocaleLowerCase() : filtered == "" ? value : null).length / pageQ)
    const options = ['orderded', 'preparing', 'delivered']
    const [openDrop, setopenDrop] = useState(false)
    const [statusTo, setstatusTo] = useState('')
    const [current, setcurrent] = useState({
        currentactive : null
    })
    const [showuserprofile, setshowuserprofile] = useState(false)

            return ( 
        <div className="Aorder">
            <div className="dash-head">
           <div className="dash-head-left">
                    <span className="dash-big">Manage Orders</span>
                    <span className="dash-mini">Manage and view all customers Orders</span>
           </div>
           </div>
           <div className="Aorder-filter">
            <button value= "" onClick = {(e) => {setfiltered(e.currentTarget.value)}} className= {filtered == "" ? "AF-each AF-each-active" : "AF-each"}>All Orders ({Object.entries(DB.ADMINBLOCK.USERORDERS).length})</button>
              <button value= "orderded" onClick = {(e) => {setfiltered(e.currentTarget.value)}} className= {filtered == "orderded" ? "AF-each AF-each-active" : "AF-each"}>Ordered ({Object.entries(DB.ADMINBLOCK.USERORDERS).filter(([key, value]) => value.orderStatus.toLocaleLowerCase() == 'orderded'.toLocaleLowerCase()).length})</button>
              <button className= {filtered == "preparing" ? "AF-each AF-each-active" : "AF-each"} value= "preparing" onClick = {(e) => {setfiltered(e.currentTarget.value)}} >Preparing ({Object.entries(DB.ADMINBLOCK.USERORDERS).filter(([key, value]) => value.orderStatus.toLocaleLowerCase() == 'preparing'.toLocaleLowerCase()).length})</button>
              <button className= {filtered == "delivered" ? "AF-each AF-each-active" : "AF-each"} value= "delivered" onClick = {(e) => {setfiltered(e.currentTarget.value)}} >Delivered ({Object.entries(DB.ADMINBLOCK.USERORDERS).filter(([key, value]) => value.orderStatus.toLocaleLowerCase() == 'delivered'.toLocaleLowerCase()).length})</button>
           </div>
           <div className="Aorder-body">
                  <div className="AB-left">
                    <div className="AB-body-top">
                <input value={Sval} type="search" placeholder="Search by orderID or phone or name" onChange={(e) => {setSval(e.target.value)}}/>
                   <select className="per-page" value={pageQ} onChange={(e) => {setpageQ(e.target.value)}}>
                    <option value="5">5 rows per page</option>
                    <option value="8">8 rows per page</option>
                    <option value="10">10 rows per page</option>
                    <option value="15">15 rows per page</option>
                    <option value="20">20 rows per page</option>
                    <option value="30">30 rows per page</option>
                    <option value="40">40 rows per page</option>
                </select>
               </div>

                <div className="AB-table">
                            <table>
                                    <thead>
                                        <tr>
                                        <th>Order ID</th>
                                        <th>Customer</th>
                                        <th>Items</th>
                                        <th>Total</th>
                                        <th>Status</th>
                                        <th>Date & Time</th>
                                    </tr>
                                    </thead>
                                { Object.entries(DB.ADMINBLOCK.USERORDERS).filter(([key, value]) => filtered != '' ?  value.orderStatus.toLocaleLowerCase() == filtered.toLocaleLowerCase() : filtered == '' ? value : null).filter(([key, value]) => key.includes(Sval.toLocaleLowerCase()) || DB.users[value.user].name.toLocaleLowerCase().includes(Sval) || DB.users[value.user].delivery.phone.toLocaleLowerCase().includes(Sval)).slice(Sindex, Eindex).map(([key, each]) => {
                                    const date = new Date(each.created_at);
                                            const datePart = date.toLocaleDateString("en-GB", {});
                                            const timePart = date.toLocaleTimeString("en-US", {
                                                hour12: true
                                            }).toLowerCase();
                                    return(
                                        <thead key={key} style={{ borderLeft : current.currentactive == key && "4px solid #c23000"}}>
                                          <tr onClick={() => {setcurrent({
                                             currentactive : key
                                          });
                                             setshowuserprofile(true)
                                          }}>
                                            <td className="AB-order-id"># TOA-7-2026-{key.toUpperCase()}</td>
                                            <td><span className="ab-ss">{DB.users[each.user].name} <span className="ab-s">{DB.users[each.user].delivery.phone}</span></span></td>
                                            <td>{Object.values(each.items).length} Items</td>
                                            <td className="AB-order-price">₦ {each.total}</td>
                                            <td className={each.orderStatus == 'orderded' ? 'AB-red AB-order-status' : each.orderStatus == 'preparing' ? 'AB-orange AB-order-status' : each.orderStatus == 'delivered' ? 'AB-green AB-order-status' : ''}> <i>{each.orderStatus.toUpperCase()}</i> </td>
                                            <td><span className="ab-ss">{ datePart.toString() } - <span className="ab-s">{ timePart.toString() }</span></span></td>
                                          </tr>
                                        </thead>
                                )
                                })
                                }
                            </table>

                    <div className="page-count-con">
                              <div className="pages-count">
                                 {
                                    Array.from({ length: pageS}, (_, i) => (
                                        <button className= {
                                            page == i + 1  ? 'counts counts-active' : 'counts'
                                        }
                                        key={i}
                                        value={i + 1}
                                        onClick={() => {
                                            setpage(i + 1)
                                        }}
                                        >{i + 1}</button>
                                    ))
                                 }
                              </div>
                   </div>
               </div>
               </div>
           </div>

           {showuserprofile && <div className="AB-right-con" onClick={(e) => {e.target.className == "AB-right-con" && setshowuserprofile(false)}}>
                     <div className="AB-right">
                   <div className="abr-head" style={{position : 'sticky', top :'-20px', background: 'white', borderBottom : '0.02px solid grey', zIndex:'201', padding : '20px 0px'}}>
                      <span className="abr-txt">Edit Order</span>
                      <button className="abr-cancel" onClick={() => {
                          setshowuserprofile(false);
                      }}>X</button>
                   </div>
                   <div className="abr-status">
                    <span className="id" style={{color : '#c43400 '}}># TOA-7-{current.currentactive}</span>
                    <div className="drop">
                        <div className="status-dropdown">

                    <button
                        className="abr-status-btn"
                        onClick={() =>
                            setopenDrop(!openDrop)
                        }
                    >
                        Orderded 
                        <span> | </span>
                        <FaChevronDown size={10} />
                    </button>

                    {openDrop && (
                        <div className="status-menu" onClick={() => {setopenDrop(false)}}>
                            <div>
                                Ordered
                            </div>

                            <div>
                                Preparing
                            </div>

                            <div>
                                Delivered
                            </div>

                        </div>
                    )}

                </div>
                    </div>
                   </div>
                   <div className="abr-details-con">
                       <div className="abr-d-head">
                          <span className="abr-headers">Customer Information</span>
                          <FaPen size={10} style={{color :'black'}}/>
                       </div>
                       <div className="info-box">
                          <div style={{backgroundImage : `url(${DB.users[DB.ADMINBLOCK.USERORDERS[current.currentactive].user].profile.profileImgSrc})`, backgroundPosition: 'center', backgroundSize : 'cover', width : '80px', height : '80px', border: '0.01px solid rgb(255, 255, 255, .2)', borderRadius:'100%', padding:'0%'}}></div>
                          <div className="info-rl">
                            <span className="info-rl-head">{DB.users[DB.ADMINBLOCK.USERORDERS[current.currentactive].user].name}</span>
                            <span className="info-rl-avrg">{DB.users[DB.ADMINBLOCK.USERORDERS[current.currentactive].user].delivery.phone}</span>
                            <span className="info-rl-mini">{DB.users[DB.ADMINBLOCK.USERORDERS[current.currentactive].user].email}</span>
                          </div>
                          <IoChatboxOutline size={15} style={{color :'c43400', position : 'absolute', top : '15px', right: '15px'}}/>
                       </div>
                   </div>


                   <div className="abr-details-con">
                       <div className="abr-d-head">
                          <span className="abr-headers">Delivery Information</span>
                          <FaPen size={10} style={{color :'black'}}/>
                       </div>
                       <div className="info-box">
                          <div className="info-rl">
                            <span className="info-rl-avrg"  style={{width: '40%', lineHeight : '1.5'}}>{DB.users[DB.ADMINBLOCK.USERORDERS[current.currentactive].user].delivery.adress}</span>
                            <span className="abr-headers">Landscape: Beside Zenith Bank</span>
                          </div>
                          <IoLocationOutline size={15} style={{color :'#c43400', position : 'absolute', top : '15px', right: '15px'}}/>
                       </div>
                   </div>


                   <div className="abr-details-con">
                       <div className="abr-d-head">
                          <span className="abr-headers">Order</span>
                          <FaPen size={10} style={{color :'black'}}/>
                       </div>
                       <div className="info-box">
                          <div className="info-rl" style={{width : '100%'}}>
                            {
                                Object.entries(DB.ADMINBLOCK.USERORDERS[current.currentactive].items).map(([itemkey, eachitems]) => {
                                    return(
                                         <div className="each-info-box-order">
                                        <div className="ib-order-img" style={{backgroundImage : `url(${DB.food.foodlisting[eachitems.foodid].imgsrc})`, backgroundPosition : 'center', backgroundSize : 'cover', width : '50px', height : '50px', borderRadius : '5px', border : '0.01px solid white'}}></div>
                                        <ul>
                                            <li>{DB.food.foodlisting[eachitems.foodid].name.toUpperCase()}</li>
                                            <li>x{eachitems.quantity}</li>
                                            {eachitems.customized && <li style={{color : '#c23000'}}>customized</li>}
                                        </ul>
                                    </div> 
                                    )
                                })
                            }
                          </div>
                       </div>
                   </div>

                   <div className="abr-details-con">
                       <div className="abr-d-head">
                          <span className="abr-headers">Order Summary</span>
                          <FaPen size={10} style={{color :'black'}}/>
                       </div>
                       <div className="info-box">
                          <div className="info-rl" style={{width : '100%'}}>
                            <span className="info-rl-avrg" style={{display : 'flex', justifyContent : 'space-between', paddingTop : '5px'}}>Item Total <span>{ DB.ADMINBLOCK.USERORDERS[current.currentactive].total }</span></span>
                            <span className="info-rl-avrg" style={{display : 'flex', justifyContent : 'space-between', paddingTop : '5px'}}>Delivery Fee <span>#1000</span></span>
                            <span className="info-rl-avrg" style={{display : 'flex', justifyContent : 'space-between', paddingTop : '5px'}}>Discount <span>#0</span></span>
                            <span className="abr-headers" style={{display : 'flex', justifyContent : 'space-between', paddingTop : '12px'}}>Total <span>#{ DB.ADMINBLOCK.USERORDERS[current.currentactive].total }</span></span>
                          </div>
                       </div>
                   </div>

                   <div className="abr-details-con" style={{border: 'none'}}>
                       <div className="abr-d-head">
                          <span className="abr-headers">Payment Information</span>
                          <FaPen size={10} style={{color :'black'}}/>
                       </div>
                       { 
                        <div className="info-box">
                          <div className="info-rl" style={{width : '100%'}}>
                            <span className="info-rl-avrg" style={{display : 'flex', justifyContent : 'space-between', paddingTop : '5px'}}>Method <span> Bank Transfer</span></span>
                            <span className="info-rl-avrg" style={{display : 'flex', justifyContent : 'space-between', paddingTop : '5px'}}>Status <span>Successful</span></span>
                            <span className="info-rl-avrg" style={{display : 'flex', justifyContent : 'space-between', paddingTop : '5px'}}>Paid At <span>09/08/2026 - 1:04:29 am</span></span>
                            <span className="abr-headers" style={{display : 'flex', justifyContent : 'space-between', paddingTop : '12px'}}>Reference ID <span>GTB-0123456789</span></span>
                          </div>
                       </div>}

                       
                   </div>

                   <button className="upadate-btn" style={{width : '100%'}}>Update Order</button>

               </div>
                </div>}
        </div>
     );
}
 
export default Aorder; 