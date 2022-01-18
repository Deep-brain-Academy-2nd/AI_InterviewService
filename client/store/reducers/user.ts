import { User } from "../types/state";
import { SETUSERNAME } from "../actions/actionTypes";
import { setUsername } from "../actions/user";

type userAction = ReturnType<typeof setUsername>;
const initState: User = {
    username: ""
}

export default function user(state: User = initState, action: userAction): User {
    switch (action.type) {
        case SETUSERNAME:
            return {
                username: action.payload
            }
        default:
            return state
    }
}