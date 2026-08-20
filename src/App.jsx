import './App.css'
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from 'react'
import { Route, Routes } from "react-router-dom"
import Signin from './signin'
import Signup from './signup'
import Homepage from './HOMEPAGE/homepage'
import Logerr from './MESSAGES/err'
import { auth } from '../DATABASE/handleUser'
import { onAuthStateChanged } from 'firebase/auth'
import Order from './MENU/menu'
import Nav from './Homepage/Nav'
import MainLayout from './LAYOUT/mainlayout'
import { IoInformation } from 'react-icons/io5'
import { getdata } from '../DATABASE/handleUser'
import Contact from './CONTACT/contact'
import Settings from './SETTINGS/settings'
import About from './ABOUT/about'
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
  const timeout = setTimeout(() => {
    console.log("Time out");
    setneterr(true)
  }, 15000);

  const unsubscribe = getdata(
    (data) => {
      clearTimeout(timeout); // Data arrived before 12 seconds
      setdb(data);
      setneterr(false)
    },
    (error) => {
      clearTimeout(timeout); // Stop the timeout if an error occurs
      console.log(error.code);
      console.log(error.message);
    }
  );

  return () => {
    clearTimeout(timeout);
    unsubscribe();
  };
}, []);


useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    setuserDetails(user)
  })
}, [userDetails]);





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
