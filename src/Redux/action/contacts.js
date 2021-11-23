import { API_URL } from "../../Utils/constants";
import axios from "axios";

export const CONTACTS = () =>{
    return(dispatch)=>{
        const headers = {
            token: localStorage.getItem("token"),
        };
        dispatch(getContactPending());
        axios.get(`${API_URL}contacts`, {headers})
        .then((response)=>{
            // console.log(response)
            dispatch(getContactFulfilled(response.data.result));
        }).catch((error)=>{
            dispatch(getContactRejected(error));
        })
    }
}
const getContactPending = () =>{
    return{
        type: "GET_CONTACTS_PENDING"
    }
}
const getContactFulfilled = (payload) =>{
    return{
        type: "GET_CONTACTS_FULFILLED",
        payload
    }
}
const getContactRejected = (payload) =>{
    return{
        type: "GET_CONTACTS_REJECTED",
        payload
    }
}