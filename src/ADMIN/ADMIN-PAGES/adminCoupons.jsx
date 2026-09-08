import { useEffect, useState } from "react";
import { FiPlus, FiTrash2 } from "react-icons/fi";
import { IoTicket } from "react-icons/io5";
import { AppendCoupon, AppendGNots, DeleteCoupon, DelGNots } from "../../../DATABASE/handleUser";

const Acoupons = ({DB}) => {
    const [openAdd, setopenAdd] = useState(false)
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789&%@|?/^$#!~";
    const [stateTime, setstateTime] = useState({})
    const [newcoupon, setnewcoupon] = useState({
        code : '',
        type : '',
        discountPercentage : null,
        discountAmount : null,
        usage : null,
        Edate : null,
        Etime : null
    })
    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            Object.entries(DB?.coupons || {}).forEach(([key, each]) => {
                const ExP = new Date(`${each.E_Date}T${each.E_Time}`);
                const remaining = ExP - now;
                if (remaining <= 0) {
                    DelGNots(key).then(()=>{
                        DeleteCoupon(key);
                    })
                    return;
                }
                setstateTime(prev => ({...prev, [key]: remaining}));
            });
        }, 1000);
        return () => clearInterval(interval);
    }, [DB?.coupons]);

    return ( 
        <>
        <div className="A-coupon">
            <div className="dash-head">
                <div className="dash-head-left">
                    <span className="dash-big">Manage Coupons</span>
                    <span className="dash-mini">Give users opportunities with a coupon code</span>
                </div>
            </div>
            {DB.coupons && Object.entries(DB?.coupons).map(([key, each]) => {
                return (
                    <div className="coupon-con" key={key}>
                        <div className="each-coupon">
                            <div className="e-c-head-con">
                                <p className="e-coupon-head">
                                    <IoTicket size={12} /> Coupon-{key.toUpperCase()}
                                </p>
                                <FiTrash2 size={12} style={{color : 'crimson'}} onClick={() => {DelGNots(key).then(() => {DeleteCoupon(key)})}}/>
                            </div>
                            <div className="e-coupon-body">
                                <p className="time-out">
                                    {stateTime[key] != null
                                        ? `${String(Math.floor(stateTime[key] / 3600000)).padStart(2, '0')}:${String(Math.floor((stateTime[key] % 3600000) / 60000)).padStart(2, '0')}:${String(Math.floor((stateTime[key] % 60000) / 1000)).padStart(2, '0')}`
                                        : "00:00:00"}
                                </p>
                                <p className="mini">Coupon Type: <i>{each.type}</i></p>
                                <p className="mini">Created at: <i>{each.created_at}</i></p>
                                <p className="mini">Coupon ID: <i>{key.toUpperCase()}</i></p>
                                <p className="mini">Coupon Code: <i>{each.code}</i></p>
                            </div>
                        </div>
                    </div>
                )
            })}

            <div onClick={() => {setopenAdd(true)}} className="add-coupon-activity">
                <FiPlus size={28} />
            </div>

            {openAdd &&
                <div className="add-cops-con">
                    <div className="add-cops">
                        <p className="coupons-head" style={{display : 'flex', justifyContent : 'space-between'}}>
                            Add new coupons
                            <button onClick={() => {setopenAdd(false)}} style={{color : 'black', fontWeight : 'bolder', border : 'none', backgroundColor : 'transparent'}}>X</button>
                        </p>

                        <div className="input-code">
                            <input
                                maxLength={40}
                                minLength={20}
                                value={newcoupon.code}
                                placeholder="Coupon code"
                                type="text"
                                onChange={(e) => {setnewcoupon(prev => ({...prev, code : e.target.value}))}}
                            />

                            <button onClick={() => {
                                setnewcoupon(prev => ({
                                    ...prev,
                                    code : Array.from(
                                        { length: 40 },
                                        () => chars[Math.floor(Math.random() * chars.length)]
                                    ).join("")
                                }));
                            }}>
                                Generate radom code
                            </button>

                            <select
                                value={newcoupon.type}
                                onChange={(e) => {setnewcoupon(prev => ({...prev, type : e.target.value}))}}
                                style={{color : 'rgb(0, 0, 0, .6)'}}
                            >
                                <option value="" disabled>Select Type</option>
                                <option value="Price Discount">Price Discount</option>
                                <option value="Romove from Price">Romove from Price</option>
                                <option value="Free Delivery">Free Delivery</option>
                            </select>

                            {newcoupon.type == "Price Discount" &&
                                <div className="type-end-inp">
                                    <label>Price Discount<strong style={{color : '#c43400'}}>(%)</strong></label>
                                    <input
                                        value={newcoupon.discountPercentage}
                                        type="number"
                                        min={0}
                                        max={100}
                                        onChange={(e) => {setnewcoupon(prev => ({...prev, discountPercentage : e.target.value}))}}
                                    />
                                </div>
                            }

                            {newcoupon.type == "Romove from Price" &&
                                <div className="type-end-inp">
                                    <label>Reduction Amount</label>
                                    <input
                                        value={newcoupon.discountAmount}
                                        type="number"
                                        min={0}
                                        max={100}
                                        onChange={(e) => {setnewcoupon(prev => ({...prev, discountAmount : e.target.value}))}}
                                    />
                                </div>
                            }

                            <input
                                placeholder="Maximum Usage"
                                type="number"
                                min={0}
                                value={newcoupon.usage}
                                onChange={(e) => {setnewcoupon(prev => ({...prev, usage : e.target.value}))}}
                            />

                            <div className="type-end-inp">
                                <label>Expiring Date</label>
                                <input
                                    type="date"
                                    value={newcoupon.Edate}
                                    onChange={(e) => {setnewcoupon(prev => ({...prev, Edate : e.target.value}))}}
                                />

                                <label>Expiring Time</label>
                                <input
                                    type="time"
                                    value={newcoupon.Etime}
                                    onChange={(e) => {setnewcoupon(prev => ({...prev, Etime : e.target.value}))}}
                                />
                            </div>

                            {(
                                (newcoupon.code && newcoupon.type == "Price Discount" && newcoupon.discountPercentage && newcoupon.usage && newcoupon.Edate && newcoupon.Etime) ||
                                (newcoupon.code && newcoupon.type == "Romove from Price" && newcoupon.discountAmount && newcoupon.usage && newcoupon.Edate && newcoupon.Etime) ||
                                (newcoupon.code && newcoupon.type == "Free Delivery" && newcoupon.usage && newcoupon.Edate && newcoupon.Etime)
                            ) &&
                                <button
                                    style={{padding : '12px 0px', fontWeight : 'bold'}}
                                    onClick={() => {
                                        const now = new Date;
                                        const CID = Math.random().toString(36).slice(2, 12)
                                        const modifiedDate = now.toLocaleString('en-GB', {
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric',
                                            hour: 'numeric',
                                            minute: '2-digit',
                                            hour12: true
                                        });

                                        AppendCoupon(
                                            CID,
                                            newcoupon.type == "Price Discount"
                                                ? {
                                                    code : newcoupon.code,
                                                    type : newcoupon.type,
                                                    percentage : newcoupon.discountPercentage,
                                                    maxUser : newcoupon.usage,
                                                    E_Date : newcoupon.Edate,
                                                    E_Time : newcoupon.Etime,
                                                    created_at : modifiedDate
                                                }
                                                : newcoupon.type == "Romove from Price"
                                                ? {
                                                    code : newcoupon.code,
                                                    type : newcoupon.type,
                                                    amount : newcoupon.discountAmount,
                                                    maxUser : newcoupon.usage,
                                                    E_Date : newcoupon.Edate,
                                                    E_Time : newcoupon.Etime,
                                                    created_at : modifiedDate
                                                }
                                                : newcoupon.type == "Free Delivery"
                                                ? {
                                                    code : newcoupon.code,
                                                    type : newcoupon.type,
                                                    maxUser : newcoupon.usage,
                                                    E_Date : newcoupon.Edate,
                                                    E_Time : newcoupon.Etime,
                                                    created_at : modifiedDate
                                                }
                                                : null
                                        ).then(() => {AppendGNots({
                                            type : "coupon",
                                            message : "A new Coupon has been released",
                                            time : (`${newcoupon.Edate }T${newcoupon.Etime}`),
                                            code : newcoupon.code,
                                            coupon_token : CID,
                                        }, CID).then(()=> {setopenAdd(false) ;setnewcoupon({
                                            code : '',
                                            type : '',
                                            discountPercentage : null,
                                            discountAmount : null,
                                            usage : null,
                                            Edate : null,
                                            Etime : null
                                        })})})
                                    }}
                                >
                                    Push Coupon
                                </button>
                            }
                        </div>
                    </div>
                </div>
            }
        </div>
        </>
    );
}
 
export default Acoupons;