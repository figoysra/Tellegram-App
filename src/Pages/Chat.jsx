/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import Loading from "../Component/Loading";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import socket from "../Config/socket"
import { CONTACTS } from "../Redux/action/contacts"
import { GET_DATA_USER, UPDATE_USER,GETRECEIVERPROFILE } from "../Redux/action/users";
import { FaAngleLeft } from "react-icons/fa";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Container, Row, Col } from "reactstrap"
import { CgMenuRightAlt } from "react-icons/cg";
import { BsDoorOpen } from "react-icons/bs";
import { AiOutlineSetting, AiOutlineUser } from "react-icons/ai";
import { API_URL } from "../Utils/constants";
import { RiSendPlaneFill } from "react-icons/ri";
import "./css/chat.css"



const Chat = () =>{
    const [id, setId] = useState("")
    const history = useHistory()
    const [receiver, setReceiver] = useState("")
    const dispatch = useDispatch();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen((prevState) => !prevState);
    const [chatList, setChatList] = useState(false);
    const toogleBack = () => setChatList(false);
    const messagesEndRef = useRef(null);
    // const [isOpen, setOpen] = useState(false);
    // const tooglechatList = () => setChatList(!chatList);
    const [SidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => setSidebarOpen((prevState) => !prevState);
    const closeSidebar = () => setSidebarOpen(false)
    const [msg, setMsg] = useState("")
    const [listMsg, setListMsg] = useState([])
    const [listMsgHistory, setListMsgHistory] = useState([])
    const user = useSelector(store=> store.users)
    const contacts = useSelector((store) => store.contacts);
    const [form, setForm] = useState({
        email: "",
        password: "",
        profilePicture: "",
        displayName: "",
        username: "",
        bio: "",
        numberPhone: ""
    })
    // console.log(user.dataUser)
    socket.emit("login", id)
    // console.log(listMsgHistory)
    useEffect(()=>{
        setId(user.dataUser.id)
        setForm({
            email: user.dataUser.email,
            password: user.dataUser.password,
            profilePicture: user.dataUser.profilePicture,
            displayName: user.dataUser.displayName,
            username: user.dataUser.username,
            bio: user.dataUser.bio,
            numberPhone: user.dataUser.numberPhone,
        });
    },[user.dataUser])
    useEffect(()=>{
        socket.on('list-message',(payload)=>{
            setListMsg([...listMsg, payload])
        })
        scrollToBottom()
    })
    useEffect(()=>{
        dispatch(CONTACTS())
        dispatch(GET_DATA_USER())
    },[])
    const handleLogout = () =>{
    localStorage.removeItem("token")
        history.push("/login")
    }
    const changeText = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    }; 
    // const changeInputFile = (e) => {
    //     setForm({
    //         ...form,
    //         profilePicture: e.target.files[0],
    //     });
    // };
    // const getUser = () =>{
    //     dispatch(CONTACTS());
    // }

    const changeReceiver = (userId) =>{
        setReceiver(userId)
        dispatch(GETRECEIVERPROFILE(userId));
        socket.emit("get-message", {receiver: userId, sender: id});
        setListMsg([])
        socket.on("history-messages", (payload)=>{
            setListMsgHistory(payload)
        });
    }
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    const handleSendMessage = (e) =>{
        e.preventDefault()
        socket.emit("send-message",{
            sender : id,
            receiver,
            msg,
        });
        setListMsg([
            ...listMsg,
            {
                sender : id,
                receiver,
                msg
            }
        ])
        setMsg("")
    }
    const handleSubmit = (e) =>{
        e.preventDefault();
        const formData = new FormData();
        formData.append("email", form.email);
        formData.append("password", form.password);
        formData.append("profilePicture", form.profilePicture);
        formData.append("displayName", form.displayName);
        formData.append("username", form.username);
        formData.append("bio", form.bio);
        formData.append("numberPhone", form.numberPhone);
        UPDATE_USER(formData)
        .then((res)=>{
            alert("Update User Success");
            // getUser()
        }).catch((err)=>{
            alert("Cannot Update Data");
        })
    }
    return(
        <div>
            {contacts.loadContacts === true || contacts.errorcontacts === true || user.errorDataUser === true || user.loadDataUser === true ? (
                <Loading />
            ):(
                <Container fluid>
                    <Row>
                        <Col md="3" className="p-0">
                            <div className=" chat ">
                                <div className="Nav d-flex p-3">
                                    <h1 className="textLightBlue fw-bold chatTittle d-flex  align-content-start w-50">Telegram</h1>
                                    <div className="d-flex justify-content-end w-50">
                                        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                                            <DropdownToggle className="toogleTelegram p-0">
                                                <CgMenuRightAlt className="textLightBlue toogleIcon" />
                                            </DropdownToggle>
                                            <DropdownMenu className="mt-2 dropdownOption " right>
                                                <DropdownItem className="text-white fs14 d-flex align-items-center mt-3"  onClick={toggleSidebar}>
                                                    <AiOutlineSetting className="toogleIcon me-2" />Settings
                                                </DropdownItem>
                                                <DropdownItem className="text-white fs14 d-flex align-items-center mt-3">
                                                    <AiOutlineUser className="toogleIcon me-2" />Contacts
                                                </DropdownItem>
                                                <DropdownItem className="text-white fs14 d-flex align-items-center mt-3 mb-3" onClick={handleLogout}>
                                                    <BsDoorOpen className="toogleIcon me-2" /> Log Out
                                                </DropdownItem>
                                            </DropdownMenu>
                                        </Dropdown>
                                    </div>
                                    <div>
                                        {SidebarOpen === true ? (
                                            <form className="sideBarProfile vh-100 bg-white w-25" onSubmit={handleSubmit}>
                                                <div className="d-flex mt-4 mb-4 w-100 align-items-center">
                                                    <div className="iconLeft d-flex justify-content-center center fs20 ">
                                                        <FaAngleLeft clasName="text-danger" onClick={closeSidebar} />
                                                    </div>
                                                    <h1 className="text-capitalize profileUpdate text-center textLightBlue fw-bold w-100 fs20 d-flex justify-content-center">{user.dataUser.username}</h1>
                                                </div>
                                                <div className="d-flex align-items-center flex-column">
                                                    <div className="profilePictureUpdate">
                                                        <img src={`${API_URL}/${user.dataUser.profilePicture}`} alt="" />
                                                    </div>
                                                    <h1 className="fs20 m-0 mt-2 fw-bold text-dark text-capitalize">{user.dataUser.displayName}</h1>
                                                    <p className="fs14  m-0 mt-1 textGray text-capitalize">{user.dataUser.username}</p>
                                                </div>
                                                <div className="p-2 mt-2 rubik">
                                                    <h1 className="fs16 fw-bold">Account</h1>
                                                    <label for="" className="textGray fs14 mt-2 mb-2">Number Phone</label><br />
                                                    <input type="text" className="inputBoxUpdate" name="numberPhone" value={form.numberPhone} onChange={changeText}  /><br />
                                                    <label for="" className="textGray fs14 mt-2 mb-2">Display Name</label> <br />
                                                    <input type="text" className="inputBoxUpdate" name="displayName" value={form.displayName} onChange={changeText}  /><br/>
                                                    <hr />
                                                    <label for="" className="fs14 fw-bold mb-2">Username</label><br />
                                                    <input type="text" name="username" className="fs14 textGray inputBoxUpdate" value={form.username} onChange={changeText} />
                                                </div>
                                                <div className="ps-2">
                                                    <hr />
                                                    <textarea type="text" className="fs14 fw-bold inputBoxTextArea text-capitalize" name="bio" value={form.bio} onChange={changeText} />
                                                    <p className="fs14 mt-2 fw-bold textGray">Bio</p>
                                                </div>
                                                <div className="ps-2">
                                                    <button type="submit" className="btn  btnSave w-100 text-white fw-bold">Save</button>
                                                </div>
                                            </form>
                                        ): null}
                                    </div>
                                    

                                </div>
                                <div>
                                        {/* {JSON.stringify(user.all.length)} */}

                                        {contacts.contacts.map((e,i)=>{
                                            return(
                                                <div key={i} className="contact ps-3  d-flex mt-4" >
                                                    <div className="contactProfile d-flex justify-content-start align-items-center">
                                                        <div className="borderPicture">
                                                            <img src={`${API_URL}/${e.profilePicture}`} alt="" />
                                                        </div>
                                                    </div>
                                                    <div className="contactBody ms-2 d-flex flex-column mt-3" onClick={()=> changeReceiver(e.contactTwo)}>
                                                        <h1 className="text-capitalize contactTittle fw-bold m-0">{e.displayName}</h1>
                                                        <p className="contactTag textGray">Click to see a message</p>
                                                    </div>
                                                    {/* {e.username}
                                                    <button type="" onClick={()=> changeReceiver(e.id)}>Pilih</button> */}
                                                </div>
                                                )
                                            })
                                        }

                                </div>
                            </div>
                        </Col>
                        <Col md="9" className={`chatlistComponent ${chatList === true ? 'chatListActive' : 'chatListNone' }`}>
                            <div className="chatList 100vh">
                                { user.loadreceiverData === true || Object.keys(user.receiverData).length <= 0  ?(
                                    <div className="d-flex justify-content-center align-items-center vh-100 bgGray w-100">
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
                                            {listMsgHistory.map((message, index)=>{
                                                if(message.receiver === receiver || message.sender === receiver){
                                                    return(
                                                        <div keys={index}>
                                                            {message.sender === id ?(
                                                                <div className={`chatMessage rubik d-flex m-3 justify-content-end`} >
                                                                    <div className={`chatMessageTextRight fs14 text-center me-2 bgWhite text-dark p-2`}>
                                                                        {message.message}
                                                                    </div>
                                                                    <div ref={messagesEndRef} />
                                                                </div>
                                                            ):(
                                                                <div className={`chatMessage rubik d-flex m-3 justify-content-start`} >
                                                                    <div className="chatMessagePicture">
                                                                        <div className="borderMessagePicture">
                                                                            <img src={`${API_URL}/${user.receiverData.profilePicture}`} alt="" />
                                                                        </div>
                                                                    </div>
                                                                    <div className={`chatMessageTextLeft fs14 text-center ms-2 bgLightBlue text-white p-2`}>
                                                                        {message.message}
                                                                    </div>
                                                                    <div ref={messagesEndRef} />
                                                                </div>
                                                            )} 
                                                        </div>
                                                    )
                                                }
                                                
                                            })}
                                            {listMsg.map((value,index)=>{
                                                if(value.receiver === receiver || value.sender === receiver){
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
                                                                    <div ref={messagesEndRef} />
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
                                                                    <div ref={messagesEndRef} />
                                                                </div>
                                                            )} 
                                                        </div>
                                                    )
                                                }
                                            })}
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
                        </Col>
                    </Row>
            </Container>
            )}
            
        </div>
    )
}
export default Chat