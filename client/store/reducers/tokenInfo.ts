import { tokenInfo } from "../types/state";
import { SETTOKENINFO } from "../actions/actionTypes";
import { setTokenInfo } from "../actions/tokenInfo";

type tokenInfoAction = ReturnType<typeof setTokenInfo>;

const initState: tokenInfo = {
    token: "",
    tokenExpire: ""
}


export default function token(state: tokenInfo = initState, action: tokenInfoAction): tokenInfo {
    switch (action.type) {
        case SETTOKENINFO:
            return {
                token: action.payload.token, tokenExpire: action.payload.tokenExpire
            }
        default:
            return state
    }
}