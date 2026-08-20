import { useState, useEffect } from 'react';
import { FaStar, FaShoppingCart, FaRegHeart, FaHeart, FaChevronDown, FaBars, FaBell, FaHome, FaBook, FaPenFancy, FaCamera, FaChevronUp, FaLeaf  } from "react-icons/fa";
import { FiSettings, FiLogOut } from 'react-icons/fi'
import { IoCallOutline } from "react-icons/io5"
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { addcart, signout } from '../../DATABASE/handleUser';
import aml from '../assets/aml.png'
import jlf from '../assets/jlf.png'
import Yes from '../MESSAGES/yes';
import { IoFastFood } from 'react-icons/io5';
import { MdDeliveryDining } from "react-icons/md";
import Foot from '../HOMEPAGE/foot';

const Order = ({info, information}) => {
    const navigate = useNavigate()
    const [which, setwhich] = useState('all')
    const [searchval,setsearchval] = useState('')
    const [newdata,setnewdata] = useState([])
    const [sucmes, setsucmes] = useState()
    const [show, setshow] = useState(false)
    useEffect(() => {
        console.log(info,information)
    },[info,information])

     function callmes() {
        setshow(true)
        setTimeout(() => {
            setshow(false)
        },2000)
    }

    useEffect(() => {
        setnewdata(Object.values(information.food.foodlisting).filter(each => {
            if(searchval !== 'all'){
                return each.name.includes(searchval.trim().toLocaleLowerCase()) || each.type.includes(searchval.trim().toLocaleLowerCase())
            }else if(searchval == 'all'){
                setsearchval('')
            }
        }))

        console.log(newdata,Object.values(information.food.foodlisting))
    },[searchval])

    return ( 
    <>
    
        { Object.values(info).length !== 0 && Object.values(information).length !== 0 ? 
        <div className="order-con">

            <div className="order-hero" style={{backgroundImage : `url(https://res.cloudinary.com/qnmxixxc/image/upload/v1784152467/c8bnknhptu0kz6h9eyys.png)`}}>
               <img src="https://res.cloudinary.com/qnmxixxc/image/upload/v1784279184/r9qvj6fjojsvpngwjzcw.png" alt="" className="order-position" />
            </div>

            <div className="all-food">
              <div className="food-cat">
                {information.food.categories.map((each, index) => {
                   return <button onClick={() => {
                     setsearchval(each)
                     setwhich(each)
                   }} className= { which == each ? 'choosen-btn' : 'choose-btn' }key={index}>{each}</button>
                })}
              </div>
               <input type="text" placeholder='search a dish...' value={searchval} onChange={(e)=>{
                 setsearchval(e.target.value)
               }}/>
             </div>

             <div className="food-listing">
                {
                    (newdata).map((each, index) => {
                        let Wlist = false
                        return (
                            <div className="each-food" key={index}>
                            <div className="each-food-img" style={{backgroundImage : `url(${each.imgsrc})`}}><div className="rate"><p>{each.rating}<FaStar className='rate-i' size={9} /></p></div></div>
                        <div className="food-first-con">
                                <p className="food-name">{ each.name }</p>
                                <p className="food-jaara">{ each.shrt }</p>
                            <div className="food-sec-con">
                                <p className="food-price">₦{ each.price }</p>
                                <button onClick={() => {      
                                    const cartid = Math.random().toString(36).slice(2, 10);                             
                                    addcart(info.uid, {foodid : each.foodid, cartid : cartid, quantity: 1}, cartid)
                                    setsucmes('Added Successfully')
                                    callmes()
                                    }}><FaShoppingCart className='food-i' size={14} />Add to Cart</button>
                            </div>
                        </div>
                </div>
                        )
                    })
                }    
             </div>
             <div className="trust">
                <div className="trust-each">
                        <IoFastFood size={55} trust-i/>
                        <div className="trust-con">
                                <p className="trust-one">Authentic Recipe</p>
                                <p className="trust-two">Traditional African recipe made with love</p>
                        </div>
                </div>
                <div className="trust-each">
                    <FaLeaf  size={55} trust-i/>
                        <div className="trust-con">
                                <p className="trust-one">Authentic Recipe</p>
                                <p className="trust-two">Traditional African recipe made with love</p>
                        </div>
                </div>
                <div className="trust-each">
                    <MdDeliveryDining size={55} trust-i/>
                        <div className="trust-con">
                                <p className="trust-one">Authentic Recipe</p>
                                <p className="trust-two">Traditional African recipe made with love</p>
                        </div>
                </div>
             </div>
        </div>
         :null}
         <Foot information={information}/>
         {show && <Yes message = {sucmes} />}
    </>
     );
}
 
export default Order;