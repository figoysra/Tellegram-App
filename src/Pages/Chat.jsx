/* eslint-disable array-callback-return */
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Modal, ModalHeader, ModalBody, Button} from "reactstrap"
import { useHistory, useLocation } from "react-router-dom";
import socket from "../Config/socket"
import { CONTACTS, DELETEMESSAGE, HISTORYMESSAGE, LISTMESSAGE, SEARCH_CONTACT, USER_ONLINE} from "../Redux/action/chat"
import { GET_DATA_USER, GET_USERS, GETRECEIVERPROFILE } from "../Redux/action/users";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap"
import { API_URL } from "../Utils/constants";
import { RiSendPlaneFill } from "react-icons/ri";
import { FcFullTrash } from "react-icons/fc";
import { CgMenuRightAlt } from "react-icons/cg";
import { AiOutlineSetting, AiOutlineUser } from "react-icons/ai";
import { BsDoorOpen, BsSearch } from "react-icons/bs";
import { FaAngleLeft} from "react-icons/fa";
import { TextField } from "@mui/material";
import ContactInfo from "../Component/ContactInfo"
import "./css/chat.css"


const Chat = () =>{
    const dispatch = useDispatch();
    const user = useSelector((store) => store.users);
    const chat = useSelector((store) => store.chats);
    const [msg, setMsg] = useState("");
    const [search, setSearch] = useState();
    const [modal, setModal] = useState(false);
    const [chatList, setChatList] = useState(false);
    const toogleBack = () => setChatList(false)
    const tooglechatList = () => setChatList(!chatList)
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggleDropdown = () => setDropdownOpen((prevState) => !prevState);
    const history = useHistory();
    const toggle = () => setModal(!modal);
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const resultSearch = query.get("search");
    const [msgID, setMsgID] = useState("")
    const [id, setId] = useState("");
    const [setting, setSetting] = useState(false)
    const toogleSetting = () => setSetting(!setting)
    // const toogleSettingBack = () => setSetting(false)
    const [form, setForm] = useState({
        email: "",
        profilePicture: "",
        displayName: "",
        username: "",
        bio: "",
        numberPhone: ""
    })
    socket.emit("login", id);

    //getuser
    const getUser = () =>{
        dispatch(GET_DATA_USER());
    }

    useEffect(()=>{
        getUser()
        dispatch(GET_USERS())
        dispatch(CONTACTS())
        dispatch(USER_ONLINE())
        // dispatch(CONTACTACTIVE(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    // set user 
    useEffect(()=>{
        setId(user.dataUser.id);
        
        setForm({
            email: user.dataUser.email,
            profilePicture: user.dataUser.profilePicture,
            displayName: user.dataUser.displayName,
            username: user.dataUser.username,
            bio: user.dataUser.bio,
            numberPhone: user.dataUser.numberPhone,
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[user.dataUser])

    const handleSendMessage = (e) =>{
        e.preventDefault()
        dispatch(LISTMESSAGE(id, user.receiverData.id, msg))
        dispatch(HISTORYMESSAGE(id, user.receiverData.id));
        setMsg("");
    }
    const handleDelete = () =>{
        DELETEMESSAGE(msgID, id)
        .then((response)=>{
            console.log(response)
        })
        setModal(!modal);
        dispatch(HISTORYMESSAGE(id, user.receiverData.id));
    }
    const changeReceiver = (receiver) =>{
        dispatch(HISTORYMESSAGE(id, receiver))
        dispatch(GETRECEIVERPROFILE(receiver));
        tooglechatList()
    }
    const handleSearch = (e) => {
        e.preventDefault();
        history.push(`/?search=${search}`);
    };
    useEffect(()=>{
        if (resultSearch && resultSearch !== "" && resultSearch !== 'undefined') {
            dispatch(SEARCH_CONTACT(resultSearch));
        }else{
            dispatch(CONTACTS());
        }
    },[resultSearch])
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("id");
        history.push("/login");
    }
    console.log(chat)
    return(
        <div className='d-flex position-relative'>
            <div className='sidebarComponent'>
                <div>
                    {setting === true ? (
                        <ContactInfo type= "user" data={user.dataUser} />
                    ) : null}
                </div>
                <div className='componentChat'>
                    <div className='chat'>
                        <div className='Nav d-flex p-3'>
                            <h1 className="textLightBlue fw-bold chatTittle d-flex  align-content-start w-50">Telegram</h1>
                            <div className="d-flex justify-content-end w-50">
                                <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
                                    <DropdownToggle className="toogleTelegram p-0">
                                        <CgMenuRightAlt className="textLightBlue toogleIcon" />
                                    </DropdownToggle>
                                    <DropdownMenu className="mt-2 dropdownOption " right>
                                        <DropdownItem className="text-white fs14 d-flex align-items-center mt-3" onClick={toogleSetting} >
                                            <AiOutlineSetting className="toogleIcon me-2" />Settings
                                        </DropdownItem>
                                        <DropdownItem className="text-white fs14 d-flex align-items-center mt-3">
                                            <AiOutlineUser className="toogleIcon me-2" />Add Contact
                                        </DropdownItem>
                                        <DropdownItem className="text-white fs14 d-flex align-items-center mt-3 mb-3" onClick={handleLogout}>
                                            <BsDoorOpen className="toogleIcon me-2" /> Log Out
                                        </DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            </div>
                        </div>
                        <div>
                            
                            <form className='w-100 ps-3 pe-3 mt-2 mb-2' onSubmit={handleSearch}>
                                <TextField className='searchContact' type="text" onChange={(e) => setSearch(e.target.value)} name="" id="standard-basic" placeholder='Search Contact' variant="standard" />
                                <button type="submit" className='border-0 bg-white'>
                                    <BsSearch type='submit' className=' ms-4  fs20 contact fw-bold ' /> 
                                </button>
                            </form>
                            {chat.contacts.length <= 0 ? (
                                <p className='text-center p-5'>Invite some Users to Start Chat ...</p>
                            ):(
                                chat.contacts.map((e,i)=>{
                                    return(
                                        <div key={i} className="contact ps-3 d-flex mt-4">
                                            <div className="contactProfile d-flex justify-content-start align-items-center">
                                                <div className="borderPicture">
                                                    <img src={`${API_URL}/${e.profilePicture}`} alt="" />
                                                </div>
                                            </div>
                                            <div className="contactBody d-flex flex-column mt-3" onClick={()=> changeReceiver(e.contactTwo)} >
                                                <h1 className="text-capitalize contactTittle fw-bold m-0">{e.displayName}</h1>
                                                <p className="contactTag textGray">Click to see a message</p>
                                            </div>
                                        </div>
                                    )
                                })
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className={`chatlistComponent ${chatList === true ? 'chatListActive' : 'chatListNone' }`}>
                <div className="chatList vh-100">
                    { user.loadreceiverData === true || Object.keys(user.receiverData).length <= 0  ?(
                        <div className="d-flex justify-content-center align-items-center vh-100 bgGray">
                            <p className="fs14 rubik textDarkGray">Please select a chat to start messaging</p>
                        </div>
                    ):(
                        <div className='position-relative vh-100'>
                            <div  className=" bg-white rubik p-2 w-100 navbarContact">
                                <FaAngleLeft className={`${chatList === true ? 'active' : 'd-none'}`} onClick={toogleBack} />
                                <div className="chatListProfilePicture ms-2">
                                    <div className="borderListPicture">
                                        <img src={`${API_URL}/${user.receiverData.profilePicture}`} alt="" />
                                    </div>
                                </div>
                                <div className="chatListProfileName bg-white ms-2 d-flex flex-column align-items-center">
                                    <h1 className="text-capitalize fw-bold chatListTittle m-0">{user.receiverData.displayName}
                                </h1>
                                </div>
                            </div>
                            <div className="bgdarkGray listChat">
                                {chat.historyMessage.map((message,index)=>{
                                    return(
                                        <div keys={index}>
                                            {message.sender === id ?(
                                                <div className={`chatMessage rubik d-flex m-3 justify-content-end`} >
                                                    <div className={`chatMessageTextRight fs14 text-center me-2 bgWhite text-dark p-2`} onClick={()=>{
                                                        setModal(!modal)
                                                        setMsgID(message.id)
                                                        }}>
                                                        {message.message}
                                                    </div>
                                                    <div className="chatMessagePicture">
                                                        {/* <div className="borderMessagePicture">
                                                            <img src={`${API_URL}/${e.profilePicture}`} alt="" />
                                                        </div> */}
                                                    </div>
                                                    
                                                </div>
                                            ):(
                                                <div className={`chatMessage rubik d-flex m-3 justify-content-start`} >
                                                    <div className="chatMessagePicture">
                                                        <div className="borderMessagePicture" >
                                                            <img src={`${API_URL}/${message.senderProfilePic}`} alt="" />
                                                        </div>
                                                    </div>
                                                    <div className={`chatMessageTextLeft fs14 text-center ms-2 bgLightBlue text-white p-2`}>
                                                        {message.message}
                                                    </div>
                                                </div>
                                            )} 
                                        </div>
                                    )
                                })}
                                {chat.listMessage.map((value,index)=>{
                                    if(value.receiver === user.receiverData.id  || value.sender === user.receiverData.id ){
                                        return(
                                            <div keys={index}>
                                                {value.sender === id ?(
                                                    <div className={`chatMessage rubik d-flex m-3 justify-content-end`} >
                                                        <div className={`chatMessageTextRight fs14 text-center me-2 bgWhite text-dark p-2`}>
                                                            {value.msg}
                                                        </div>
                                                        <div className="chatMessagePicture">
                                                            {/* <div className="borderMessagePicture">
                                                                <img src={`${API_URL}/${e.profilePicture}`} alt="" />
                                                            </div> */}
                                                        </div>
                                                        
                                                    </div>
                                                ):(
                                                    <div className={`chatMessage rubik d-flex m-3 justify-content-start`} >
                                                        <div className="chatMessagePicture">
                                                            <div className="borderMessagePicture">
                                                                <img src={`${API_URL}/${user.receiverData.profilePicture}`} alt="" />
                                                            </div>
                                                        </div>
                                                        <div className={`chatMessageTextLeft fs14 text-center ms-2 bgLightBlue text-white p-2`}>
                                                            {value.msg}
                                                        </div>
                                                    </div>
                                                )} 
                                            </div>
                                        )
                                    }
                                })}
                                                            
                                
                                <Modal isOpen={modal} toggle={toggle} >
                                    <ModalHeader toggle={toggle}></ModalHeader>
                                    <ModalBody>
                                        <div className='d-flex flex-column text-center rubik align-content-center justify-content-center'>
                                            <div>
                                                <FcFullTrash className='iconDelete ' />
                                            </div>
                                            <h4 className='mt-3'>Are you sure want to delete this message?</h4>
                                            <p className='fw-bold'>This cannot be undone !</p>
                                        </div>
                                        <Button type='submit' className='w-100 m-2 btn btn-danger' onClick={handleDelete}>Delete Message</Button><br />
                                        <Button className='w-100 m-2 btn btnCancel' onClick={toggle}>Cancel</Button>
                                    </ModalBody>
                                </Modal>
                            </div>
                            <div className=" sendMessage bg-white p-2">
                                <form onSubmit={handleSendMessage} >
                                    <input type="text" className="inputSendMessage p-2 ps-2" id="" name="" placeholder="Type a message" onChange={(e)=>setMsg(e.target.value)} value={msg} />
                                    <button type="submit" className="sendMessageButton ms-2 bg-white">
                                        <RiSendPlaneFill className="iconSendMessage" />
                                    </button>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
export default Chat