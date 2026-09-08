import { FiShoppingCart, FiMap, FiCreditCard, FiCheck, FiTrash, FiTrash2, FiTruck, FiHeadphones, FiLock, FiEdit2, FiEdit, FiEdit3, FiDollarSign, FiArrowRight, FiLoader, FiCheckCircle } from "react-icons/fi";
import { IoLocationOutline } from "react-icons/io5";
import { AddAppends, addorder, clearcart, dec, inc, OngoingPends, removecart, UpdateDcount, UsedCoupons } from "../../DATABASE/handleUser";
import { MdDeliveryDining, MdFactCheck } from "react-icons/md";
import { useEffect, useState } from "react";
import Logerr from "../MESSAGES/err";
import { FaCheckCircle, FaCheckDouble, FaCreditCard, FaHeadphones, FaLocationArrow, FaLock, FaMoneyBill, FaTruckMoving } from "react-icons/fa";

const Cart = ({information, info}) => {
    useEffect(() => {
        information.cart && information.cart
         && Object.values(information.cart
            
        ).map(each => {
            if(information.food.foodlisting[each.foodid].status == "out of stock" || information.food.foodlisting[each.foodid].disabled == true){
                removecart(info.uid, each.cartid)
            }
        })
    }, [information])
    const [fooderr, setfooderr] = useState(false)
    const [delTrue, setdelTrue] = useState(true)
    const [loadingpaymentmethod, setloadingpaymentmethod] = useState(false)
    const [showerr, setshowerr] = useState(false)
    const [DelMethod, setDelMethod] = useState('delivery')
    const [payerr, setpayerr] = useState(false)
    const [coup, setcoup] = useState('')
    const [CID, setCID] = useState('')
    const [CID_TYPES, setCID_TYPES] = useState({
        FD : null ,
        PD : null,
        AD : null
    })
useEffect(() => {
    const handlePageShow = () => {
        setloadingpaymentmethod(false);
    };
    window.addEventListener("pageshow", handlePageShow);
    return () => {
        window.removeEventListener("pageshow", handlePageShow);
    };
}, []);
           async function Payshit() {
               try {
                    const response = await fetch(
                        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/flutterwave`,
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                amount: information.cart && information.cart
                                 ? (delTrue ? 750 : 0) + Object.values(information.cart
                                    
                                ).reduce((sum, each) => {return sum + information.food.foodlisting[each.foodid].price * each.quantity} ,0) + Math.round(1 / 100 * Object.values(information.cart
                                    
                                ).reduce((sum, each) => {return sum + information.food.foodlisting[each.foodid].price * each.quantity} ,0)) : '',
                                email: information.users
                                .email,
                                phone: information.users
                                .delivery.phone,
                                name: information.users
                                .name,
                                tx_ref: `TX-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`,
                            }),
                        }
                    );

                    const data = await response.json();

                    if (data.status === "success") {
                        window.location.href = data.data.link;
                    } else {
                        setloadingpaymentmethod(false)
                        console.log(data);
                    }
                } catch(err){
                    setpayerr(!payerr)
                    setloadingpaymentmethod(false)
                }
           }



    const [editable, seteditable] = useState({
        
    })

    return ( 
        <div className="cart-page">
            {showerr && <Logerr err = "Location not found" message= "please fill or edit your location information in the delivery information" goto = "/settings#delivery" linktext= "edit" />}
            {editable.status ? 
                    <div className="editable-con" onClick={(e) => {if(e.target.className == 'editable-con'){seteditable({})}}}>
                        <div className="editable">
                        <span className="edits-tt">Edit food</span>
                        <span className="edits-ttt">Kindly re-select from scratch</span>
                        {editable && <div className="editable-food-con">
                            {
                               Object.values(information.food.foodlisting[editable.foodid]?.categories ? information.food.foodlisting[editable.foodid].categories : []).map((each, index) => {
                                return (
                                    <div className="go-for" key={index}>
                                        <span className={each.editability ? 'go-for-txt go-rll' : 'go-for-txt go-fkk'}>{each.name}</span>
                                        {
                                            each.type == 'main' ?
                                             <select  onChange={(e) => {AddAppends(info.uid, editable.cartid, {selected : e.target.value}, each.name)}}>
                                                {Object.values(each.exchange.to).map((eachOp, index) => {
                                                    return(
                                                         <option className="opt">{eachOp.name}</option>
                                                    )
                                                })}
                                             </select> 
                                            : each.type == 'edit' ? 
                                               <input type="checkbox" onChange={(e) => {AddAppends(info.uid, editable.cartid, {selected : e.target.checked}, each.name)}}/>
                                             : each.type == "quantity" ? 
                                                    <select onChange={(e) => {AddAppends(info.uid, editable.cartid, {selected : e.target.value}, each.name)}}>
                                                        {Array.from({ length: each.maxNum - each.minNum + 1 }, (_, i) => (
                                                            <option key={i} value={each.minNum + i}>
                                                            {each.minNum + i}
                                                            </option>
                                                        ))}
                                                    </select> 
                                              : null
                                        }
                                    </div>
                                )
                               })
                            }
                        </div>}
                        <button>Apply changes</button>
                    </div>
                    </div>
             : ''}
            <div className="order-status-con">
                <div className="status-con-each"><FiShoppingCart className={information.cart &&  information.cart
                     ? 'status-i' : 'status-i not-ready'} size = {12} />Cart</div>
                <div className= {information.cart &&  information.cart
                     ? 'line' : 'line not-ready'}></div>
                <div className="status-con-each"><IoLocationOutline className="status-i not-ready"  size = {12} />Summary</div>
                <div className="line not-ready"></div>
                <div className="status-con-each"><FiCreditCard className="status-i not-ready"  size={12} />Adress</div>
                <div className="line not-ready plane-line"></div>
                <div className="status-con-each"><FaMoneyBill className="status-i not-ready" style={{backgroundColor : 'green'}}  size={12} />Pay</div>
            </div>
            <div className="others-con">
                <div className="cart">
                <div className="cart-head-con">
                    <span className="cart-head-1">Your cart</span>
                    <span className="cart-head-2">Review you items and proceed to checkout</span>
                </div>
                <div className="whole-det-con">
                    <div className="food-cart">
                    {
                      information.cart &&  information.cart
                       ? (

                            <div>
                                { Object.values(information.cart
                                    
                                ).map((each, index) => {
                       return (
                       <>
                       <div className="each-food-cart" key={index}>
                            <div className="first-side" style={{position : 'relative'}}>
                                <img src={information.food.foodlisting[each.foodid].imgsrc} />
                                <div className="edit-food-con">
                                    <FiEdit3 size={17} className="edit-food" onClick={() => {seteditable({status: true, foodid: each.foodid, cartid : each.cartid})}}/>
                                    <span className="edit-show">Edit food</span>
                                </div>
                               { 
                                each.customized ? 
                                <span className="s-editted">EDITED</span> : ''
                                }
                            </div>
                            <div className="second-side">
                                        <div className="titles">
                                            <span className="food-title1">{information.food.foodlisting[each.foodid].name}</span>
                                            <span className="food-title2">{information.food.foodlisting[each.foodid].shrt}</span>
                                            <span className="food-title3">₦{information.food.foodlisting[each.foodid].price * each.quantity}</span>
                                        </div>
                                        <div className="food-cart-btns">
                                            <div className="inc-dec">
                                                <button onClick={() => {if(each.quantity <= 1){dec(info.uid, {quantity : each.quantity}, each.cartid)}else{dec(info.uid, {quantity : each.quantity - 1}, each.cartid)}}}>-</button>
                                                <span>{each.quantity}</span>
                                                <button onClick={() => {inc(info.uid, {quantity : each.quantity + 1}, each.cartid)}}>+</button>
                                            </div>
                                            <button onClick={() => {removecart(info.uid, each.cartid)}} className="remove-cart"><FiTrash2 size = {14} style = {{fontSize : '14px'}}/>Remove</button>
                                        </div>
                            </div>
                        </div>
                       </>
                        )
                    })}
                    <div className="clear-cart-btn"><button onClick={() => {clearcart(info.uid)}}>Clear cart</button></div>
                            </div>


                        ) : <p className="empt-mess">Cart is Empty</p>
                    }
                </div>

                <div className="all-sums">
                            {information.cart &&<div className="summary">
                            <div className="sum-head">Order Summary</div>
                            <div className="sum-det">
                                <span className="each-sum-det">Subtotal({Object.values(information.cart
                                     || {}).length} item) <span className="inner-sum">₦{information.cart ? Object.values(information.cart
                                     || {}).reduce((sum, each) => {return sum + information.food.foodlisting[each.foodid].price * each.quantity} ,0) : '0'}</span></span>
                                <span className="each-sum-det">Delivery Fee <span className="inner-sum">₦{ delTrue ? 750 : 0 }</span></span>
                                <span className="each-sum-det">Service Charge(1%) <span className="inner-sum">₦{information.cart ? Math.round(1 / 100 * Object.values(information.cart
                                     || {}).reduce((sum, each) => {return sum + information.food.foodlisting[each.foodid].price * each.quantity} ,0)) : '0'}</span></span>
                                <span className="each-sum-det-dif">Total <span className="inner-sum">₦{( delTrue ? 750 : 0 ) + Object.values(information.cart
                                     || {}).reduce((sum, each) => {return sum + information.food.foodlisting[each.foodid].price * each.quantity} ,0) + Math.round(1 / 100 * Object.values(information.cart
                                     || {}).reduce((sum, each) => {return sum + information.food.foodlisting[each.foodid].price * each.quantity} ,0))}</span></span>
                            </div>
                            <div className="free-delivery">
                                <div className="frre-d-head"><MdDeliveryDining size={28} className="free-i"/><span className="free-sec-con"> You are now <span className="free-digit">{information.users
                                .delCount}%</span> away fom <span className="free-digit">FREE DELIVERY!!</span></span></div>
                                <div className="count"><div className="inner-count" style={{width : `${information.users
                                    .delCount}%`}}></div><span className="side-count"><span style={{color : "rgb(0, 98, 23)"}}>{information.users
                                .delCount}</span>/100</span></div>
                                <button className="dcout" onClick={()=> {console.log("hmnnnnnn")}}  disabled = {information.users
                                    .delCount < 100 ? 'true' : 'false'} style={{opacity : information.users
                                    .delCount < 100 ? "0.4" : "1", textDecoration : information.users
                                    .delCount < 100 ? "line-through" : "none"}}>Use Now</button>
                            </div>
                        </div>}

                        <div className="summary">
                            <div className="sum-head">Why order from us?</div>
                            <div className="sum-det">
                                <span className="cart-trust">
                                 <FaTruckMoving size = {20} className="card-trust-i"/> 
                                  <div className="inner-cart-trust">
                                    <span className="cart-trust-txt-1">Fast Delivery</span>
                                    <span className="cart-trust-txt-2">Get your food delivered in no time</span>
                                  </div>
                                </span>
                                <span className="cart-trust">
                                 <FaCheckCircle size = {20} className="card-trust-i"/> 
                                  <div className="inner-cart-trust">
                                    <span className="cart-trust-txt-1">Fresh & Tasty</span>
                                    <span className="cart-trust-txt-2">We prepare our meal with the freshiest ingredient</span>
                                  </div>
                                </span>
                                <span className="cart-trust">
                                 <FaLock size = {20} className="card-trust-i"/> 
                                  <div className="inner-cart-trust">
                                    <span className="cart-trust-txt-1">Secured Payment</span>
                                    <span className="cart-trust-txt-2">Your payment is secure and protected</span>
                                  </div>
                                </span>
                                <span className="cart-trust">
                                 <FaHeadphones size = {20} className="card-trust-i"/> 
                                  <div className="inner-cart-trust">
                                    <span className="cart-trust-txt-1">24/7 support</span>
                                    <span className="cart-trust-txt-2">We are here to attend to your need anytime</span>
                                  </div>
                                </span>
                            </div>
                        </div>
                        <div className="summary sum-coups">
                            <span className="sum-head" style={{color: 'black'}}>Have a Coupon Code?</span>
                            <div className="enter-promo" style={{paddingTop : '20px'}}>
                                <input placeholder="Coupon_token" value={coup} type="password" onChange={(e)=>{setcoup(e.target.value.trim())}}/>
                                <input placeholder="CID" value={CID} type="password" onChange={(e)=>{setCID(e.target.value.trim())}}/>
                                    <button onClick={() => {
                                    (information.coupons && information.coupons[CID] && information.coupons[CID].maxUser > 0)  ? (information.coupons[CID].type == "Free Delivery" ? UpdateDcount(info.uid, {delCount : 100}).then(()=>{UsedCoupons(info.uid, CID)}) : information.coupons[CID].type == "Price Discount" ? console.log("percentage") : null) :  information.coupons[CID].type == "Romove from Price" ? console.log('price remove'): null}}style={{textDecoration :coup && coup.length > 29 && CID ? "none" : 'line-through', opacity :coup && coup.length > 29 && CID ? "1" : '.4'

                                    }}>
                                    Use code</button>
                            </div>
                        </div>
                </div>
                </div>
            </div>
            </div>
                <div className="del-info">
                <div className="del-info-con">
                    <span className="del-info-head"><FaLocationArrow size = {20} />Delivery Info</span>
                    <span className="del-info-2">Delevery Address</span>
                    <span className="del-info-info">{!information.users
                    .delivery ? 'Not recognized' : information.users
                    .delivery  ? information.users
                    .delivery.adress : null}</span>
                    <button className="del-info-btn">Edit</button>
                </div>
                <div className="del-info-con">
                    <span className="del-info-head"><FaTruckMoving size = {20} />Delivery Option</span>
                    <span className="del-info-2 info-2-diff"><input type="radio" value="delivery" checked = {DelMethod === "delivery"} onChange={(e) => {setDelMethod(e.target.value); setdelTrue(true)}}/>Standard Delivery</span>
                    <span className="del-info-info info-2-diff"><input type="radio" value="pickup" checked = {DelMethod === "pickup"} onChange={(e) => {setDelMethod(e.target.value); setdelTrue(false)}}/>Pickup</span>
                </div>
                <div className="del-info-con">
                    <span className="del-info-head"><FaMoneyBill size = {20} />Delevery Fee</span>
                    <span className="del-info-3">₦{DelMethod == "delivery" ? 750 : DelMethod == "pickup" ? 0 : ''}</span>
                </div>
            </div>


            <div className="checkout">
                <span className="check-trust"><FiLock size = {14} />Your payment is secure</span>
                <button onClick={() => {
                    if(!information.cart
                        
                    ){
                        console.log('no food')
                        setfooderr(!fooderr)
                        return
                    }else if(!information.users
                        ?.delivery){
                        setshowerr(!showerr)
                        return
                    }
                    else if(information.users
                        .delivery && information.cart){
                        const orderid = Math.random().toString(36).slice(2, 12)
                        OngoingPends(info.uid, orderid)
                        addorder(info.uid, {
                            method : DelMethod,
                            status:'orderded',
                            transaction_id:null,
                            items:information.cart,
                            total:null,
                            location:information.users.delivery.adress,
                        }, orderid)
                        setloadingpaymentmethod(true)
                        Payshit()
                    }
                }}>{loadingpaymentmethod ? <FiLoader size={17} style={{animation : 'load 2.5s linear infinite '}}/> : 'Proceed to Checkout'} <FiArrowRight size = {14} /></button>
            </div>
            { fooderr && <Logerr err= "empty cart" message = "your cart is empty go to menu to add food" goto = "/order" linktext= "menu" /> }
            { payerr && <Logerr err= "Error" message = "Failed to commence payment"/> }
        </div>
     );
}
 
export default Cart;