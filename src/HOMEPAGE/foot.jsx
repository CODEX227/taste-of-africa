import { FaFacebook, FaInstagram, FaTiktok,  } from "react-icons/fa";
import { IoCallOutline, IoMailOutline, IoLocationOutline } from "react-icons/io5";


const Foot = ({information}) => {
    return (
         <>
    <div className="foot-con">
        <div className="foot">
            <div className="foot3 ll">
                <img src={information.web.images.navImg} alt="" className="foot-logo" />
                <p className="foot-logo-txt">Experience the Taste of Africa and Thanks fot choosind us</p>
            </div>
            <div className="foot1 ll">
                <p className="foot-head">follow us</p>
                <div className="foot-is">
                    <div className="foot-is-con">
                        <FaFacebook size={16} className="socials"/>
                        <p>Facebook</p>
                    </div>
                    <div className="foot-is-con">
                        <FaInstagram size={16} className="socials"/>
                        <p>Instagram</p>
                    </div>
                    <div className="foot-is-con">
                        <FaTiktok size={16} className="socials"/>
                        <p>Tiktok</p>
                    </div>
                </div>
            </div>
            <div className="foot2 ll">
                <p className="foot-head">contact us</p>
                <div className="foot-info-con">
                    <div className="foot-info">
                        <IoCallOutline className="info-i"/>
                        <p>+234 8163110741</p>
                    </div>
                    <div className="foot-info">
                        <IoMailOutline className="info-i"/>
                        <p>ibukunoladipo@gmail.com</p>
                    </div>
                    <div className="foot-info">
                        <IoLocationOutline className="info-i"/>
                        <p>123 samanda, mokola road, TY 14321</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </> 
            );
}
 
export default Foot;