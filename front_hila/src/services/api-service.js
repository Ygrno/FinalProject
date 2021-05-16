import axios from "axios";

const config = {
    headers: { 'Content-Type': 'application/json' }
};

const client = axios.create(config);
const registerLoginBaseUrl = "https://amuta-login-and-register.herokuapp.com";

export const register = (data) => {
    return client.post(`${registerLoginBaseUrl}/register`, data)
};

export const login = (data) => {
    return client.post(`${registerLoginBaseUrl}/login`, data)
};

export const logout = data => {
    return client.post(`${registerLoginBaseUrl}/logout`, data)
};

export const uploadImg = data => {
    return client.post(`${registerLoginBaseUrl}/upload_doc`, data)
};
