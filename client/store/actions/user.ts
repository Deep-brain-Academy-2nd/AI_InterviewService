import { SETUSERNAME } from "./actionTypes"

export const setUsername = (payload: string) => ({
    type: SETUSERNAME,
    payload: payload
});