import React from "react";
import { Inertia } from "@inertiajs/inertia";

export default function StudentGroups({ groups = [] }) {
    return (
        <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
            <h1 className="text-2xl font-bold mb-4">My Groups</h1>
            {groups.length === 0 && (
                <div className="text-gray-500">
                    You are not assigned to any group.
                </div>
            )}
            {groups.map((group) => (
                <div
                    key={group.id}
                    className="border rounded p-3 mb-2 cursor-pointer hover:bg-gray-50"
                    onClick={() => Inertia.get(`/groups/${group.id}`)}
                >
                    <div className="font-bold">{group.name}</div>
                    <div className="text-sm text-gray-600 mb-2">
                        Instructor: {group.instructor?.name}
                    </div>
                    <div className="text-sm text-gray-600">Students:</div>
                    <ul className="list-disc ml-6">
                        {(group.students || []).map((s) => (
                            <li key={s.id}>
                                {s.student_profile
                                    ? s.student_profile.first_name +
                                      " " +
                                      (s.student_profile.middle_name
                                          ? s.student_profile.middle_name + " "
                                          : "") +
                                      s.student_profile.last_name
                                    : s.name}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}
