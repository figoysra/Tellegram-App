import "./css/contactInfo.css"
import { FaAngleLeft } from "react-icons/fa";
import { API_URL } from "../Utils/constants";
import { useState, useEffect } from "react";
import { TextField, InputAdornment } from "@mui/material";
import { GET_DATA_USER, UPDATE_USER } from "../Redux/action/users";
import { useDispatch } from "react-redux";

const ContactInfo = ({type, data}) =>{
    console.log(type)
    console.log(data)
    const dispatch = useDispatch();
    const [inputBox, setInputBox] = useState(false)
    const toogleInput = () =>  setInputBox(!inputBox)
    const [form, setForm] = useState({
        email: "",
        profilePicture: "",
        photoPriview: "",
        displayName: "",
        username: "",
        bio: "",
        numberPhone: ""
    })
    const changeText = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    }; 
    const changeInputFile = (e) =>{
        // console.log(e.target.files[0].name)
        setForm({
            ...form,
            profilePicture : e.target.files[0],
            photoPriview: URL.createObjectURL(e.target.files[0])
        })
    }
    useEffect(()=>{
        setForm({
            email: data.email,
            profilePicture:data.profilePicture,
            displayName: data.displayName,
            username: data.username,
            bio: data.bio,
            numberPhone: data.numberPhone,
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[data])
    const handleUpdate = (e) =>{
        e.preventDefault()
        const formData = new FormData();
        formData.append('email', form.email)
        formData.append("image", form.profilePicture);
        formData.append("displayName", form.displayName);
        formData.append("username", form.username);
        formData.append("bio", form.bio);
        formData.append("numberPhone", form.numberPhone)
        UPDATE_USER(formData)
        .then((response)=>{
            // console.log(response)
            alert('Update User Success')
            dispatch(GET_DATA_USER())
        })
        .catch((err)=>{
            console.log(err)
            alert('Update User Failed')
        })
        toogleInput()
    }
    return(
        <>
            {type === "user" ? (
                <div className='widthContact'>
                    <div className="d-flex mt-4 mb-4 w-100 align-items-center rubik">
                        <div className="iconLeft d-flex justify-content-center center fs20 ms-3 fs20 ">
                            <FaAngleLeft   />
                        </div>
                        <h1 className="text-capitalize profileUpdate text-center textLightBlue fw-bold w-100 fs20 d-flex justify-content-center">{data.username}</h1>
                    </div>
                    <div className="d-flex align-items-center flex-column rubik">
                        <div className="profilePictureUpdate" type="file">
                            <img src={
                                form.photoPriview === undefined
                                    ? `${API_URL}/${form.profilePicture}`
                                    : form.photoPriview
                                }
                            alt="" />
                        </div>
                        <h1 className="fs20 m-0 mt-2 fw-bold text-dark text-capitalize">{data.displayName}</h1>
                        <p className="fs14  m-0 mt-1 textGray text-capitalize">@{data.username}</p>
                        {/* <input type="file" required onChange={changeInputFile}   name="profilePicture" placeholder="" /><br/> */}
                        
                    </div>
                    <div className="p-2 mt-2 rubik">
                        {inputBox === true ? (
                            <>
                                <h1 className="fs16 fw-bold">Update Profile Picture</h1>
                                <input type="file"  onChange={changeInputFile} accept="image/png, image/jpg, image/jpeg"   name="profilePicture"  className=" fs14 text-dark inputFile" />
                            </>
                        ): null}
                        <h1 className="fs16 fw-bold mt-2">Account</h1>
                        <p className="textGray fs14 mt-2 mb-2">Number Phone</p>
                        {inputBox === true ? (
                            <TextField type="text" className="inputBoxUpdate" name="numberPhone" value={form.numberPhone} onChange={changeText}  id="standard-basic"  variant="standard" />
                        ): ( <p className="fs14">{data.numberPhone}</p>) }
                        
                        <p className="textGray fs14 mt-2 mb-2">Display Name</p>
                        {inputBox === true ? (
                            <TextField type="text" className="inputBoxUpdate" name="displayName" value={form.displayName} onChange={changeText}  id="standard-basic"  variant="standard" />
                        ): ( <p className="fs14">{data.displayName}</p>) }    
                        <hr />

                        <p className="fs14 fw-bold mb-2">Username</p>
                        {inputBox === true ? (
                            <TextField type="text" className="inputBoxUpdate" name="username" value={form.username} onChange={changeText}   id="standard-basic"  variant="standard"
                            startAdornment={
                                <InputAdornment position="start">
                                    @
                                </InputAdornment>
                            }
                            />
                        ): ( <p className="fs14"> @{data.username}</p>) }    

                        <p className="fs14 mt-2 fw-bold textGray">Bio</p>
                        {inputBox === true ? (
                            <TextField
                                id="filled-multiline-static"
                                className="textAreaUpdata"
                                multiline
                                rows={2}
                                variant="filled"
                                name="bio"
                                value={form.bio} 
                                onChange={changeText} 
                                />
                            // <input type="text" className="inputBoxUpdate" name="bio" value={form.bio} onChange={changeText}  />
                        ): ( <p className="fs14">{data.bio}</p>) }    
                        <button type="" className=' mt-4 btn bgButtonEdit w-100 text-white' onClick={inputBox === true ? handleUpdate : toogleInput}>
                            {inputBox === true ? "Update Data" : "Edit Profile"}
                        </button>
                    </div>
                </div>
            ):(
                <div className='widthContact'>
                    
                </div>
            )}
        </>
    )
}
export default ContactInfo