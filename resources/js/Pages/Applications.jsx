import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import React from "react";
import { usePage } from "@inertiajs/react";

export default function Applications() {
    const { applications, studentProfile } = usePage().props;

    return (
        <AuthenticatedLayout>
            <main className="w-full flex items-center justify-center">
                {" "}
                <div className="w-10/12 p-6 bg-gray-50 min-h-screen">
                    <div className="flex gap-8">
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
                                {applications.map((app) => (
                                    <div
                                        key={app.id}
                                        className="bg-white border border-gray-200 rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300"
                                    >
                                        <div className="text-xl font-medium text-gray-800">
                                            <strong>Internship:</strong>{" "}
                                            {app.internship?.title ?? "N/A"}
                                        </div>
                                        <div className="text-sm text-gray-600 mt-2">
                                            <strong>Applied on:</strong>{" "}
                                            {new Date(
                                                app.created_at
                                            ).toLocaleDateString()}
                                        </div>
                                        <div className="text-sm text-gray-600 mt-2">
                                            <strong>Status:</strong>{" "}
                                            <span
                                                className={`capitalize text-${
                                                    app.status === "accepted"
                                                        ? "green"
                                                        : app.status ===
                                                          "rejected"
                                                        ? "red"
                                                        : "yellow"
                                                }-500`}
                                            >
                                                {app.status}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </AuthenticatedLayout>
    );
}
