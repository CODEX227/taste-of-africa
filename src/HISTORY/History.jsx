import { useState } from "react";
import { FaCalendar, FaChevronCircleUp, FaChevronDown, FaChevronUp, FaClock, FaDotCircle, FaIdCard, FaRegClock, FaTimesCircle } from "react-icons/fa";
import { FiCheckCircle } from "react-icons/fi";
import { IoLocationOutline } from "react-icons/io5";

const History = () => {
    const [show, setshow] = useState(true)
    return ( 
        <>
        <div className="yourorder">
            <div className="yourorder-header">
                <div className="yr-con">
                    <p className="yourorder-head">Your History</p>
                    <p className="yourorder-mini">Check through your order history</p>
                </div>
                <select id="" id= "select">
                    <option value="">All Active Orders</option>
                </select>
            </div>
            <div className = "yourorder-box">


                <div className="yourorder-box-head">
                                <div className="ybh-left">
                                    <FaCalendar size={22} className="ybh-left-i"/>
                                    <div className="left-right">
                                        <p className="lr-main">Order #DBE6G73H4BC7FHFU7</p>
                                        <p className="yourorder-mini">Aug 12,2026 <FaDotCircle size={5} /> 02:45 pm</p>
                                        <p className="total-ybh-price">₦ 12,800 <span className="yr-status">Preparing</span></p>
                                    </div>
                                </div>
                </div>



                <div className="yr-bottom">
                        <div className="each-food-item">
                            <div className="e-each-food-item">
                                <div className="eeft-f">
                                    <div className="eeft-img"></div>
                                    <div className="feeft-txts">
                                        <div className="feeft-head">Pounded Yam & Egusi</div>
                                        <div className="feeft-mini">Delicate amala wrap(s) with traditional ewedu soup and beef</div>
                                    </div>
                                </div>
                                <span className="eeft-q">x1</span>
                                <span className="eeft-price">₦ 2500</span>
                            </div>
                            <div className="e-each-food-item">
                                <div className="eeft-f">
                                    <div className="eeft-img"></div>
                                    <div className="feeft-txts">
                                        <div className="feeft-head">Amala</div>
                                        <div className="feeft-mini">Delicate amala wrap(s) with traditional ewedu soup and beef</div>
                                    </div>
                                </div>
                                <span className="eeft-q">x3</span>
                                <span className="eeft-price">₦ 2500</span>
                            </div>
                        </div>
                </div>
                <div className="yr-last">
                    <div className="each-yr-last">
                        <FaIdCard size={15} className="yr-last-i" />
                        <div className="yr-last-txts">
                            <span className="ylt-head">Payment Method</span>
                            <span className="ylt-mini">Bank Transfer</span>
                        </div>
                    </div>
                    <div className="each-yr-last">
                        <IoLocationOutline size={15} className="yr-last-i" />
                        <div className="yr-last-txts">
                            <span className="ylt-head">Delivery Adreess</span>
                            <span className="ylt-mini">15, Awolowo Road, ibadan, Oyo State</span>
                        </div>
                    </div>
                    <div className="each-yr-last">
                        <FiCheckCircle size={15} className="yr-last-i" style={{color:'green'}}/>
                        <div className="yr-last-txts">
                            <span className="ylt-head">Payment Status</span>
                            <span className="ylt-mini">Paid</span>
                        </div>
                    </div>
                </div>
                <div className="yt-btns">
                    <button className="yt-btn">Order Again</button>
                </div>
                <FaChevronDown size={11} className="see-more"/>

            </div>
            <div className = "yourorder-box">


                <div className="yourorder-box-head">
                                <div className="ybh-left">
                                    <FaCalendar size={22} className="ybh-left-i"/>
                                    <div className="left-right">
                                        <p className="lr-main">Order #DBE6G73H4BC7FHFU7</p>
                                        <p className="yourorder-mini">Aug 12,2026 <FaDotCircle size={5} /> 02:45 pm</p>
                                        <p className="total-ybh-price">₦ 12,800 <span className="yr-status">Preparing</span></p>
                                    </div>
                                </div>
                </div>



                <div className="yr-bottom">
                        <div className="each-food-item">
                            <div className="e-each-food-item">
                                <div className="eeft-f">
                                    <div className="eeft-img"></div>
                                    <div className="feeft-txts">
                                        <div className="feeft-head">Pounded Yam & Egusi</div>
                                        <div className="feeft-mini">Delicate amala wrap(s) with traditional ewedu soup and beef</div>
                                    </div>
                                </div>
                                <span className="eeft-q">x1</span>
                                <span className="eeft-price">₦ 2500</span>
                            </div>
                            <div className="e-each-food-item">
                                <div className="eeft-f">
                                    <div className="eeft-img"></div>
                                    <div className="feeft-txts">
                                        <div className="feeft-head">Amala</div>
                                        <div className="feeft-mini">Delicate amala wrap(s) with traditional ewedu soup and beef</div>
                                    </div>
                                </div>
                                <span className="eeft-q">x3</span>
                                <span className="eeft-price">₦ 2500</span>
                            </div>
                        </div>
                </div>
                <div className="yr-last">
                    <div className="each-yr-last">
                        <FaIdCard size={15} className="yr-last-i" />
                        <div className="yr-last-txts">
                            <span className="ylt-head">Payment Method</span>
                            <span className="ylt-mini">Bank Transfer</span>
                        </div>
                    </div>
                    <div className="each-yr-last">
                        <IoLocationOutline size={15} className="yr-last-i" />
                        <div className="yr-last-txts">
                            <span className="ylt-head">Delivery Adreess</span>
                            <span className="ylt-mini">15, Awolowo Road, ibadan, Oyo State</span>
                        </div>
                    </div>
                    <div className="each-yr-last">
                        <FiCheckCircle size={15} className="yr-last-i" style={{color:'green'}}/>
                        <div className="yr-last-txts">
                            <span className="ylt-head">Payment Status</span>
                            <span className="ylt-mini">Paid</span>
                        </div>
                    </div>
                </div>
                <div className="yt-btns">
                    <button className="yt-btn">Order Again</button>
                </div>
                <FaChevronDown size={11} className="see-more"/>

            </div>
            <div className = "yourorder-box">


                <div className="yourorder-box-head">
                                <div className="ybh-left">
                                    <FaCalendar size={22} className="ybh-left-i"/>
                                    <div className="left-right">
                                        <p className="lr-main">Order #DBE6G73H4BC7FHFU7</p>
                                        <p className="yourorder-mini">Aug 12,2026 <FaDotCircle size={5} /> 02:45 pm</p>
                                        <p className="total-ybh-price">₦ 12,800 <span className="yr-status">Preparing</span></p>
                                    </div>
                                </div>
                </div>



                <div className="yr-bottom">
                        <div className="each-food-item">
                            <div className="e-each-food-item">
                                <div className="eeft-f">
                                    <div className="eeft-img"></div>
                                    <div className="feeft-txts">
                                        <div className="feeft-head">Pounded Yam & Egusi</div>
                                        <div className="feeft-mini">Delicate amala wrap(s) with traditional ewedu soup and beef</div>
                                    </div>
                                </div>
                                <span className="eeft-q">x1</span>
                                <span className="eeft-price">₦ 2500</span>
                            </div>
                            <div className="e-each-food-item">
                                <div className="eeft-f">
                                    <div className="eeft-img"></div>
                                    <div className="feeft-txts">
                                        <div className="feeft-head">Amala</div>
                                        <div className="feeft-mini">Delicate amala wrap(s) with traditional ewedu soup and beef</div>
                                    </div>
                                </div>
                                <span className="eeft-q">x3</span>
                                <span className="eeft-price">₦ 2500</span>
                            </div>
                        </div>
                </div>
                <div className="yr-last">
                    <div className="each-yr-last">
                        <FaIdCard size={15} className="yr-last-i" />
                        <div className="yr-last-txts">
                            <span className="ylt-head">Payment Method</span>
                            <span className="ylt-mini">Bank Transfer</span>
                        </div>
                    </div>
                    <div className="each-yr-last">
                        <IoLocationOutline size={15} className="yr-last-i" />
                        <div className="yr-last-txts">
                            <span className="ylt-head">Delivery Adreess</span>
                            <span className="ylt-mini">15, Awolowo Road, ibadan, Oyo State</span>
                        </div>
                    </div>
                    <div className="each-yr-last">
                        <FiCheckCircle size={15} className="yr-last-i" style={{color:'green'}}/>
                        <div className="yr-last-txts">
                            <span className="ylt-head">Payment Status</span>
                            <span className="ylt-mini">Paid</span>
                        </div>
                    </div>
                </div>
                <div className="yt-btns">
                    <button className="yt-btn">Order Again</button>
                </div>
                <FaChevronDown size={11} className="see-more"/>

            </div>
            <div className = "yourorder-box">


                <div className="yourorder-box-head">
                                <div className="ybh-left">
                                    <FaCalendar size={22} className="ybh-left-i"/>
                                    <div className="left-right">
                                        <p className="lr-main">Order #DBE6G73H4BC7FHFU7</p>
                                        <p className="yourorder-mini">Aug 12,2026 <FaDotCircle size={5} /> 02:45 pm</p>
                                        <p className="total-ybh-price">₦ 12,800 <span className="yr-status">Preparing</span></p>
                                    </div>
                                </div>
                </div>



                <div className="yr-bottom">
                        <div className="each-food-item">
                            <div className="e-each-food-item">
                                <div className="eeft-f">
                                    <div className="eeft-img"></div>
                                    <div className="feeft-txts">
                                        <div className="feeft-head">Pounded Yam & Egusi</div>
                                        <div className="feeft-mini">Delicate amala wrap(s) with traditional ewedu soup and beef</div>
                                    </div>
                                </div>
                                <span className="eeft-q">x1</span>
                                <span className="eeft-price">₦ 2500</span>
                            </div>
                            <div className="e-each-food-item">
                                <div className="eeft-f">
                                    <div className="eeft-img"></div>
                                    <div className="feeft-txts">
                                        <div className="feeft-head">Amala</div>
                                        <div className="feeft-mini">Delicate amala wrap(s) with traditional ewedu soup and beef</div>
                                    </div>
                                </div>
                                <span className="eeft-q">x3</span>
                                <span className="eeft-price">₦ 2500</span>
                            </div>
                        </div>
                </div>
                <div className="yr-last">
                    <div className="each-yr-last">
                        <FaIdCard size={15} className="yr-last-i" />
                        <div className="yr-last-txts">
                            <span className="ylt-head">Payment Method</span>
                            <span className="ylt-mini">Bank Transfer</span>
                        </div>
                    </div>
                    <div className="each-yr-last">
                        <IoLocationOutline size={15} className="yr-last-i" />
                        <div className="yr-last-txts">
                            <span className="ylt-head">Delivery Adreess</span>
                            <span className="ylt-mini">15, Awolowo Road, ibadan, Oyo State</span>
                        </div>
                    </div>
                    <div className="each-yr-last">
                        <FiCheckCircle size={15} className="yr-last-i" style={{color:'green'}}/>
                        <div className="yr-last-txts">
                            <span className="ylt-head">Payment Status</span>
                            <span className="ylt-mini">Paid</span>
                        </div>
                    </div>
                </div>
                <div className="yt-btns">
                    <button className="yt-btn">Order Again</button>
                </div>
                <FaChevronDown size={11} className="see-more"/>

            </div>


        </div>
        </>
     );
}
 
export default History;