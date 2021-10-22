import React, { useState } from "react"
import "./css/Login.css"
import {Button, Label} from "reactstrap"
import { TextField } from "@mui/material";
import { LOGIN } from "../Redux/action/users";
import { useHistory, Link } from "react-router-dom";


const Login = () =>{
    const history = useHistory()
    const [errorMsg, setErrorMsg] = useState("")
    const [form, setForm] = useState({
        email: "",
        password: ""
    })
    const changeInput = (e) =>{
        setForm({...form,
            [e.target.name] : e.target.value
        })
    }
    const handleSubmit = (e) =>{
        e.preventDefault()
        LOGIN(form)
        .then((response)=>{
            history.push("/")
            setErrorMsg("")
            // console.log(response)
        }).catch((err)=>{
            // alert(err.error)
            setErrorMsg(err.error)
        })
    }
    return(
        <div className='bgLoginRegister vh-100 d-flex justify-content-center align-items-center'>
            <div className='borderLogin p-5 bg-white'>
                <h1 className='loginTitle fw-bold w-100 text-center  textLightBlue'>Login</h1>
                <p className='fs14 mb-4'>Hi, Welcome back!</p>
                <form onSubmit={handleSubmit}>
                    <Label for="email" className='textGray fs14 ' > Email</Label> <br />
                    <TextField className='loginInput fw-bold fs16' name="email" onChange={changeInput} value={form.email} id="standard-basic" variant="standard" /><br />
                    <Label for="email" className='textGray fs14 mt-3' > Password</Label> <br />
                    <TextField className='loginInput fw-bold fs14 mb-4' name="password" onChange={changeInput} value={form.password} type="password" id="standard-basic"  variant="standard"  />
                    <p className="fs14 text-danger">{errorMsg}</p>
                    <p className='textLightBlue fs16 w-100 text-right mb-4' role="button" onClick={()=>history.push("/forget-password")}>Forgot Password</p>
                    <Button type="submit " className='text-white buttonLogin'> Login </Button>
                    <p className="text-center mt-3 mb-3 fs14 textGray">----------  Login with  ----------</p>
                    <Button className="googleButton">Google</Button>
                    <p className="mt-4 mb-4 fs14">Dont Have an account ? <Link to="/sign-up" className="textLightBlue fw-bold"> Sign Up </Link></p>
                </form>
            </div>
        </div>
    )
}
export default Login