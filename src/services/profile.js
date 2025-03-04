import request from "./api";

export const getProfile = async (token) => {
    return request("/profile", "GET", null, token);
};

export const updateProfile = async (profileData, token) => {
    return request("/profile", "PATCH", profileData, token);
};
