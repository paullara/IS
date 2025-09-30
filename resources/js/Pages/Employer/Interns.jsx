import EmployerLayout from "@/Layouts/EmployerLayout";
import { usePage } from "@inertiajs/react";
import { useState } from "react";
import axios from "axios";

export default function Interns() {
    const { internships } = usePage().props;
    const [selectedInternship, setSelectedInternship] = useState(null);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [evaluation, setEvaluation] = useState({ score: 5, comments: "" });
    const [submitting, setSubmitting] = useState(false);

    const handleSelectInternship = (internship) => {
        setSelectedInternship(internship);
        setSelectedStudent(null);
    };

    const handleSelectStudent = (student, application_id) => {
        setSelectedStudent({ ...student, application_id });
        setEvaluation({ score: 5, comments: "" });
    };

    const submitEvaluation = async (e) => {
        e.preventDefault();
        if (!selectedStudent) return;

        setSubmitting(true);
        try {
            await axios.post("/evaluations", {
                application_id: selectedStudent.application_id,
                score: evaluation.score,
                comments: evaluation.comments,
            });
            alert("Evaluation submitted!");
            setEvaluation({ score: 5, comments: "" });
        } catch (error) {
            console.error(error);
            alert("Error submitting evaluation.");
        } finally {
            setSubmitting(false);
        }
    };

    const scoreLabel = (score) => {
        switch (score) {
            case 5:
                return "Excellent";
            case 4:
                return "Very Good";
            case 3:
                return "Good";
            case 2:
                return "Fair";
            case 1:
                return "Poor";
            default:
                return "";
        }
    };

    const countAcceptedInterns = (internship) => {
        const fromApplications =
            internship.applications?.filter(
                (a) => a.status === "accepted" && a.student
            ).length || 0;

        const fromAssigned =
            internship.students?.filter((s) => s.student?.status === "accepted")
                .length || 0;

        return fromApplications + fromAssigned;
    };

    return (
        <EmployerLayout>
            <div className="flex min-h-screen bg-white">
                {/* Left Panel: Internships */}
                <div className="w-1/4 p-6 border-r overflow-y-auto">
                    <h2 className="text-xl font-bold mb-6">Internships</h2>
                    <div className="space-y-4">
                        {internships?.map((internship) => (
                            <div
                                key={internship.id}
                                onClick={() =>
                                    handleSelectInternship(internship)
                                }
                                className={`p-4 rounded-xl shadow cursor-pointer transition hover:shadow-lg ${
                                    selectedInternship?.id === internship.id
                                        ? "bg-blue-50 border-l-4 border-blue-500"
                                        : "bg-white"
                                }`}
                            >
                                <h3 className="font-semibold text-lg">
                                    {internship.title}
                                </h3>
                                <p className="text-gray-500 text-sm">
                                    {countAcceptedInterns(internship)} Accepted
                                    Intern
                                    {countAcceptedInterns(internship) !== 1 &&
                                        "s"}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Center Panel: Students */}
                <div className="w-1/3 p-6 border-r overflow-y-auto">
                    <h2 className="text-xl font-bold mb-6">
                        {selectedInternship
                            ? `${selectedInternship.title} Interns`
                            : "Select an Internship"}
                    </h2>

                    {selectedInternship && (
                        <>
                            {selectedInternship.applications
                                ?.filter(
                                    (a) => a.status === "accepted" && a.student
                                )
                                .map((application) => {
                                    const student = application.student;
                                    return (
                                        <div
                                            key={application.id}
                                            onClick={() =>
                                                handleSelectStudent(
                                                    student,
                                                    application.id
                                                )
                                            }
                                            className={`flex items-center gap-4 mb-4 p-3 rounded-xl border hover:shadow-md cursor-pointer transition ${
                                                selectedStudent?.id ===
                                                student.id
                                                    ? "bg-blue-50 border-l-4 border-blue-500"
                                                    : "bg-white"
                                            }`}
                                        >
                                            <img
                                                src={
                                                    student.picture
                                                        ? `/profiles/${student.picture}`
                                                        : "/images/placeholder.jpg"
                                                }
                                                alt={student.firstname}
                                                className="w-12 h-12 rounded-full object-cover border"
                                            />
                                            <div>
                                                <p className="font-semibold">
                                                    {student.firstname}{" "}
                                                    {student.middlename}{" "}
                                                    {student.lastname}
                                                </p>
                                                <p className="text-gray-400 text-sm">
                                                    Source: Applied
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}

                            {selectedInternship.students
                                ?.filter(
                                    (s) => s.student?.status === "accepted"
                                )
                                .map((s) => {
                                    const student = s.student;
                                    return (
                                        <div
                                            key={s.id}
                                            onClick={() =>
                                                handleSelectStudent(
                                                    student,
                                                    s.id
                                                )
                                            }
                                            className={`flex items-center gap-4 mb-4 p-3 rounded-xl border hover:shadow-md cursor-pointer transition ${
                                                selectedStudent?.id ===
                                                student.id
                                                    ? "bg-blue-50 border-l-4 border-blue-500"
                                                    : "bg-white"
                                            }`}
                                        >
                                            <img
                                                src={
                                                    student.picture
                                                        ? `/profiles/${student.picture}`
                                                        : "/images/placeholder.jpg"
                                                }
                                                alt={student.firstname}
                                                className="w-12 h-12 rounded-full object-cover border"
                                            />
                                            <div>
                                                <p className="font-semibold">
                                                    {student.firstname}{" "}
                                                    {student.middlename}{" "}
                                                    {student.lastname}
                                                </p>
                                                <p className="text-gray-400 text-sm">
                                                    Source: Assigned
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}

                            {countAcceptedInterns(selectedInternship) === 0 && (
                                <p className="text-gray-500 mt-4">
                                    No accepted interns yet.
                                </p>
                            )}
                        </>
                    )}
                </div>

                {/* Right Panel: Evaluation */}
                <div className="flex-1 p-6 overflow-y-auto">
                    {selectedStudent ? (
                        <div className="bg-white p-6 rounded-xl shadow">
                            <h2 className="text-xl font-bold mb-4">
                                Evaluate {selectedStudent.firstname}{" "}
                                {selectedStudent.lastname}
                            </h2>

                            <form
                                onSubmit={submitEvaluation}
                                className="space-y-4"
                            >
                                {/* Score */}
                                <div className="flex gap-2">
                                    {[1, 2, 3, 4, 5].map((score) => (
                                        <button
                                            key={score}
                                            type="button"
                                            onClick={() =>
                                                setEvaluation({
                                                    ...evaluation,
                                                    score,
                                                })
                                            }
                                            className={`px-4 py-2 rounded-full border transition ${
                                                evaluation.score === score
                                                    ? "bg-blue-500 text-white border-blue-500"
                                                    : "bg-white border-gray-300 hover:bg-gray-50"
                                            }`}
                                        >
                                            {scoreLabel(score)}
                                        </button>
                                    ))}
                                </div>

                                {/* Comments */}
                                <textarea
                                    rows="4"
                                    value={evaluation.comments}
                                    onChange={(e) =>
                                        setEvaluation({
                                            ...evaluation,
                                            comments: e.target.value,
                                        })
                                    }
                                    className="w-full border rounded-xl p-3 focus:ring focus:ring-blue-300"
                                    placeholder="Add comments (optional)"
                                />

                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="bg-blue-500 text-white px-6 py-2 rounded-xl shadow hover:bg-blue-600 transition"
                                >
                                    Submit Evaluation
                                </button>
                            </form>
                        </div>
                    ) : (
                        <p className="text-gray-400 mt-6">
                            Select a student to evaluate
                        </p>
                    )}
                </div>
            </div>
        </EmployerLayout>
    );
}
