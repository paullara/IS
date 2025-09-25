import React from "react";
import { useForm } from "@inertiajs/react";
import EmployerLayout from "@/Layouts/EmployerLayout";

export default function Verify({ verification }) {
    const { data, setData, post, processing, errors } = useForm({
        business_permit_path: null,
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("company-application.store"));
    };
    return (
        <EmployerLayout>
            <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
                <h2>Company Verification</h2>

                {verification && verification.status === "pending" && (
                    <div className="mb-4 text-yellow-600 font-medium">
                        Your verification is pending. Please wait for approval.
                    </div>
                )}
                {verification && verification.status === "approved" && (
                    <div className="mb-4 text-green-600 font-medium">
                        Your company has been approved.
                    </div>
                )}
                {!verification ||
                verification.status === "not_submitted" ||
                verification.status === "rejected" ? (
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block font-medium mb-1">
                                Business Permit
                            </label>
                            <input
                                type="file"
                                accept="application/pdf"
                                onChange={(e) =>
                                    setData(
                                        "business_permit_path",
                                        e.target.files[0]
                                    )
                                }
                                required
                            />
                            {errors.business_permit_path && (
                                <div className="text-red-600 text-sm">
                                    {errors.business}
                                </div>
                            )}

                            <button
                                type="submit"
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                                disabled={processing}
                            >
                                Submit Verification
                            </button>
                        </div>
                    </form>
                ) : null}
            </div>
        </EmployerLayout>
    );
}
