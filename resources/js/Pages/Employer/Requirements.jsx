import EmployerLayout from "@/Layouts/EmployerLayout";
import React from "react";
import { Head, Link } from "@inertiajs/react";

export default function Requirements({ requirements }) {
    return (
        <EmployerLayout>
            <Head title="Requirements Management" />

            <main className="h-screen w-full flex flex-col items-center justify-start">
                <div className="h-10 w-10/12 flex">
                    <h1 className="text-2xl font-bold mb-6 text-left">
                        Manage Requirements
                    </h1>
                </div>

                <table className="table-auto w-10/12 border border-gray-300 rounded-md mt-3">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="px-4 py-3 text-left">
                                Student Name
                            </th>
                            <th className="px-4 py-3 text-left">
                                Requirement Status
                            </th>
                            <th className="px-4 py-3 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requirements.length > 0 ? (
                            requirements.map((requirement) => (
                                <tr
                                    key={requirement.id}
                                    className="hover:bg-gray-50 transition"
                                >
                                    <td className="border px-4 py-3">
                                        {requirement.user.name}
                                    </td>
                                    <td className="border px-4 py-3 capitalize">
                                        {requirement.status}
                                    </td>
                                    <td className="border px-4 py-3">
                                        <a
                                            href={route(
                                                "employer.requirements.view",
                                                requirement.id
                                            )}
                                            className="px-4 py-2 border border-black text-black rounded hover:bg-black hover:text-white transition text-sm"
                                        >
                                            View Details
                                        </a>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="3"
                                    className="text-center py-6 text-gray-500"
                                >
                                    No requirements found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </main>
        </EmployerLayout>
    );
}
