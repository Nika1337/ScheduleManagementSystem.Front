import request from "./api";

export const getSchedules = async (startDate, endDate, token) => {
    return request(`/schedules?startDate=${startDate}&endDate=${endDate}`, "GET", null, token);
};

export const addSchedule = async (scheduleData, token) => {
    return request("/schedules", "POST", scheduleData, token);
};

export const changeSchedule = async (id, scheduleData, token) => {
    return request(`/schedules/${id}`, "PATCH", scheduleData, token);
};
