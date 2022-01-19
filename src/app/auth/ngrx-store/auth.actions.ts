import { Action } from "@ngrx/store";

export const LOGIN_START = '[Auth] Login Start';
export const AUTHENTICATE_SUCCESS = '[Auth] Login';
export const AUTHENTICATE_FAIL = '[Auth] Login Fail';
export const SIGNUP_START = '[Auth] Signup Start';
export const AUTO_LOGIN = '[Auth] Auto Login';
export const LOGOUT = '[Auth] Logout';

export class AuthenticateSuccess implements Action {
    type: string = AUTHENTICATE_SUCCESS;

    constructor(public payload: { 
        email: string;
        userId: string;
        token: string;
        tokenExp: Date;
        redirect: boolean;
     }) {}
}

export class Logout implements Action {
    type: string = LOGOUT;
}

export class LoginStart implements Action {
    type: string = LOGIN_START;

    constructor(public payload: { email: string, password: string }) {}
}

export class AuthenticateFail implements Action {
    type: string = AUTHENTICATE_FAIL;

    constructor(public payload: string) {}
}

export class SignupStart implements Action {
    type: string = SIGNUP_START;

    constructor(public payload: { email: string, password: string }) {}
}

export class AutoLogin implements Action {
    type: string = AUTO_LOGIN;
}

export type AuthActions = AuthenticateSuccess | Logout | LoginStart 
    | AuthenticateFail | SignupStart | AutoLogin;