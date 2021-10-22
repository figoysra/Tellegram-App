const initialState = {
    all: [],
    loadUsers : false,
    errorUsers : false,
    errorUsersMessage: '',
    dataUser: {},
    loadDataUser: false,
    errorDataUser: false,
    errorDataUserMessage : ''
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
        default:
            return state;
    }
}
export default usersReducer