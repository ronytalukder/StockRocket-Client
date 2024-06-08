// Function to set the authentication token in localStorage
export function setAuthToken(token) {
    localStorage.setItem("authToken", token);
}

// Function to retrieve the authentication token from localStorage
export function getAuthToken() {
    return localStorage.getItem("authToken");
}

// Function to set user details in localStorage, stored as a JSON string
export function setUserDetails(userDetails) {
    localStorage.setItem("userDetails", JSON.stringify(userDetails));
}

// Function to retrieve user details from localStorage, parsed from a JSON string
export function getUserDetails() {
    return JSON.parse(localStorage.getItem("userDetails"));
}

// Function to set the user's email in localStorage
export function setEmail(email) {
    localStorage.setItem("email", email);
}

// Function to retrieve the user's email from localStorage
export function getEmail() {
    return localStorage.getItem("email");
}

// Function to set the OTP (One-Time Password) in localStorage
export function setOTP(otp) {
    localStorage.setItem("otp", otp);
}

// Function to retrieve the OTP from localStorage
export function getOTP() {
    return localStorage.getItem("otp");
}

// Function to clear all items from localStorage and redirect to the login page
export function clearAllSessions() {
    localStorage.clear();
    window.location.href = "/login";
}
