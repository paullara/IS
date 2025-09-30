import React, { useEffect, useState } from "react";
import Coordinator from "@/Layouts/Coordinator";
import axios from "axios";

export default function Notification() {
    const [notifications, setNotifications] = useState([]);

    // Fetch all notifications (read + unread)
    const fetchNotifications = async () => {
        try {
            const res = await axios.get("/notifications/json");
            setNotifications(res.data);
        } catch (error) {
            console.error("Error fetching notifications:", error);
        }
    };

    useEffect(() => {
        fetchNotifications();
        const interval = setInterval(fetchNotifications, 5000); // poll every 5s
        return () => clearInterval(interval);
    }, []);

    // Mark single notification as read
    const markAsRead = async (id) => {
        try {
            await axios.post(`/notifications/${id}/read`);
            fetchNotifications();
        } catch (error) {
            console.error("Error marking notification as read:", error);
        }
    };

    // Mark all notifications as read
    const markAllAsRead = async () => {
        try {
            await axios.post(`/notifications/read-all`);
            fetchNotifications();
        } catch (error) {
            console.error("Error marking all as read:", error);
        }
    };

    return (
        <Coordinator>
            <div className="flex w-full">
                <div className="w-full bg-white shadow-lg border-l h-screen overflow-y-auto p-4">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold">Notifications 🔔</h2>
                        {notifications.length > 0 && (
                            <button
                                onClick={markAllAsRead}
                                className="text-sm text-blue-600 hover:underline"
                            >
                                Mark all as read
                            </button>
                        )}
                    </div>

                    {notifications.length > 0 ? (
                        notifications.map((n) => (
                            <div
                                key={n.id}
                                className={`p-3 mb-3 border rounded-lg flex justify-between items-start transition ${
                                    n.read_at
                                        ? "bg-gray-100 text-gray-500"
                                        : "bg-blue-50 text-gray-800"
                                }`}
                            >
                                <div>
                                    <p
                                        className={`font-semibold ${
                                            n.read_at
                                                ? "text-gray-500"
                                                : "text-gray-800"
                                        }`}
                                    >
                                        {n.data.internship}
                                    </p>
                                    <p className="text-sm">
                                        Severity:{" "}
                                        <span
                                            className={`${
                                                n.data.severity === "Critical"
                                                    ? "text-red-700 font-bold"
                                                    : n.data.severity === "High"
                                                    ? "text-red-500 font-semibold"
                                                    : "text-gray-700"
                                            }`}
                                        >
                                            {n.data.severity}
                                        </span>
                                    </p>
                                    <p className="text-xs text-gray-400 mt-1">
                                        {n.created_at
                                            ? new Date(
                                                  n.created_at
                                              ).toLocaleString()
                                            : ""}
                                    </p>
                                </div>

                                {!n.read_at ? (
                                    <button
                                        onClick={() => markAsRead(n.id)}
                                        className="text-xs text-blue-500 hover:underline"
                                    >
                                        Mark as read
                                    </button>
                                ) : (
                                    <span className="text-xs italic text-gray-400">
                                        Read
                                    </span>
                                )}
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500 text-sm">
                            No notifications
                        </p>
                    )}
                </div>
            </div>
        </Coordinator>
    );
}
