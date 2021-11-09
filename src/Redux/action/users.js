import {API_URL} from  "../../Utils/constants"
import axios from "axios"

export const LOGIN = (form) => {
    return new Promise((resolve, reject)=>{
        axios.post(`${API_URL}login`, form)
        .then((response)=>{
            // console.log(response.data.token)
            resolve(response.data.token)
            localStorage.setItem('token', response.data.token)
            localStorage.setItem("id", response.data.result.id);
        }).catch((err)=>{
            reject(err.response.data)
        })
    })
}


export const REGISTER = (form) =>{
    return new Promise((resolve, reject)=>{
        // console.log(form)
        axios.post(`${API_URL}register`, form,)
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
export const GET_DATA_USER = () =>{
    return (dispatch)=>{
        const token = localStorage.getItem("token")
        const headers = {
            "token": token,
        };
        dispatch(getDataUserPending)
        axios.get(`${API_URL}users`, { headers })
        .then((response)=>{
            dispatch(getDataUserFulfilled(response.data.result))
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
export const UPDATE_STATUS = (form) =>{
    return new Promise((resolve, reject)=>{
        // console.log(form)
        const headers = {
            "token" : localStorage.getItem("token")
        }
        axios.put(`${API_URL}updateStatus`, form, {headers})
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

export const GETRECEIVERPROFILE = (id) =>{
    return(dispatch) =>{
         dispatch({
            type : 'GET_RECEIVER_PROFILE_PENDING'
        })
        const headers = {
            "token" : localStorage.getItem("token")
        }
       
        axios.get(`${API_URL}receiverData/${id}`, { headers })
        .then((response)=>{
            dispatch({
                type: "GET_RECEIVER_PROFILE_FULLFILLED",
                payload : response.data.result
            })
        }).catch((err)=>{
            dispatch({
                type: 'GET_RECEIVER_PROFILE_REJECTED ',
                payload: err.response.data
            });
        })
    }
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