import { useEffect, useState } from "react";
import { FiArrowRight, FiCheckCircle, FiLoader, FiXCircle } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AppendAdminOrder, clearcart, DeleteOngoingPends, FinalOrderResult } from "../../DATABASE/handleUser";

const CheckPay = ({information, info}) => {
    const [data, setdata] = useState({})
    const [searchParams] = useSearchParams();
    const [succsessful, setsuccsessful] = useState(false)
    const [failed, setfailed] = useState(false)
    const [loading, setloading] = useState(true)
    const navigate = useNavigate()
    const [orderid ,setorederid] = useState("")

    useEffect(() => {
       async function confirmPayment(){
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
             if(data.flutterwave.status == "success"){
                setloading(false)
                setsuccsessful(true)
                clearcart(info.uid)
                FinalOrderResult(info.uid, information.OngoingPends[info.uid], {
                    status: data.flutterwave.status,
                    total:data.flutterwave.data.amount,
                    transaction_id:data.flutterwave.data.id,
                    tx_ref: data.flutterwave.data.tx_ref,
                    currency:data.flutterwave.data.currency,
                    type : data.flutterwave.data.payment_type,
                    created_at : data.flutterwave.data.created_at
                })
                AppendAdminOrder(information.OngoingPends[info.uid], {
                    status: data.flutterwave.status,
                    total:data.flutterwave.data.amount,
                    transaction_id:data.flutterwave.data.id,
                    tx_ref: data.flutterwave.data.tx_ref,
                    currency:data.flutterwave.data.currency,
                    type : data.flutterwave.data.payment_type,
                    created_at : data.flutterwave.data.created_at,
                    user : info.uid,
                    items : information.orders[info.uid][information.OngoingPends[info.uid]].items,
                    orderStatus : 'orderded',
                })
                return
             }
             else{
                setloading(false)
                setfailed(true)
             }
            } 
            catch (err) {
                setfailed(false)
                setloading(false)
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
             {succsessful && <div className="sucsess-mes" style={{backgroundColor : 'rgb(245, 255, 245)'}}>
                <div className="successi-con">
                    <Link style={{color: 'black'}} to= "/cart"><FiArrowRight size={20}/></Link>
                </div>
                <div className="real-mes">
                    <FiCheckCircle size={70} style={{color: 'green'}} />
                    <span className="real-mes-txt">Payment Successful</span>
                    <span className="real-mes-mini">Thanks for your patronage, come again <span className="emoji">👏</span></span>
                </div>
                <Link to= "/Yorders">
                <button className="success-btn">Track order status</button></Link>
             </div>}
             
             {failed && <div className="sucsess-mes" style={{backgroundColor : 'rgb(252, 242, 242)'}}>
                <div className="real-mes">
                    <FiXCircle size={70} style={{color: 'red'}} />
                    <span className="real-mes-txt" style={{color: 'red'}}>Payment failed </span>
                </div>
                <Link>
                   <button className="success-btn" style={{backgroundColor: 'red', color: 'black'}}>Go back to Cart</button>
                </Link>
             </div>}
             {loading &&
                <FiLoader style={{animation : 'load 1s  infinite', color: 'rgb(255,255,255,.7'}} size={80} />
             }
          </div>
        </>
     );
}
 
export default CheckPay;