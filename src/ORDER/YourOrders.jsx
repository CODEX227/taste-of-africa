import { useEffect } from "react";
import { FaCalendar, FaCalendarCheck, FaCheck, FaCheckCircle, FaCheckDouble, FaDotCircle, FaFire, FaHandHolding, FaHandPeace, FaPlane, FaRegIdCard, FaShoppingBag } from "react-icons/fa";
import { FiAirplay, FiCalendar, FiCheck, FiCheckCircle, FiClock, FiTruck } from "react-icons/fi";
import { IoCallOutline, IoCallSharp, IoChatbox, IoChatboxOutline, IoLocationOutline } from "react-icons/io5";
import { MdBackHand, MdDeliveryDining } from "react-icons/md";

const Orders = ({information, info}) => {
    return (
        <>
          {
            information.orders && information.orders  ? (
                <div className="yorder-con">
                    <div className="yourorder-header">
                <div className="yr-con">
                    <p className="yourorder-head">Your Orders</p>
                    <p className="yourorder-mini">Track and Manage your ongoing Order</p>
                </div>
                <select id = "select">
                    <option value="">All Active Orders</option>
                </select>
            </div>
                    <div className="dbo-whole-con" style={{display : 'flex', flexWrap : 'wrap', rowGap: '24px', gap :'20px'}}>
                        {Object.entries(information.orders).filter (([key, each]) => {return each.tx_ref !== undefined}).map(([key, each]) => {
                            return(
                                <div className = "yourorder-box" style={{height :'fit-content', backgroundColor: 'rgb(255, 249, 243)', flex : '1 1 300px'}}>
                                         <div className="yourorder-box-head" style={{border: 'none'}}>
                                                         <div className="ybh-left">
                                                             <FaCalendar size={22} className="ybh-left-i"/>
                                                             <div className="left-right">
                                                                 <p className="lr-main">ORDER <span style={{color : 'rgb(0, 124, 155)'}}>#{key.toUpperCase()}</span></p>
                                                                 <p className="yourorder-mini">Aug 12,2026 <FaDotCircle size={5} /> 02:45 pm</p>
                                                                 <p className="total-ybh-price">₦{each.total} <span style={{color : each.status == "preparing" ? 'orange' : each.status == "orderded" ? 'rgb(159, 0, 0)' : each.status == "delivered" ? 'rgb(0, 122, 2)' : null , backgroundColor : each.status == "preparing" ? 'rgb(255, 166, 0, .1)' : each.status == "orderded" ? 'rgb(159, 0, 0, .1)' : each.status == "delivered" ? 'rgb(0, 122, 2, .1)' : null }} className="yr-status">{each.status}</span></p>
                                                             </div>
                                                         </div>

                                         </div>

                                         <div className="order-status">
                                                                <div className="status-con-each"><FaCheck  style={{backgroundColor : each.status == "orderded" || each.status == "preparing" || each.status == "delivered" ? '#c43000' : "#2e2e2e"}} className= 'status-i ' size = {15}/>Ordered</div>
                                                                <div className= 'line not-ready' style={{backgroundColor : each.status == "orderded" || each.status == "preparing" || each.status == "delivered" ? '#c43000' : "#2e2e2e"}}></div>
                                                                <div className="status-con-each"><FaPlane style={{backgroundColor : each.status == "delivered" || each.status == "preparing" || each.status == "delivered" ? '#c43000' : "#2e2e2e"}} className="status-i "  size = {15} />Preparing</div>
                                                                <div className="line not-ready" style={{backgroundColor : each.status == "delivered" || each.status == "preparing" ? '#c43000' : "#2e2e2e"}}></div>
                                                                {each.method == "delivery" ? <div className="status-con-each"><FaCheckDouble style={{backgroundColor : each.status == "delivered" ? '#007a02' : "#2e2e2e"}} className="status-i not-ready"  size={15} />Delivered</div> : each.method == "pickup" ? <div className="status-con-each"><FaHandHolding style={{backgroundColor : each.status == "delivered" ? '#007a02' : "#2e2e2e"}} className="status-i not-ready"  size={15} />Pickedup</div> : null}
                                         </div>
                                         <div className="order-under">
                                            <div className="total-ybh-price">{Object.values(each.items || {}).length} items</div>
                                            <div className="OR-items">
                                                { each.items &&
                                                    Object.values(each.items).map((eachIT, i) => {
                                                        return(<div style={{width : '50px', height: '50px', borderRadius: '5px', backgroundImage:`url(${information.food.foodlisting[eachIT.foodid].imgsrc})`, backgroundPosition:'center', backgroundSize:'cover'}}></div>)
                                                    })
                                                }
                                                <ul>
                                                    { each.items &&
                                                    Object.values(each.items).map((eachIT, i) => {
                                                        return(
                                                            <li className="OR-list">{information.food.foodlisting[eachIT.foodid].name}</li>
                                                        )
                                                    })
                                                    }
                                                </ul>
                                            </div>
                                         </div>
                                          <div className="yr-last">
                                                             <div className="each-yr-last-con">
                                                                        <FaRegIdCard size={16} className="yr-last-i" style={{flexShrink : '0'}}/>
                                                                        <span className="ylt-head">Payment Method: </span>
                                                                        <span className="ylt-mini"> <i>{each.type.toUpperCase()}</i></span>
                                                                     
                                                             </div>
                                                             <div className="each-yr-last-con">
                                                                        <IoLocationOutline size={16} className="yr-last-i" style={{flexShrink : '0'}}/>
                                                                        <span className="ylt-head">Adreess: </span>
                                                                        <span className="ylt-mini" style={{width : '100%'}}> <i>{each.location}</i> </span>
                                                                     
                                                             </div>
                                                             <div className="each-yr-last-con">
                                                                        <MdDeliveryDining size={16} className="yr-last-i" style={{flexShrink : '0'}}/>
                                                                        <span className="ylt-head">Method: </span>
                                                                        <span className="ylt-mini"> <i>{each.method.toUpperCase()}</i></span>
                                                                     
                                                             </div>
                                                         </div>
                                                         <div className="yt-btns">
                                                             <button className="yt-btn"><IoCallSharp size={16} />Call Reastaurant</button>
                                                         </div>
                         </div>
                            )
                        })}


                    </div>
                </div>
            ) : <p className="no-orders">You have no ongoing Orders</p>
          }
        </>
     );
}
 
export default Orders;