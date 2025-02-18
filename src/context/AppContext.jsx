import { createContext, useState, useContext, useEffect } from "react";

const AppContext = createContext();

const mockRoles = ["Worker", "Manager", "Admin"];

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

const mockUser = {
    firstName: "John",
    surname: "Doe",
    email: "john.doe@example.com",
    avatar: "https://i.pravatar.cc/150?img=3",
    role: "Admin",
};

const mockShifts = [
    { id: 1, job: "Barista", worker: "Adams, Co", date: "2025-02-18", partOfDay: "Evening" },
    { id: 2, job: "Waiter", worker: "Aguirre, Ha", date: "2025-02-22", partOfDay: "Afternoon" },
];

const mockPartsOfDay = ["Morning", "Afternoon", "Evening"];

export const AppProvider = ({ children }) => {
    const [employees, setEmployees] = useState(mockEmployees);
    const [roles] = useState(mockRoles);
    const [user, setUser] = useState(mockUser);
    const [shifts, setShifts] = useState(mockShifts);
    const [partsOfDay] = useState(mockPartsOfDay);
    const [jobs, setJobs] = useState(mockJobs);

    const [userRole, setUserRole] = useState(user?.role || "Worker");

    useEffect(() => {
        setUserRole(user?.role || "Worker");
    }, [user]);

    console.log("Current userRole:", userRole);

    return (
        <AppContext.Provider value={{
            employees, setEmployees,
            roles,
            user, setUser, userRole,
            shifts, setShifts,
            partsOfDay,
            jobs, setJobs
        }}>
            {children}
        </AppContext.Provider>
    );
};

// Custom Hook to use the AppContext
export const useAppContext = () => useContext(AppContext);
