import React, { useState, useEffect } from "react";
import { Head, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import axios from "axios";

export default function Dashboard() {
    const [selectedInternship, setSelectedInternship] = useState(null);
    const [studentInfo, setStudentInfo] = useState([]);
    const [existingApplication, setExistingApplication] = useState([]);
    const [internships, setInternships] = useState([]);
    const [applyingId, setApplyingId] = useState(null); // track which internship is applying
    const [errorMessage, setErrorMessage] = useState("");

    const { processing } = useForm();

    // Fetch student info
    useEffect(() => {
        const fetchStudentInfo = async () => {
            try {
                const res = await axios.get("/student/details");
                setStudentInfo(res.data);
                console.log("Student Data", res.data);
            } catch (error) {
                console.error("Error fetching student info.", error);
            }
        };
        fetchStudentInfo();
    }, []);

    // Fetch internships
    useEffect(() => {
        const fetchInternships = async () => {
            try {
                const res = await axios.get("/internships/offer");
                setInternships(res.data.internships);
                console.log("Internships:", res.data.internships);
            } catch (error) {
                console.error("Error fetching internships.");
            }
        };
        fetchInternships();
    }, []);

    // Fetch existing applications
    useEffect(() => {
        const fetchExistingApplications = async () => {
            try {
                const res = await axios.get("/existing/application");
                setExistingApplication(res.data.existingApplications || []);
                console.log(
                    "Existing Application",
                    res.data.existingApplications
                );
            } catch (error) {
                console.error("Error fetching existing applications.", error);
            }
        };
        fetchExistingApplications();
    }, []);

    const applyForInternship = async (internshipId) => {
        console.log("Applying for internship:", internshipId);
        setApplyingId(internshipId);
        setErrorMessage("");

        try {
            const response = await axios.post("/student/application", {
                internship_id: internshipId,
            });

            console.log("Application Response:", response.data);

            // Update existing applications list so button becomes "Unavailable"
            setExistingApplication((prev) => [...prev, internshipId]);

            // Close modal after successful apply
            setSelectedInternship(null);
        } catch (error) {
            console.error(
                "Error applying:",
                error.response?.data || error.message
            );
            setErrorMessage(
                error.response?.data?.message || "Failed to apply."
            );
        } finally {
            setApplyingId(null);
        }
    };

    const hasApplied = (internshipId) => {
        return existingApplication.includes(internshipId);
    };

    return (
        <AuthenticatedLayout>
            <Head title="Student Dashboard" />
            <main className="max-w-7xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Sidebar */}
                <aside className="bg-white border rounded-xl shadow-sm overflow-hidden">
                    <div className="h-32 bg-gradient-to-r from-indigo-500 to-purple-500 relative">
                        {studentInfo?.picture && (
                            <img
                                src={`/profiles/${studentInfo.picture}`}
                                alt="Profile"
                                className="w-24 h-24 object-cover rounded-full border-4 border-white absolute -bottom-12 left-6"
                            />
                        )}
                    </div>

                    <div className="pt-16 px-6 pb-6 space-y-4">
                        {studentInfo ? (
                            <>
                                <div className="space-y-1">
                                    <h2 className="text-lg font-semibold text-gray-900">
                                        {studentInfo.firstname}{" "}
                                        {studentInfo.lastname}
                                    </h2>
                                    <p className="text-sm text-gray-500">
                                        School ID: {studentInfo.school_id}
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-md font-semibold mb-2">
                                        Skills
                                    </h3>
                                    <p className="text-gray-700 text-sm">
                                        {studentInfo.skills ||
                                            "No skills listed."}
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-md font-semibold mb-2">
                                        Bio
                                    </h3>
                                    <p className="text-gray-700 text-sm">
                                        {studentInfo.bio || "No bio provided."}
                                    </p>
                                </div>
                            </>
                        ) : (
                            <p className="text-gray-500">No profile found.</p>
                        )}
                    </div>
                </aside>

                {/* Internships */}
                <section className="md:col-span-2 space-y-6">
                    {internships.length === 0 ? (
                        <p className="text-gray-600 text-center">
                            No internships available right now. Please check
                            back later.
                        </p>
                    ) : (
                        internships.map((internship) => (
                            <section
                                key={internship.id}
                                className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-md transition duration-300 space-y-3"
                            >
                                <div className="flex items-center gap-4">
                                    {internship.employer?.picture ? (
                                        <img
                                            src={`/${internship.employer.picture}`}
                                            alt="Profile"
                                            className="w-12 h-12 rounded-full object-cover border"
                                        />
                                    ) : (
                                        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-lg font-bold">
                                            {internship.employer
                                                .company_name?.[0] || "?"}
                                        </div>
                                    )}
                                    <div>
                                        <h2 className="text-lg font-semibold text-gray-900">
                                            {internship.title}
                                        </h2>
                                        <p className="text-sm text-gray-500">
                                            {internship.employer.company_name ||
                                                "Unknown Company"}
                                        </p>
                                    </div>
                                </div>

                                <p className="text-sm text-gray-700">
                                    {internship.description?.slice(0, 160) ||
                                        "No description provided."}
                                    {internship.description?.length > 160 &&
                                        "..."}
                                </p>

                                <div className="flex justify-end gap-3">
                                    <button
                                        onClick={() =>
                                            setSelectedInternship(internship)
                                        }
                                        className="text-sm text-indigo-600 font-medium hover:underline"
                                    >
                                        View Details
                                    </button>
                                </div>
                            </section>
                        ))
                    )}
                </section>
            </main>

            {/* Modal */}
            {selectedInternship && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
                    <div className="bg-white max-w-4xl w-full rounded-lg shadow-xl overflow-y-auto max-h-[90vh] p-6 relative">
                        <button
                            className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-xl"
                            onClick={() => setSelectedInternship(null)}
                        >
                            &times;
                        </button>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h2 className="text-2xl font-bold mb-4 text-indigo-700">
                                    {selectedInternship.title}
                                </h2>
                                <h3 className="font-semibold mb-2 text-lg">
                                    Description
                                </h3>
                                <p className="text-gray-700">
                                    {selectedInternship.description ||
                                        "No description available."}
                                </p>

                                {selectedInternship.requirements && (
                                    <div className="mt-4">
                                        <h3 className="font-semibold text-lg">
                                            Requirements
                                        </h3>
                                        <ul className="list-disc list-inside text-gray-700">
                                            {selectedInternship.requirements
                                                .split(",")
                                                .map((item, i) => (
                                                    <li key={i}>
                                                        {item.trim()}
                                                    </li>
                                                ))}
                                        </ul>
                                    </div>
                                )}
                            </div>

                            <div>
                                <h3 className="text-xl font-bold mb-4">
                                    Company Details
                                </h3>
                                <p className="text-gray-700">
                                    <strong>Company:</strong>{" "}
                                    {selectedInternship.employer.company_name ||
                                        "N/A"}
                                </p>
                                <p className="text-gray-700">
                                    <strong>Address:</strong>{" "}
                                    {selectedInternship.employer
                                        .company_address || "N/A"}
                                </p>
                                <p className="text-gray-700">
                                    <strong>Phone:</strong>{" "}
                                    {selectedInternship.employer
                                        .contact_number || "N/A"}
                                </p>
                                <p className="text-gray-700">
                                    <strong>Email:</strong>{" "}
                                    {selectedInternship.employer.email || "N/A"}
                                </p>
                                <p className="text-gray-700 mt-2">
                                    <strong>Website:</strong>{" "}
                                    <a
                                        href={
                                            selectedInternship.employer.website
                                        }
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-indigo-600 hover:underline"
                                    >
                                        {selectedInternship.employer.website ||
                                            "N/A"}
                                    </a>
                                </p>
                                <div className="mt-4">
                                    <h4 className="font-semibold">
                                        About the Company
                                    </h4>
                                    <p className="text-gray-700">
                                        {selectedInternship.company_description ||
                                            "No description available."}
                                    </p>
                                </div>

                                {/* Apply button */}
                                <button
                                    onClick={() =>
                                        applyForInternship(
                                            selectedInternship.id
                                        )
                                    }
                                    className={`px-4 py-2 rounded text-white ${
                                        hasApplied(selectedInternship.id)
                                            ? "bg-gray-400 cursor-not-allowed"
                                            : applyingId ===
                                              selectedInternship.id
                                            ? "bg-blue-300"
                                            : "bg-blue-500 hover:bg-blue-600"
                                    }`}
                                    disabled={
                                        hasApplied(selectedInternship.id) ||
                                        applyingId === selectedInternship.id
                                    }
                                >
                                    {hasApplied(selectedInternship.id)
                                        ? "Unavailable"
                                        : applyingId === selectedInternship.id
                                        ? "Applying..."
                                        : "Apply"}
                                </button>

                                {/* Messages */}
                                {hasApplied(selectedInternship.id) && (
                                    <p className="mt-2 text-green-600 font-medium text-sm">
                                        ✅ You applied successfully. Please wait
                                        for the company to respond.
                                    </p>
                                )}

                                {errorMessage && (
                                    <div className="mt-4 text-red-500 font-semibold">
                                        {errorMessage}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
