import { useEffect, useRef, useState } from "react";
import { FiArrowRight, FiCheckCircle, FiLoader, FiXCircle } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AppendAdminOrder, clearcart, DeleteOngoingPends, FinalOrderResult, pushNotification } from "../../DATABASE/handleUser";

const CheckPay = ({information, info}) => {
    const [data, setdata] = useState({})
    const [searchParams] = useSearchParams();
    const [capS, setcapS] = useState("")
    const navigate = useNavigate()
    const [orderid ,setorederid] = useState("")
    const [loading, setloading] = useState(true)
    const paymentChecked = useRef(false);

    useEffect(() => {
       async function confirmPayment(){
        if (paymentChecked.current) return;
        paymentChecked.current = true;
            const status = searchParams.get("status");
            const tx_ref = searchParams.get("tx_ref");
            const transaction_id = searchParams.get("transaction_id");

            try{
                const response = await fetch(
                `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/verify-payments`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                         apikey: import.meta.env.VITE_SUPABASE_ANON_KEY,
                    },
                    body: JSON.stringify({
                        transaction_id,
                        tx_ref,
                    }),
                }
            );

            const data = await response.json();
            console.log(data)
            if(data){
                setdata(data)
            }
             if(data.flutterwave?.status == "success"){
                setloading(false)
                setcapS('successful')
                clearcart(info.uid)
                FinalOrderResult(info.uid, information.OngoingPends, {
                    payment_status: data.flutterwave.status,
                    status : "orderded",
                    total:data.flutterwave.data.amount,
                    transaction_id:data.flutterwave.data.id,
                    tx_ref: data.flutterwave.data.tx_ref,
                    currency:data.flutterwave.data.currency,
                    type : data.flutterwave.data.payment_type,
                    created_at : data.flutterwave.data.created_at,
                })
                AppendAdminOrder(information.OngoingPends, {
                    status: data.flutterwave.status,
                    total:data.flutterwave.data.amount,
                    transaction_id:data.flutterwave.data.id,
                    tx_ref: data.flutterwave.data.tx_ref,
                    currency:data.flutterwave.data.currency,
                    type : data.flutterwave.data.payment_type,
                    created_at : data.flutterwave.data.created_at,
                    user : info.uid,
                    items : information.orders[information.OngoingPends].items,
                    orderStatus : 'orderded',
                    ORDER_TYPE : information.orders[information.OngoingPends].method
                })
                pushNotification(info.uid, { 
                    type : "order",
                    message : `you have successfully place an order`,
                    time: data.flutterwave.data.created_at
                 }, Math.random().toString(36).slice(2, 10))
                return
             }
            //  else if(false){
            //     setloading(false)
            //     setcapS("failed")
            //  }
             else if(data.message == "Transaction ID is required."){
                setloading(false)
                setcapS("canceled")
             }
            } 
            catch (err) {
                setcapS("")
                console.log('transaction err', err)
            }
            finally{
                DeleteOngoingPends(info.uid)
            }
       }
       confirmPayment()
    },[])

    
    return ( 
        <>
          <div className="cp">
             {capS == "successful" && <div className="sucsess-mes" style={{backgroundColor : 'rgba(241, 255, 241, 0.8)'}}>
                <div className="successi-con">
                    <Link style={{color: 'black'}} to= "/cart"><FiArrowRight size={20}/></Link>
                </div>
                <div className="real-mes">
                    <FiCheckCircle size={70} style={{color: 'rgba(0, 119, 0, 0.8)'}} />
                    <span className="real-mes-txt" style={{color: 'rgba(0, 119, 0, 0.8)'}}>Payment Successful</span>
                    <span className="real-mes-mini">Thanks for your patronage, come again <span className="emoji">👏</span></span>
                </div>
                <Link to= "/Yorders">
                <button className="success-btn" style={{backgroundColor : 'rgba(0, 119, 0, 0.8)', color : 'white'}}>Track order status</button></Link>
             </div>}
             
             {capS == "failed" && <div className="sucsess-mes" style={{backgroundColor : 'rgba(255, 244, 244, 0.8)'}}>
                <div className="real-mes">
                    <FiXCircle size={70} style={{color: 'rgba(129, 0, 0, 0.8)'}} />
                    <span className="real-mes-txt" style={{color: 'rgba(129, 0, 0, 0.8)'}}>Payment failed </span>
                </div>
                <Link to= "/cart">
                   <button className="success-btn" style={{backgroundColor: 'rgba(129, 0, 0, 0.8)', color: 'white'}}>Go back to Cart</button>
                </Link>
             </div>}
             {capS == "canceled" && <div className="sucsess-mes" style={{backgroundColor : 'rgba(255, 251, 243, 0.8)'}}>
                <div className="real-mes">
                    <FiXCircle size={70} style={{color: 'rgba(144, 96, 0, 0.8)'}} />
                    <span className="real-mes-txt" style={{color: 'rgba(144, 96, 0, 0.8)'}}>Payment Canceled </span>
                </div>
                <Link to= "/cart">
                   <button className="success-btn" style={{backgroundColor: 'rgba(144, 96, 0, 0.8)', color: 'white'}}>Go back to Cart</button>
                </Link>
             </div>}
             {loading &&
                <FiLoader style={{animation : 'load 2.5s  infinite linear', color: 'rgb(255,255,255,.7'}} size={80} />
             }
          </div>
        </>
     );
}
 
export default CheckPay;