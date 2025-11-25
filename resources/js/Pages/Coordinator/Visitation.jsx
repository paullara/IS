import { useState, useEffect } from "react";
import Coordinator from "@/Layouts/Coordinator";
import axios from "axios";

export default function Visitation() {
    const [requestVisitations, setRequestVisitations] = useState([]);
    const [loading, setLoading] = useState(true);

    // Modal State
    const [showRemarkModal, setShowRemarkModal] = useState(false);
    const [currentRejectId, setCurrentRejectId] = useState(null);
    const [remarks, setRemarks] = useState("");

    const fetchRequestVisit = async () => {
        try {
            const res = await axios.get("/visitation/request");
            setRequestVisitations(res.data.visitations || []);
        } catch (err) {
            console.error("Error fetching visitation requests", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRequestVisit();
        const interval = setInterval(fetchRequestVisit, 2000);
        return () => clearInterval(interval);
    }, []);

    const handleStatusUpdate = async (id, status, remarksText = null) => {
        try {
            const res = await axios.put(`/visitation/update-status/${id}`, {
                status,
                remarks: remarksText,
            });

            alert(res.data.message);

            setRequestVisitations((prev) =>
                prev.map((v) =>
                    v.id === id ? { ...v, status, remarks: remarksText } : v
                )
            );
        } catch (err) {
            console.error("Error updating visitation status", err);
            alert("Failed to update visitation status.");
        }
    };

    const openRejectModal = (id) => {
        setCurrentRejectId(id);
        setShowRemarkModal(true);
    };

    const submitRejection = () => {
        if (!remarks.trim()) {
            alert("Please enter a remark before rejecting.");
            return;
        }

        handleStatusUpdate(currentRejectId, "rejected", remarks);
        setShowRemarkModal(false);
        setRemarks("");
    };

    return (
        <Coordinator>
            <div className="p-4">
                <h1 className="text-xl font-bold mb-4">Pending Visitations</h1>

                {loading ? (
                    <p>Loading...</p>
                ) : requestVisitations.length === 0 ? (
                    <p>No pending visitations.</p>
                ) : (
                    <ul className="space-y-3">
                        {requestVisitations.map((visit) => (
                            <li
                                key={visit.id}
                                className="border p-4 rounded-md bg-white shadow-sm"
                            >
                                <p>
                                    <strong>Date:</strong>{" "}
                                    {visit.visitation_date}
                                </p>
                                <p>
                                    <strong>Remarks:</strong>{" "}
                                    {visit.remarks || "—"}
                                </p>

                                <p className="flex items-center">
                                    <strong>Status:</strong>
                                    <span
                                        className={`ml-2 px-2 py-1 rounded text-white text-sm ${
                                            visit.status === "approved"
                                                ? "bg-green-500"
                                                : visit.status === "rejected"
                                                ? "bg-red-500"
                                                : "bg-yellow-500"
                                        }`}
                                    >
                                        {visit.status}
                                    </span>
                                </p>

                                {visit.status === "pending" && (
                                    <div className="mt-3 flex gap-2">
                                        <button
                                            onClick={() =>
                                                handleStatusUpdate(
                                                    visit.id,
                                                    "approved"
                                                )
                                            }
                                            className="px-3 py-1 bg-green-600 text-white rounded-md"
                                        >
                                            Approve
                                        </button>

                                        <button
                                            onClick={() =>
                                                openRejectModal(visit.id)
                                            }
                                            className="px-3 py-1 bg-red-600 text-white rounded-md"
                                        >
                                            Reject
                                        </button>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Reject Remark Modal */}
            {showRemarkModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-md shadow-md w-96">
                        <h2 className="text-lg font-bold mb-3">
                            Enter Rejection Remarks
                        </h2>

                        <textarea
                            className="w-full border p-2 rounded-md"
                            rows="4"
                            value={remarks}
                            onChange={(e) => setRemarks(e.target.value)}
                            placeholder="Reason for rejection..."
                        ></textarea>

                        <div className="flex justify-end mt-4 space-x-2">
                            <button
                                onClick={() => {
                                    setShowRemarkModal(false);
                                    setRemarks("");
                                }}
                                className="px-3 py-1 bg-gray-400 text-white rounded-md"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={submitRejection}
                                className="px-3 py-1 bg-red-600 text-white rounded-md"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </Coordinator>
    );
}
