import React from "react";
import { usePage, router } from "@inertiajs/react";
import EmployerLayout from "@/Layouts/EmployerLayout";

export default function Notification() {
    const { notifications } = usePage().props;

    const markAsRead = (id) => {
        router.post(`/notifications/${id}/read`);
    };

    return (
        <EmployerLayout>
            <div className="p-6">
                <h2 className="text-2xl font-semibold mb-4">Notifications</h2>
                <ul className="space-y-3">
                    {notifications.map((n) => (
                        <li
                            key={n.id}
                            className={`p-4 rounded border ${
                                n.read_at ? "bg-gray-100" : "bg-blue-100"
                            }`}
                        >
                            <p>{n.data.message}</p>
                            {!n.read_at && (
                                <button
                                    onClick={() => markAsRead(n.id)}
                                    className="text-sm text-blue-600 underline mt-2"
                                >
                                    Mark as Read
                                </button>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </EmployerLayout>
    );
}
