import request from "./api";

export const login = async (email, password) => {
    return request("/login", "POST", { email, password });
};

export const changePassword = async (currentPassword, newPassword, token) => {
    return request("/change-password", "POST", { currentPassword, newPassword }, token);
};

export const changeEmail = async (newEmail, token) => {
    return request("/change-email", "POST", { newEmail }, token);
};
