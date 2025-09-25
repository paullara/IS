import React from "react";
import { router } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";

export default function VerificationDetails({ verification }) {
    const handleStatusUpdate = (status) => {
        router.post(
            `/admin/verification/${verification.id}/status`,
            { status },
            {
                onSuccess: () => alert(`Status updated to ${status}`),
                onError: (errors) => {
                    console.error(errors);
                    alert("Something went wrong");
                },
            }
        );
    };

    const student = verification.user?.student_profile;
    const fullName = student
        ? `${student.first_name} ${student.last_name}`
        : "Unknown Student";

    return (
        <AdminLayout>
            <div className="max-w-4xl mx-auto px-6 py-8 bg-white rounded-2xl shadow-lg border border-gray-100">
                <div className="mb-6">
                    <h2 className="text-3xl font-bold text-gray-900">
                        Verification Details
                    </h2>
                    <p className="mt-1 text-gray-500 text-sm">
                        For{" "}
                        <span className="text-blue-600 font-medium">
                            {fullName}
                        </span>
                    </p>
                </div>

                <div className="space-y-6">
                    <div>
                        <span className="text-sm font-medium text-gray-500">
                            Status
                        </span>
                        <div
                            className={`inline-block mt-1 px-3 py-1 text-sm font-semibold rounded-full
                            ${
                                verification.status === "approved"
                                    ? "bg-green-100 text-green-700"
                                    : verification.status === "rejected"
                                    ? "bg-red-100 text-red-700"
                                    : "bg-gray-100 text-gray-700"
                            }`}
                        >
                            {verification.status}
                        </div>
                    </div>

                    <div>
                        <span className="block text-sm font-medium text-gray-500 mb-1">
                            School ID Image
                        </span>
                        <div className="w-full max-w-sm">
                            <img
                                src={`/school_id/${verification.school_id_image}`}
                                alt="School ID"
                                className="rounded-xl border border-gray-200 shadow-sm"
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-8 flex flex-wrap gap-4">
                    <button
                        onClick={() => handleStatusUpdate("approved")}
                        className="bg-green-500 hover:bg-green-600 transition-colors text-white text-sm font-semibold px-5 py-2.5 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-green-300"
                    >
                        Approve
                    </button>
                    <button
                        onClick={() => handleStatusUpdate("rejected")}
                        className="bg-red-500 hover:bg-red-600 transition-colors text-white text-sm font-semibold px-5 py-2.5 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-red-300"
                    >
                        Reject
                    </button>
                </div>
            </div>
        </AdminLayout>
    );
}
