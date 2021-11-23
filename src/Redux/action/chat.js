import socket from "../../Config/socket";

export const CONTACTS = () =>{
    return(dispatch)=>{
        const id = JSON.parse(localStorage.getItem("id"));
        dispatch(getContactPending());
        socket.emit("get-contacts", ({id , search : "" }));
        socket.on("list-contacts", (payload)=>{
            dispatch(getContactFulfilled(payload));
        });
    }
}
export const SEARCH_CONTACT = (search) =>{
    return(dispatch)=>{
        const id = JSON.parse(localStorage.getItem("id"));
        dispatch(getContactPending());
        socket.emit("get-contacts", ({id , search : search }));
        socket.on("list-contacts", (payload)=>{
            dispatch(getContactFulfilled(payload));
            console.log(payload)
        });
    }
}
export const USER_ONLINE = () =>{
    return(dispatch)=>{
        const id = JSON.parse(localStorage.getItem("id"));
        socket.emit("broadcast", (id))
        socket.on("get-online-broadcast", (payload)=>{
            dispatch({
                type: "GET_SENDERRECEIVER_FULFILLED",
                payload
            })
        });
    }
}

export const LISTMESSAGE = (payload) =>{
    return(
        socket.emit("send-message", payload)
    )
}
export const GETLISTMESSAGE = (payload) =>{
    return(dispatch)=>{
        dispatch(getListMessageFulfilled(payload));
    }
}

export const HISTORYMESSAGE = (sender, receiver) =>{
    return(dispatch)=>{
        dispatch(getHistoryPending());
        socket.emit("get-message", { receiver: receiver, sender: sender });
        socket.on("history-messages", (payload) => {
            dispatch(getHistoryFulfilled(payload));
        });

    }
} 

export const DELETEMESSAGE = (id, userID) =>{
    return new Promise((resolve, reject)=>{
        socket.emit("get-delete-Message", (id))
        socket.on("deleteMessage", (response)=>{
            console.log(response)
            if(response.error){
                reject(response.error);
            }else{
                resolve(response)
            }
        })
        
    })
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

const getContactChatsPending = () =>{
    return{
        type: "GET_SENDERRECEIVER_PENDING"
    }
}
const getContactChatsFulfilled = (payload) =>{
    return{
        type: "GET_SENDERRECEIVER_FULFILLED",
        payload
    }
}

const getListMessagePending = () =>{
    return{
        type: "GET_LISTMESSAGE_PENDING"
    }
}
const getListMessageFulfilled = (payload) =>{
    return{
        type: "GET_LISTMESSAGE_FULFILLED",
        payload
    }
}

const getHistoryPending = () =>{
    return{
        type: "GET_HISTORYMESSAGE_PENDING"
    }
}
const getHistoryFulfilled = (payload) =>{
    return{
        type: "GET_HISTORYMESSAGE_FULFILLED",
        payload
    }
}

// const getHistoryRejected = (payload) =>{
//     return{
//         type: "GET_CONTACTS_REJECTED",
//         payload
//     }
// }

