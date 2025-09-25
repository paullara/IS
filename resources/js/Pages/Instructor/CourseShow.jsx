import InstructorLayout from "@/Layouts/Instructor";
import { usePage, Link } from "@inertiajs/react";
import { useState } from "react";

export default function InstructorCourseShow() {
    const { course, instructors, students, announcements, documents } =
        usePage().props;
    const [activeTab, setActiveTab] = useState("instructors");

    return (
        <InstructorLayout title={`Course: ${course.name}`}>
            <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
                <h1 className="text-2xl font-bold mb-4">
                    {course.name} ({course.code})
                </h1>

                <div className="flex gap-4 mb-6 border-b pb-2">
                    {[
                        "instructors",
                        "students",
                        "documents",
                        "announcements",
                    ].map((tab) => (
                        <button
                            key={tab}
                            className={`px-3 py-1 rounded-t ${
                                activeTab === tab
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-200 text-gray-700"
                            }`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    ))}
                </div>

                {activeTab === "instructors" && (
                    <div>
                        <h2 className="text-xl font-semibold mb-2">
                            Instructors
                        </h2>
                        {instructors.length === 0 ? (
                            <div className="text-gray-500">
                                No instructors assigned.
                            </div>
                        ) : (
                            <ul>
                                {instructors.map((i) => (
                                    <li key={i.id} className="border-b py-2">
                                        {i.name} ({i.email})
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                )}

                {activeTab === "students" && (
                    <div>
                        <h2 className="text-xl font-semibold mb-2">Students</h2>
                        {students.length === 0 ? (
                            <div className="text-gray-500">
                                No students enrolled.
                            </div>
                        ) : (
                            <ul>
                                {students.map((s) => (
                                    <li key={s.id} className="border-b py-2">
                                        <div>
                                            {s.name} ({s.email})
                                        </div>
                                        {s.student_profile && (
                                            <div className="text-sm text-gray-600">
                                                School ID:{" "}
                                                {s.student_profile.school_id}{" "}
                                                <br />
                                                Year Level:{" "}
                                                {
                                                    s.student_profile.year_level
                                                }{" "}
                                                <br />
                                                Status:{" "}
                                                {s.student_profile.status}
                                            </div>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                )}

                {activeTab === "documents" && (
                    <div>
                        <h2 className="text-xl font-semibold mb-2">
                            Documents
                        </h2>
                        {documents && documents.length > 0 ? (
                            <ul>
                                {documents.map((doc) => (
                                    <li
                                        key={doc.id}
                                        className="border-b py-2 flex items-center justify-between"
                                    >
                                        <span>{doc.title || doc.name}</span>
                                        {doc.file_path && (
                                            <a
                                                href={
                                                    doc.file_path.startsWith(
                                                        "http"
                                                    )
                                                        ? doc.file_path
                                                        : `/documents/${doc.file_path.replace(
                                                              /^.*[\\\/]/,
                                                              ""
                                                          )}`
                                                }
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:underline ml-2"
                                            >
                                                View
                                            </a>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="text-gray-500">
                                No documents available.
                            </div>
                        )}
                    </div>
                )}

                {activeTab === "announcements" && (
                    <div>
                        <h2 className="text-xl font-semibold mb-2">
                            Announcements
                        </h2>
                        {announcements && announcements.length > 0 ? (
                            <ul>
                                {announcements.map((a) => (
                                    <li key={a.id} className="border-b py-2">
                                        <div className="font-semibold">
                                            {a.title}
                                        </div>
                                        <div className="text-gray-700">
                                            {a.body}
                                        </div>
                                        <div className="text-xs text-gray-500 mt-1">
                                            Posted:{" "}
                                            {new Date(
                                                a.created_at
                                            ).toLocaleString()}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="text-gray-500">
                                No announcements yet.
                            </div>
                        )}
                    </div>
                )}

                <div className="mt-6">
                    <Link
                        href={route("instructor.courses")}
                        className="text-blue-600 hover:underline"
                    >
                        Back to Courses
                    </Link>
                </div>
            </div>
        </InstructorLayout>
    );
}
