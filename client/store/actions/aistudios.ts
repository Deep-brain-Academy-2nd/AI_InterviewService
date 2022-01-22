import { SETAISTUDIOTOKEN } from "./actionTypes"
import { AIStudios } from "../types/state"

export const setAIStudiosToken = (payload: AIStudios) => ({
    type: SETAISTUDIOTOKEN,
    payload: payload
});