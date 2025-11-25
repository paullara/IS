import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Inertia } from "@inertiajs/inertia";
import { Link } from "@inertiajs/react";

export default function StudentGroups({ groups = [] }) {
    return (
        <AuthenticatedLayout>
            <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
                <h1 className="text-2xl font-bold mb-4">My Groups</h1>
                {groups.length === 0 && (
                    <div className="text-gray-500">
                        You are not assigned to any group.
                    </div>
                )}
                {groups.map((group) => (
                    <Link
                        key={group.id}
                        href={route("student.groups.show", group.id)}
                        className="block border rounded p-3 mb-2 hover:bg-gray-50"
                    >
                        <div className="font-bold">{group.name}</div>
                    </Link>
                ))}
            </div>
        </AuthenticatedLayout>
    );
}
