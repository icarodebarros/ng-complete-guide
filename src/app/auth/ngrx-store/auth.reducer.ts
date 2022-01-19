import { User } from "../user.model";
import * as AuthActions from "./auth.actions";

export interface AuthState {
    user?: User;
    authError?: string;
    loading: boolean;
}

const initialState: AuthState = {
    user: undefined,
    authError: undefined,
    loading: false,
}

export function authReducer(state = initialState, action: AuthActions.AuthActions): AuthState {

    switch(action.type) {
        case AuthActions.AUTHENTICATE_SUCCESS:
            const actLogin = action as AuthActions.AuthenticateSuccess;
            const user = new User(actLogin.payload.email, actLogin.payload.userId, actLogin.payload.token, actLogin.payload.tokenExp);
            return {
                ...state,
                user: user,
                authError: undefined,
                loading: false
            };
        case AuthActions.LOGOUT:
            return {
                ...state,
                user: undefined
            };
        case AuthActions.LOGIN_START:
        case AuthActions.SIGNUP_START:
            return {
                ...state,
                authError: undefined,
                loading: true
            };
        case AuthActions.AUTHENTICATE_FAIL:
            const actLoginFail = action as AuthActions.AuthenticateFail;
            return {
                ...state,
                authError: actLoginFail.payload,
                loading: false
            };

        default: 
            return state;
    }
}