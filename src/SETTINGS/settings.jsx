import { IoLocationOutline, IoSettingsSharp } from 'react-icons/io5';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from "react-router";
import Foot from '../HOMEPAGE/foot';
import { FiMail,FiArrowLeft, FiCamera, FiSettings, FiUser, FiCalendar, FiCheck, FiClock, FiCreditCard, FiShield, FiShieldOff, FiAlertTriangle, FiBell, FiCommand, FiInfo, FiEdit, FiHexagon, FiAlertOctagon, FiOctagon } from "react-icons/fi";
import img from '../assets/prof.png'
import { FaArrowUp, FaBus, FaEnvelope, FaTruck } from 'react-icons/fa';
import { addProfile, delinformation, dissableAccount } from '../../DATABASE/handleUser';
import { useLocation } from 'react-router';

const Settings = ({information, info}) => {
 const [delInfo, setdelInfo] = useState({
    adress: information.users
    .delivery ? information.users
    .delivery.adress : '',
    phone : information.users
    .delivery ? information.users
    .delivery.phone : ''
 }) 
 const location = useLocation();
    useEffect(() => {
        if (location.hash) {
        const element = document.querySelector(location.hash);

        if (element) {
            element.scrollIntoView({
            behavior: "smooth",
            block : "center"
            });
        }
        }
    }, [location]);
async function dissableAccount(id) {
    const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/dissableAccount`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                uid: id
            })
        }
    );
    const data = await response.json();
    console.log(data);
}
    useEffect(() => {
    },[information, info])
            const navigate = useNavigate()
            const imgRef = useRef()


    async function uploadImage(file) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "web images");

        try {
            const response = await fetch(
            "https://api.cloudinary.com/v1_1/qnmxixxc/image/upload",
            {
                method: "POST",
                body: formData,
            }
            );

            const data = await response.json();

            console.log(data.secure_url); 

            return data.secure_url;
        } catch (error) {
            console.log(error);
        }
}

        async function addProf(file){
            if (!file) return;

        await uploadImage(file).then((src) => {
            if(src){
                addProfile(info.uid, {profileImgSrc: `${src}`})
            }
        })
        }
const [deleteMessage, setdeleteMessage] = useState(false)        
    return ( 
        <>
<div className='settings-con'>
                    <div className="settings-head">
                            <div className="head-left">
                                <IoSettingsSharp size={30} />
                                <div className="settings-txts">
                                        <span className="settings-txt1">Profile Settings</span>
                                        <span className='settings-txt2'>Manage your personal information and account peferences.</span>
                                </div>
                            </div>
                                    <button className='settings-back-btn' onClick={() => {navigate(-1)}}><FiArrowLeft size={12} style = {{color:'white'}}/>Back</button>
                    </div>
                    
                    <div className="all-settings-con">
                        <div className="prof-info-con">
                        <div className="top-con">
                            <FiOctagon size={30} />
                            <div className="settings-txtss">
                                        <span className="settings-txt11">Profile Information</span>
                                        <span className='settings-txt2'>Update your profile details and how others see you</span>
                                </div>
                        </div>
                                <div className="prof-info-main">
                                        <div className="prof-image" style={{backgroundImage : `url(${information.users
                                            .profile.profileImgSrc})`, border : '0.2px solid rgb(196, 52, 0, .8)'}}>
                                            <FiCamera  size = {15} className="prof-image-i" onClick={() => imgRef.current.click()}/>
                                            <input type="file" style ={{display : 'none'}} ref={imgRef} onChange={(e)=> addProf(e.target.files[0])}/>
                                        </div>
                                        <form className="profile-details-con">
                                             <div className="p-d-c"><label>Full Name:</label>
                                             <input type="text"/></div>
                                             <div className="p-d-c"><label>Username:</label>
                                             <input type="text" placeholder={information.users
                                                .name}/></div>
                                             <div className="p-d-c"><label>Email Address:</label>
                                             <input type="email" placeholder={information.users
                                                .email} /></div>
                                             <div className="p-d-c"><label>Phone:</label>
                                             <input type="tel" /></div>
                                             <textarea placeholder='Review'></textarea>
                                             <button className='make-changes'>Make Changes</button>
                                        </form>
                                </div>
                    </div>
                    <div className="prof-info-con">
                        <div className="top-con">
                            <FiCommand size={30} />
                            <div className="settings-txtss">
                            <span className="settings-txt11">Account Information</span>
                            <span className='settings-txt2'>Veiw your account information</span>
                        </div>
                        </div>
                        <div className="acc-details">
                            <div className="acc-titles">
                                <div className="title-con"><p className="acc-title-each"><FiUser size={14}/>Account Type</p><p className="acc-title-each acc-type">Customer</p></div>
                                <div className="title-con"><p className="acc-title-each"><FiCalendar size={14} />Member Since</p><p className="acc-title-each">January 12, 2025</p></div>
                                <div className="title-con"><p className="acc-title-each"><FiShield size={14} /> Account Status</p><p className="acc-title-each acc-type">Active</p></div>
                                <div className="title-con"><p className="acc-title-each"><FiClock size={14} />Last Login</p><p className="acc-title-each">July 4, 2026</p></div>
                                <div className="title-con"><p className="acc-title-each"><FiCreditCard size={14} />User-ID</p><p className="acc-title-each">{info.uid}</p></div>
                            </div>
                        </div>
                    </div>


                    <div className="prof-info-con" id='delivery'>
                        <div className="top-con">
                            <IoLocationOutline size={30} />
                        <div className="settings-txtss">
                            <span className="settings-txt11">Delivery Information</span>
                            <span className='settings-txt2'>Edit you delivery details</span>
                        </div>
                        </div>

                        <form className="profile-details-con" onSubmit={(e) => {
                                                            e.preventDefault();
                                                            delinformation(info.uid, delInfo)
                                                                }}>
                                             <div className="p-d-c"><label>Location:</label>
                                             <input type="text" value={delInfo.adress} onChange={e => {setdelInfo((prev) => ({...prev, adress : e.target.value}))}} placeholder={information.users
                                                .delivery ? information.users
                                                .delivery.adress : ''}/></div>
                                             <div className="p-d-c"><label>Phone Number:</label>
                                             <input type="tel" value={delInfo.phone} onChange={e => {setdelInfo((prev) => ({...prev, phone : e.target.value}))}} placeholder= {information.users
                                                .delivery && information.users
                                                .delivery.phone}/></div>
                                             <textarea placeholder='Describe More'></textarea>
                                             <button className='make-changes'>{information.users
                                             .delivery ? 'Edit Information' : 'Set Information'}</button>
                        </form>
                    </div>


                    <div className="prof-info-con">
                        <div className="top-con">
                            <FiBell size={30} />
                            <div className="settings-txtss">
                            <span className="settings-txt11">Notification Settings</span>
                            <span className='settings-txt2'>Set how you want to receive notifications</span>
                        </div>
                        </div>
                        <div className="acc-details">
                            <div className="acc-titles">
                                <div className="title-con"><p className="acc-title-each"><FiMail size={14}/>Email Notifications</p><input className='toggle' type="checkbox"/></div>
                                <div className="title-con"><p className="acc-title-each"><FaArrowUp size={14} />Promotion & Offer</p><input className='toggle' type="checkbox"/></div>
                                <div className="title-con"><p className="acc-title-each"><FaTruck size={14} /> Order Status Updates</p><input className='toggle' type="checkbox"/></div>
                                <div className="title-con"><p className="acc-title-each"><FaEnvelope size={14} />SMS Notification</p><input className='toggle' type="checkbox"/></div>
                            </div>
                        </div>
                    </div>

                    <div className="prof-info-con">
                        <div className="top-con">
                            <FiAlertOctagon size={30} />
                          <div className="settings-txtss">
                            <span className="settings-txt11">Authentication</span>
                            <span className='settings-txt2'>Manage your security details</span>
                          </div>
                        </div>
                       <form className="profile-details-con">
                                             <div className="p-d-c">
                                             <label>New Password:</label>
                                             <input type="password"/>
                                             </div>
                                             <div className="p-d-c">
                                             <label>Confirm Password:</label>
                                             <input type="password"/>
                                             </div>
                                             <button className='make-changes'>Change Password</button>
                        </form>
                       <form className="profile-details-con">
                                             <div className="p-d-c">
                                             <label>New Email:</label>
                                             <input type="password"/>
                                             </div>
                                             <button className='make-changes'>Change Email</button>
                        </form>
                    </div>

                    <div className="prof-info-con" style={{backgroundColor: 'rgb(255, 0, 0,.05)', height : "fit-content"}}>
                        <div className="top-con">
                            <FiAlertTriangle size={30}/>
                            <div className="settings-txtss">
                            <span className="settings-txt11 del-sep">Danger Zone</span>
                            <span className='settings-txt2'>Ireversible and Destructive action</span>
                        </div>
                        </div>
                        <div className="acc-details">
                            <button onClick={(() => {setdeleteMessage(true)})}  className="del-acc">Delete Account</button>
                        </div>
                    </div>
                    </div>

                    {deleteMessage && <div className="foodDerr-con">
                                <div className="foodDerr">
                                <span>Do you want to Disable this Account owned by <span style={{color : '#c43000'}}>{information.users
                                .name.toUpperCase()}</span></span>
                                <div className="fde-btns">
                                    <button onClick={() => {setdeleteMessage(false)}}>Cancel</button>
                                    <button style={{
                                        backgroundColor : '#c43000', 
                                        color : 'white'
                                        }} onClick={()=> {dissableAccount(info.uid).then(() => {setdeleteMessage(false)}).catch(e => {console.log(e)})}}>Disable</button>
                                </div>
                            </div>
                            </div>}
        </ div>
        </>
     );
}
 
export default Settings; 