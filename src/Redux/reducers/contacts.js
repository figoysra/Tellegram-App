const initialState = {
    contacts: [],
    loadcontacts: false,
    errorcontacts: false,
    errorcontactInfo: "",
}
const contactReducer = ( state=initialState, action)=>{
    switch (action.type) {
        case 'GET_CONTACTS_PENDING':
            return { ...state, loadcontacts: true };
        case 'GET_CONTACTS_FULFILLED':
            return { ...state, loadcontacts: false, contacts: action.payload };
        case 'GET_CONTACTS_REJECTED':
            return {...state, loadcontacts: false, errorcontacts: true, errorcontactInfo: action.payload}
        default:
            return state;
    }

}
export default contactReducer;