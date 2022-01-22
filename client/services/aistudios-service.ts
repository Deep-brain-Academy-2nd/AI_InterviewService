import axios from 'axios';
import { aistudios } from '../types/aistudios';

// Generate Client Token
export const generateClientToken = async () => {

    const res = await axios.get(
        '/api/odin/generateClientToken?appId=aistudios.com&userKey=6443234b-77d5-4013-bfd6-bb9399f317d9'
    ).catch(function (error) {
        if (error.response) {
            return error.response;
        }
    });

    return res.data;
}

// Generate Token
export const generateToken = async (token: string) => {

    const res = await axios.post('/api/odin/generateToken', {
        appId: "aistudios.com",
        platform: 'web',
        isClientToken: true,
        token: token,
        uuid: "6443234b-77d5-4013-bfd6-bb9399f317d9",
        sdk_v: '1.0',
        clientHostname: 'aistudios.com',
      }).catch(function (error) {
        if (error.response) {
            return error.response;
        }
    });

    return res.data;

}

// Get Model List
export const getModelList = async (param: aistudios) => {

    const res = await axios.post('/api/odin/getModelList', param
      ).catch(function (error) {
        if (error.response) {
            return error.response;
        }
    });

    return res.data;
}