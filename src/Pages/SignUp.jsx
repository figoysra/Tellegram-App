import React, { useState } from "react"
import {REGISTER} from "../Redux/action/users"
import {useHistory} from "react-router-dom"
import { Button, Label } from "reactstrap";
import { TextField } from "@mui/material";
import { FaAngleLeft } from "react-icons/fa";
import "./css/SignUp.css"

const SignUp = () =>{
    const history = useHistory()
    const [error,setError] = useState("")
    const [form, setForm] = useState({
        email : "",
        password : "",
        profilePicture: "",
        displayName: "",
        username: "",
        bio: "",
        numberPhone: ""
    })
    const changeInput = (e)=>{
        setForm({
            ...form,
            [e.target.name] : e.target.value
        })
    }
    const handleSubmit = (e) =>{
        e.preventDefault()
        const formData = new FormData();
        formData.append("email", form.email);
        formData.append("password", form.password);
        formData.append("profilePicture", form.profilePicture);
        formData.append("displayName", form.displayName);
        formData.append("username", `${form.displayName}`);
        formData.append("bio", `Hello Everyone ! I am ${form.displayName}`);
        formData.append("numberPhone", form.numberPhone);
        REGISTER(formData)
        .then((response)=>{
            // console.log(response)
            history.push("/login")
            setError("");
        }).catch((err)=>{
            // console.log(err)
            setError(err.error)
        })
    }
    return(
        <div className="bgLoginRegister vh-100 d-flex justify-content-center align-items-center">
            <div className="borderSignUp p-5 bg-white">
                <div className="d-flex">
                    <FaAngleLeft className="mt-1 pointer iconBack" onClick={()=>history.push("/login")} />
                    <h1 className='signUpTitle fw-bold w-100 text-center  textLightBlue'> Register</h1>
                </div>
                
                <p className='fs14 mb-2 '>Let’s create your account!</p>
                <form onSubmit={handleSubmit}>
                    <Label for="name" className='textGray fs14 ' > Name</Label> <br />
                    <TextField className='signUpInput fw-bold fs16' name="displayName" onChange={changeInput} value={form.displayName} id="standard-basic" variant="standard" /><br />
                    <Label for="email" className='textGray fs14 mt-4 ' > Email</Label> <br />
                    <TextField className='signUpInput fw-bold fs16' name="email" onChange={changeInput} value={form.email} id="standard-basic" variant="standard" /><br />
                    <Label for="email" className='textGray fs14 mt-4' > Password</Label> <br />
                    <TextField className='signUpInput fw-bold fs14 mb-4' name="password" onChange={changeInput} value={form.password} type="password" id="standard-basic"  variant="standard"  /><br />
                    <p className="text-danger fs14">{error}</p>
                    <Button type="submit" className="signUpButton">Register</Button>
                    <p className="text-center mt-3 mb-3 fs14 textGray">----------  Login with  ----------</p>
                    <Button className="googleButton">Google</Button>
                </form>
            </div>
        </div>
    )
}
export default SignUp