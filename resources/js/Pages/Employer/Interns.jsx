import EmployerLayout from "@/Layouts/EmployerLayout";
import { usePage } from "@inertiajs/react";
import { useState } from "react";
import axios from "axios";

export default function Interns() {
    const { internships } = usePage().props;
    const [selectedInternship, setSelectedInternship] = useState(null);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const [comments, setComments] = useState("");

    // criteria list (8 items)
    const criteriaList = [
        {
            category: "A. ABILITY TO LEARN (10%)",
            description:
                "Grasps new ideas quickly, applies knowledge to new situations, flexible problem solver.",
        },
        {
            category: "B. WORK ATTITUDE (15%)",
            description:
                "Possesses a positive perspective; always ready to work; punctual and responsible.",
        },
        {
            category: "C. CONDUCT (10%)",
            description:
                "Polite, respectful, maintains proper composure, and helps others.",
        },
        {
            category: "D. MOTIVATION / INITIATIVE (10%)",
            description:
                "Curiosity goes beyond immediate job; eager to learn; shows initiative.",
        },
        {
            category: "E. QUALITY AND ACCURACY OF WORK (20%)",
            description:
                "Produces high-quality, accurate work; meets or exceeds standards.",
        },
        {
            category: "F. QUANTITY OF WORK (10%)",
            description:
                "Highly productive; completes assigned tasks efficiently.",
        },
        {
            category: "G. SAFETY PRACTICES (15%)",
            description:
                "Always places safety first; observes safety precautions; uses tools properly.",
        },
        {
            category: "H. APPEARANCE / HYGIENE (10%)",
            description:
                "Proper grooming and appearance appropriate for work environment.",
        },
    ];

    const [scores, setScores] = useState(criteriaList.map(() => 0));
    const [remarks, setRemarks] = useState(criteriaList.map(() => ""));

    const handleRatingChange = (index, value) => {
        const updated = [...scores];
        updated[index] = parseInt(value);
        setScores(updated);
    };

    const handleRemarksChange = (index, value) => {
        const updated = [...remarks];
        updated[index] = value;
        setRemarks(updated);
    };

    const handleSelectInternship = (internship) => {
        setSelectedInternship(internship);
        setSelectedStudent(null);
        setErrors({});
    };

    const handleSelectStudent = (student, application_id) => {
        setSelectedStudent({ ...student, application_id });
        setScores(criteriaList.map(() => 0));
        setRemarks(criteriaList.map(() => ""));
        setComments("");
        setErrors({});
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        if (!selectedStudent) return;
        if (scores.includes(0)) {
            alert("Please rate all criteria before submitting.");
            return;
        }

        setSubmitting(true);
        try {
            await axios.post("/evaluations", {
                application_id: selectedStudent.application_id,
                scores,
                remarks,
                comments,
            });
            alert("Evaluation submitted successfully!");
            setScores(criteriaList.map(() => 0));
            setRemarks(criteriaList.map(() => ""));
            setComments("");
        } catch (error) {
            console.error(error.response?.data || error);
            if (error.response?.status === 422) {
                setErrors(error.response.data.errors || {});
            } else {
                alert("Error submitting evaluation.");
            }
        } finally {
            setSubmitting(false);
        }
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

                {/* Right Panel: Evaluation Form */}
                <div className="flex-1 p-6 overflow-y-auto">
                    {selectedStudent ? (
                        <div className="bg-white p-6 rounded-xl shadow">
                            <h2 className="text-xl font-bold mb-4 text-gray-800">
                                Evaluate {selectedStudent.firstname}{" "}
                                {selectedStudent.lastname}
                            </h2>

                            <form onSubmit={handleSubmit}>
                                <div className="space-y-6">
                                    {criteriaList.map((item, index) => (
                                        <div
                                            key={index}
                                            className="border-b pb-4 border-gray-200"
                                        >
                                            <h2 className="font-medium text-gray-800">
                                                {item.category}
                                            </h2>
                                            <p className="text-sm text-gray-600 mb-2">
                                                {item.description}
                                            </p>

                                            <div className="flex items-center gap-4 mt-2">
                                                <label className="text-sm font-medium text-gray-700">
                                                    Rating:
                                                </label>
                                                <select
                                                    className="border-gray-300 rounded-md"
                                                    value={scores[index]}
                                                    onChange={(e) =>
                                                        handleRatingChange(
                                                            index,
                                                            e.target.value
                                                        )
                                                    }
                                                >
                                                    <option value="0">--</option>
                                                    {[1, 2, 3, 4, 5].map(
                                                        (num) => (
                                                            <option
                                                                key={num}
                                                                value={num}
                                                            >
                                                                {num}
                                                            </option>
                                                        )
                                                    )}
                                                </select>
                                            </div>

                                            <div className="mt-2">
                                                <label className="text-sm font-medium text-gray-700">
                                                    Remarks:
                                                </label>
                                                <textarea
                                                    className="w-full border-gray-300 rounded-md mt-1"
                                                    rows="2"
                                                    placeholder="Enter remarks..."
                                                    value={remarks[index]}
                                                    onChange={(e) =>
                                                        handleRemarksChange(
                                                            index,
                                                            e.target.value
                                                        )
                                                    }
                                                ></textarea>
                                            </div>
                                        </div>
                                    ))}

                                    {/* Comments Field */}
                                    <div className="mt-6">
                                        <label className="text-sm font-medium text-gray-700">
                                            Additional Comments:
                                        </label>
                                        <textarea
                                            className="w-full border-gray-300 rounded-md mt-1"
                                            rows="3"
                                            placeholder="Enter additional comments..."
                                            value={comments}
                                            onChange={(e) =>
                                                setComments(e.target.value)
                                            }
                                        ></textarea>
                                    </div>
                                </div>

                                {/* Validation Errors */}
                                {Object.keys(errors).length > 0 && (
                                    <div className="mt-4 bg-red-50 border border-red-200 text-red-600 rounded-md p-3 text-sm">
                                        <p className="font-medium">
                                            Please fix the following:
                                        </p>
                                        <ul className="list-disc ml-5">
                                            {Object.entries(errors).map(
                                                ([field, messages], i) => (
                                                    <li key={i}>
                                                        {messages.join(", ")}
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    </div>
                                )}

                                <div className="mt-6">
                                    <button
                                        type="submit"
                                        disabled={submitting}
                                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                                    >
                                        {submitting
                                            ? "Submitting..."
                                            : "Submit Evaluation"}
                                    </button>
                                </div>
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
