import request from "./api";

export const getWorkers = async (token) => {
    return request("/workers", "GET", null, token);
};

export const addWorker = async (workerData, token) => {
    return request("/workers", "POST", workerData, token);
};
