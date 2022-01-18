import axios from 'axios';
import { User } from '../types/user';
import config from '../config';

export default class AccountService {
    public getAccessToken() {
        return sessionStorage.getItem('accessToken');
    }

    // API - Get Profile.
    public async getProfile() {
        const accessToken = this.getAccessToken();
        const checkAccessToken = accessToken !== null ? accessToken : '';

        const res = await axios.get(
            config.apiServer + '/account/profile', 
            { 
                headers: {
                    'x-access-token': checkAccessToken
                }
            }
        ).catch(function (error) {
            console.log(error);
          if (error.response) {
            return error.response;
          }
        });
        
        console.log(res);
        return res.data;
    }

    // API - Register
    public async register(user: User) {
        const res = await axios.post(
            config.apiServer + '/account/register', 
            user
        ).catch(function (error) {
            console.log(error);
          if (error.response) {
            return error.response;
          }
        });
        
        return res.data;
    }

    // API = Login
    public async login(email: string, password: string) {
        try{
            const res = await axios.post(
                config.apiServer + '/account/login', 
                {email: email, password: password}
            );

            if(res.data) {
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
        } catch(error) {
            return { 
                type: 'error',
                message: 'Please check your ID and Password'
            };
        }
    }
}