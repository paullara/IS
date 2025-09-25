import React from "react";
import { Link, usePage, router } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";

export default function Notification() {
    const { notifications } = usePage().props;

    const markAsRead = (id) => {
        router.post(
            `/admin/notifications/read/${id}`,
            {},
            {
                preserveScroll: true,
                onSuccess: () => {
                    router.reload({ only: ["notifications"] });
                },
            }
        );
    };

    return (
        <AdminLayout>
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">Notifications</h1>

                {notifications.length === 0 ? (
                    <div className="text-gray-500">No notifications yet.</div>
                ) : (
                    <ul className="space-y-4">
                        {notifications.map((notif) => (
                            <li
                                key={notif.id}
                                className={`p-4 rounded shadow ${
                                    notif.read_at ? "bg-gray-100" : "bg-blue-50"
                                }`}
                            >
                                <div className="text-sm">
                                    {notif.data.message}
                                </div>
                                <div className="text-xs text-gray-500 mt-1">
                                    {new Date(
                                        notif.created_at
                                    ).toLocaleString()}
                                </div>
                                {!notif.read_at && (
                                    <button
                                        onClick={() => markAsRead(notif.id)}
                                        className="text-blue-600 hover:underline text-sm mt-2"
                                    >
                                        Mark as Read
                                    </button>
                                )}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </AdminLayout>
    );
}
