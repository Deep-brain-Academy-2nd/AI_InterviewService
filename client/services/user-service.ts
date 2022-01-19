import axios from 'axios';
import { User } from '../types/user';
import config from '../config';

// API - Get Profile.
export const getProfile = async () => {
    
    // Get the token from session storage
    const accessToken = typeof window !== 'undefined' ? sessionStorage.getItem('accessToken') : null;
    const checkAccessToken = accessToken !== null ? accessToken : '';

    const res = await axios.get(
        config.apiServer + '/account/profile',
        {
            headers: {
                'x-access-token': checkAccessToken
            }
        }
    ).catch(function (error) {
        if (error.response) {
            return error.response;
        }
    });

    return res.data;
}

// API - Register
export const register = async (user: User) => {
    const res = await axios.post(
        config.apiServer + '/account/register',
        user
    ).catch(function (error) {
        if (error.response) {
            return error.response;
        }
    });

    return res.data;
}

// API = Login
export const login = async (email: string, password: string) => {
    try {
        const res = await axios.post(
            config.apiServer + '/account/login',
            { email: email, password: password }
        );

        if (res.data) {
            let token: string = res.data['token'];

            // Store the token in session storage.
            sessionStorage.setItem("accessToken", token);

            return {
                type: 'success',
                name: res.data['name'],
                message: token,
            }
        }
        return {
            type: 'error',
            message: 'no token'
        }
    } catch (error) {
        return {
            type: 'error',
            message: 'Please check your ID and Password'
        };
    }
}
