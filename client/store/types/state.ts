export interface User {
    username: string;
}
export interface AIStudios {
    appId: string;
    platform: string;
    isClientToken: boolean;
    token: string;
    uuid: string;
    clientHostname: string;
    sdk_v: string;
}
export interface tokenInfo {
    token: string;
    tokenExpire: string;
}