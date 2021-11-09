const initialState = {
    all: [],
    loadUsers : false,
    errorUsers : false,
    errorUsersMessage: '',
    dataUser: {},
    loadDataUser: false,
    errorDataUser: false,
    errorDataUserMessage : '',
    receiverData : {},
    loadreceiverData: false,
    errorreceiverData: false,
    errorreceiverDataMSG: "",
}

const usersReducer = ( state=initialState, action)=>{
    switch (action.type) {
        case 'GET_USER_PENDING':
            return {...state, loadUsers: true}
        case 'GET_USER_FULFILLED':
            return {...state, loadUsers: false, all: action.payload}
        case 'GET_USER_REJECTED':
            return {...state, loadUsers: false, errorUsers: true, errorUsersMessage: action.payload}

        case "GET_DATA_USER_PENDING":
            return {...state, loadDataUser: true}
        case "GET_DATA_USER_FULFILLED":
            return{...state, loadDataUser: false, dataUser: action.payload}
        case "GET_DATA_USER_REJECTED":
            return { ...state, loadDataUser: false, errorDataUser: true, errorDataUserMessage: action.payload };

        case 'GET_RECEIVER_PROFILE_PENDING' :
            return { ...state, loadreceiverData: true };
        case 'GET_RECEIVER_PROFILE_FULLFILLED' :
            return {...state, loadreceiverData: false, receiverData : action.payload}
        case 'GET_RECEIVER_PROFILE_REJECTED' :
            return { ...state, loadreceiverData: false, errorreceiverData: true, errorreceiverDataMSG : action.payload};
        
        default:
            return state;
    }
}
export default usersReducer