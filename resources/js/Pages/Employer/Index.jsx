import React from "react";
import { Link, usePage } from "@inertiajs/react";
import EmployerLayout from "@/Layouts/EmployerLayout";

export default function Index({ auth, employer }) {
    return (
        <EmployerLayout>
            <div className="max-w-4xl mx-auto p-6 space-y-6">
                {employer ? (
                    <div className="bg-white rounded-2xl shadow p-6 flex flex-col md:flex-row gap-6">
                        <div className="flex-shrink-0">
                            {employer.picture ? (
                                <img
                                    src={`/${employer.picture}`}
                                    alt="Profile"
                                    className="w-32 h-32 rounded-xl object-cover border"
                                />
                            ) : (
                                <div className="w-32 h-32 bg-gray-200 flex items-center justify-center text-gray-500 rounded-xl">
                                    No Image
                                </div>
                            )}
                        </div>

                        <div className="flex-1">
                            <h2 className="text-xl font-bold text-gray-800">
                                {employer.company_name}
                            </h2>
                            <p className="text-gray-600 mt-1">
                                {employer.contact_name} —{" "}
                                {employer.contact_number}
                            </p>
                            <p className="text-gray-500 text-sm mt-1">
                                {employer.company_email}
                            </p>
                            <p className="text-gray-500 text-sm mt-1 italic">
                                {employer.company_address}
                            </p>
                            {employer.website && (
                                <p className="text-sm text-blue-500 mt-2">
                                    <a
                                        href={employer.website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="underline"
                                    >
                                        {employer.website}
                                    </a>
                                </p>
                            )}
                            {employer.description && (
                                <p className="text-sm text-gray-700 mt-4">
                                    {employer.description}
                                </p>
                            )}
                            <div className="mt-4">
                                <Link
                                    href={`/employers/${employer.id}/edit`}
                                    className="text-blue-600 hover:underline text-sm"
                                >
                                    ✏️ Edit Profile
                                </Link>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-gray-500 text-center">
                        No profile found.
                    </div>
                )}
            </div>
        </EmployerLayout>
    );
}
