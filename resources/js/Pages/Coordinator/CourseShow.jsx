import Coordinator from "@/Layouts/Coordinator";
import { usePage, Link, useForm } from "@inertiajs/react";
import { useState } from "react";

export default function CourseShow() {
    const { course, instructors, students } = usePage().props;
    const [activeTab, setActiveTab] = useState("instructors");
    const [showAddInstructor, setShowAddInstructor] = useState(false);
    const [showAddStudent, setShowAddStudent] = useState(false);
    const instructorForm = useForm({ instructor_name: "" });
    const studentForm = useForm({ student_name: "" });

    // Remove instructor
    const handleRemoveInstructor = (instructorId) => {
        if (confirm("Remove this instructor from the course?")) {
            instructorForm.delete(
                route("coordinator.courses.removeInstructor", [
                    course.id,
                    instructorId,
                ])
            );
        }
    };
    // Remove student
    const handleRemoveStudent = (studentId) => {
        if (confirm("Remove this student from the course?")) {
            studentForm.delete(
                route("coordinator.courses.removeStudent", [
                    course.id,
                    studentId,
                ])
            );
        }
    };
    // Add instructor by name search
    const handleAddInstructor = (e) => {
        e.preventDefault();
        // Find instructor by name from a global list or via API (for now, just send the name to backend)
        instructorForm.post(
            route("coordinator.courses.addInstructor", course.id),
            {
                onSuccess: () => {
                    instructorForm.reset();
                    setShowAddInstructor(false);
                },
            }
        );
    };
    // Add student by name search
    const handleAddStudent = (e) => {
        e.preventDefault();
        // Find student by name from a global list or via API (for now, just send the name to backend)
        studentForm.post(route("coordinator.courses.addStudent", course.id), {
            onSuccess: () => {
                studentForm.reset();
                setShowAddStudent(false);
            },
        });
    };

    return (
        <Coordinator title={course.name + " Management"}>
            <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
                <h1 className="text-2xl font-bold mb-4">
                    {course.name} ({course.code})
                </h1>
                <div className="flex gap-4 mb-6 border-b pb-2">
                    <button
                        className={`px-3 py-1 rounded-t ${
                            activeTab === "instructors"
                                ? "bg-blue-600 text-white"
                                : "bg-gray-200 text-gray-700"
                        }`}
                        onClick={() => setActiveTab("instructors")}
                    >
                        Instructors
                    </button>
                    <button
                        className={`px-3 py-1 rounded-t ${
                            activeTab === "students"
                                ? "bg-blue-600 text-white"
                                : "bg-gray-200 text-gray-700"
                        }`}
                        onClick={() => setActiveTab("students")}
                    >
                        Students
                    </button>
                    <button
                        className={`px-3 py-1 rounded-t ${
                            activeTab === "documents"
                                ? "bg-blue-600 text-white"
                                : "bg-gray-200 text-gray-700"
                        }`}
                        onClick={() => setActiveTab("documents")}
                    >
                        Documents
                    </button>
                    <button
                        className={`px-3 py-1 rounded-t ${
                            activeTab === "announcements"
                                ? "bg-blue-600 text-white"
                                : "bg-gray-200 text-gray-700"
                        }`}
                        onClick={() => setActiveTab("announcements")}
                    >
                        Announcements
                    </button>
                </div>
                {activeTab === "instructors" && (
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold mb-2">
                            Instructors
                        </h2>
                        {instructors.length === 0 ? (
                            <div className="text-gray-500 mb-2">
                                No instructors assigned.
                            </div>
                        ) : (
                            <ul className="mb-2">
                                {instructors.map((instructor) => (
                                    <li
                                        key={instructor.id}
                                        className="border-b py-1 flex justify-between items-center"
                                    >
                                        <span>
                                            {instructor.name} (
                                            {instructor.email})
                                        </span>
                                        <button
                                            onClick={() =>
                                                handleRemoveInstructor(
                                                    instructor.id
                                                )
                                            }
                                            className="text-red-600 hover:underline text-sm ml-2"
                                        >
                                            Remove
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                        <button
                            onClick={() =>
                                setShowAddInstructor(!showAddInstructor)
                            }
                            className="bg-blue-600 text-white px-3 py-1 rounded text-sm mb-2"
                        >
                            {showAddInstructor ? "Cancel" : "Add Instructor"}
                        </button>
                        {showAddInstructor && (
                            <form
                                onSubmit={handleAddInstructor}
                                className="flex items-center gap-2 mt-2"
                            >
                                <input
                                    type="text"
                                    placeholder="Search instructor by name"
                                    className="border rounded px-2 py-1"
                                    value={instructorForm.data.instructor_name}
                                    onChange={(e) =>
                                        instructorForm.setData(
                                            "instructor_name",
                                            e.target.value
                                        )
                                    }
                                />
                                <button
                                    type="submit"
                                    className="bg-green-600 text-white px-3 py-1 rounded text-sm"
                                    disabled={instructorForm.processing}
                                >
                                    Add
                                </button>
                                {instructorForm.errors.instructor_name && (
                                    <span className="text-red-500 text-xs">
                                        {instructorForm.errors.instructor_name}
                                    </span>
                                )}
                            </form>
                        )}
                    </div>
                )}
                {activeTab === "students" && (
                    <div>
                        <h2 className="text-xl font-semibold mb-2">Students</h2>
                        {students.length === 0 ? (
                            <div className="text-gray-500">
                                No students assigned.
                            </div>
                        ) : (
                            <ul>
                                {students.map((student) => {
                                    // Debug: log the company name for each student
                                    const acceptedApp =
                                        student.applications?.find(
                                            (app) => app.status === "accepted"
                                        );
                                    const companyName =
                                        acceptedApp?.internship
                                            ?.employer_profile?.company_name ||
                                        "N/A";
                                    console.log(
                                        `Student: ${student.name}, Company:`,
                                        companyName
                                    );
                                    return (
                                        <li
                                            key={student.id}
                                            className="border-b py-1 flex flex-col sm:flex-row sm:justify-between sm:items-center"
                                        >
                                            <div>
                                                <span>
                                                    {student.name} (
                                                    {student.email})
                                                </span>
                                                {student.student_profile && (
                                                    <div className="text-xs text-gray-600 mt-1">
                                                        <div>
                                                            School ID:{" "}
                                                            {
                                                                student
                                                                    .student_profile
                                                                    .school_id
                                                            }
                                                        </div>
                                                        <div>
                                                            Year Level:{" "}
                                                            {
                                                                student
                                                                    .student_profile
                                                                    .year_level
                                                            }
                                                        </div>
                                                        <div>
                                                            Status:{" "}
                                                            {
                                                                student
                                                                    .student_profile
                                                                    .status
                                                            }
                                                        </div>
                                                        {/* Show company if student has an accepted application */}
                                                        {student.applications &&
                                                            student.applications
                                                                .length > 0 && (
                                                                <div>
                                                                    Company:{" "}
                                                                    {student.applications.find(
                                                                        (app) =>
                                                                            app.status ===
                                                                            "accepted"
                                                                    )
                                                                        ?.internship
                                                                        ?.employer_profile
                                                                        ?.company_name ||
                                                                        "N/A"}
                                                                </div>
                                                            )}
                                                    </div>
                                                )}
                                            </div>
                                            <button
                                                onClick={() =>
                                                    handleRemoveStudent(
                                                        student.id
                                                    )
                                                }
                                                className="text-red-600 hover:underline text-sm mt-2 sm:mt-0 sm:ml-2"
                                            >
                                                Remove
                                            </button>
                                        </li>
                                    );
                                })}
                            </ul>
                        )}
                        <button
                            onClick={() => setShowAddStudent(!showAddStudent)}
                            className="bg-blue-600 text-white px-3 py-1 rounded text-sm mt-2"
                        >
                            {showAddStudent ? "Cancel" : "Add Student"}
                        </button>
                        {showAddStudent && (
                            <form
                                onSubmit={handleAddStudent}
                                className="flex items-center gap-2 mt-2"
                            >
                                <input
                                    type="text"
                                    placeholder="Search student by name"
                                    className="border rounded px-2 py-1"
                                    value={studentForm.data.student_name}
                                    onChange={(e) =>
                                        studentForm.setData(
                                            "student_name",
                                            e.target.value
                                        )
                                    }
                                />
                                <button
                                    type="submit"
                                    className="bg-green-600 text-white px-3 py-1 rounded text-sm"
                                    disabled={studentForm.processing}
                                >
                                    Add
                                </button>
                                {studentForm.errors.student_name && (
                                    <span className="text-red-500 text-xs">
                                        {studentForm.errors.student_name}
                                    </span>
                                )}
                            </form>
                        )}
                    </div>
                )}
                {activeTab === "documents" && (
                    <div className="mt-4">
                        <h2 className="text-xl font-semibold mb-2">
                            Documents
                        </h2>
                        <Link
                            href={route(
                                "coordinator.courses.documents",
                                course.id
                            )}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            Manage Documents
                        </Link>
                    </div>
                )}
                {activeTab === "announcements" && (
                    <div className="mt-4">
                        <h2 className="text-xl font-semibold mb-2">
                            Announcements
                        </h2>
                        <Link
                            href={route(
                                "coordinator.courses.announcements",
                                course.id
                            )}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            Manage Announcements
                        </Link>
                    </div>
                )}
                <div className="mt-6">
                    <Link
                        href={route("coordinator.courses")}
                        className="text-blue-600 hover:underline"
                    >
                        Back to Courses
                    </Link>
                </div>
            </div>
        </Coordinator>
    );
}
