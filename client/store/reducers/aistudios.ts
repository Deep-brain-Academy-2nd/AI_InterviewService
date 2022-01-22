import { AIStudios, tokenInfo } from "../types/state";
import { SETAISTUDIOTOKEN } from "../actions/actionTypes";
import { setAIStudiosToken } from "../actions/aistudios";

type aiStudiosAction = ReturnType<typeof setAIStudiosToken>;
const initState: AIStudios = {
    appId: "aistudios.com",
    platform: "web",
    isClientToken: true,
    token: "",
    uuid: "6443234b-77d5-4013-bfd6-bb9399f317d9",
    clientHostname: "aistudios.com",
    sdk_v: "1.0"
}
const initTokenState: tokenInfo = {
    token: "",
    tokenExpire: ""
}


export default function aiStudios(state: AIStudios = initState, action: aiStudiosAction): AIStudios {
    switch (action.type) {
        case SETAISTUDIOTOKEN:
            return {
                ...state, token: action.payload.token
            }
        default:
            return state
    }
}