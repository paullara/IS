import React from "react";
import { useForm } from "@inertiajs/react";
import { Upload, CheckCircle } from "lucide-react";
import EmployerLayout from "@/Layouts/EmployerLayout";

const REQUIREMENTS = [
    { key: "business_permit_path", label: "Business Permit" },
    { key: "dti_sec_path", label: "DTI / SEC Registration" },
    { key: "bir_2303_path", label: "BIR 2303" },
    { key: "mayors_permit_path", label: "Mayor’s Permit" },
    { key: "company_profile_path", label: "Company Profile" },
    { key: "moa_path", label: "MOA" },
    { key: "proof_of_office_path", label: "Proof of Office Address" },
    { key: "valid_id_path", label: "Valid ID of Company Representative" },
    { key: "philgeps_path", label: "PhilGEPS" },
    { key: "organizational_chart_path", label: "Organizational Chart" },
    { key: "previous_interns_path", label: "Previous Interns" },
    { key: "training_plan_path", label: "Training Plan" },
    { key: "designation_letter_path", label: "Designation Letter" },
    { key: "safety_policy_path", label: "Safety Policy" },
    { key: "code_of_conduct_path", label: "Code of Conduct" },
    { key: "certificate_of_compliance_path", label: "DOLE Certificate" },
    { key: "insurance_path", label: "Insurance" },
    { key: "office_photos_path", label: "Office Photos" },
    { key: "nda_path", label: "NDA" },
];

export default function Verify({ verification }) {
    const status = verification?.status ?? null;
    const comment = verification?.comment ?? null;

    const isFirstTime = !verification;
    const isRejected = status === "rejected";

    const { data, setData, post, processing, errors } = useForm(
        Object.fromEntries(REQUIREMENTS.map((r) => [r.key, null])),
    );

    const submit = (e) => {
        e.preventDefault();
        post(route("company-application.store"), {
            forceFormData: true,
        });
    };

    if (status === "pending") {
        return (
            <EmployerLayout>
                <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded-xl shadow">
                    <h2 className="text-yellow-600 font-semibold">
                        Application under review ⏳
                    </h2>
                </div>
            </EmployerLayout>
        );
    }

    if (status === "approved") {
        return (
            <EmployerLayout>
                <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded-xl shadow">
                    <h2 className="text-green-600 font-semibold">
                        Company Approved 🎉
                    </h2>
                </div>
            </EmployerLayout>
        );
    }

    return (
        <EmployerLayout>
            <div className="max-w-5xl mx-auto bg-white p-8 rounded-2xl shadow mt-6">
                <h2
                    className={`text-2xl font-bold mb-4 ${isRejected ? "text-red-600" : ""}`}
                >
                    {isFirstTime
                        ? "Company Application"
                        : "Application Rejected"}
                </h2>

                {isRejected && comment && (
                    <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded mb-6">
                        <strong>Reason:</strong> {comment}
                    </div>
                )}

                <form onSubmit={submit} className="grid md:grid-cols-2 gap-6">
                    {REQUIREMENTS.map((req) => {
                        const hasFile = Boolean(verification?.[req.key]);

                        return (
                            <div key={req.key}>
                                <label className="text-sm font-medium">
                                    {req.label}
                                    {!hasFile && (
                                        <span className="text-red-500"> *</span>
                                    )}
                                </label>

                                <p className="text-xs text-gray-500">
                                    PDF files only
                                </p>

                                {hasFile && (
                                    <div className="flex items-center text-green-600 text-xs mt-1">
                                        <CheckCircle className="w-4 h-4 mr-1" />
                                        File already submitted
                                    </div>
                                )}

                                <label className="flex items-center mt-2 px-4 py-2 border rounded cursor-pointer bg-gray-50 hover:bg-gray-100">
                                    <Upload className="w-4 h-4 mr-2" />
                                    {data[req.key]?.name ?? "Upload PDF file"}
                                    <input
                                        type="file"
                                        accept="application/pdf"
                                        hidden
                                        onChange={(e) => {
                                            const file = e.target.files[0];
                                            if (
                                                file &&
                                                file.type !== "application/pdf"
                                            ) {
                                                alert(
                                                    "Only PDF files are allowed.",
                                                );
                                                return;
                                            }
                                            setData(req.key, file);
                                        }}
                                        required={isFirstTime && !hasFile}
                                    />
                                </label>

                                {errors[req.key] && (
                                    <p className="text-xs text-red-500 mt-1">
                                        {errors[req.key]}
                                    </p>
                                )}
                            </div>
                        );
                    })}

                    <div className="md:col-span-2">
                        <button
                            disabled={processing}
                            className="w-full bg-blue-600 text-white py-3 rounded-lg"
                        >
                            {processing
                                ? "Submitting..."
                                : "Submit Application"}
                        </button>
                    </div>
                </form>
            </div>
        </EmployerLayout>
    );
}
