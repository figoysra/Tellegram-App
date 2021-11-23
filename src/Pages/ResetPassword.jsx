import React, { useEffect, useState } from "react"
import { useHistory, useLocation } from "react-router-dom";
import { Button, Label } from "reactstrap";
import { TextField } from "@mui/material";
import { GET_DATA_USER, UPDATE_USER } from "../Redux/action/users";
import {useDispatch, useSelector} from "react-redux"
import { FaAngleLeft } from "react-icons/fa";
import "./css/ResetPassword.css"

const ResetPassword = () => {
    const history = useHistory()
    const user = useSelector(store => store.users)
    const location = useLocation();
    const dispatch = useDispatch()
    const [form, setForm] = useState({
        email : "",
        password : "",
        profilePicture: "",
        displayName: "",
        username: "",
        bio: "",
        numberPhone: ""
    })
    const query = new URLSearchParams(location.search);
    const token = query.get("token");
    const getDataUser = () =>{
        dispatch(GET_DATA_USER(token))
    }
    const changeInput = (e) =>{
        setForm({
            ...form,
            [e.target.name] : e.target.value
        })
    }
    useEffect(()=>{
        getDataUser()
        localStorage.setItem("token", token);   
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    useEffect(()=>{
        setForm({
            email: user.dataUser.email,
            profilePicture: user.dataUser.profilePicture,
            displayName: user.dataUser.displayName,
            username:user.dataUser.username,
            bio: user.dataUser.bio,
            numberPhone: user.dataUser.numberPhone,
        });
    },[user.dataUser])
    // console.log(form)
    const handleSubmit = (e) =>{
        e.preventDefault()
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
            alert("Reset Password Success, Silahkan Login Kembali")
            history.push("/login")
            localStorage.removeItem("token")
        }).catch((err)=>{
            alert("Cannot Reset Password")
        })
        
    }
    return(
        <div className="bgLoginRegister vh-100 d-flex justify-content-center align-items-center">
            <div className="borderReset p-5 bg-white">
                <div className="d-flex">
                    <FaAngleLeft className="mt-1 pointer iconBack" onClick={()=>history.push("/login")} />
                    <h1 className="text-center w-100 resetTitle mb-4 textLightBlue">Reset Password</h1>
                </div>
                
                <p className="fs14 mb-2">Type a New Password Here !</p>
                <form onSubmit={handleSubmit}>
                    <Label for="password" className='textGray fs14 ' > New Password </Label> <br />
                    <TextField type="password" className='resetInput mb-3 fw-bold fs16' name="password" onChange={changeInput} value={form.password} id="standard-basic" variant="standard" /><br />
                    <Button type="submit " className='text-white buttonReset'> Send </Button>
                </form>
            </div>
        </div>
    )
}


export default ResetPassword