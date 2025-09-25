import React, { useState, useEffect } from "react";
import CoordinatorLayout from "@/Layouts/Coordinator";
import axios from "axios";

export default function Verification() {
    const [verifications, setVerifications] = useState([]);
    const [selectedPermit, setSelectedPermit] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    useEffect(() => {
        const fetchVerifications = async () => {
            try {
                const response = await axios.get("/pending/status");
                console.log("Response:", response);
                setVerifications(response.data.applicants);
            } catch (error) {
                console.error("Failed to fetch the companies", error);
            }
        };
        fetchVerifications();
        const interval = setInterval(fetchVerifications, 1000);
        return () => clearInterval(interval);
    }, []);

    const handleDecision = async (status) => {
        try {
            await axios.post(`/company-applications/${selectedId}/status`, {
                status,
            });
            setShowModal(false);
            setSelectedPermit(null);
            setSelectedId(null);
        } catch (error) {
            console.error("Failed to update status", error);
        }
    };

    const openModal = (permitPath, applicationId) => {
        setSelectedPermit(`/${permitPath}`);
        setSelectedId(applicationId);
        setShowModal(true);
    };

    const closeModal = () => {
        setSelectedPermit(null);
        setShowModal(false);
    };

    return (
        <CoordinatorLayout>
            <h2 className="text-xl font-semibold mb-4">
                Pending Verifications
            </h2>
            {verifications.length > 0 ? (
                <ul className="space-y-2">
                    {verifications.map((company) => (
                        <li key={company.id}>
                            <p>{company.user?.name ?? "No Company Name"}</p>
                            <button
                                onClick={() =>
                                    openModal(
                                        company.business_permit_path,
                                        company.id
                                    )
                                }
                                className="bg-blue-500 text-white px-4 py-3 rounded hover:bg-red-600"
                            >
                                View Permit
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p> No pending companies </p>
            )}

            {showModal && (
                <div>
                    <div>
                        <button
                            onClick={closeModal}
                            className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
                        >
                            ✖
                        </button>
                        <h3 className="text-lg font-semibold mb-4">
                            Bussiness Permit
                        </h3>
                        <iframe
                            src={selectedPermit}
                            className="w-full h-[500px] border"
                            title="Business Permit"
                        />
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={() => handleDecision("rejected")}
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                            >
                                Reject
                            </button>
                            <button
                                onClick={() => handleDecision("approved")}
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            >
                                Approve
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </CoordinatorLayout>
    );
}
