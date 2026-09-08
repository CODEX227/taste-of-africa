import { useEffect, useRef, useState } from "react";
import { FaArrowAltCircleRight, FaArrowDown, FaArrowRight, FaArrowUp, FaCamera, FaChevronRight, FaChevronUp, FaDotCircle, FaEdit, FaPen, FaPlus, FaRedo } from "react-icons/fa";
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
import  gi from "../../assets/g2.png"        
import { AddNewItem, disableFood, editFoodDetails, editfoodImg } from "../../../DATABASE/handleUser";
const Amenu = ({DB, AUTH}) => {
const data = [
  { name: "Rice", value: 120 },
  { name: "pounded yam and egusi soup", value: 60 },
  { name: "Garri", value: 100 },
  { name: "Yam", value: 150 },
  { name: "Garri", value: 100 },
  { name: "Rice", value: 160 },
  { name: "Beans", value: 82 },
  { name: "Garri", value: 140 },
  { name: "Yam", value: 150 },
  { name: "Rice", value: 120 },
  { name: "Beans", value: 60 },
  { name: "Garri", value: 100 },
  { name: "Yam", value: 150 },
  { name: "Garri", value: 100 },
  { name: "Rice", value: 160 },
  { name: "Beans", value: 82 },
  { name: "Garri", value: 140 },
  { name: "Yam", value: 150 },
  { name: "Garri", value: 180 }
];
const [ShowDisable, setShowDisable] = useState(false)
const [todisable, settodisable] = useState('')
const [RID, setRID] = useState("")
const [components, setComponents] = useState([]);
const [readyToGo, setreadyToGo] = useState({});
const [showcomponentBlock, setshowcomponentBlock] = useState(false)
const [revive, setrevive] = useState(false)
const [currentComponent, setCurrentComponent] = useState({
    componentName: "",
    editable: "",
    editability: {
        type: "",
        exchange: {
            yooo : "too"
        },
        quantity: {
            minNum: null,
            maxNum: null
        }
    },
    priceChange: ""
});
const compRef = useRef()                
const imgref = useRef()               
const [fileUrl, setfileUrl] = useState('')
const [foodEinput, setfoodEinput]   = useState()   
const [typeO, settypeO] = useState('rice dishes')                 
const [statusO, setstatusO] = useState('in stock')  
const newfoodimg = useRef()
const [newmenuimg, setnewmenuimg] = useState('')
const [newpendingfood, setnewpendingfood] = useState({})                         
const [openedmenu, setopenedmenu] = useState({                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
    onOpen : '',
    onSubOpen : ''
})  
useEffect(() => {
    if(newmenuimg){
        uploadImage(newmenuimg, '', 'Newfood').then(cloudsrc => {
            setnewmenuimg('')
            setnewpendingfood(prev => ({
                        ...prev,
                        imgsrc : cloudsrc,
                    }))
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

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;

  return (
    <div
      style={{
        padding: "12px 16px",
        borderRadius: "10px",
        boxShadow: "0 4px 15px rgba(0,0,0,0.15)",
        border: "1px solid #eee",
        backgroundImage : `url(${gi})`,
        backgroundPosition : 'center',
        backgroundSize : 'cover',
        height:'60px'
      }}
    >
      <p style={{ margin: 0, fontWeight: "600" }}>
        Item : <span style={{color : '#c43000'}}>{label}</span>
      </p>

      <p style={{ margin: "-10px 0px" }}>
        Orders: <span style={{color : '#c43000'}}> {payload[0].value}</span>
      </p>
    </div>
  );
};
    return ( 
        <>
        {ShowDisable && <div className="foodDerr-con">
            <div className="foodDerr">
            <span>Do you want to Disable this food</span>
            <div className="fde-btns">
                <button onClick={() => {setShowDisable(false)}}>Cancel</button>
                <button style={{
                    backgroundColor : '#c43000', 
                    color : 'white'
                    }} onClick={() => {disableFood(todisable, {disabled : true}).then(() => {settodisable('');setShowDisable(false)})}}>Disable</button>
            </div>
        </div>
        </div>}
        <div className="dash-head">
            <div className="dash-head-left">
                        <span className="dash-big">Manage Menu Items</span>
                        <span className="dash-mini">View and Edit menu items</span>
            </div>
           </div>
       <div className="barcon">
         <div style={{ height: "600px" , margin: "40px 0px", backgroundColor: 'white', borderRadius : '7px', padding : '20px 0px', boxSizing: 'border-box', border : "0.02px solid rgb(0,0,0,.06)", flex : "1 1 300px"}}>
               <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>

                    <XAxis dataKey="name" hide/>

                    <YAxis  />

                    <Tooltip content={<CustomTooltip />} /> 
                    <Bar
                    barSize={70}
                    dataKey="value"
                    radius={[6, 6, 0, 0]}
                    fill = "#c43000"
                    />
                </BarChart>
                </ResponsiveContainer>
            </div>
       </div>

       <div className="menu-display">
        {revive && <div className="foodDerr-con">
            <div className="foodDerr">
            <span>Do you want to Revive this food</span>
            <div className="fde-btns">
                <button onClick={() => {setrevive(false)}}>Cancel</button>
                <button style={{
                    backgroundColor : '#c43000', 
                    color : 'white'
                    }} onClick={() => {disableFood(RID, {disabled : false}).then(() => {setRID(''); setrevive(false)})}}>Revive Food</button>
            </div>
        </div>
        </div>}
        { Object.values(DB.food.foodlisting ? DB.food.foodlisting : []).map((each) => {
            return(
                <div className="each-food-items" key={each.foodid} style={{backgroundColor : each.disabled ? "rgb(160, 12, 12, .09)" : "rgb(0, 0, 0, .0)"}}>
                    <div className="efi-main-con">
                        <span className="efi-name" style={{textDecoration : each.disabled ? "line-through" : "none", opacity : each.disabled ? ".6" : "1"}}>{each.name}</span>
                        <div className="efi-min-is">
                            {!each.disabled && (<> <span className="efi-status" style={{
                            backgroundColor :  each.status == "in stock" ? "rgba(0, 201, 0, 0.2)" : "rgba(139, 0, 0, 0.2)", color :  each.status == "in stock" ? "rgb(0, 78, 0)" : "rgba(139, 0, 0)"}}>{each.status}</span>
                            {openedmenu.onOpen == each.foodid && <FaChevronUp size={12} style={{color : 'rgb(0, 0, 0, .7)'}} onClick={() => {setopenedmenu([])}}/>}
                           <FiPenTool size={14} style={{color: 'rgb(0, 0, 0, .7)'}} onClick={(e) => {setopenedmenu(prev => ({...prev, onOpen : each.foodid, onSubOpen : '' }))}}/>
                            <FiTrash2 size={14}  style={{color: 'red'}} onClick={()=>{(setShowDisable(true)); settodisable(each.foodid)}}/></>)}
                            { each.disabled && <button onClick={() => {setRID(each.foodid); setrevive(true)}} style={{border : "none", backgroundColor : '#c43000', padding : '8px 20px', color : 'white', borderRadius : "7px", fontSize : "clamp(8px, 10px, 12px)"}}>Revive food</button>}
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
                                <FaPen size={10}  style={{
                                    color: '#333333', 
                                    padding : '10px 10px', 
                                    backgroundColor : 'rgb(0, 0, 0, .1)', 
                                    borderRadius : '8px'
                                    }} onClick={(e) => {setopenedmenu(prev => ({...prev, onSubOpen : e.target.parentElement.value }))}}/>
                            </button>
                            </div>
                            <div className="m-details-left">
                                <div className="m-details">
                                <FaDotCircle size={10} color="#c43000"/>
                                <span className="m-name">{each.shrt.slice(0, 30)}...</span>
                            </div>
                            <button value= "short discription">
                                <FaPen size={10}  style={{
                                    color: '#333333', 
                                    padding : '10px 10px', 
                                    backgroundColor : 'rgb(0, 0, 0, .1)', 
                                    borderRadius : '8px'
                                    }} onClick={(e) => {setopenedmenu(prev => ({...prev, onSubOpen : e.target.parentElement.value }))}}/>
                            </button>
                            </div>
                            <div className="m-details-left">
                                <div className="m-details">
                                <FaDotCircle size={10} color="#c43000"/>
                                <span className="m-name">{each.price}</span>
                            </div>
                            <button value= "Price">
                                <FaPen size={10} style={{
                                    color: '#333333', 
                                    padding : '10px 10px', 
                                    backgroundColor : 'rgb(0, 0, 0, .1)', 
                                    borderRadius : '8px'
                                    }} onClick={(e) => {setopenedmenu(prev => ({...prev, onSubOpen : e.target.parentElement.value }))}}/>
                            </button>
                            </div>
                            <div className="m-details-left">
                                <div className="m-details">
                                <FaDotCircle size={10} color="#c43000"/>
                                <span className="m-name">{each.imgsrc.slice(0, 30)}...</span>
                            </div>
                            <button value= "Image Source">
                                <FaRedo size={10}  style={{
                                    color: '#333333', 
                                    padding : '10px 10px', 
                                    backgroundColor : 'rgb(0, 0, 0, .1)', 
                                    borderRadius : '8px'
                                    }} onClick={(e) => {setopenedmenu(prev => ({...prev, onSubOpen : e.target.parentElement.value }))}}/>
                            </button>
                            </div>
                            <div className="m-details-left">
                                    <div className="m-details">
                                        <FaDotCircle size={10} color="#c43000"/>
                                        <span className="m-name">{each.type}</span>
                                    </div>
                                    <button value="type">
                                <FaPen size={10}  style={{
                                    color: '#333333', 
                                    padding : '10px 10px', 
                                    backgroundColor : 'rgb(0, 0, 0, .1)', 
                                    borderRadius : '8px'
                                    }} onClick={(e) => {setopenedmenu(prev => ({...prev, onSubOpen : e.target.parentElement.value }))}}/>
                            </button>
                            </div>
                            <div className="m-details-left">
                                <div className="m-details">
                                    <FaDotCircle size={10} color="#c43000" />
                                    <span className="m-name" style={{color: each.status == "in stock" ? "green" : "red"}}>{each.status}</span>
                                </div>
                                <button value= "status">
                                    <FaRedo size={10}  style={{
                                        color: '#333333', 
                                        padding : '10px 10px', 
                                        backgroundColor : 'rgb(0, 0, 0, .1)', 
                                        borderRadius : '8px'
                                        }} onClick={(e) => {setopenedmenu(prev => ({...prev, onSubOpen : e.target.parentElement.value }))}}/>
                                </button>
                            </div>
                                <div className="m-details-left">
                                        <div className="m-details">
                                            <FaDotCircle size={10} color="#c43000"/>
                                            <span className="m-name">components</span>
                                        </div>
                                        <button>
                                            <FaEdit  style={{
                                                color: '#333333', 
                                                padding : '10px 10px', 
                                                backgroundColor : 'rgb(0, 0, 0, .1)', 
                                                borderRadius : '8px'
                                                }}/>
                                        </button>
                                </div>
                                <div className="m-edit-each">
                                {openedmenu.onSubOpen && openedmenu.onSubOpen == 'name' || openedmenu.onSubOpen == 'Price'  || openedmenu.onSubOpen == 'short discription' ? <div className="m-edit-main">
                                    <label style={{
                                        color : 'rgb(0,0,0,.7)',
                                        fontSize : 'clamp(8px, 1vw, 10px)'
                                        }}>Edit info : <span style={{
                                            color : 'black', 
                                            fontSize : '10px', 
                                            color : '#c43000', 
                                            textTransform : 'capitalize'
                                            }}>{openedmenu.onSubOpen}</span></label>
                                    <input type="text" value={foodEinput} onChange={e => {setfoodEinput(e.target.value)}} placeholder= { openedmenu.onSubOpen == 'name' ? each.name : openedmenu.onSubOpen == 'Price' ? each.price : openedmenu.onSubOpen == 'short discription' ? each.shrt :null}/>
                                    <div className="mem-btns">
                                        <button style={{
                                            color : '#c43000',
                                            backgroundColor : 'transparent',
                                            border : '0.02px solid #c43000',
                                            borderRadius : '8px'
                                            }} onClick={() => {setopenedmenu({})}}>Cancel</button>
                                        <button onClick={() => {openedmenu.onSubOpen == "name" ? editFoodDetails(each.foodid, {name : foodEinput}) : openedmenu.onSubOpen == "Price" ? editFoodDetails(each.foodid, {price : foodEinput}) : openedmenu.onSubOpen == "short discription" ? editFoodDetails(each.foodid, {shrt : foodEinput})  : null ; if (typeO) {
                                                editFoodDetails(each.foodid, { type: typeO });
                                                setfoodEinput('');
                                            }}} style={{
                                                color : 'rgb(255, 255, 255, .7)',
                                                backgroundColor : '#c43000', 
                                                border : '0.02px solid #c43000', 
                                                borderRadius : '8px'
                                                }}>Apply Changes</button>
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
                                        <button style={{
                                            color : '#c43000', 
                                            backgroundColor : 'transparent', 
                                            border : '0.02px solid #c43000', 
                                            borderRadius : '8px'
                                            }} onClick={() => {setopenedmenu({})}}>Cancel</button>
                                        <button style={{
                                            color : 'rgb(255, 255, 255, .7)', 
                                            backgroundColor : '#c43000', 
                                            border : '0.02px solid #c43000', 
                                            borderRadius : '8px'
                                            }} onClick={() => {
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
                                        <button style={{color : '#c43000', 
                                            backgroundColor : 'transparent', 
                                            border : '0.02px solid #c43000', 
                                            borderRadius : '8px'
                                            }} onClick={() => {
                                                setopenedmenu({})
                                                }}>Cancel</button>
                                        <button style={{color : 'rgb(255, 255, 255, .7)', 
                                        backgroundColor : '#c43000', 
                                        border : '0.02px solid #c43000', 
                                        borderRadius : '8px'
                                        }} onClick={() => {
                                                if (statusO) {
                                                    editFoodDetails(each.foodid, { status: statusO });
                                                }
                                                }}>Apply Changes</button>
                                    </div>
                                </div>
                                : openedmenu.onSubOpen && openedmenu.onSubOpen == 'Image Source' ? 
                                <div className="m-edit-main">
                                    <input type="file" style={{display : 'none'}} ref={imgref} onChange={(e) => {
                                        setfileUrl(e.target.files[0])
                                        }}/>
                                    <label style={{
                                        color : 'rgb(0,0,0,.7)',
                                        fontSize : 'clamp(8px, 1vw, 10px)'}}>Edit info : 
                                        <span style={{
                                         color : 'black',
                                         fontSize : '10px', 
                                         color : '#c43000', 
                                         textTransform : 'capitalize'
                                         }}>{openedmenu.onSubOpen}
                                         </span>
                                    </label>
                                    {!fileUrl && <div className="mem-btns">
                                        <button style={{color : '#c43000', backgroundColor : 'transparent', border : '0.02px solid #c43000', borderRadius : '8px'}} onClick={() => {setopenedmenu({})}}>Cancel</button>
                                        <button onClick={() => {
                                            imgref.current.click();
                                        }} style={{color : 'rgb(255, 255, 255, .7)', backgroundColor : '#c43000', border : '0.02px solid #c43000', borderRadius : '8px'}}>Select image</button>
                                    </div>}
                                    {
                                    fileUrl && 
                                    <div className="mem-btns">
                                        <button style={{
                                            color : '#c43000',
                                            backgroundColor : 'transparent',
                                            border : '0.02px solid #c43000',
                                            borderRadius : '8px'
                                            }} onClick={() => {
                                                setopenedmenu({})
                                            }}>Cancel</button>
                                        <button onClick={() => {
                                            if(fileUrl){
                                                uploadImage(fileUrl, each.foodid, 'foodEdit').then(() => {
                                                 setfileUrl('')
                                                 setopenedmenu({})
                                                })
                                            }
                                        }} style={{
                                            color : 'rgb(255, 255, 255, .7)',
                                            backgroundColor : '#c43000',
                                            border : '0.02px solid #c43000',
                                            borderRadius : '8px'
                                        }}>
                                        Push to Cloud</button>
                                    </div>}
                                </div>
                                 : null}
                            </div>
                        </div>
                    </div>}
                </div>
            )
        })
        }

            <section className="m-edit-box">
                    <label style={{
                        color : 'rgb(0,0,0,.7)',
                        fontSize : 'clamp(10px, 1vw, 14px)'
                        }}>
                            Add New Item:</label>
                    <input value={newpendingfood?.name ? newpendingfood?.name : ''} required type="text" placeholder={'Item Name'} onChange={(e) => {
                        setnewpendingfood(prev => ({
                        ...prev,
                        name : e.target.value
                    }))}}/>
                    <input value={newpendingfood?.price ? newpendingfood?.price : ''}  required type="number" placeholder={'Item Price'} onChange={(e) => {
                        setnewpendingfood(prev => ({
                        ...prev,
                        price : e.target.value
                    }))}}/>
                    <input  value={newpendingfood?.shrt ? newpendingfood?.shrt : ''}  required type="text" maxLength={100} placeholder={'Item Discription  (max : 40 words)'} onChange={(e) => {
                        setnewpendingfood(prev => ({
                        ...prev,
                        shrt : e.target.value
                    }))}}
                    />
                    <div className="shrtL">
                        <p>
                            <span>{newpendingfood.shrt ?newpendingfood.shrt.length :  0}/</span>
                            100
                        </p>
                    </div>
                    <input required type="file" style={{display : 'none'}} onChange={(e) => {setnewmenuimg(e.target.files[0])}} ref={newfoodimg}/>
                    <div className="chooseimg-con" onClick={() => {newfoodimg.current.click()}}>
                        {
                        newpendingfood.imgsrc ? <p>
                            {newpendingfood.imgsrc.slice(0,30)}...
                            </p> : 
                        <span>
                            <FaCamera size={20} />
                                upload image
                            <FaPlus size={12} />
                        </span>
                        }
                    </div>
                    <select  value={newpendingfood?.type ? newpendingfood?.type : ''}  onChange={(e) => {setnewpendingfood(prev => ({
                        ...prev,
                        type : e.target.value
                    }))}}>
                        <option value="" disabled>Select Type</option>
                        {  Object.values(DB.food.categories).filter(eachc => {return eachc != "all"}).map(eachC => {
                            return (<div>
                                <option value={eachC}>{ eachC }</option>
                                </div>
                            )
                        })
                        }
                    </select>

                    <div className="food-component">
                        <span className="FC-head">Item Components {!showcomponentBlock && <FaPlus size={12} className="FC-i" onClick={() => {
                            setshowcomponentBlock(!showcomponentBlock)
                        }}
                        />}</span>
                        {newpendingfood.categories ? Object.values(newpendingfood.categories).map((eachC, i) => {
                            return(
                                <span className="each-appended-comps"><FaArrowRight size={10} color="#c43100e2" />{ eachC.name}</span>
                            )
                        }) : null}
                    </div>
                    {
                showcomponentBlock &&
            <div>
                <section className="components">

        <div>
            <label>Component Name :</label>
            <input
                value={currentComponent.componentName}
                onChange={(e) => {
                    setCurrentComponent(prev => ({
                        ...prev,
                        componentName: e.target.value
                    }))
                }}/>
        </div>

        {currentComponent.componentName.trim() && <div>
            <label>Component Editability :</label>
            <select
                value={currentComponent.editable}
                onChange={(e) => {
                    const value = e.target.value

                    setCurrentComponent(prev => ({
                        ...prev,
                        editable: value,
                        editability: {
                            type: "",
                            exchange: [],
                            quantity: {
                                minNum: null,
                                maxNum: null
                            }
                        },
                        priceChange: {
                            change: "",
                            price: ""
                        }
                    }))
                }}>
                <option value="" disabled>Select</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
            </select>
        </div>}

        {currentComponent.editable === "no" && <div
                    className="m-edit-btns"
                    style={{marginTop: '20px'}}>
             <button
                        onClick={() => {
                            setnewpendingfood(prev => ({
                                ...prev,
                                categories : {
                                   ...prev.categories,
                                   [Math.random().toString(36).slice(2, 10)] : {
                                      name :  currentComponent.componentName,
                                      editability : false
                            }

                                }
                        }));
                            setCurrentComponent({
                            componentName: "",
                            editable: "",
                            editability: {
                                type: "",
                                exchange: {},
                                quantity: {
                                    minNum: null,
                                    maxNum: null
                                }
                            },
                            priceChange: ""
                        })
                         setshowcomponentBlock(false)
                        }}
                        style={{color: '#ffcdfefe',backgroundColor: '#c43000',border: '0.04px solid #c43000',borderRadius: '6px',padding: '7px 20px',fontSize: 'clamp(10px, 1vw, 12px)',height: 'fit-content',width: 'fit-content',display: 'flex',alignItems: 'center',gap: '15px',fontWeight: 'bold',boxSizing: 'border-box'
                        }}>
                        Push
                        <FaArrowUp
                            size={10}
                            style={{color: 'rgb(225, 225, 225, .9)'}}/>
                    </button>
                    </div>
                    }

        {currentComponent.editable === "yes" && <div>
            <label>Component Type :</label>
            <select
                value={currentComponent.editability.type}
                onChange={(e) => {
                    setCurrentComponent(prev => ({
                        ...prev,
                        editability: {
                            ...prev.editability,
                            type: e.target.value,
                            exchange: [],
                            quantity: {
                                minNum: null,
                                maxNum: null
                            }
                        },
                        priceChange: {
                            change: "",
                            price: ""
                        }
                    }))
                }}>
                <option value="" disabled>Select</option>
                <option value="main">Main</option>
                <option value="edit">Edit</option>
                <option value="quantity">Quantity</option>
            </select>
        </div>}

        {currentComponent.editable === "yes" &&
            currentComponent.editability.type === "main" && 
            <div className="main-edit">

            <div className="exchanges">

                <div className="exchage-head">
                    <span>Add Exchange Components</span>
                    <FaPlus
                        size={10}
                        style={{color: '#c43000', cursor: 'pointer'}}
                        onClick={() => {
                            setCurrentComponent(prev => ({
                                ...prev,
                                editability: {
                                    ...prev.editability,
                                    exchange: [
                                        ...prev.editability.exchange,
                                        {
                                            exchangeName: "",
                                            priceChange: {
                                                change: "",
                                                price: ""
                                            }
                                        }
                                    ]
                                }
                            }))
                        }}
                    />
                </div>

                {currentComponent.editability.exchange.map((each, index) => (
                    <div
                        key={index}
                        className="exchange-block"
                        style={{
                            border: '1px solid #ddd',
                            padding: '10px',
                            marginTop: '10px',
                            borderRadius: '6px'
                        }}
                    >

                        <div>
                            <label>Exchange Name :</label>

                            <input
                                value={each.exchangeName}
                                onChange={(e) => {
                                    const exchanges = [...currentComponent.editability.exchange]
                                    exchanges[index] = {
                                        ...exchanges[index],
                                        exchangeName: e.target.value
                                    }

                                    setCurrentComponent(prev => ({
                                        ...prev,
                                        editability: {
                                            ...prev.editability,
                                            exchange: exchanges
                                        }
                                    }))
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" && each.exchangeName.trim()) {
                                        e.preventDefault()
                                    }
                                }}
                            />
                        </div>

                        {each.exchangeName.trim() && 
                        <div>
                            <label>Price Change :</label>

                            <select
                                value={each.priceChange.change}
                                onChange={(e) => {
                                    const exchanges = [...currentComponent.editability.exchange]

                                    exchanges[index] = {
                                        ...exchanges[index],
                                        priceChange: {
                                            ...exchanges[index].priceChange,
                                            change: e.target.value,
                                            price: ""
                                        }
                                    }

                                    setCurrentComponent(prev => ({
                                        ...prev,
                                        editability: {
                                            ...prev.editability,
                                            exchange: exchanges
                                        }
                                    }))
                                }}
                            >

                                <option value="" disabled>Select</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </select>

                            {each.priceChange.change === "yes" && 
                            <input
                                type="number"
                                placeholder="Price"
                                value={each.priceChange.price}
                                onChange={(e) => {
                                    const exchanges = [...currentComponent.editability.exchange]

                                    exchanges[index] = {
                                        ...exchanges[index],
                                        priceChange: {
                                            ...exchanges[index].priceChange,
                                            price: e.target.value
                                        }
                                    }

                                    setCurrentComponent(prev => ({
                                        ...prev,
                                        editability: {
                                            ...prev.editability,
                                            exchange: exchanges
                                        }
                                    }))
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" && each.priceChange.price !== "") {
                                        e.preventDefault()
                                    }
                                }}
                            />}
                        </div>
                        }

                    </div>
                ))}

            </div>

            <div>
                <label>Price Change :</label>

                <select
                    value={currentComponent.priceChange.change}
                    onChange={(e) => {
                        setCurrentComponent(prev => ({
                            ...prev,
                            priceChange: {
                                change: e.target.value,
                                price: ""
                            }
                        }))
                    }}
                >
                    <option value="" disabled>Select</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                </select>

                {currentComponent.priceChange.change === "yes" && 
                <input
                    type="number"
                    placeholder="Price"
                    value={currentComponent.priceChange.price}
                    onChange={(e) => {
                        setCurrentComponent(prev => ({
                            ...prev,
                            priceChange: {
                                ...prev.priceChange,
                                price: e.target.value
                            }
                        }))
                    }}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && currentComponent.priceChange.price !== "") {
                            e.preventDefault()
                        }
                    }}
                />}
            </div>

            {currentComponent.priceChange.change &&
                (currentComponent.priceChange.change === "no" ||
                currentComponent.priceChange.price !== "") && <div
                    className="m-edit-btns"
                    style={{marginTop: '20px'}}
                >
                    <button
                        onClick={() => {
                             {
                            setnewpendingfood(prev => ({...prev, categories : {
                                   ...prev.categories,
                                [Math.random().toString(36).slice(2, 10)] : {
                                  name :  currentComponent.componentName,
                                  editability : true,
                                  type: 'main',
                                  priceChange : {
                                    status : currentComponent.priceChange.change == "yes" ? true : currentComponent.priceChange.change == "no" ? false : null,
                                    change : currentComponent.priceChange.price
                              },
                                  exchange : {
                                  name : currentComponent.componentName,
                                  to: Object.fromEntries(
                                  currentComponent.editability.exchange.map(each => [
                                    Math.random().toString(36).slice(2, 10),
                                    {
                                        name: each.exchangeName,
                                        priceChange: {
                                            status: each.priceChange.change == "yes" ? true : each.priceChange.change == "no" ? false : null,
                                            change: each.priceChange.price
                                        }
                                    }
                                ])
                            )
                              }
                            }
                               }}));
                            setCurrentComponent({
                            componentName: "",
                            editable: "",
                            editability: {
                                type: "",
                                exchange: {},
                                quantity: {
                                    minNum: null,
                                    maxNum: null
                                }
                            },
                            priceChange: {}
                        })
                         setshowcomponentBlock(false)
                        }
                        }}
                        style={{color: '#fffefe',backgroundColor: '#c43000',border: '0.04px solid #c43000',borderRadius: '6px',padding: '7px 20px',fontSize: 'clamp(10px, 1vw, 12px)',height: 'fit-content',width: 'fit-content',display: 'flex',alignItems: 'center',gap: '15px',fontWeight: 'bold',boxSizing: 'border-box'
                        }}
                    >
                        Push
                        <FaArrowUp
                            size={10}
                            style={{color: 'rgb(225, 225, 225, .9)'}}
                        />

                    </button>
                </div>}

        </div>}

        {currentComponent.editable === "yes" &&
            currentComponent.editability.type === "edit" && <div className="edit-edit">

            <div>
                <label>Price Change :</label>

                <select
                    value={currentComponent.priceChange.change}
                    onChange={(e) => {
                        setCurrentComponent(prev => ({
                            ...prev,
                            priceChange: {
                                change: e.target.value,
                                price: ""
                            }
                        }))
                    }}
                >
                    <option value="" disabled>Select</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                </select>

                {currentComponent.priceChange.change === "yes" && <input
                    type="number"
                    placeholder="Price"
                    value={currentComponent.priceChange.price}
                    onChange={(e) => {
                        setCurrentComponent(prev => ({
                            ...prev,
                            priceChange: {
                                ...prev.priceChange,
                                price: e.target.value
                            }
                        }))
                    }}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && currentComponent.priceChange.price !== "") {
                            e.preventDefault()
                        }
                    }}
                />}
            </div>


            {currentComponent.priceChange.change &&
                (currentComponent.priceChange.change === "no" ||
                currentComponent.priceChange.price !== "") && 
                <div
                    className="m-edit-btns"
                    style={{marginTop: '20px'}}>
                    <button
                        onClick={() => {
                            setnewpendingfood(prev => ({
                              ...prev, 
                              categories : {
                                ...prev.categories,
                                [Math.random().toString(36).slice(2, 10)] : {
                                name :  currentComponent.componentName,
                                editability : true,
                                type : 'edit',
                                priceChange: {
                                  status: currentComponent.priceChange.change == "yes" ? true : currentComponent.priceChange.change == "no" ? false : null,
                                  change: currentComponent.priceChange.price
                            }
                            }
                              }
                              }));
                            setCurrentComponent({
                            componentName: "",
                            editable: "",
                            editability: {
                                type: "",
                                exchange: {},
                                quantity: {
                                    minNum: null,
                                    maxNum: null
                                }
                            },
                            priceChange: {}
                        })
                         setshowcomponentBlock(false)
                        }}
                        style={{color: '#fffefe',backgroundColor: '#c43000',border: '0.04px solid #c43000',borderRadius: '6px',padding: '7px 20px',fontSize: 'clamp(10px, 1vw, 12px)',height: 'fit-content',width: 'fit-content',display: 'flex',alignItems: 'center',gap: '15px',fontWeight: 'bold',boxSizing: 'border-box'
                        }}
                    >

                        Push
                        <FaArrowUp
                            size={10}
                            style={{color: 'rgb(225, 225, 225, .9)'}}
                        />

                    </button>
                </div>}

        </div>}

        {currentComponent.editable === "yes" &&
            currentComponent.editability.type === "quantity" && 
            <div className="quantity-edit">

            <div className="exchage-head">
                <span>Quantity</span>
                <section>
                    <FaArrowUp size={10} style={{color: '#c43000'}}/>
                    <FaArrowDown size={10} style={{color: '#c43000'}}/>
                </section>
            </div>

            <input
                placeholder="Minimum Quantity"
                type="number"
                min="1"
                value={currentComponent.editability.quantity.minNum ?? ""}
                onChange={(e) => {
                    setCurrentComponent(prev => ({
                        ...prev,
                        editability: {
                            ...prev.editability,
                            quantity: {
                                ...prev.editability.quantity,
                                minNum: e.target.value
                            }
                        }
                    }))
                }}
                onKeyDown={(e) => {
                    if (e.key === "Enter" && currentComponent.editability.quantity.minNum) {
                        e.preventDefault()
                    }
                }}
            />

            {currentComponent.editability.quantity.minNum && <input
                placeholder="Maximum Quantity"
                type="number"
                min={currentComponent.editability.quantity.minNum}
                value={currentComponent.editability.quantity.maxNum ?? ""}
                onChange={(e) => {
                    setCurrentComponent(prev => ({
                        ...prev,
                        editability: {
                            ...prev.editability,
                            quantity: {
                                ...prev.editability.quantity,
                                maxNum: e.target.value
                            }
                        }
                    }))
                }}
                onKeyDown={(e) => {
                    if (e.key === "Enter" && currentComponent.editability.quantity.maxNum) {
                        e.preventDefault()
                    }
                }}
            />}

            {currentComponent.editability.quantity.minNum &&
                currentComponent.editability.quantity.maxNum && <div>

                <label>Price Change :</label>

                <select
                    value={currentComponent.priceChange.change}
                    onChange={(e) => {
                        setCurrentComponent(prev => ({
                            ...prev,
                            priceChange: {
                                change: e.target.value,
                                price: ""
                            }
                        }))
                    }}
                >
                    <option value="" disabled>Select</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                </select>

                {currentComponent.priceChange.change === "yes" && 
                <input
                    type="number"
                    placeholder="Price"
                    value={currentComponent.priceChange.price}
                    onChange={(e) => {
                        setCurrentComponent(prev => ({
                            ...prev,
                            priceChange: {
                                ...prev.priceChange,
                                price: e.target.value
                            }
                        }))
                    }}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && currentComponent.priceChange.price !== "") {
                            e.preventDefault()
                        }
                    }}
                />}

            </div>}

            {   currentComponent.editability.quantity.minNum &&
                currentComponent.editability.quantity.maxNum &&
                currentComponent.priceChange.change &&
                (currentComponent.priceChange.change === "no" ||
                currentComponent.priceChange.price !== "") && <div
                    className="m-edit-btns"
                    style={{marginTop: '20px'}}
                >
                    <button
                        onClick={() => {
                            setnewpendingfood(prev => ({
                              ...prev, 
                              categories : {
                              ...prev.categories,
                              [Math.random().toString(36).slice(2, 10)] : {
                              name :  currentComponent.componentName,
                              editability : true,
                              type : 'quantity',
                              maxNum : currentComponent.editability.quantity.maxNum,
                              minNum: currentComponent.editability.quantity.minNum,
                              priceChange: {
                                status: currentComponent.priceChange.change == "yes" ? true : currentComponent.priceChange.change == "no" ? false : null,
                                change: currentComponent.priceChange.price
                            }
                           }
                        }}
                    ));
                            setCurrentComponent({
                            componentName: "",
                            editable: "",
                            editability: {
                                type: "",
                                exchange: {},
                                quantity: {
                                    minNum: null,
                                    maxNum: null
                                }
                            },
                            priceChange: {}
                        })
                        setshowcomponentBlock(false)
                        }}
                        style={{
                            color: '#fffefe',
                            backgroundColor: '#c43000',
                            border: '0.04px solid #c43000',
                            borderRadius: '6px',
                            padding: '7px 20px',
                            fontSize: 'clamp(10px, 1vw, 12px)',
                            height: 'fit-content',
                            width: 'fit-content',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '15px',
                            fontWeight: 'bold',
                            boxSizing: 'border-box'
                        }}
                    >
                        Push
                        <FaArrowUp
                            size={10}
                            style={{color: 'rgb(225, 225, 225, .9)'}}
                        />
                    </button>
                </div>}

        </div>}

    </section>
</div>
                    }

                    {<div className="m-edit-btns" style={{marginTop : '20px'}}>
                        <button onClick={() => {
                            const ItemID = Math.random().toString(36).slice(2, 12);
                            AddNewItem(ItemID, {
                                foodid : ItemID,
                                name : newpendingfood.name,
                                price : newpendingfood.price,
                                shrt : newpendingfood.shrt,
                                imgsrc : newpendingfood.imgsrc,
                                type : newpendingfood.type,
                                status : 'in stock',
                                rating : Math.random(2500, 5000),
                                categories: Object.fromEntries(
                                    Object.entries(newpendingfood.categories).map(([key, value]) => [
                                        key,
                                        value
                                    ])
                                ),
                            }).then(() => {
                                setCurrentComponent({
                                componentName: "",
                                editable: "",
                                editability: {
                                    type: "",
                                    exchange: {
                                        yooo : "too"
                                    },
                                    quantity: {
                                        minNum: null,
                                        maxNum: null
                                    }
                                },
                                priceChange: ""
                            })
                                setnewpendingfood({})
                            })
                        }} style={{
                            color: '#fffefe',
                            backgroundColor : '#c43000',
                            border : '0.04px solid #c43000',
                            borderRadius : '6px', 
                            padding : '10px 40px', 
                            fontSize : 'clamp(12px, 1vw, 14px)', 
                            height : 'fit-content', 
                            width : 'fit-content', 
                            display : 'flex', 
                            alignItems : 'center', 
                            gap : '15px' , 
                            fontWeight : 'bold', 
                            boxSizing : 'border-box'
                            }}>Upload Item<FaArrowUp size={12} style={{color : 'rgb(225, 225, 225, .9)'}}/></button>
                    </div>}
            </section>
       </div>
        </>
     );
}
 
export default Amenu;