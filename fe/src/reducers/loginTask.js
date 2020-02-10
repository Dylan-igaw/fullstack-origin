import { createStore } from "redux";

const initalState = {
    loginId: '',
};

function loginReducer(state=initalState,action) {
    switch (action.type) {
        case 'LOGIN':
            return{
                ...state,
                loginId: action.payload.id,
            };
        case 'LOGOUT':
            return{
                ...state,
                loginId: '',
            };
        case 'GET_ID':
            return this.loginId;
        default:
            return state;
    }
}

export const store = createStore(loginReducer);
