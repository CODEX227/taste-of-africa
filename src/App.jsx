import './App.css'
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from 'react'
import { Route, Routes } from "react-router-dom"
import Signin from './signin'
import Signup from './signup'
import Homepage from './HOMEPAGE/homepage'
import { auth, getdata, GetData_Customer } from '../DATABASE/handleUser'
import { onAuthStateChanged } from 'firebase/auth'
import Order from './MENU/menu'
import MainLayout from './LAYOUT/mainlayout'
import Contact from './CONTACT/contact'
import Settings from './SETTINGS/settings'
import Cart from './CART/cart'
import Alayout from './LAYOUT/adminlayout'
import Ahome from './ADMIN/adminHome'
import History from './HISTORY/History'
import Orders from './ORDER/YourOrders'
import CheckPay from './CART/CheckPayment'



function App() {
  const [userDetails, setuserDetails] = useState({})
  const [db, setdb] = useState({})
  const [neterr, setneterr] = useState(false)
  AOS.init({
    duration: 700,
    once: true,
    offset: 100
});
useEffect(() => {
    let timeout;
    let unsubscribe;

    if (userDetails && userDetails.uid) {
      console.log(userDetails)

        const user_Extract = userDetails.reloadUserInfo.customAttributes;
        const refined_user = JSON.parse(user_Extract);

        if (refined_user.user === "customer") {

            timeout = setTimeout(() => {
                console.log("Time out");
                setneterr(true);
            }, 15000);

            unsubscribe = GetData_Customer(
                (data) => {
                    clearTimeout(timeout);
                    setdb(data);
                    setneterr(false);
                },
                (error) => {
                    clearTimeout(timeout);
                    console.log(error.code);
                    console.log(error.message);
                },
                userDetails.uid
            );

        } else if (
            refined_user.user === "super_ADMIN" ||
            refined_user.user === "ADMIN"
        ) {

            timeout = setTimeout(() => {
                console.log("Time out");
                setneterr(true);
            }, 15000);

            unsubscribe = getdata(
                (data) => {
                    clearTimeout(timeout);
                    setdb(data);
                    setneterr(false);
                },
                (error) => {
                    clearTimeout(timeout);
                    console.log(error.code);
                    console.log(error.message);
                },
                userDetails.uid
            );
        }
    }

    return () => {
        if (timeout) clearTimeout(timeout);
        if (unsubscribe) unsubscribe();
    };
}, [userDetails]);
useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    setuserDetails(user)
  })
}, [userDetails]);


useEffect(() => {
  db && console.log(db)
}, [db])

useEffect(() => {
  userDetails && console.log("userDetails" ,userDetails)
}, [userDetails])

  return (
    <>
   <Routes>
      <Route path='/' element = { <Signin db = {db}/>}/>
      <Route path='/enter' element = { <Signup />}/> 
      <Route path = '/settings' exact element = {Object.keys(db).length > 0 && userDetails !== null ? <Settings info = {userDetails}  information = { db } /> : ''} />
            <Route element = { <MainLayout neterr = {neterr} info = {userDetails}  information = { db }/> }>
                  <Route path='/cart' exact element = {<Cart info = {userDetails} information = {db}/>} />
                  <Route path='/homepage' exact element =  {<Homepage info = { userDetails } information={db}/>} />
                  <Route path='/order' exact element = {<Order info = { userDetails} information = { db }/>}  />
                  <Route path='/contact' exact element = {<Contact info = {userDetails} information = {db} />} />
                  <Route path='/history' exact element = {<History info = {userDetails}  information = {db} />} />
                  <Route path='/Yorders' exact element = {<Orders info = {userDetails}  information = {db}/>} />
                  <Route path = "/payment-success" element = {<CheckPay info = {userDetails} information = {db} />} />
           </Route>
           <Route element = {<Alayout neterr = {neterr} info = {userDetails}  information = { db }/> }>
              <Route path = '/admin-dashboard/*' exact element = {<Ahome AUTH = {userDetails}  DB = { db } />} />
           </Route>
    </Routes>
    </>
  )
}

export default App
