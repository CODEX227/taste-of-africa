import img5 from '../assets/img5.png'
import { FaUtensils, FaLeaf, FaAward } from "react-icons/fa";

const Abt = () => {
    return ( 
        <>
        <div className="abt">
            <div className="abt2">
                <div className="left-abt-img">
                <img src={img5} alt="" />
            </div>
            <div className="real-abt">
                <p className="abt-head">ABOUT US</p>
                <p className="head2">CELEBRATING AFRICA CULTURE THROUGH FOOD</p>
                <p className="abt-text">At Taste of Africa, we bring you an authentic culinary journey accross the continent. Our dishes are inspired by tradition, crated with the freshest ingredients and a passion for sharing Africa's rich heritage</p>
                <div className="abt-more">
                    <div className="abt-more-each">
                        <FaLeaf size={20} className='icon-ss'/>
                        <p className='first-mini'>Authentic Ingredent</p>
                        <p className="sec-mini">We use fresh, high-quality ingredient and traditional spices</p>
                    </div>
                    <div className="abt-more-each">
                        <FaUtensils size={20} className='diff icon-ss'/>
                        <p className='first-mini'>traditional recipe</p>
                        <p className="sec-mini">We use fresh, high-quality ingredient and traditional spices</p>
                    </div>
                    <div className="abt-more-each">
                        <FaAward size={20} className='icon-ss'/>
                        <p className='first-mini'>rich culture</p>
                        <p className="sec-mini">We use fresh, high-quality ingredient and traditional spices</p>
                    </div>
                </div>
            </div>
            </div>
        </div>
        </>
     );
}
 
export default Abt;