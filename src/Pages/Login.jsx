import React, { useState } from "react"
import "./css/Login.css"
import {Button, Label} from "reactstrap"
import { TextField, Input, InputAdornment, IconButton } from "@mui/material";
import { LOGIN } from "../Redux/action/users";
import { useHistory, Link } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";


const Login = () =>{
    const history = useHistory()
    const [form, setForm] = useState({
        email: "",
        password: "",
        errorMessage: "",
        showPassword: false
    })
    const changeInput = (e) =>{
        setForm({...form,
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
        // eslint-disable-next-line no-sequences
        if (form.email, form.password) {
            if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(form.email)) {
                LOGIN(form)
                    .then((response) => {
                        history.push("/");
                        // console.log(response)
                    })
                    .catch((err) => {
                        // alert(err.error)
                        setForm({ ...form, errorMessage: err.error });
                    });
            } else {
                setForm({
                ...form,
                errorMessage: "Please enter correct email address",
                });
            }
        } else {
            setForm({...form,  errorMessage: "Please fill in all fields" });
            // console.log(form.errorMessage);
        }
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
                    <Input
                        id="standard-adornment-password"
                        type={form.showPassword ? 'text' : 'password'}
                        name="password"
                        value={form.password}
                        className='loginInput fs16'
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
                    />

                    <p className="fs14 text-danger">{form.errorMessage}</p>
                    <p className='textLightBlue fs16 w-100 text-right mb-4'  role="button" onClick={()=>history.push("/forget-password")}>Forgot Password</p>
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