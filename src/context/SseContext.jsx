import { createContext, useRef, useEffect, useState } from "react";
import { fetchEventSource } from "@microsoft/fetch-event-source";
import { getToken, getUserRole, isAuthenticated } from "../hooks/useAuth";

export const SseContext = createContext(null);

export function SseProvider({ children }) {
    const subscribersRef = useRef(new Set());
    const [isListening, setIsListening] = useState(isAuthenticated());

    function addSubscriber(fn) {
        subscribersRef.current.add(fn);
        return () => subscribersRef.current.delete(fn);
    }

    useEffect(() => {
        const startSSE = () => {
            if (getUserRole() !== "Worker") return;

            const token = getToken();
            if (!token) return;

            const abortCtrl = new AbortController();

            fetchEventSource("http://localhost:5090/schedules/change-events", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "text/event-stream",
                },
                signal: abortCtrl.signal,

                onmessage(evt) {
                    try {
                        const data = JSON.parse(evt.data);
                        for (const fn of subscribersRef.current) {
                            fn(data);
                        }
                    } catch (err) {
                        console.error("Failed to parse SSE data:", err);
                    }
                },

                onerror(err) {
                    console.error("SSE error:", err);
                },
            });

            return () => {
                abortCtrl.abort();
            };
        };

        startSSE();

        const handleAuthChange = () => {
            setIsListening(isAuthenticated());
        };

        window.addEventListener("authChange", handleAuthChange);

        return () => {
            window.removeEventListener("authChange", handleAuthChange);
        };
    }, [isListening]);

    return <SseContext.Provider value={{ addSubscriber }}>{children}</SseContext.Provider>;
}
