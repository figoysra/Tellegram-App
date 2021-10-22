import {API_URL} from  "../../Utils/constants"
import axios from "axios"

export const LOGIN = (form) => {
    return new Promise((resolve, reject)=>{
        axios.post(`${API_URL}login`, form)
        .then((response)=>{
            console.log(response.data)
            resolve(response.data)
            localStorage.setItem('token', response.data.result.token)
        }).catch((err)=>{
            reject(err.response.data)
        })
    })
}



export const REGISTER = (form) =>{
    return new Promise((resolve, reject)=>{
        // console.log(form)
        const headers = {
            "Content-Type": "multipart/form-data",
        };
        axios.post(`${API_URL}register`, form, {headers})
        .then((response)=>{
            resolve(response.data)
        }).catch((err)=>{
            reject(err.response.data)
        })
    })
}

export const GET_USERS = () =>{
    return(dispatch) =>{
        const token = localStorage.getItem("token")
        // console.log(token)
        const headers = {
            token : token
        };
        // console.log(headers)    
        dispatch(getDataPending())
        axios
            .get(`${API_URL}allusers`, { headers })
            .then((response) => {
                // console.log(response.data.result.data)
                dispatch(getDataFulfilled(response.data.result.data))
            })
            .catch((err) => {
                dispatch(getDataRejected(err.response));
            });
    }
}
export const GET_DATA_USER = (token) =>{
    return (dispatch)=>{
        const headers = {
            "Content-Type": "multipart/form-data",
            "token": token,
        };
        dispatch(getDataUserPending)
        axios.get(`${API_URL}users`, { headers })
        .then((response)=>{
            dispatch(getDataUserFulfilled(response.data.result[0]))
        }).catch((err)=>{
            dispatch(getDataUserRejected(err.response.data));
        })
    }
}

export const UPDATE_USER = (form) =>{
    return new Promise((resolve, reject)=>{
        const headers = {
            "Content-Type": "multipart/form-data",
            "token" : localStorage.getItem("token")
        }
        axios.put(`${API_URL}users`, form, {headers})
        .then((response)=>{
            resolve(response.data)
        }).catch((err)=>{
            reject(err.response.data)
        })
    })
}

export const FORGET_PASSWORD = (email)=>{
    return new Promise((resolve, reject)=>{
        // console.log(email)
        axios.post(`${API_URL}forgetPassword`, email)
        .then((response)=>{
            // console.log(response.data)
            resolve(response.data)
        }).catch((err)=>{
        // console.log(err.response.data)
            reject(err.response.data)
        })
    })
}


const getDataPending = () =>{
    return{
        type: "GET_USER_PENDING"
    }
}
const getDataFulfilled = (payload) =>{
    return{
        type: "GET_USER_FULFILLED",
        payload
    }
}
const getDataRejected = (payload) =>{
    return{
        type: "GET_USER_REJECTED",
        payload
    }
}

const getDataUserPending = () =>{
    return{
        type: "GET_DATA_USER_PENDING"
    }
} 
const getDataUserFulfilled = (payload) =>{
    return{
        type: "GET_DATA_USER_FULFILLED",
        payload
    }
}
const getDataUserRejected = (payload) =>{
    return{
        type: "GET_DATA_USER_REJECTED",
        payload
    }
}