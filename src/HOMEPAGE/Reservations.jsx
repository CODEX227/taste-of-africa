import { useEffect, useState } from "react";
import { addreservation } from "../../DATABASE/handleUser";
import Loader from "../LOADER/loader";

const Res = ({info, information}) => {
    const [name, setname] = useState(information.users[info.uid].name)
    const [phone, setphone] = useState()
    const [email, setemail] = useState(information.users[info.uid].email)
    const [date, setdate] = useState("")
    const [time, settime] = useState("")
    const [guests, setguests] = useState(1)
    const [req, setreq] = useState("")
    const [ready, setready] = useState(false)

 
    return ( 
        <>
         <Loader /> 
            <div className="res-con">
            <div className="res">
                <p className="res-head">RESERVATION</p>
                <p className="res-head2">BOOK YOUR TABLE</p>
                <p className="res-text">We would love to welcome you. Reserve your table and enjoy an unforgettable dining experience</p>
                <form name="reserve-form" className="res-form" onSubmit={e => {
                    e.preventDefault()
                    const reservationId = Math.random().toString(36).substring(2, 12);
                    const data = {
                        name: name,
                        phone: phone,
                        email: email,
                        date: date,
                        time: time,
                        guests: guests,
                        req: req,
                        uid: info.uid
                    }
                    addreservation(reservationId, data).then(() => {}).catch(e => {
                        console.log(e)
                    })
                }}>
                    <input value={name} onChange={e => {
                        setname(e.target.value)
                    }} type="text" placeholder="Full Name" required/>
                    <input value={phone} onChange={e => {
                        setphone(e.target.value)
                    }} type="tel" placeholder="Phone Number" required/>
                    <input value={email} onChange={e => {
                        setemail(e.target.value)
                    }} type="email" placeholder="Email Address" required/>
                    <input value={date} onChange={e => {
                        setdate(e.target.value)
                    }} type="date" placeholder="Date" required/>
                    <input value={time} onChange={e =>  {
                        settime(e.target.value)
                    }} type="time" placeholder="Time" required/>
                    <input value={guests} onChange={e => {
                        setguests(e.target.value)
                    }} type="number" placeholder="Number Of Guest" required/>
                    <textarea value={req}
                        onChange={(e) => setreq(e.target.value)} placeholder="Special request" className="text-area"></textarea>
                    <button className="res-btn">book now</button>
                </form>
            </div>
        </div> 
        </>
     );
}
 
export default Res;