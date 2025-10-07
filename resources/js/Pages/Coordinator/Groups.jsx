import CoordinatorLayout from "@/Layouts/Coordinator";
import { usePage } from "@inertiajs/react";
import { useState } from "react";

export default function Groups() {
    const { groups } = usePage().props;
    const [selectedGroup, setSelectedGroup] = useState(null);

    return (
        <CoordinatorLayout title="Groups">
            <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="flex flex-col md:flex-row">
                    {/* LEFT SIDEBAR */}
                    <aside className="w-full md:w-1/3 border-b md:border-b-0 md:border-r bg-gray-50 p-6">
                        <h1 className="text-xl font-semibold text-gray-800 mb-5">
                            Groups Overview
                        </h1>

                        {groups.length === 0 ? (
                            <p className="text-gray-500 text-sm">
                                No groups available.
                            </p>
                        ) : (
                            <div className="space-y-2">
                                {groups.map((group) => (
                                    <button
                                        key={group.id}
                                        onClick={() => setSelectedGroup(group)}
                                        className={`w-full text-left p-3 rounded-xl border transition ${
                                            selectedGroup?.id === group.id
                                                ? "bg-blue-100 border-blue-500"
                                                : "border-gray-200 bg-white"
                                        }`}
                                    >
                                        <p className="font-medium text-gray-800">
                                            {group.name}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            {group.section}
                                        </p>
                                    </button>
                                ))}
                            </div>
                        )}
                    </aside>

                    {/* RIGHT CONTENT */}
                    <main className="flex-1 p-6">
                        {selectedGroup ? (
                            <div className="space-y-6">
                                <div>
                                    <h2 className="text-2xl font-semibold text-gray-800 mb-1">
                                        {selectedGroup.name} -{" "}
                                        {selectedGroup.section}
                                    </h2>
                                    <p className="text-gray-600">
                                        Instructor:{" "}
                                        <span className="font-medium text-gray-800">
                                            {selectedGroup.instructor
                                                ? `${selectedGroup.instructor.firstname} ${selectedGroup.instructor.lastname}`
                                                : "N/A"}
                                        </span>
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800 mb-3">
                                        Student Members
                                    </h3>
                                    {selectedGroup.students.length === 0 ? (
                                        <p className="text-gray-500">
                                            No students assigned.
                                        </p>
                                    ) : (
                                        <div className="grid sm:grid-cols-2 gap-3">
                                            {selectedGroup.students.map(
                                                (student) => (
                                                    <div
                                                        key={student.id}
                                                        className="border border-gray-200 rounded-xl p-3"
                                                    >
                                                        <p className="font-medium text-gray-800">
                                                            {student.firstname}{" "}
                                                            {student.lastname}
                                                        </p>
                                                        <p className="text-sm text-gray-500">
                                                            {student.email}
                                                        </p>
                                                        {student.student_profile && (
                                                            <p className="text-xs text-gray-500 mt-1">
                                                                ID:{" "}
                                                                {
                                                                    student
                                                                        .student_profile
                                                                        .school_id
                                                                }{" "}
                                                                | Year:{" "}
                                                                {
                                                                    student
                                                                        .student_profile
                                                                        .year_level
                                                                }
                                                            </p>
                                                        )}
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 py-20">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-12 h-12 mb-3 text-gray-400"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 4.5v15m7.5-7.5h-15"
                                    />
                                </svg>
                                <p className="text-sm">
                                    Select a group from the left panel to view
                                    its members.
                                </p>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </CoordinatorLayout>
    );
}
