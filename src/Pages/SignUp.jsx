/* eslint-disable no-sequences */
import React, { useState } from "react"
import {REGISTER} from "../Redux/action/users"
import {useHistory} from "react-router-dom"
import { Button, Label } from "reactstrap";
import { TextField, Input, InputAdornment, IconButton } from "@mui/material";
import { FaAngleLeft } from "react-icons/fa";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import "./css/SignUp.css"

const SignUp = () =>{
    const history = useHistory()
    const [error,setError] = useState("")
    const [form, setForm] = useState({
        email : "",
        password : "",
        displayName: "",
        numberPhone: "",
        showPassword: false
    })
    const changeInput = (e)=>{
        setForm({
            ...form,
            [e.target.name] : e.target.value
        })
    }
    const handleClickShowPassword = () => {
        setForm({
            ...form,
            showPassword: !form.showPassword,
        });
    };
    const handleSubmit = (e) =>{
        e.preventDefault()
        // console.log(registerForm)
        if (form.email, form.password, form.displayName, form.numberPhone) {
            if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(form.email)) {
                REGISTER(form)
                .then((response)=>{
                    // console.log(response)
                    history.push("/login")
                    setError("");
                }).catch((err)=>{
                    // console.log(err)
                    setError(err.error)
                })
            } else {
                setError("Please enter correct email address");
            }
        } else {
            setError("Please fill in all fields");
            // console.log(form.errorMessage);
        }
        
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
                    <TextField className='signUpInput fw-bold fs16' name="displayName" onChange={changeInput} value={form.displayName} variant="standard" /><br />
                    <Label for="email" className='textGray fs14 mt-4 ' > Email</Label> <br />
                    <TextField className='signUpInput fw-bold fs16' name="email" onChange={changeInput} value={form.email} variant="standard" /><br />
                    <Label for="" className='textGray fs14 mt-4' > Password</Label> <br />
                    <Input
                        id="standard-adornment-password"
                        type={form.showPassword ? 'text' : 'password'}
                        name="password"
                        value={form.password}
                        className='signUpInput fs16'
                        onChange={changeInput}
                        endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            // onMouseDown={handleMouseDownPassword}
                            >
                            {form.showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                            </IconButton>
                        </InputAdornment>
                        }
                    /><br />
                    <Label for="" className='textGray fs14 mt-4' > Number Phone</Label> <br />
                    <TextField className='signUpInput fw-bold fs14 mb-2' name="numberPhone" onChange={changeInput} value={form.numberPhone} type="number"  variant="standard"  /><br />
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