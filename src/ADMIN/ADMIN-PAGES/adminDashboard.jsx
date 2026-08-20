import { useState } from "react";
import { useNavigate } from "react-router";
import { FaChevronDown, FaDollarSign, FaShoppingCart, FaUser, FaUtensils } from "react-icons/fa";
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
const Adashboard = ({AUTH, DB}) => {
    const COLORS = ['green', 'blue', 'orange']
    const navigate = useNavigate()
    const user = [
        {type: 'Active', poss: 200},
        {type: 'New Users', poss: 287},
        {type: 'Inactive', poss: 63}
    ]
    const data = [
  { day: "Mon", sales: 8200 },
  { day: "Tue", sales: 7300 },
  { day: "Wed", sales: 9700 },
  { day: "Thur", sales: 5100 },
  { day: "Fri", sales: 13800 },
  { day: "Sat", sales: 9000 },
  { day: "Sun", sales: 8000 },
];
    return ( 
        <>
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
                                        <div className="e-c-t-l-big">729</div>
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
                                        <div className="e-c-t-l-big">559</div>
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
                                        <div className="e-c-t-l-big">17</div>
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
                        <button className="DD-btn">View All</button>
                    </div>
                    <div className="res-order-main">
                        <div className="res-order-each"><p>no orders exist yet</p></div>
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
                    <div style={{width : '140%', height: "400px" , margin: "40px 0px", backgroundColor: 'white', borderRadius : '12px', padding : '20px', boxSizing: 'border-box'}}>
                    <span className="DD-head">Sales Review</span>
                <ResponsiveContainer width="100%" height="90%" style={{paddingTop : '30px'}}>
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1.2">
                            <stop offset="5%" stopColor="#c43000" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#c43000" stopOpacity={0} />
                            </linearGradient>
                        </defs>

                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip />

                        <Area
                            type="monotone"
                            dataKey="sales"
                            stroke="#c43000"
                            fill="url(#colorSales)"
                            strokeWidth={1.5}
                        />
                        </AreaChart>
                    </ResponsiveContainer>
            </div>
                </div>

        </>
     );
}
 
export default Adashboard;