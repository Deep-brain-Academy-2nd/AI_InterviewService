import { SETTOKENINFO } from "./actionTypes"
import { tokenInfo } from "../types/state"

export const setTokenInfo = (payload: tokenInfo) => ({
    type: SETTOKENINFO,
    payload: payload
});