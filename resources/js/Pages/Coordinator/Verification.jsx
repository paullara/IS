import React, { useEffect, useState } from "react";
import CoordinatorLayout from "@/Layouts/Coordinator";
import axios from "axios";

export default function Verification() {
    const [verifications, setVerifications] = useState([]);
    const [loading, setLoading] = useState(true);

    // filter
    const [filter, setFilter] = useState("pending");

    // success alert
    const [successMessage, setSuccessMessage] = useState("");

    // viewer
    const [showViewer, setShowViewer] = useState(false);
    const [selectedDoc, setSelectedDoc] = useState(null);
    const [selectedLabel, setSelectedLabel] = useState("");

    // reject modal
    const [showRejectModal, setShowRejectModal] = useState(false);
    const [rejectComment, setRejectComment] = useState("");
    const [selectedAppId, setSelectedAppId] = useState(null);

    // ==============================
    // Fetch applications
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
    const openViewer = (path, label) => {
        setSelectedDoc(`/${path}`);
        setSelectedLabel(label);
        setShowViewer(true);
    };

    const closeViewer = () => {
        setShowViewer(false);
        setSelectedDoc(null);
        setSelectedLabel("");
    };

    const isPDF = (path) => path?.toLowerCase().endsWith(".pdf");

    // ==============================
    // Approve application
    // ==============================
    const approveApplication = async (appId) => {
        try {
            await axios.post(`/company-applications/${appId}/status`, {
                status: "approved",
            });

            setSuccessMessage("Application approved successfully ✔");
            fetchVerifications();

            setTimeout(() => setSuccessMessage(""), 3000);
        } catch (error) {
            console.error("Failed to approve", error);
        }
    };

    // ==============================
    // Reject application
    // ==============================
    const openRejectModal = (appId) => {
        setSelectedAppId(appId);
        setRejectComment("");
        setShowRejectModal(true);
    };

    const closeRejectModal = () => {
        setShowRejectModal(false);
        setRejectComment("");
        setSelectedAppId(null);
    };

    const submitRejection = async () => {
        if (!rejectComment.trim()) return;

        try {
            await axios.post(`/company-applications/${selectedAppId}/status`, {
                status: "rejected",
                comment: rejectComment,
            });

            closeRejectModal();
            fetchVerifications();
        } catch (error) {
            console.error("Failed to reject", error);
        }
    };

    // ==============================
    // Filtered data
    // ==============================
    const filteredVerifications = verifications.filter(
        (v) => v.status === filter,
    );

    const statusBadge = (status) => {
        const map = {
            pending: "bg-yellow-100 text-yellow-700",
            approved: "bg-green-100 text-green-700",
            rejected: "bg-red-100 text-red-700",
        };

        return (
            <span
                className={`px-3 py-1 text-xs rounded-full font-medium ${map[status]}`}
            >
                {status.toUpperCase()}
            </span>
        );
    };

    // ==============================
    // UI
    // ==============================
    return (
        <CoordinatorLayout>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Company Verifications</h2>
            </div>

            {/* SUCCESS ALERT */}
            {successMessage && (
                <div className="mb-4 p-3 rounded bg-green-100 text-green-700 text-sm">
                    {successMessage}
                </div>
            )}

            {/* FILTER TABS */}
            <div className="flex gap-3 mb-6">
                {["pending", "approved", "rejected"].map((status) => (
                    <button
                        key={status}
                        onClick={() => setFilter(status)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium ${
                            filter === status
                                ? "bg-blue-600 text-white"
                                : "bg-gray-100 text-gray-600"
                        }`}
                    >
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                    </button>
                ))}
            </div>

            {loading && <p>Loading...</p>}

            {!loading && filteredVerifications.length === 0 && (
                <p className="text-gray-500">No {filter} applications found.</p>
            )}

            <div className="space-y-4">
                {filteredVerifications.map((company) => (
                    <div
                        key={company.id}
                        className="bg-white border rounded-lg p-4 shadow-sm"
                    >
                        <div className="flex justify-between items-center mb-3">
                            <p className="font-semibold">
                                {company.user?.name ?? "No Company Name"}
                            </p>
                            {statusBadge(company.status)}
                        </div>

                        {/* DOCUMENT LINKS */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-4">
                            {Object.entries(company.requirements).map(
                                ([label, path]) =>
                                    path && (
                                        <button
                                            key={label}
                                            onClick={() =>
                                                openViewer(path, label)
                                            }
                                            className="text-left text-blue-600 underline text-sm"
                                        >
                                            View {label}
                                        </button>
                                    ),
                            )}
                        </div>

                        {/* ACTION BUTTONS (ONLY PENDING) */}
                        {company.status === "pending" && (
                            <div className="flex gap-3">
                                <button
                                    onClick={() => openRejectModal(company.id)}
                                    className="bg-red-500 text-white px-4 py-2 rounded"
                                >
                                    Reject
                                </button>

                                <button
                                    onClick={() =>
                                        approveApplication(company.id)
                                    }
                                    className="bg-green-600 text-white px-4 py-2 rounded"
                                >
                                    Approve
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* DOCUMENT VIEWER */}
            {showViewer && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white w-[85%] h-[85%] rounded shadow-lg relative p-4">
                        <button
                            onClick={closeViewer}
                            className="absolute top-2 right-3 text-xl"
                        >
                            ✖
                        </button>

                        <h3 className="text-lg font-semibold mb-2">
                            {selectedLabel}
                        </h3>

                        <div className="border h-[75%] bg-gray-100">
                            {isPDF(selectedDoc) ? (
                                <iframe
                                    src={selectedDoc}
                                    className="w-full h-full"
                                />
                            ) : (
                                <img
                                    src={selectedDoc}
                                    className="max-h-full max-w-full mx-auto"
                                />
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* REJECT MODAL */}
            {showRejectModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white max-w-lg w-full rounded-xl p-6">
                        <h3 className="text-lg font-semibold text-red-600 mb-2">
                            Reject Application
                        </h3>

                        <textarea
                            value={rejectComment}
                            onChange={(e) => setRejectComment(e.target.value)}
                            rows={4}
                            className="w-full border rounded-lg p-3"
                            placeholder="Enter rejection reason..."
                        />

                        <div className="flex justify-end gap-3 mt-4">
                            <button
                                onClick={closeRejectModal}
                                className="px-4 py-2 border rounded"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={submitRejection}
                                className="px-4 py-2 bg-red-600 text-white rounded"
                            >
                                Reject
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </CoordinatorLayout>
    );
}
