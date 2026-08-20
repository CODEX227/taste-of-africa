import { useEffect, useRef, useState } from "react";
import { FaArrowAltCircleRight, FaArrowRight, FaArrowUp, FaCamera, FaChevronRight, FaChevronUp, FaDotCircle, FaEdit, FaPen, FaPlus, FaRedo } from "react-icons/fa";
import { FiCamera, FiPenTool, FiRefreshCw, FiTrash2 } from "react-icons/fi";
import {
        BarChart,
        Bar,
        XAxis,
        YAxis,
        CartesianGrid,
        Tooltip,
        ResponsiveContainer,
        } from "recharts";
import { editFoodDetails, editfoodImg } from "../../../DATABASE/handleUser";
const Amenu = ({DB, AUTH}) => {
const data = [
    { name: "Amala and Ewedu", users: 40 },
    { name: "Pounded yam and Efo", users: 65 },
    { name: "Mar", users: 50 },
    { name: "Apr", users: 80 },
    { name: "May", users: 95 },
];
const [components, setComponents] = useState([]);

const [currentComponent, setCurrentComponent] = useState({
    componentName: "",
    editable: false,
    editability: {
        type: "",
        exchange: {},
        quantity: {}
    },
    priceChange: false
});

const [step, setStep] = useState("name");
const compRef = useRef()                
const imgref = useRef()               
const [fileUrl, setfileUrl] = useState('')
const [foodEinput, setfoodEinput]   = useState()   
const [typeO, settypeO] = useState('rice dishes')                 
const [statusO, setstatusO] = useState('in stock')  
const newfoodimg = useRef()
const [newmenuimg, setnewmenuimg] = useState('')
const [newpendingfood, setnewpendingfood] = useState({

})                         
const [openedmenu, setopenedmenu] = useState({                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
    onOpen : '',
    onSubOpen : ''
})  

useEffect(() => {
    if(newmenuimg){
        uploadImage(newmenuimg, '', 'Newfood').then(cloudsrc => {
            setnewpendingfood(prev => ({
                        ...prev,
                        imgsrc : cloudsrc
                    }))
                    console.log(cloudsrc)
        })
    }
},[newmenuimg])

     async function uploadImage(file, foodid, Uploadtype) {
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

            if(data.secure_url && Uploadtype == "foodEdit"){

                editfoodImg(foodid, {imgsrc: data.secure_url})
            }
            else if(data.secure_url && Uploadtype == "Newfood"){
                return data.secure_url
            }

            return data.secure_url;
        } catch (error) {
            console.log(error);
        }
}
    return ( 
        <>
        <div className="dash-head">
            <div className="dash-head-left">
                        <span className="dash-big">Manage Menu Items</span>
                        <span className="dash-mini">View and Edit menu items</span>
            </div>
           </div>
       <div className="barcon">
         <ResponsiveContainer width="100%" height={400}>
            <BarChart
                layout="vertical"
                data={data}
                width={500}
                height={300}
                barCategoryGap="25%"
                fill = "#c43000"
                >
                <XAxis  tick={{ fontSize: window.innerWidth < 600 ? 10 : 14 }} type="number" />
                <YAxis  tick={{ fontSize: window.innerWidth < 600 ? 10 : 14 }} type="category" dataKey="name" />
                <Tooltip />

                <Bar
                    dataKey="users"
                    barSize={60}
                    radius={[0, 8,8,0]}
                />
                </BarChart>
        </ResponsiveContainer>
       </div>

       <div className="menu-display">
        { Object.values(DB.food.foodlisting).map((each) => {
            return(
                <div className="each-food-items" key={each.foodid}>
                    <div className="efi-main-con">
                        <span className="efi-name">{each.name}</span>
                        <div className="efi-min-is">
                            <span className="efi-status" style={{backgroundColor :  each.status == "in stock" ? "rgba(0, 201, 0, 0.2)" : "rgba(139, 0, 0, 0.2)", color :  each.status == "in stock" ? "rgb(0, 78, 0)" : "rgba(139, 0, 0)"}}>{each.status}</span>
                            {openedmenu.onOpen == each.foodid && <FaChevronUp size={12} style={{color : 'rgb(0, 0, 0, .7)'}} onClick={() => {setopenedmenu([])}}/>}
                            <FiPenTool size={14} style={{color: 'rgb(0, 0, 0, .7)'}} onClick={(e) => {setopenedmenu(prev => ({...prev, onOpen : each.foodid, onSubOpen : '' }))}}/>
                            <FiTrash2 size={14}  style={{color: 'red'}}/>
                        </div>
                    </div>
                    {openedmenu.onOpen == each.foodid && <div className="management">
                        <div className="m-con">
                            <div className="m-details-left">
                            <div className="m-details">
                                <FaDotCircle size={10} color="#c43000"/>
                                <span className="m-name">{each.name}</span>
                            </div>
                            <button value = "name">
                                <FaPen size={10}  style={{color: '#333333', padding : '10px 10px', backgroundColor : 'rgb(0, 0, 0, .1)', borderRadius : '8px'}} onClick={(e) => {setopenedmenu(prev => ({...prev, onSubOpen : e.target.parentElement.value }))}}/>
                            </button>
                            </div>
                            <div className="m-details-left">
                                <div className="m-details">
                                <FaDotCircle size={10} color="#c43000"/>
                                <span className="m-name">{each.shrt.slice(0, 30)}...</span>
                            </div>
                            <button value= "short discription">
                                <FaPen size={10}  style={{color: '#333333', padding : '10px 10px', backgroundColor : 'rgb(0, 0, 0, .1)', borderRadius : '8px'}} onClick={(e) => {setopenedmenu(prev => ({...prev, onSubOpen : e.target.parentElement.value }))}}/>
                            </button>
                            </div>
                            <div className="m-details-left">
                                <div className="m-details">
                                <FaDotCircle size={10} color="#c43000"/>
                                <span className="m-name">{each.price}</span>
                            </div>
                            <button value= "Price">
                                <FaPen size={10} style={{color: '#333333', padding : '10px 10px', backgroundColor : 'rgb(0, 0, 0, .1)', borderRadius : '8px'}} onClick={(e) => {setopenedmenu(prev => ({...prev, onSubOpen : e.target.parentElement.value }))}}/>
                            </button>
                            </div>
                            <div className="m-details-left">
                                <div className="m-details">
                                <FaDotCircle size={10} color="#c43000"/>
                                <span className="m-name">{each.imgsrc.slice(0, 30)}...</span>
                            </div>
                            <button value= "Image Source">
                                <FaRedo size={10}  style={{color: '#333333', padding : '10px 10px', backgroundColor : 'rgb(0, 0, 0, .1)', borderRadius : '8px'}} onClick={(e) => {setopenedmenu(prev => ({...prev, onSubOpen : e.target.parentElement.value }))}}/>
                            </button>
                            </div>
                            <div className="m-details-left">
                                    <div className="m-details">
                                        <FaDotCircle size={10} color="#c43000"/>
                                        <span className="m-name">{each.type}</span>
                                    </div>
                                    <button value="type">
                                <FaPen size={10}  style={{color: '#333333', padding : '10px 10px', backgroundColor : 'rgb(0, 0, 0, .1)', borderRadius : '8px'}} onClick={(e) => {setopenedmenu(prev => ({...prev, onSubOpen : e.target.parentElement.value }))}}/>
                            </button>
                            </div>
                            <div className="m-details-left">
                                <div className="m-details">
                                    <FaDotCircle size={10} color="#c43000" />
                                    <span className="m-name" style={{color: each.status == "in stock" ? "green" : "red"}}>{each.status}</span>
                                </div>
                                <button value= "status">
                                    <FaRedo size={10}  style={{color: '#333333', padding : '10px 10px', backgroundColor : 'rgb(0, 0, 0, .1)', borderRadius : '8px'}} onClick={(e) => {setopenedmenu(prev => ({...prev, onSubOpen : e.target.parentElement.value }))}}/>
                                </button>
                            </div>
                                <div className="m-details-left">
                                        <div className="m-details">
                                            <FaDotCircle size={10} color="#c43000"/>
                                            <span className="m-name">components</span>
                                        </div>
                                        <button>
                                            <FaEdit  style={{color: '#333333', padding : '10px 10px', backgroundColor : 'rgb(0, 0, 0, .1)', borderRadius : '8px'}}/>
                                        </button>
                                </div>
                                <div className="m-edit-each">
                                {openedmenu.onSubOpen && openedmenu.onSubOpen == 'name' || openedmenu.onSubOpen == 'Price'  || openedmenu.onSubOpen == 'short discription' ? <div className="m-edit-main">
                                    <label style={{color : 'rgb(0,0,0,.7)', fontSize : 'clamp(8px, 1vw, 10px)'}}>Edit info : <span style={{color : 'black', fontSize : '10px', color : '#c43000', textTransform : 'capitalize'}}>{openedmenu.onSubOpen}</span></label>
                                    <input type="text" value={foodEinput} onChange={e => {setfoodEinput(e.target.value)}} placeholder= { openedmenu.onSubOpen == 'name' ? each.name : openedmenu.onSubOpen == 'Price' ? each.price : openedmenu.onSubOpen == 'short discription' ? each.shrt :null}/>
                                    <div className="mem-btns">
                                        <button style={{color : '#c43000', backgroundColor : 'transparent', border : '0.02px solid #c43000', borderRadius : '8px'}} onClick={() => {setopenedmenu({})}}>Cancel</button>
                                        <button onClick={() => {openedmenu.onSubOpen == "name" ? editFoodDetails(each.foodid, {name : foodEinput}) : openedmenu.onSubOpen == "Price" ? editFoodDetails(each.foodid, {price : foodEinput}) : openedmenu.onSubOpen == "short discription" ? editFoodDetails(each.foodid, {shrt : foodEinput})  : null ; if (typeO) {
                                                editFoodDetails(each.foodid, { type: typeO });
                                                setfoodEinput('');
                                            }}} style={{color : 'rgb(255, 255, 255, .7)', backgroundColor : '#c43000', border : '0.02px solid #c43000', borderRadius : '8px'}}>Apply Changes</button>
                                    </div>
                                </div> 
                                :  openedmenu.onSubOpen && openedmenu.onSubOpen == 'type' ? 
                                <div className="m-edit-main">
                                    <select value={typeO} onChange={(e) => {settypeO(e.target.value); console.log(e.target.value)}}>
                                        {  Object.values(DB.food.categories).filter(eachc => {return eachc != "all"}).map(eachC => {
                                            return (
                                                <option value={eachC}>{ eachC }</option>
                                            )
                                        })
                                        }
                                    </select>
                                    <div className="mem-btns">
                                        <button style={{color : '#c43000', backgroundColor : 'transparent', border : '0.02px solid #c43000', borderRadius : '8px'}} onClick={() => {setopenedmenu({})}}>Cancel</button>
                                        <button style={{color : 'rgb(255, 255, 255, .7)', backgroundColor : '#c43000', border : '0.02px solid #c43000', borderRadius : '8px'}} onClick={() => {
                                                if (typeO) {
                                                    editFoodDetails(each.foodid, { type: typeO });
                                                }
                                                }}>Apply Changes</button>
                                    </div>
                                </div>
                                :  openedmenu.onSubOpen && openedmenu.onSubOpen == 'status' ? 
                                   <div className="m-edit-main">
                                    <select value={statusO} onChange={(e) => {setstatusO(e.target.value); console.log(e.target.value)}}>
                                        <option value="in stock">In stock</option>
                                        <option value="out of stock">Out of stock</option>
                                    </select>
                                    <div className="mem-btns">
                                        <button style={{color : '#c43000', backgroundColor : 'transparent', border : '0.02px solid #c43000', borderRadius : '8px'}} onClick={() => {setopenedmenu({})}}>Cancel</button>
                                        <button style={{color : 'rgb(255, 255, 255, .7)', backgroundColor : '#c43000', border : '0.02px solid #c43000', borderRadius : '8px'}} onClick={() => {
                                                if (statusO) {
                                                    editFoodDetails(each.foodid, { status: statusO });
                                                }
                                                }}>Apply Changes</button>
                                    </div>
                                </div>
                                : openedmenu.onSubOpen && openedmenu.onSubOpen == 'Image Source' ? <div className="m-edit-main">
                                    <input type="file" style={{display : 'none'}} ref={imgref} onChange={(e) => {setfileUrl(e.target.files[0])}}/>
                                    <label style={{color : 'rgb(0,0,0,.7)', fontSize : 'clamp(8px, 1vw, 10px)'}}>Edit info : <span style={{color : 'black', fontSize : '10px', color : '#c43000', textTransform : 'capitalize'}}>{openedmenu.onSubOpen}</span></label>
                                    {!fileUrl && <div className="mem-btns">
                                        <button style={{color : '#c43000', backgroundColor : 'transparent', border : '0.02px solid #c43000', borderRadius : '8px'}} onClick={() => {setopenedmenu({})}}>Cancel</button>
                                        <button onClick={() => {
                                            imgref.current.click();
                                        }} style={{color : 'rgb(255, 255, 255, .7)', backgroundColor : '#c43000', border : '0.02px solid #c43000', borderRadius : '8px'}}>Select image</button>
                                    </div>}
                                    {fileUrl && <div className="mem-btns">
                                        <button style={{color : '#c43000', backgroundColor : 'transparent', border : '0.02px solid #c43000', borderRadius : '8px'}} onClick={() => {setopenedmenu({})}}>Cancel</button>
                                        <button onClick={() => {
                                            if(fileUrl){
                                                uploadImage(fileUrl, each.foodid, 'foodEdit').then(() => {
                                                    setfileUrl('')
                                                    setopenedmenu({})
                                                })
                                            }
                                        }} style={{color : 'rgb(255, 255, 255, .7)', backgroundColor : '#c43000', border : '0.02px solid #c43000', borderRadius : '8px'}}>Push to Cloud</button>
                                    </div>}
                                </div> : null}
                            </div>
                        </div>
                    </div>}
                </div>
            )
        })
        }

            <form className="m-edit-box">
                    <label style={{color : 'rgb(0,0,0,.7)', fontSize : 'clamp(10px, 1vw, 14px)'}}>Add New Item:</label>
                    <input required type="text" placeholder={'Item Name'} onChange={(e) => {setnewpendingfood(prev => ({
                        ...prev,
                        name : e.target.value
                    }))}}/>
                    <input required type="number" placeholder={'Item Price'} onChange={(e) => {setnewpendingfood(prev => ({
                        ...prev,
                        price : e.target.value
                    }))}}/>
                    <input required type="text" maxLength={100} placeholder={'Item Discription  (max : 40 words)'} onChange={(e) => {setnewpendingfood(prev => ({
                        ...prev,
                        shrt : e.target.value
                    }))}}/>
                    <div className="shrtL">
                        <p><span>{newpendingfood.shrt ?newpendingfood.shrt.length :  0}/</span>100</p>
                    </div>
                    <input required type="file" style={{display : 'none'}} onChange={(e) => {setnewmenuimg(e.target.files[0])}} ref={newfoodimg}/>
                    <div className="chooseimg-con" onClick={() => {newfoodimg.current.click()}}>
                        {newpendingfood.imgsrc ? <p>{newpendingfood.imgsrc.slice(0,30)}...</p> : 
                        <span>
                            <FaCamera size={20} />
                                upload image
                            <FaPlus size={12} />
                        </span>
                        }
                    </div>
                    <select style={{}} onChange={(e) => {setnewpendingfood(prev => ({
                        ...prev,
                        type : e.target.value
                    }))}}>
                        {  Object.values(DB.food.categories).filter(eachc => {return eachc != "all"}).map(eachC => {
                            return (
                                <option value={eachC}>{ eachC }</option>
                            )
                        })
                        }
                    </select>

                    <div className="food-component">
                        <span className="FC-head">Item Components <FaPlus size={12} className="FC-i" onClick={() => {compRef.current.innerHTML += 
                        ``
                            }}/></span>
                    </div>
                    {
                    <div ref={compRef}>
                        <div class="components">
                            <label>Component Name :</label>
                                <input type="text"/>
                            <label>Component Editability :</label>
                                <select value = "yes">
                                <option value = "yes">Yes</option>
                                <option value = "no">No</option>
                                </select>

                                <select value = "yes">
                                <option value = "main">Main</option>
                                <option value = "edit">Edit</option>
                                <option value = "quantity">Quantity</option>
                                </select>

                                <div className="exchanges">
                                    <div className="exchage-head"><span>Add Exchange components</span><FaPlus size={10} style={{color : '#c43000'}}/></div>
                                </div>
                    <div className="m-edit-btns" style={{marginTop : '20px'}}>
                        <button onClick={() => {console.log(newpendingfood)}} style={{color: '#fffefe', backgroundColor : '#c43000', border : '0.04px solid #c43000', borderRadius : '6px', padding : '8px 30px', fontSize : 'clamp(12px, 1vw, 14px)', height : 'fit-content', width : 'fit-content', display : 'flex', alignItems : 'center', gap : '15px' , fontWeight : 'bold', boxSizing : 'border-box'}}>Next<FaArrowRight size={12} style={{color : 'rgb(225, 225, 225, .9)'}}/></button>
                    </div>        
                    </div>
                    </div>
                    }

                    <div className="m-edit-btns" style={{marginTop : '20px'}}>
                        <button onClick={() => {console.log(newpendingfood)}} style={{color: '#fffefe', backgroundColor : '#c43000', border : '0.04px solid #c43000', borderRadius : '6px', padding : '10px 40px', fontSize : 'clamp(12px, 1vw, 14px)', height : 'fit-content', width : 'fit-content', display : 'flex', alignItems : 'center', gap : '15px' , fontWeight : 'bold', boxSizing : 'border-box'}}>Upload Item<FaArrowUp size={12} style={{color : 'rgb(225, 225, 225, .9)'}}/></button>
                    </div>
            </form>
       </div>
        </>
     );
}
 
export default Amenu;