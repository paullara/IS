import React, { useEffect, useState } from "react";
import CoordinatorLayout from "@/Layouts/Coordinator";
import axios from "axios";

export default function Verification() {
    const [verifications, setVerifications] = useState([]);
    const [loading, setLoading] = useState(true);

    const [showModal, setShowModal] = useState(false);
    const [selectedDoc, setSelectedDoc] = useState(null);
    const [selectedLabel, setSelectedLabel] = useState("");
    const [selectedAppId, setSelectedAppId] = useState(null);

    // ==============================
    // Fetch pending applications
    // ==============================
    const fetchVerifications = async () => {
        try {
            const res = await axios.get("/pending/status");
            setVerifications(res.data.applicants);
        } catch (err) {
            console.error("Failed to fetch verifications", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVerifications();
    }, []);

    // ==============================
    // Viewer helpers
    // ==============================
    const openViewer = (path, label, appId) => {
        setSelectedDoc(`/${path}`);
        setSelectedLabel(label);
        setSelectedAppId(appId);
        setShowModal(true);
    };

    const closeViewer = () => {
        setShowModal(false);
        setSelectedDoc(null);
        setSelectedLabel("");
        setSelectedAppId(null);
    };

    const isPDF = (path) => path?.toLowerCase().endsWith(".pdf");

    // ==============================
    // Approve / Reject WHOLE APPLICATION
    // ==============================
    const handleDecision = async (status, appId = selectedAppId) => {
        try {
            await axios.post(`/company-applications/${appId}/status`, {
                status,
            });

            closeViewer();
            fetchVerifications();
        } catch (error) {
            console.error("Failed to update status", error);
        }
    };

    // ==============================
    // UI
    // ==============================
    return (
        <CoordinatorLayout>
            <h2 className="text-xl font-semibold mb-4">
                Pending Company Verifications
            </h2>

            {loading && <p>Loading...</p>}

            {!loading && verifications.length === 0 && (
                <p className="text-gray-500">No pending applications.</p>
            )}

            <div className="space-y-4">
                {verifications.map((company) => (
                    <div
                        key={company.id}
                        className="bg-white border rounded p-4 shadow-sm"
                    >
                        <p className="font-semibold mb-3">
                            {company.user?.name ?? "No Company Name"}
                        </p>

                        <div className="space-y-3">
                            {/* DOCUMENT LINKS */}
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                {Object.entries(company.requirements).map(
                                    ([label, path]) =>
                                        path && (
                                            <button
                                                key={label}
                                                onClick={() =>
                                                    openViewer(
                                                        path,
                                                        label,
                                                        company.id
                                                    )
                                                }
                                                className="text-left text-blue-600 underline hover:text-blue-800"
                                            >
                                                View {label}
                                            </button>
                                        )
                                )}
                            </div>

                            {/* WHOLE APPLICATION DECISION */}
                            <div className="flex gap-3 pt-2">
                                <button
                                    onClick={() =>
                                        handleDecision("rejected", company.id)
                                    }
                                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                >
                                    Reject Application
                                </button>

                                <button
                                    onClick={() =>
                                        handleDecision("approved", company.id)
                                    }
                                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                                >
                                    Approve Application
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* ================= MODAL ================= */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white w-[85%] h-[85%] rounded shadow-lg relative p-4">
                        <button
                            onClick={closeViewer}
                            className="absolute top-2 right-3 text-xl text-gray-600 hover:text-red-600"
                        >
                            ✖
                        </button>

                        <h3 className="text-lg font-semibold mb-2">
                            {selectedLabel}
                        </h3>

                        <div className="border h-[75%] mb-4 flex items-center justify-center bg-gray-100">
                            {isPDF(selectedDoc) ? (
                                <iframe
                                    src={selectedDoc}
                                    className="w-full h-full"
                                    title="Document Viewer"
                                />
                            ) : (
                                <img
                                    src={selectedDoc}
                                    alt="Document"
                                    className="max-h-full max-w-full"
                                />
                            )}
                        </div>

                        {/* NOTICE: Buttons removed */}
                        <p className="text-sm text-gray-500 italic text-center">
                            Close viewer to approve/reject entire application.
                        </p>
                    </div>
                </div>
            )}
        </CoordinatorLayout>
    );
}
