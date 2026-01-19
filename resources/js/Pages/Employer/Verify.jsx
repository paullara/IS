import React from "react";
import { useForm } from "@inertiajs/react";
import { Upload } from "lucide-react";
import EmployerLayout from "@/Layouts/EmployerLayout";

const REQUIREMENTS = [
    { key: "business_permit_path", label: "Business Permit", required: true },
    { key: "dti_sec_path", label: "DTI / SEC Registration", required: true },
    { key: "bir_2303_path", label: "BIR 2303", required: true },
    { key: "mayors_permit_path", label: "Mayor’s Permit", required: true },
    { key: "company_profile_path", label: "Company Profile", required: true },
    { key: "moa_path", label: "MOA", required: true },
    {
        key: "proof_of_office_path",
        label: "Proof of Office Address",
        required: true,
    },
    {
        key: "valid_id_path",
        label: "Valid ID of Company Representative",
        required: true,
    },
    { key: "philgeps_path", label: "PhilGEPS (Optional)", required: false },
    {
        key: "organizational_chart_path",
        label: "Organizational Chart",
        required: true,
    },
    {
        key: "previous_interns_path",
        label: "List of Previous Interns",
        required: false,
    },
    { key: "training_plan_path", label: "Training Plan", required: true },
    {
        key: "designation_letter_path",
        label: "Designation Letter",
        required: true,
    },
    {
        key: "safety_policy_path",
        label: "Safety & Health Policy",
        required: true,
    },
    { key: "code_of_conduct_path", label: "Code of Conduct", required: true },
    {
        key: "certificate_of_compliance_path",
        label: "DOLE Certificate",
        required: true,
    },
    { key: "insurance_path", label: "Insurance Coverage", required: true },
    {
        key: "office_photos_path",
        label: "Office / Workplace Photos",
        required: true,
    },
    { key: "nda_path", label: "NDA (Optional)", required: false },
];

export default function Verify({ verification }) {
    const { data, setData, post, processing, errors } = useForm(
        Object.fromEntries(REQUIREMENTS.map((r) => [r.key, null])),
    );

    const submit = (e) => {
        e.preventDefault();
        post(route("company-application.store"));
    };

    const status = verification?.status;
    const comment = verification?.comment;

    // ================= STATUS SCREENS =================

    if (status === "pending") {
        return (
            <EmployerLayout>
                <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded-2xl shadow-md">
                    <h2 className="text-lg font-semibold text-yellow-600">
                        Application under review
                    </h2>
                </div>
            </EmployerLayout>
        );
    }

    if (status === "approved") {
        return (
            <EmployerLayout>
                <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded-2xl shadow-md">
                    <h2 className="text-lg font-semibold text-green-600">
                        Your company has been approved 🎉
                    </h2>
                </div>
            </EmployerLayout>
        );
    }

    // ================= REJECTED (SHOW COMMENT + FORM) =================
    if (status === "rejected") {
        return (
            <EmployerLayout>
                <div className="max-w-4xl mx-auto p-8 bg-white rounded-2xl shadow-lg border border-gray-100 mt-6">
                    <h2 className="text-2xl font-bold text-red-600 mb-2">
                        Application Rejected
                    </h2>

                    {comment && (
                        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg text-sm mb-6">
                            <strong>Reason:</strong> {comment}
                        </div>
                    )}

                    <p className="text-sm text-gray-600 mb-6">
                        Please re-upload the required documents and submit
                        again.
                    </p>

                    <form onSubmit={submit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            {REQUIREMENTS.map((req) => (
                                <div key={req.key} className="space-y-1">
                                    <label className="block font-medium text-gray-800 text-sm">
                                        {req.label}
                                        {req.required && (
                                            <span className="text-red-500">
                                                {" "}
                                                *
                                            </span>
                                        )}
                                    </label>

                                    <label className="flex items-center px-4 py-2 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition text-sm">
                                        <Upload className="w-4 h-4 mr-2 opacity-60" />
                                        <span>
                                            {data[req.key]?.name
                                                ? data[req.key].name
                                                : "Choose PDF file"}
                                        </span>
                                        <input
                                            type="file"
                                            accept="application/pdf"
                                            className="hidden"
                                            onChange={(e) =>
                                                setData(
                                                    req.key,
                                                    e.target.files[0],
                                                )
                                            }
                                            required={req.required}
                                        />
                                    </label>

                                    {errors[req.key] && (
                                        <p className="text-xs text-red-500 mt-1">
                                            {errors[req.key]}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition disabled:opacity-50"
                        >
                            {processing
                                ? "Resubmitting..."
                                : "Resubmit Application"}
                        </button>
                    </form>
                </div>
            </EmployerLayout>
        );
    }

    // ================= FIRST TIME SUBMIT =================
    return (
        <EmployerLayout>
            <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded-2xl shadow-md">
                <h2 className="text-lg font-semibold text-gray-600">
                    Please submit your company application.
                </h2>
            </div>
        </EmployerLayout>
    );
}
