const API_BASE_URL = "http://localhost:5090";

const request = async (endpoint, method = "GET", body = null, token = null) => {
    const url = `${API_BASE_URL}${endpoint}`;
    const options = {
        method,
        headers: {
            "Accept": "application/json",
            "Authorization": token ? `Bearer ${token}` : undefined,
        },
    };

    if (body) {
        options.body = JSON.stringify(body);
        options.headers["Content-Type"] = "application/json";
    }

    const response = await fetch(url, options);
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Request failed");
    }
    return response.json().catch(() => null);
};

export default request;


