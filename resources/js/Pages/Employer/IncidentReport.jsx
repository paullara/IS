import React, { useEffect, useState } from "react";
import EmployerLayout from "@/Layouts/EmployerLayout";
import axios from "axios";

export default function IncidentReport() {
    const [internships, setInternships] = useState([]);
    const [selectedInternship, setSelectedInternship] = useState(null);

    const [data, setData] = useState({
        internship_id: "",
        student_id: "",
        severity: "Minor",
        description: "",
    });

    const [loading, setLoading] = useState(false);

    // ================= FETCH INTERNSHIPS =================
    useEffect(() => {
        axios
            .get("/incident-reports/employer-targets")
            .then((res) => setInternships(res.data.internships))
            .catch(() => alert("Failed to load internships"));
    }, []);

    // ================= SUBMIT =================
    const submit = async (e) => {
        e.preventDefault();

        if (!data.internship_id || !data.student_id) {
            alert("Please select a student.");
            return;
        }

        try {
            setLoading(true);

            // Axios sends JSON
            await axios.post("/incident-reports", data, {
                headers: { "Content-Type": "application/json" },
            });

            alert("Incident report submitted!");
            setData({
                internship_id: "",
                student_id: "",
                severity: "Minor",
                description: "",
            });
            setSelectedInternship(null);
        } catch (err) {
            console.error(err);
            alert("Failed to submit incident report.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <EmployerLayout>
            <div className="grid grid-cols-3 gap-6 p-6 bg-gray-50 rounded-lg shadow">
                {/* LEFT */}
                <div className="col-span-2 bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-bold mb-4">Incident Report</h2>

                    <form onSubmit={submit} className="space-y-4">
                        {/* Severity */}
                        <div>
                            <label className="font-medium">Severity</label>
                            <div className="flex gap-3 mt-2">
                                {["Minor", "Moderate", "Major"].map((level) => (
                                    <button
                                        type="button"
                                        key={level}
                                        onClick={() =>
                                            setData((p) => ({
                                                ...p,
                                                severity: level,
                                            }))
                                        }
                                        className={`px-4 py-2 rounded border ${
                                            data.severity === level
                                                ? "bg-red-500 text-white"
                                                : "bg-gray-100"
                                        }`}
                                    >
                                        {level}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <label className="font-medium">Description</label>
                            <textarea
                                rows="5"
                                className="w-full border rounded p-3"
                                value={data.description}
                                onChange={(e) =>
                                    setData((p) => ({
                                        ...p,
                                        description: e.target.value,
                                    }))
                                }
                            />
                        </div>

                        <button
                            disabled={loading}
                            className="w-full bg-red-600 text-white py-2 rounded"
                        >
                            {loading ? "Submitting..." : "Submit Report"}
                        </button>
                    </form>
                </div>

                {/* RIGHT */}
                <div className="bg-white p-6 rounded-lg shadow space-y-4">
                    <h3 className="font-bold">Internships</h3>

                    {internships.map((internship) => (
                        <div key={internship.id}>
                            <button
                                onClick={() => {
                                    setSelectedInternship(internship);
                                    setData((p) => ({
                                        ...p,
                                        internship_id: internship.id,
                                        student_id: "",
                                    }));
                                }}
                                className={`w-full text-left p-2 rounded ${
                                    data.internship_id === internship.id
                                        ? "bg-blue-500 text-white"
                                        : "bg-gray-100"
                                }`}
                            >
                                {internship.title}
                            </button>

                            {/* STUDENTS */}
                            {selectedInternship?.id === internship.id && (
                                <div className="mt-2 ml-2 space-y-1">
                                    {internship.applications.length > 0 ? (
                                        internship.applications.map((app) => (
                                            <div
                                                key={app.id}
                                                onClick={() =>
                                                    setData((p) => ({
                                                        ...p,
                                                        student_id:
                                                            app.student.id,
                                                    }))
                                                }
                                                className={`cursor-pointer p-2 rounded ${
                                                    data.student_id ===
                                                    app.student.id
                                                        ? "bg-green-500 text-white"
                                                        : "bg-gray-50"
                                                }`}
                                            >
                                                {app.student.firstname}
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-sm text-gray-500">
                                            No accepted students
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </EmployerLayout>
    );
}
