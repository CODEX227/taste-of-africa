import { IoCallOutline, IoLocationOutline, IoMailOutline } from "react-icons/io5";
import Foot from "../HOMEPAGE/foot";
import { FaRegClock, FaRegCopy, FaTiktok, FaWhatsapp } from "react-icons/fa";
import { FiFacebook, FiInstagram, FiEdit } from "react-icons/fi";

const Contact = ({information}) => {
    const bg = 'https://res.cloudinary.com/qnmxixxc/image/upload/v1784501183/vxk99kgegjmsnb7qecio.png'
    return ( 
        <>
        <div className="contact-con" style={{backgroundImage : `linear-gradient(rgb(0, 0, 0, .5)), url(${bg})`}}>
               <img src="https://res.cloudinary.com/qnmxixxc/image/upload/v1784512856/qvjtcizntfyrxuh3h9k8.png" alt="contact us" className="con-img"/>
        </div>
        <div className="our">
             <div className="each"><p><FiEdit size = {10}/> Name:</p><span>Taste of Africa</span></div>
             <div className="each"><p><IoLocationOutline size = {10}/>Adress:</p><span>123 samanda, mokola road, TY 14321 <FaRegCopy style={{cursor: 'pointer'}} size = {12}/></span></div>
             <div className="each"><p><IoCallOutline size = {10}/>Phone</p><span>+234 xxx xxx xxxx <FaRegCopy style={{cursor: 'pointer'}} size = {12}/></span></div>
             <div className="each"><p><IoMailOutline size = {10}/>Email</p><span>codex@gmail.com <FaRegCopy style={{cursor: 'pointer'}} size = {12}/></span></div>
             <div className="each"><p><FaRegClock size = {10}/>Open hour</p><span>Mon - Sat : 9:00am - 8:00pm</span></div>
        </div>
        <div className="whats">
            <p>Have an issue ?</p>
            <button><FaWhatsapp size={16} className="whats-c"/>Chat with us</button>
        </div>
        <div className="contact-social">
            <button className="social f"><FiFacebook className="fi" size={16}/><span>Facebook</span></button>
            <button className="social i"><FiInstagram className="ii" size={16}/><span>Instagram</span></button>
            <button className="social t"><FaTiktok className="ti" size={16}/><span>Tiktok</span></button>
        </div>
        <Foot information={information}/>
        </>
     );
}
 
export default Contact;