import { createContext, useState, useContext } from "react";

// Create Context
const AppContext = createContext();

// Mock roles (these will be fetched from backend in the future)
const mockRoles = ["Worker", "Manager", "Admin"];

// Mock employees
const mockEmployees = [
    { id: 1, name: "John", surname: "Doe", email: "john.doe@example.com", startDate: "2025-02-15", role: "Worker" },
    { id: 2, name: "Jane", surname: "Smith", email: "jane.smith@example.com", startDate: "2025-02-20", role: "Manager" },
];

// Mock user profile
const mockUser = {
    firstName: "John",
    surname: "Doe",
    email: "john.doe@example.com",
    avatar: "https://i.pravatar.cc/150?img=3", // Placeholder user image
};

// Mock shifts
const mockShifts = [
    { id: 1, job: "Barista", worker: "Adams, Co", date: "2025-02-18", partOfDay: "Evening" },
    { id: 2, job: "Waiter", worker: "Aguirre, Ha", date: "2025-02-22", partOfDay: "Afternoon" },
];

// Mock parts of the day
const mockPartsOfDay = ["Morning", "Afternoon", "Evening"];

export const AppProvider = ({ children }) => {
    const [employees, setEmployees] = useState(mockEmployees);
    const [roles] = useState(mockRoles);
    const [user, setUser] = useState(mockUser);
    const [shifts, setShifts] = useState(mockShifts);
    const [partsOfDay] = useState(mockPartsOfDay); // Store parts of the day

    return (
        <AppContext.Provider value={{ employees, setEmployees, roles, user, setUser, shifts, setShifts, partsOfDay }}>
            {children}
        </AppContext.Provider>
    );
};

// Custom Hook to use the AppContext
export const useAppContext = () => useContext(AppContext);
