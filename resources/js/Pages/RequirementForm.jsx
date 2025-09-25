import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm } from "@inertiajs/react";
import { useState } from "react";

export default function RequirementForm({ auth, requirements }) {
    const { data, setData, post, progress, errors, reset } = useForm({
        resume: null,
        endorsement_letter: null,
        good_moral: null,
        tor: null,
        moa: null,
        clearance: null,
    });

    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const handleChange = (e) => {
        setData(e.target.name, e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("student.requirements.store"), {
            preserveScroll: true,
            onSuccess: () => {
                setShowSuccessModal(true);
                reset();
            },
        });
    };

    const fields = [
        "resume",
        "endorsement_letter",
        "good_moral",
        "tor",
        "moa",
        "clearance",
    ];

    return (
        <AuthenticatedLayout user={auth.user}>
            <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow rounded">
                <h2 className="text-2xl font-semibold mb-6">
                    Internship Requirements
                </h2>

                <form onSubmit={handleSubmit}>
                    {fields.map((field) => (
                        <div className="mb-4" key={field}>
                            <label className="block text-sm font-medium mb-1 capitalize">
                                {field.replace(/_/g, " ")}
                            </label>
                            <input
                                type="file"
                                name={field}
                                onChange={handleChange}
                                className="block w-full border p-2 rounded"
                            />
                            {requirements?.[field] && (
                                <p className="mt-1 text-sm">
                                    Already uploaded:{" "}
                                    <a
                                        href={`/storage/${requirements[field]}`}
                                        target="_blank"
                                        className="text-blue-600 underline"
                                    >
                                        View
                                    </a>
                                </p>
                            )}
                            {errors[field] && (
                                <p className="text-red-500 text-sm">
                                    {errors[field]}
                                </p>
                            )}
                        </div>
                    ))}

                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                    >
                        Submit Requirements
                    </button>

                    {progress && (
                        <div className="mt-2 text-sm text-gray-600">
                            Uploading... {progress.percentage}%
                        </div>
                    )}
                </form>
            </div>

            {showSuccessModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                        <h3 className="text-xl font-semibold mb-4 text-green-600">
                            Submission Successful!
                        </h3>
                        <p className="text-gray-700 mb-6">
                            Your requirements have been successfully submitted.
                        </p>
                        <button
                            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded"
                            onClick={() => setShowSuccessModal(false)}
                        >
                            OK
                        </button>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
