import { FaCalendar, FaCalendarCheck, FaCheck, FaCheckCircle, FaCheckDouble, FaDotCircle, FaFire, FaPlane } from "react-icons/fa";
import { FiAirplay, FiCalendar, FiCheck, FiCheckCircle, FiClock, FiTruck } from "react-icons/fi";
import { IoCallOutline, IoChatbox, IoChatboxOutline, IoLocationOutline } from "react-icons/io5";
import { MdDeliveryDining } from "react-icons/md";

const Orders = ({information, info}) => {
    return ( 
        <>
          {
            information.orders && information.orders[info.uid]  ? (
                <div className="yorder-con">
                    <div className="yourorder-header">
                <div className="yr-con">
                    <p className="yourorder-head">Your Orders</p>
                    <p className="yourorder-mini">Track and Manage your ongoing Order</p>
                </div>
                <select id="" id= "select">
                    <option value="">All Active Orders</option>
                </select>
            </div>
                    <div className="dbo-whole-con" style={{display : 'flex', flexDirection :'column', rowGap: '24px'}}>
                        {Object.entries(information.orders[info.uid]).reverse().map(([key, each]) => {
                            return(
                                <div className = "yourorder-box" style={{height :'fit-content', backgroundColor: 'rgb(248, 237, 227)'}}>
                                         <div className="yourorder-box-head" style={{border: 'none'}}>
                                                         <div className="ybh-left">
                                                             <FaCalendar size={22} className="ybh-left-i"/>
                                                             <div className="left-right">
                                                                 <p className="lr-main">ORDER #{key.toUpperCase()}</p>
                                                                 <p className="yourorder-mini">Aug 12,2026 <FaDotCircle size={5} /> 02:45 pm</p>
                                                                 <p className="total-ybh-price">₦ {each.total} <span className="yr-status">Preparing</span></p>
                                                             </div>
                                                         </div>

                                         </div>

                                         <div className="order-status">
                                                <div className="status-con-each"><FaCheck className= 'status-i not-ready OR-ready' size = {15}/>Ordered</div>
                                                                <div className= 'line not-ready OR-ready'></div>
                                                                <div className="status-con-each"><FaPlane className="status-i not-ready OR-ready"  size = {15} />Preparing</div>
                                                                <div className="line not-ready"></div>
                                                                <div className="status-con-each"><FaCheckDouble className="status-i not-ready"  size={15} />Delivered</div>
                                         </div>
                                         <div className="order-under">
                                            <div className="total-ybh-price">{Object.values(each.items || {}).length} items</div>
                                            <div className="OR-items">
                                                {
                                                    Object.values(each.items).map((eachIT, i) => {
                                                        return(<div style={{width : '50px', height: '50px', borderRadius: '5px', backgroundImage:`url(${information.food.foodlisting[eachIT.foodid].imgsrc})`, backgroundPosition:'center', backgroundSize:'cover'}}></div>)
                                                    })
                                                }
                                                <ul>
                                                    {
                                                    Object.values(each.items).map((eachIT, i) => {
                                                        return(
                                                            <li className="OR-list">{information.food.foodlisting[eachIT.foodid].name}</li>
                                                        )
                                                    })
                                                    }
                                                </ul>
                                            </div>
                                         </div>
                                         <div className="OR-info">
                                            <div className="OR-info-con">
                                                <div className="OR-info-l">
                                                    <FiClock size={18} style={{color : 'rgba(255, 255, 255, 0.6)'}}/>
                                                    <span className="oil-txt">
                                                        <span className="oil-txt-mini">Estimated delivery time</span>
                                                        <span className="oil-txt-main diff-oil">50 minutes</span>
                                                    </span>
                                                </div>
                                                <div className="OR-info-l">
                                                    <IoLocationOutline size={18} style={{color : 'rgba(255, 255, 255, 0.6)'}}/>
                                                    <span className="oil-txt">
                                                        <span className="oil-txt-mini">Delivered to</span>
                                                        <span className="oil-txt-main">{each.location}</span>
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="OR-info-con">
                                                <div className="OR-info-l">
                                                    <IoCallOutline size={18} style={{color : 'rgba(255, 255, 255, 0.6)'}}/>
                                                    <span className="oil-txt">
                                                        <span className="oil-txt-mini">Estimated delivery time</span>
                                                        <span className="oil-txt-main diff-oil">+234 8163110741</span>
                                                    </span>
                                                </div>
                                                <div className="OR-info-l">
                                                    <IoChatboxOutline size={18} style={{color : 'rgba(255, 255, 255, 0.6)'}}/>
                                                    <span className="oil-txt">
                                                        <span className="oil-txt-mini">Delivered to</span>
                                                        <span className="oil-txt-main">{each.location}</span>
                                                    </span>
                                                </div>
                                            </div>
                                            
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