import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { FaChevronDown, FaDollarSign, FaPlus, FaShoppingCart, FaUser, FaUtensils } from "react-icons/fa";
import { startOfWeek, format, getDay } from "date-fns";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import {
  BarChart,
  Bar,
} from "recharts";
import { Append_P_Sales } from "../../../DATABASE/handleUser";
const Adashboard = ({AUTH, DB}) => {
    const [openAdd, setopenAdd] = useState(false)
    const COLORS = ['green', 'blue', 'orange']
    const navigate = useNavigate()
    const [Time, setTime] = useState(null)
    const [cash, setcash] = useState(null)
    const user = [
        {type: 'Active', poss: 200},
        {type: 'New Users', poss: 287},
        {type: 'Inactive', poss: 63}
    ]
    const data = [
  { day: "Mon", sales: 21200 },
  { day: "Tue", sales: 7300 },
  { day: "Wed", sales: 9700 },
  { day: "Thur", sales: 7100 },
  { day: "Fri", sales: 18800 },
  { day: "Sat", sales: 9000 },
  { day: "Sun", sales: 12000 },
];
const data2= [
  { name: "Rice", value: 120 },
  { name: "Beans", value: 60 },
  { name: "Garri", value: 100 },
  { name: "Yam", value: 150 },
  { name: "Garri", value: 100 },
];
useEffect(() => {
    console.log(DB)
    console.log(AUTH)
    console.log("yo, this is the dashboard")
}, [DB])
    return ( 
        <>
        <div className="in-P">
            <button onClick={() => {setopenAdd(true)}}><FaPlus size={16} /> Cash/In-Person Sales</button>
        </div>
        {
            openAdd &&
                <div className="add-cops-con" style={{zIndex : "2"}}>
                    <div className="add-cops">
                        <p className="coupons-head" style={{display : 'flex', justifyContent : 'space-between'}}>
                            Add Physical Sales
                            <button onClick={() => {setopenAdd(false)}} style={{color : 'black', fontWeight : 'bolder', border : 'none', backgroundColor : 'transparent'}}>X</button>
                        </p>
                           <div className="input-code">
                                <label>Amount:</label>
                                <input type="Number" value={cash} onChange={(e) => {setcash(e.target.value)}}/>
                                <div className="type-end-inp">
                                    <label>Date:</label>
                                    <input type="date" value={Time} onChange={(e)=>{setTime(e.target.value)}}/>
                                    <button  style={{padding : '12px 0px', fontWeight : 'bold', marginTop : "12px"}} onClick={() => setTime(new Date().toISOString().split("T")[0])}>
                                        Today
                                    </button>
                                </div>
                                {(Time && cash) && <button
                                    style={{padding : '12px 0px', fontWeight : 'bold'}}
                                    onClick={() => {
                                        Append_P_Sales({
                                            created_at : Time,
                                            total : cash
                                        }).then(() => {
                                            setTime(null)
                                            setcash(null)
                                            setopenAdd(false)
                                        }).catch(e => {console.log(e.mes)})
                                    }}
                                >
                                    Add Sales
                                </button>}
                                </div>
                        </div>
                    </div>            
        }
            <div className="dash-head">
                <div className="dash-head-left">
                    <span className="dash-big">Dashboard</span>
                    <span className="dash-mini">Welcome back, <span style={{color : '#da3a00', fontWeight: 'bold'}}> {" "} {DB.users[AUTH.uid].name}</span></span>
                </div>
                <input type="month" />
            </div>
            <div className="dash-cards">
                    <div className="dash-card-each" data-aos = "fade-down" data-aos-delay = '100'>
                            <div className="each-card-top">
                                    <FaShoppingCart size={18} style={{
                                        color : 'rgb(0, 33, 141)',
                                        padding: '12px',
                                        backgroundColor : 'rgb(0, 33, 141, .1)',
                                        borderRadius: '8px'
                                        }}/>
                                    <div className="each-card-top-left">
                                        <div className="e-c-t-l-head">Total Orders</div>
                                        <div className="e-c-t-l-big">{Object.values(DB?.ADMINBLOCK?.USERORDERS ? DB.ADMINBLOCK.USERORDERS : []).length}</div>
                                        <div className="each-card-top">
                                            <div className="inc-percentage"><FaChevronDown size={7}/>12.7%</div>
                                            <span className="too-mini">per last 7 days</span>
                                        </div>
                                    </div>
                            </div>

                    </div>
                    <div className="dash-card-each"  data-aos = "fade-down" data-aos-delay = '300'>
                            <div className="each-card-top">
                                    <FaDollarSign size={18} style={{
                                        color : 'rgb(0, 141, 42)',
                                        padding: '12px',
                                        backgroundColor : 'rgb(0, 141, 42, .1)',
                                        borderRadius: '8px'
                                        }}/>
                                    <div className="each-card-top-left">
                                        <div className="e-c-t-l-head">Total Revenue</div>
                                        <div className="e-c-t-l-big">₦320,000</div>
                                        <div className="each-card-top">
                                            <div className="inc-percentage"><FaChevronDown size={7}/>45%</div>
                                            <span className="too-mini">per last 7 days</span>
                                        </div>
                                    </div>
                            </div>

                    </div>
                    <div className="dash-card-each"  data-aos = "fade-down" data-aos-delay = '500'>
                            <div className="each-card-top">
                                    <FaUser size={18} style={{
                                        color : 'rgb(207, 0, 197)',
                                        padding: '12px',
                                        backgroundColor : 'rgb(207, 0, 197, .1)',
                                        borderRadius: '8px'
                                        }}/>
                                    <div className="each-card-top-left">
                                        <div className="e-c-t-l-head">Total Users</div>
                                        <div className="e-c-t-l-big">{ Object.values(DB.users).length }</div>
                                        <div className="each-card-top">
                                            <div className="inc-percentage"><FaChevronDown size={7}/>12.7%</div>
                                            <span className="too-mini">per last 7 days</span>
                                        </div>
                                    </div>
                            </div>

                    </div>
                    <div className="dash-card-each"  data-aos = "fade-down" data-aos-delay = '700'>
                            <div className="each-card-top">
                                    <FaUtensils size={18} style={{
                                        color : 'rgb(192, 0, 0)',
                                        padding: '12px',
                                        backgroundColor : 'rgb(192, 0, 0, .1)',
                                        borderRadius: '8px'
                                        }}/>
                                    <div className="each-card-top-left">
                                        <div className="e-c-t-l-head">Total Menu</div>
                                        <div className="e-c-t-l-big">{Object.values(DB.food.foodlisting).filter((each)=>{return !each.disabled }).length}</div>
                                        <div className="each-card-top">
                                            <div className="inc-percentage"><FaChevronDown size={7}/>12.7%</div>
                                            <span className="too-mini">per last 7 days</span>
                                        </div>
                                    </div>
                            </div>

                    </div>
            </div>
            

            <div className="dash-end">
                <div className="res-order">
                    <div className="res-order-head">
                        <span className="DD-head">Recent Orders</span>
                        <button className="DD-btn" onClick={() => {navigate("/admin-dashboard/orders")}}>View All</button>
                    </div>
                    <div className="res-order-main">
                       {!DB.ADMINBLOCK?.USERORDERS && <div className="res-order-each"><p>no orders exist yet</p></div>}
                       {DB.ADMINBLOCK?.USERORDERS && Object.entries(DB.ADMINBLOCK.USERORDERS).filter(([key, eachO]) => {return eachO.orderStatus == "orderded"}).slice(0,3).map(([key, eachO]) => {
                        const date = new Date(eachO.created_at);
                        const timePart = date.toLocaleTimeString("en-US", {
                                                hour12: true
                                            }).toLowerCase();
                          return(
                             <div className="shrt-order-list" key={key}>
                                <div className="sol-profile">
                                    <div className="sol-p-img" style={{
                                        backgroundImage : `url(${ DB.users[eachO.user].profile.profileImgSrc })`,
                                         width : "40px", height : "40px",
                                        borderRadius : "100%",
                                        backgroundPosition : "center",
                                        backgroundSize : "cover",
                                        border : "1px solid black"
                                        }}></div>
                                    <div className="sol-p-details">
                                        <span className="sol-p-d-head">{ key }</span>
                                        <span className="sol-p-d-mini">{ DB.users[eachO.user].name }</span>
                                    </div>
                                </div>

                                <span className="sol-p-d-mini" style={{color : "black"}}> ₦{ eachO.total } </span>

                                <div className="sol-status" style={{
                                    backgroundColor : eachO.orderStatus == "orderded" ?
                                    "rgba(145, 0, 0, 0.1)" : eachO.orderStatus == "preparing" ?
                                    "rgba(145, 135, 0, 0.1)" : eachO.orderStatus == "delivered" ?
                                    "rgb(0, 145, 0, .1)" : null, color : eachO.orderStatus == "orderded" ?
                                    "rgba(145, 0, 0, 0.8)" : eachO.orderStatus == "preparing" ?
                                    "rgba(145, 135, 0, 0.8)" : eachO.orderStatus == "delivered" ?
                                    "rgb(0, 145, 0, .8)" : null
                                    }}>
                                        { eachO.orderStatus }
                                </div>

                                <span className="sol-p-d-mini" style={{color : "black"}}> {timePart} </span>

                             </div>
                          )
                       })}
                    </div>
                </div>
                <div className="users-ov">
                    <div className="res-order-head">
                        <span className="DD-head">Users Overview</span>
                        <button className="DD-btn" onClick={() => {navigate("/admin-dashboard/users")}}>View All</button>
                    </div>
                    <div className="dis-users">
                        <div className="user-chart">
                            <div
                                style={{
                                    width: "200px",
                                    height: "200px",
                                }}
                                >
                                <ResponsiveContainer>
                                    <PieChart>

                                    <Pie
                                        data={user}
                                        dataKey="poss"
                                        
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={50}
                                        outerRadius={75}
                                    >
                                        {data.map((item, index) => (
                                        <Cell
                                            key={index + 1}
                                            fill={COLORS[index]}
                                        />
                                        ))}
                                    </Pie>
                                    <text
                                        x="50%"
                                        y="45%"
                                        textAnchor="middle"
                                        dominantBaseline="middle"
                                        fontSize={22}
                                        fontWeight="bold"
                                    >
                                        1,285
                                    </text>

                                    <text
                                        x="50%"
                                        y="55%"
                                        textAnchor="middle"
                                        dominantBaseline="middle"
                                        fontSize={8}
                                        fill="#777"
                                    >
                                        Total Users
                                    </text>
                                    </PieChart>
                                </ResponsiveContainer>
                                </div>
                                <div className="disc">
                                    <span className="indictors"><div className="indic" style={{backgroundColor : 'blue'}}></div><div className="txt-indic-con"><span className="mean-indic">New Users</span><span className="indic-txt">47</span></div></span>
                                    <span className="indictors"><div className="indic" style={{backgroundColor : 'green'}}></div><div className="txt-indic-con"><span className="mean-indic">Active Users</span><span className="indic-txt">496</span></div></span>
                                    <span className="indictors"><div className="indic" style={{backgroundColor : 'orange'}}></div><div className="txt-indic-con"><span className="mean-indic">Inactive Users</span><span className="indic-txt">50</span></div></span>
                                </div>
                        </div>
                    </div>
                </div>

            </div>

             <div className="line-chart">
               <div style={{ height: "400px" , margin: "40px 0px", backgroundColor: 'white', borderRadius : '7px', padding : '20px 0px', boxSizing: 'border-box', border : "0.02px solid rgb(0,0,0,.06)", flex : "1 1 300px"}}>
               <ResponsiveContainer width="100%" height="100%" >
                <BarChart data={data2}>

                    <XAxis dataKey="name" />

                    <YAxis hide />

                    <Tooltip />

                    <Bar
                    barSize={70}
                    dataKey="value"
                    radius={[6, 6, 0, 0]}
                    fill = "#c43000"
                    />
                </BarChart>
                </ResponsiveContainer>
            </div>
            
               <div style={{ height: "400px" , margin: "40px 0px", backgroundColor: 'white', borderRadius : '7px', padding : '20px 0px', boxSizing: 'border-box', border : "0.02px solid rgb(0,0,0,.06)", flex : "1 1 400px",}}>
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1.2">
                            <stop offset="5%" stopColor="#c43000" stopOpacity={0.4} />
                            <stop offset="95%" stopColor="#c43000" stopOpacity={0} />
                            </linearGradient>
                        </defs>

                        <XAxis dataKey="day" />
                        <YAxis hide/>
                        <Tooltip />

                        <Area
                            type="monotone"
                            dataKey="sales"
                            stroke="#c43000"
                            fill="url(#colorSales)"
                            strokeWidth={1.5}
                            dot={true}
                        />
                        </AreaChart>
                    </ResponsiveContainer>
            </div>
                </div>
        </>
     );
}
 
export default Adashboard;