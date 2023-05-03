import { AxiosError, AxiosRequestConfig } from 'axios'
import { getAuth } from 'firebase/auth';
import {useDispatch} from "react-redux";
import axiosApiGatewayInstance from './baseApi'
import { exchangeIdTokenForRefreshToken } from './refreshToken'

const setUpInterceptor = () => {
    const auth = getAuth();
    const token = localStorage.getItem('token')
    const refreshToken = localStorage.getItem('refreshToken')
    const handleError = async (error) => Promise.reject(error)

    axiosApiGatewayInstance.interceptors.request.use(
        (config) => {
            if (token) {
                console.log('File: setupInterceptor.js, Line 16:  ');
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => Promise.reject(error)
    )

    axiosApiGatewayInstance.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest = error.config;

            if (error.response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;

                try {
                    // Get the new token
                    const newToken = await exchangeIdTokenForRefreshToken(refreshToken);

                    // Update the token in the Redux store
                    const dispatch = useDispatch();
                    localStorage.setItem('token', newToken.idToken);
                    localStorage.setItem('user', newToken.displayName);
                    localStorage.setItem('refreshToken', newToken.refreshToken);
                    localStorage.setItem('userId', newToken.localId);


                    // Set the new token in the Authorization header
                    originalRequest.headers.Authorization = `Bearer ${newToken}`;

                    // Resend the original request with the new token
                    return axiosApiGatewayInstance(originalRequest);
                } catch (error) {
                    console.error(error);
                    throw new Error('Failed to refresh token');
                }
            }

            return Promise.reject(error);
        }
    );
}

export default setUpInterceptor