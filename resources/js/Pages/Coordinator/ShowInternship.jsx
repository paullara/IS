import Coordinator from "@/Layouts/Coordinator";
import { useForm, usePage } from "@inertiajs/react";

export default function ShowInternship() {
    const { internship, students } = usePage().props;

    const { post, processing, reset, data, setData } = useForm({
        internship_id: internship.id,
        student_id: "",
    });

    const handleAssign = (e) => {
        e.preventDefault();
        if (!data.student_id) return;

        post("/coordinator/internships/assign-student", {
            onSuccess: () => reset("student_id"),
        });
    };

    return (
        <Coordinator title={`Internship: ${internship.title}`}>
            <div className="max-w-5xl mx-auto bg-white p-6 rounded shadow space-y-10">
                {/* Internship Info */}
                <div>
                    <h1 className="text-3xl font-bold mb-2">
                        {internship.title}
                    </h1>
                    <p className="text-gray-700 mb-2">
                        {internship.description}
                    </p>
                    <p className="text-sm text-gray-500">
                        {internship.start_date} - {internship.end_date} |
                        Status: {internship.status}
                    </p>
                    <p className="text-sm text-gray-500">
                        Employer: {internship.employer?.name || "N/A"}
                        {internship.employerProfile && (
                            <>
                                {" "}
                                | Company:{" "}
                                {internship.employerProfile.company_name}
                            </>
                        )}
                    </p>
                </div>

                {/* Assign Student Form */}
                <div>
                    <h2 className="text-xl font-semibold mb-4">
                        Assign a Student
                    </h2>
                    <form
                        onSubmit={handleAssign}
                        className="flex gap-4 items-center"
                    >
                        <select
                            value={data.student_id}
                            onChange={(e) =>
                                setData("student_id", e.target.value)
                            }
                            className="border rounded px-3 py-2 min-w-[250px]"
                        >
                            <option value="">Select a student</option>
                            {students.map((student) => (
                                <option key={student.id} value={student.id}>
                                    {student.name} (
                                    {student.studentProfile?.course || "N/A"})
                                </option>
                            ))}
                        </select>
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                        >
                            Assign
                        </button>
                    </form>
                </div>

                {/* Assigned Students */}
                <div>
                    <h2 className="text-xl font-semibold mb-4">
                        Assigned Students
                    </h2>
                    {Array.isArray(internship.students) &&
                    internship.students.length > 0 ? (
                        <ul className="space-y-2">
                            {internship.students.map((s) => (
                                <li
                                    key={s.id}
                                    className="border p-3 rounded flex justify-between items-center"
                                >
                                    <div>
                                        <p className="font-medium">{s.name}</p>
                                        <p className="text-sm text-gray-500">
                                            {s.studentProfile?.course ||
                                                "No course info"}
                                        </p>
                                    </div>
                                    {/* Optional Unassign button */}
                                    {/* <button className="text-red-600 hover:underline text-sm">Unassign</button> */}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500">
                            No students assigned yet.
                        </p>
                    )}
                </div>
            </div>
        </Coordinator>
    );
}
