import { combineReducers } from "redux";
import user from "./user";
import aiStudios from "./aistudios";
import tokenInfo from "./tokenInfo";

const rootReducer = combineReducers({
    user,
    aiStudios,
    tokenInfo
})

export default rootReducer

export type RootState = ReturnType<typeof rootReducer>;
