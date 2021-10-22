import React, { useState } from "react"
import "./css/ForgetPassword.css"
import { Button, Label } from "reactstrap"
import { TextField } from "@mui/material";
import { FORGET_PASSWORD } from "../Redux/action/users";
import { useHistory } from "react-router-dom";
import { FaAngleLeft } from "react-icons/fa";


const ForgetPassword = () =>{
    const history = useHistory()
    const [email, setEmail] = useState("")
    const [error, setError] = useState("")
    const handleSubmit = (e) =>{
        e.preventDefault()
        const form = {
            email : email
        }
        FORGET_PASSWORD(form)
        .then((response)=>{
            alert("Link Reset Password Sudah dikirim, Cek Email")
            setError("")
        }).catch((err)=>{
            setError(err.error)
            // alert(err.error)
        })
    }
    
    return(
        <div className="bgLoginRegister d-flex vh-100 justify-content-center align-items-center">
            <div className="forgetCard p-5 bg-white ">
                <div className="d-flex ">
                    <FaAngleLeft className="mt-1 pointer iconBack" onClick={()=>history.push("/login")} />
                    <h1 className="forgetTitle textBlue w-100 text-center">Forgot Password</h1>
                </div>
                
                <p className="forgetTag mt-3 mb-2">You’ll get messages soon on your e-mail </p>
                <form onSubmit={handleSubmit}>
                    <Label for="" className="textGray fs14" >Email</Label><br />
                    <TextField className='forgetInput fw-bold fs16' name="email" onChange={(e)=> setEmail(e.target.value)} value={email} id="standard-basic" variant="standard" /><br />
                    <p className="fs14 text-danger">{error}</p>
                    <Button type="submit" className="text-white forgetButton mt-4">Send</Button>
                </form>
            </div>
        </div>
    )
}
export default ForgetPassword