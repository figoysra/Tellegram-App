// import { Component } from "react";
import { Route, Redirect } from "react-router-dom";

const Guard = ({component : Component, ...rest}) => {
    const Token = localStorage.getItem('token')
    // console.log(Token)
    return(
        <Route {...rest} render={
            (props) =>{
                if(Token){
                    return <Component {...props} />
                }else{
                    return(<Redirect to='/login' />)
                }
            }
        }
        />
    )
}
export default Guard