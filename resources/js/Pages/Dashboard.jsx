import React, { useEffect, useState } from "react";
import { Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import axios from "axios";

export default function Dashboard() {
    const [internships, setInternships] = useState([]);
    const [selectedInternship, setSelectedInternship] = useState(null);
    const [studentInfo, setStudentInfo] = useState(null);
    const [existingApplications, setExistingApplications] = useState([]);
    const [applyingId, setApplyingId] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");

    /* ================= FETCH STUDENT ================= */
    useEffect(() => {
        axios
            .get("/student/details")
            .then((res) => setStudentInfo(res.data))
            .catch(() => console.error("Failed to fetch student info"));
    }, []);

    /* ================= FETCH INTERNSHIPS ================= */
    useEffect(() => {
        axios
            .get("/internships/offer")
            .then((res) => setInternships(res.data.internships))
            .catch(() => console.error("Failed to fetch internships"));
    }, []);

    /* ================= FETCH EXISTING APPLICATIONS ================= */
    useEffect(() => {
        axios
            .get("/existing/application")
            .then((res) =>
                setExistingApplications(res.data.existingApplications || [])
            )
            .catch(() =>
                console.error("Failed to fetch existing applications")
            );
    }, []);

    /* ================= HELPERS ================= */
    const hasApplied = (id) => existingApplications.includes(id);
    const isFull = (internship) => internship.slots_left === 0;

    const applyForInternship = async (internship) => {
        if (isFull(internship)) return;

        setApplyingId(internship.id);
        setErrorMessage("");

        try {
            await axios.post("/student/application", {
                internship_id: internship.id,
            });
            setExistingApplications((prev) => [...prev, internship.id]);
            setSelectedInternship(null);
        } catch (err) {
            setErrorMessage(err.response?.data?.message || "Failed to apply.");
        } finally {
            setApplyingId(null);
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Student Dashboard" />

            <div className="max-w-7xl mx-auto p-6 flex gap-6">
                {/* ================= LEFT FIXED SIDEBAR ================= */}
                <aside className="w-full md:w-64 flex-shrink-0 bg-white border rounded-xl shadow-sm p-6 h-fit">
                    {studentInfo ? (
                        <>
                            <h2 className="text-lg font-semibold">
                                {studentInfo.firstname} {studentInfo.lastname}
                            </h2>
                            <p className="text-sm text-gray-600">
                                School ID: {studentInfo.school_id}
                            </p>

                            <div className="mt-4">
                                <h3 className="font-semibold">Skills</h3>
                                <p className="text-sm text-gray-700">
                                    {studentInfo.skills || "No skills listed."}
                                </p>
                            </div>

                            <div className="mt-4">
                                <h3 className="font-semibold">Bio</h3>
                                <p className="text-sm text-gray-700">
                                    {studentInfo.bio || "No bio provided."}
                                </p>
                            </div>
                        </>
                    ) : (
                        <p className="text-gray-500">Loading profile...</p>
                    )}
                </aside>

                {/* ================= MAIN WRAPPER ================= */}
                <div
                    className={`flex-1 grid gap-6 ${
                        selectedInternship
                            ? "grid-cols-1 md:grid-cols-2"
                            : "grid-cols-1"
                    }`}
                >
                    {/* ================= MIDDLE CONTAINER: INTERNSHIP LIST ================= */}
                    <section className="space-y-6">
                        {internships.length === 0 ? (
                            <p className="text-center text-gray-600">
                                No internships available.
                            </p>
                        ) : (
                            internships.map((internship) => (
                                <div
                                    key={internship.id}
                                    className="bg-white border rounded-xl p-6 shadow-sm cursor-pointer"
                                    onClick={() =>
                                        setSelectedInternship(internship)
                                    }
                                >
                                    <div className="flex items-center gap-3">
                                        {/* Employer Picture */}
                                        {internship.employer?.picture ? (
                                            <img
                                                src={`/${internship.employer.picture}`}
                                                alt={
                                                    internship.employer
                                                        .company_name
                                                }
                                                className="w-12 h-12 rounded-full object-cover border"
                                            />
                                        ) : (
                                            <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-xs text-gray-600">
                                                No Img
                                            </div>
                                        )}

                                        {/* Company Name */}
                                        <div>
                                            <h3 className="text-lg font-semibold">
                                                {internship.title}
                                            </h3>
                                            <p className="text-sm text-gray-500">
                                                {
                                                    internship.employer
                                                        ?.company_name
                                                }
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                {
                                                    internship.employer
                                                        ?.company_address
                                                }
                                            </p>
                                        </div>
                                    </div>

                                    <p className="mt-2 text-sm">
                                        Slots Left:{" "}
                                        <span
                                            className={`ml-2 font-semibold ${
                                                internship.slots_left === 0
                                                    ? "text-red-600"
                                                    : "text-green-600"
                                            }`}
                                        >
                                            {internship.slots_left}
                                        </span>
                                    </p>
                                    <p className="mt-2 text-sm text-gray-700">
                                        {internship.description?.slice(0, 120)}
                                        {internship.description?.length > 120 &&
                                            "..."}
                                    </p>
                                    <button className="mt-4 text-indigo-600 hover:underline">
                                        View Details
                                    </button>
                                </div>
                            ))
                        )}
                    </section>

                    {/* ================= RIGHT CONTAINER: DETAILS PANEL ================= */}
                    {selectedInternship && (
                        <aside className="bg-white border rounded-xl shadow-sm p-6">
                            <div className="flex w-full justify-between items-center">
                                <h2 className="text-2xl font-bold text-indigo-700 mb-4">
                                    {selectedInternship.title}
                                </h2>
                                <button
                                    className="self-end text-xl text-gray-500 hover:text-red-600 mb-4"
                                    onClick={() => setSelectedInternship(null)}
                                >
                                    &times;
                                </button>
                            </div>

                            <p className="text-gray-700 mb-4">
                                {selectedInternship.description}
                            </p>

                            {selectedInternship.responsibilities && (
                                <div className="mb-4">
                                    <h4 className="font-semibold mb-1">
                                        Responsibilities
                                    </h4>
                                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                                        {JSON.parse(
                                            selectedInternship.responsibilities
                                        ).map((item, i) => (
                                            <li key={i}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {selectedInternship.requirements && (
                                <div className="mb-4">
                                    <h4 className="font-semibold mb-1">
                                        Requirements
                                    </h4>
                                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                                        {JSON.parse(
                                            selectedInternship.requirements
                                        ).map((item, i) => (
                                            <li key={i}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            <div className="mb-4">
                                <h4 className="font-semibold text-gray-800 mb-2">
                                    Company Details
                                </h4>
                                <p>
                                    <strong>Company:</strong>{" "}
                                    {selectedInternship.employer?.company_name}
                                </p>
                                <p>
                                    <strong>Email:</strong>{" "}
                                    {selectedInternship.employer?.email ||
                                        "N/A"}
                                </p>
                                <p>
                                    <strong>Phone:</strong>{" "}
                                    {selectedInternship.employer
                                        ?.contact_number || "N/A"}
                                </p>
                                <p>
                                    <strong>Address:</strong>{" "}
                                    {selectedInternship.employer
                                        ?.company_address || "N/A"}
                                </p>
                                {selectedInternship.employer?.website && (
                                    <p>
                                        <strong>Website:</strong>{" "}
                                        <a
                                            href={
                                                selectedInternship.employer
                                                    .website
                                            }
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-indigo-600 underline"
                                        >
                                            {
                                                selectedInternship.employer
                                                    .website
                                            }
                                        </a>
                                    </p>
                                )}
                            </div>

                            <button
                                onClick={() =>
                                    applyForInternship(selectedInternship)
                                }
                                disabled={
                                    hasApplied(selectedInternship.id) ||
                                    isFull(selectedInternship) ||
                                    applyingId === selectedInternship.id
                                }
                                className={`mt-auto w-full py-2 rounded text-white font-semibold ${
                                    hasApplied(selectedInternship.id) ||
                                    isFull(selectedInternship)
                                        ? "bg-gray-400 cursor-not-allowed"
                                        : applyingId === selectedInternship.id
                                        ? "bg-blue-300"
                                        : "bg-blue-600 hover:bg-blue-700"
                                }`}
                            >
                                {hasApplied(selectedInternship.id)
                                    ? "Already Applied"
                                    : isFull(selectedInternship)
                                    ? "Slot Full"
                                    : applyingId === selectedInternship.id
                                    ? "Applying..."
                                    : "Apply Now"}
                            </button>

                            {errorMessage && (
                                <p className="mt-3 text-red-600 font-medium">
                                    {errorMessage}
                                </p>
                            )}
                        </aside>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
