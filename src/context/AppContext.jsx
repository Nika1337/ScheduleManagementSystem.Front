import { createContext, useState, useContext } from "react";

// Create Context
const AppContext = createContext();

// Mock users (Replace with API later)
const mockUsers = [
    { email: "admin@example.com", password: "password123", firstName: "Admin", surname: "User", role: "Admin" },
    { email: "worker@example.com", password: "workerpass", firstName: "Worker", surname: "Person", role: "Worker" },
];

// Mock roles (These will be fetched from backend in the future)
const mockRoles = ["Worker", "Admin"];

// Mock employees
const mockEmployees = [
    { id: 1, name: "John", surname: "Doe", email: "john.doe@example.com", startDate: "2025-02-15", role: "Worker" },
    { id: 2, name: "Jane", surname: "Smith", email: "jane.smith@example.com", startDate: "2025-02-20", role: "Manager" },
];

// Mock jobs
const mockJobs = [
    { id: 1, name: "Software Engineer" },
    { id: 2, name: "Product Manager" },
    { id: 3, name: "UX Designer" },
];

// Mock shifts
const mockShifts = [
    { id: 1, job: "Barista", worker: "Adams, Co", date: "2025-02-18", partOfDay: "Evening" },
    { id: 2, job: "Waiter", worker: "Aguirre, Ha", date: "2025-02-22", partOfDay: "Afternoon" },
];

// Mock schedule change requests
const mockScheduleRequests = [
    {
        id: "1",
        workerName: "John Doe",
        jobType: "Electrician",
        previousDate: "2025-02-15",
        previousPartOfDay: "Morning",
        newDate: "2025-02-16",
        newPartOfDay: "Evening",
        requestDate: "2025-02-10",
    },
    {
        id: "2",
        workerName: "Jane Smith",
        jobType: "Plumber",
        previousDate: "2025-02-17",
        previousPartOfDay: "Afternoon",
        newDate: "2025-02-18",
        newPartOfDay: "Morning",
        requestDate: "2025-02-11",
    },
];

// Mock parts of the day
const mockPartsOfDay = ["Morning", "Afternoon", "Evening"];

export const AppProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Stores authenticated user
    const [loginError, setLoginError] = useState(null); // Stores login error message
    const [employees, setEmployees] = useState(mockEmployees);
    const [roles] = useState(mockRoles); // Store employee roles
    const [jobs, setJobs] = useState(mockJobs);
    const [shifts, setShifts] = useState(mockShifts);
    const [scheduleRequests, setScheduleRequests] = useState(mockScheduleRequests);
    const [partsOfDay] = useState(mockPartsOfDay); // Parts of the day remain constant

    // Get user role dynamically
    const userRole = user?.role || "Guest"; // Default role if no user is logged in

    // Login function (Replace with real API call later)
    const loginUser = (email, password) => {
        const foundUser = mockUsers.find(user => user.email === email && user.password === password);

        if (foundUser) {
            setUser(foundUser);
            setLoginError(null);
            return true; // Success
        } else {
            setLoginError("Invalid email or password.");
            return false; // Failure
        }
    };

    // Logout function
    const logoutUser = () => {
        setUser(null);
    };

    return (
        <AppContext.Provider value={{
            user, userRole, setUser,
            loginUser, logoutUser, loginError,
            employees, setEmployees,
            roles, // Added roles for employees
            jobs, setJobs,
            shifts, setShifts,
            scheduleRequests, setScheduleRequests,
            partsOfDay
        }}>
            {children}
        </AppContext.Provider>
    );
};

// Custom Hook to use the AppContext
export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useAppContext must be used within an AppProvider");
    }
    return context;
};
