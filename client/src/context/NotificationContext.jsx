import { createContext, useContext, useEffect, useState } from "react";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {

    const [notifications, setNotifications] = useState([]);

    useEffect(() => {

        const stored =
            JSON.parse(localStorage.getItem("notifications")) || [];

        setNotifications(stored);

    }, []);

    const addNotification = (message) => {

        const newNotification = {
            id: Date.now(),
            message,
            time: new Date().toLocaleTimeString(),
        };

        const updated = [newNotification, ...notifications];

        setNotifications(updated);

        localStorage.setItem(
            "notifications",
            JSON.stringify(updated)
        );

    };

    const clearNotifications = () => {

        setNotifications([]);

        localStorage.removeItem("notifications");

    };

    return (

        <NotificationContext.Provider
            value={{
                notifications,
                addNotification,
                clearNotifications,
            }}
        >

            {children}

        </NotificationContext.Provider>

    );

};

export const useNotifications = () => useContext(NotificationContext);