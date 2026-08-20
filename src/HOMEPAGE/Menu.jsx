import food1 from '../assets/food1.png'
import food2 from '../assets/food2.png'

const Menu = () => {
    return ( 
    <>
    <div className="menu">
        <div className="main-menu">
            <p className="menu-head">our menu</p>
            <p className="menu-text">bold flavors. true culture.</p>
            <div className="menu-list">
                <div className="each-menu">
                    <div className="white-con">
                        <img src={food1} alt="" className="white" />
                    </div>
                    <p className="each-menu-text">peanut stew</p>
                    <p className="menu-ex">a rich and creamy stew packed with flavor</p>
                </div>
                <div className="each-menu">
                    <img src={food2} alt="" className="white" />
                    <p className="each-menu-text">peanut stew</p>
                    <p className="menu-ex">a rich and creamy stew packed with flavor</p>
                </div>
                <div className="each-menu">
                   <div className="white"></div>
                    <p className="each-menu-text">peanut stew</p>
                    <p className="menu-ex">a rich and creamy stew packed with flavor</p>
                </div>
                <div className="each-menu">
                    <div className="white"></div>
                    <p className="each-menu-text">peanut stew</p>
                    <p className="menu-ex">a rich and creamy stew packed with flavor</p>
                </div>
                <div className="each-menu">
                    <div className="white"></div>
                    <p className="each-menu-text">peanut stew</p>
                    <p className="menu-ex">a rich and creamy stew packed with flavor</p>
                </div>
                <div className="each-menu">
                    <div className="white"></div>
                    <p className="each-menu-text">peanut stew</p>
                    <p className="menu-ex">a rich and creamy stew packed with flavor</p>
                </div>
            </div>
            <div className="menu-btn-con"><button className="menu-btn">veiw full menu</button></div>
        </div>
    </div>
    </>
     );
}
 
export default Menu;