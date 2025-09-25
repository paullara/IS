import React from "react";
import { usePage, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Notification() {
    const { notifications, studentProfile } = usePage().props;

    const handleMarkAsRead = (id) => {
        router.post(`/notifications/${id}/read`);
    };

    return (
        <AuthenticatedLayout
            user={studentProfile?.user}
            studentProfile={studentProfile}
        >
            <main className="w-full flex items-center justify-center">
                {" "}
                <div className="w-10/12 p-6 flex space-x-6">
                    <aside className="w-1/3 bg-white border rounded-xl shadow-sm overflow-hidden">
                        <div className="h-32 bg-gradient-to-r from-indigo-500 to-purple-500 relative">
                            {studentProfile?.picture && (
                                <img
                                    src={`/profiles/${studentProfile.picture}`}
                                    alt="Profile"
                                    className="w-24 h-24 object-cover rounded-full border-4 border-white absolute -bottom-12 left-6"
                                />
                            )}
                        </div>

                        {/* Profile Content */}
                        <div className="pt-16 px-6 pb-6 space-y-4">
                            {studentProfile ? (
                                <>
                                    <div className="space-y-1">
                                        <h2 className="text-lg font-semibold text-gray-900">
                                            {studentProfile.firstname}{" "}
                                            {studentProfile.lastname}
                                        </h2>
                                        <p className="text-sm text-gray-500">
                                            {studentProfile.year_level} Year
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            School ID:{" "}
                                            {studentProfile.school_id}
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="text-md font-semibold mb-2">
                                            Skills
                                        </h3>
                                        <p className="text-gray-700 text-sm">
                                            {studentProfile.skills ||
                                                "No skills listed."}
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="text-md font-semibold mb-2">
                                            Bio
                                        </h3>
                                        <p className="text-gray-700 text-sm">
                                            {studentProfile.bio ||
                                                "No bio provided."}
                                        </p>
                                    </div>
                                </>
                            ) : (
                                <p className="text-gray-500">
                                    No profile found.
                                </p>
                            )}
                        </div>
                    </aside>

                    <div className="w-2/3">
                        <div className="space-y-6">
                            {notifications.map((notif) => (
                                <div
                                    key={notif.id}
                                    className={`bg-white border ${
                                        notif.read_at
                                            ? "border-gray-200"
                                            : "border-yellow-300"
                                    } rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300`}
                                >
                                    <div className="text-gray-800">
                                        <p className="text-base">
                                            {notif.data.message}
                                            {notif.data.url && (
                                                <a
                                                    href={notif.data.url}
                                                    className="text-blue-500 underline ml-2"
                                                >
                                                    Complete Requirements
                                                </a>
                                            )}
                                        </p>
                                    </div>
                                    {!notif.read_at && (
                                        <button
                                            className="text-sm text-blue-600 underline mt-4 block"
                                            onClick={() =>
                                                handleMarkAsRead(notif.id)
                                            }
                                        >
                                            Mark as Read
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </AuthenticatedLayout>
    );
}
