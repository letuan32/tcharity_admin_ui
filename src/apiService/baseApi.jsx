import axios from 'axios';
// Get the base URL from the environment variables
const BASE_API_GATEWAY_URL = process.env.REACT_APP_API_GATEWAY;

// Create an Axios instance with the base URL and auth token header
const axiosApiGatewayInstance = axios.create({

    baseURL: BASE_API_GATEWAY_URL,
    headers: {
        "Content-Type": "application/json",
    },
});
export default axiosApiGatewayInstance;

// Make a POST request to the API endpoint with the provided request body
export const createPostAsync = async (postData) => {
    try {
        const response = await axiosApiGatewayInstance.post('/post', postData);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to create post');
    }
};


export const updatePostApproveStatusAsync = async (postData) => {
    try {
        const response = await axiosApiGatewayInstance.post('/post/approve', postData);
        alert("Successfully Updated");
        window.location.reload();
    } catch (error) {
        alert("Successfully Updated");
        window.location.reload();
        throw new Error('Failed to update post approve status');
    }
};

export const disburseDonation = async (postId, userEmail) => {
    try {
        const response = await axiosApiGatewayInstance.post('/donation/disburse', {
            postId,
            userEmail
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to disburse donation');
    }
};

