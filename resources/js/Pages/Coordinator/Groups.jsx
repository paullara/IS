import CoordinatorLayout from "@/Layouts/Coordinator";
import { usePage } from "@inertiajs/react";

export default function Groups() {
    const { groups } = usePage().props;

    return (
        <CoordinatorLayout title="Groups">
            <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
                <h1 className="text-2xl font-bold mb-4">Groups and Students</h1>
                {groups.length === 0 ? (
                    <div className="text-gray-500">No groups found.</div>
                ) : (
                    <div className="space-y-6">
                        {groups.map((group) => (
                            <div key={group.id} className="border rounded p-4">
                                <h2 className="text-xl font-semibold mb-2">
                                    {group.name} - {group.section}
                                </h2>
                                <div className="mb-2 text-sm text-gray-600">
                                    Instructor:{" "}
                                    {group.instructor
                                        ? group.instructor.firstname
                                        : "N/A"}
                                </div>
                                <h3 className="font-semibold">Students:</h3>
                                {group.students.length === 0 ? (
                                    <div className="text-gray-500 ml-2">
                                        No students assigned.
                                    </div>
                                ) : (
                                    <ul className="ml-4 list-disc">
                                        {group.students.map((student) => (
                                            <li key={student.id}>
                                                {student.firstname}{" "}
                                                {student.lastname} (
                                                {student.email})
                                                {student.student_profile && (
                                                    <span className="text-xs text-gray-500 ml-2">
                                                        | School ID:{" "}
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
                                                    </span>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </CoordinatorLayout>
    );
}
