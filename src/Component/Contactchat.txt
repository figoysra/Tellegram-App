import React, { useState } from "react"
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap"
import { CgMenuRightAlt } from "react-icons/cg";
import { useSelector } from "react-redux";
import { AiOutlineSetting, AiOutlineUser } from "react-icons/ai";
import { useHistory } from "react-router-dom";
import { BsDoorOpen } from "react-icons/bs";
import { API_URL } from "../Utils/constants";
import "./css/contactchat.css"
import { useDispatch } from "react-redux";
import { HISTORYMESSAGE } from "../Redux/action/chat";
import { GETRECEIVERPROFILE, UPDATE_STATUS } from "../Redux/action/users";

const Contactchat = ({idUser}) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen((prevState) => !prevState);
    const dispatch = useDispatch()
    const history = useHistory();
    const chat = useSelector((store) => store.chats);
    const handleLogout = () => {
        // let today = new Date();
        // let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        // let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        // let dateTime = date+' '+time;
        // const formData = {
        //     isOnline : 2,
        //     timeOnline: dateTime
        // }
        // UPDATE_STATUS(formData);
        localStorage.removeItem("token");
        localStorage.removeItem("id");
        history.push("/login");
    };
    const changeReceiver = (receiver) =>{
        dispatch(HISTORYMESSAGE(idUser, receiver))
        dispatch(GETRECEIVERPROFILE(receiver));
    }
    return (
        <div className='componentChat'>
            <div className='chat'>
                <div className='Nav d-flex p-3'>
                    <h1 className="textLightBlue fw-bold chatTittle d-flex  align-content-start w-50">Telegram</h1>
                    <div className="d-flex justify-content-end w-50">
                        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                            <DropdownToggle className="toogleTelegram p-0">
                                <CgMenuRightAlt className="textLightBlue toogleIcon" />
                            </DropdownToggle>
                            <DropdownMenu className="mt-2 dropdownOption " right>
                                <DropdownItem className="text-white fs14 d-flex align-items-center mt-3" >
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
                </div>
                <div>
                    {chat.contacts.length <= 0 ? (
                        <p className='text-center p-5'>There is no Users Active in your Contacts ... </p>
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
    );
};
export default Contactchat;
