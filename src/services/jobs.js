import request from "./api";

export const getJobs = async (token) => {
    return request("/jobs", "GET", null, token);
};

export const addJob = async (jobData, token) => {
    return request("/jobs", "POST", jobData, token);
};
