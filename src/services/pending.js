import request from "./api";

export const getPendingScheduleChanges = async (token) => {
    return request("/pending-schedule-changes", "GET", null, token);
};

export const withdrawPendingScheduleChange = async (id, token) => {
    return request(`/pending-schedule-changes/${id}/withdraw`, "POST", null, token);
};

export const rejectPendingScheduleChange = async (id, token) => {
    return request(`/pending-schedule-changes/${id}/reject`, "POST", null, token);
};

export const acceptPendingScheduleChange = async (id, token) => {
    return request(`/pending-schedule-changes/${id}/accept`, "POST", null, token);
};
