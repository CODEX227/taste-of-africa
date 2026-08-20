import '../App.css'
import { useNavigate } from 'react-router';

const Hero = ({information}) => {
    const navigate = useNavigate()
    return ( 
        <>
        <div className="hero" style={{ backgroundImage : `linear-gradient(rgb(0, 0, 0, .5)), url(${information.web.images.homeBg})` }}>
                <div className="leftimg">
                    <img src={information.web.images.sideImg} alt="" />
                </div>
                <div className="botton">
                    <button onClick={() => {navigate('/order')}}>Order now</button>
                </div>
        </div>
        </>
     );
}
 
export default Hero;     