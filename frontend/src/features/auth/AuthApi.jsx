import { axiosi } from "../../config/axios";

// Generic function to handle API requests
const apiRequest = async (method, url, data = {}) => {
  try {
    const response = method === 'get' ? await axiosi.get(url) : await axiosi.post(url, data);
    return response.data;
  } catch (error) {
    // Better error handling with fallback messages
    const errorMessage = error.response.data.message || error.message || "An error occurred. Please try again.";
    console.log(error.response.data)
    throw new Error(errorMessage);
  }
};

// Signup
export const signup = async (cred) => apiRequest('post', "auth/signup", cred);

// Login
export const login = async (cred) => apiRequest('post', "auth/login", cred);

// Verify OTP
export const verifyOtp = async (cred) => apiRequest('post', "auth/verify-otp", cred);

// Resend OTP
export const resendOtp = async (cred) => apiRequest('post', "auth/resend-otp", cred);

// Forgot Password
export const forgotPassword = async (cred) => apiRequest('post', "auth/forgot-password", cred);

// Reset Password
export const resetPassword = async (cred) => apiRequest('post', "auth/reset-password", cred);

// Check Authentication
export const checkAuth = async () => apiRequest('get', "auth/check-auth");

// Logout
export const logout = async () => apiRequest('get', "auth/logout");
