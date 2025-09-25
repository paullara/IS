import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
import EmployerLayout from "@/Layouts/EmployerLayout";

export default function Create({ hasProfile = false }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        company_name: "",
        contact_name: "",
        contact_number: "",
        description: "",
        website: "",
        profile_picture: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/employers", {
            forceFormData: true, // important for file upload
            onSuccess: () => reset(),
        });
    };

    return (
        <EmployerLayout>
            <div className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow">
                <h1 className="text-2xl font-bold mb-4">
                    Create Employer Profile
                </h1>
                {hasProfile ? (
                    <div className="text-center text-gray-500 text-lg py-10">
                        You already have a company profile.
                        <br />
                        <span className="text-blue-600">
                            You cannot add another profile.
                        </span>
                    </div>
                ) : (
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-4"
                        encType="multipart/form-data"
                    >
                        <div>
                            <label className="block">Company Name</label>
                            <input
                                type="text"
                                value={data.company_name}
                                onChange={(e) =>
                                    setData("company_name", e.target.value)
                                }
                                className="w-full p-2 border rounded"
                            />
                            {errors.company_name && (
                                <div className="text-red-500">
                                    {errors.company_name}
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="block">Contact Name</label>
                            <input
                                type="text"
                                value={data.contact_name}
                                onChange={(e) =>
                                    setData("contact_name", e.target.value)
                                }
                                className="w-full p-2 border rounded"
                            />
                            {errors.contact_name && (
                                <div className="text-red-500">
                                    {errors.contact_name}
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="block">Company Address</label>
                            <input
                                type="text"
                                value={data.company_address}
                                onChange={(e) =>
                                    setData("company_address", e.target.value)
                                }
                                className="w-full p-2 border rounded"
                            />
                            {errors.company_address && (
                                <div className="text-red-500">
                                    {errors.company_address}
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="block">Company Email</label>
                            <input
                                type="text"
                                value={data.company_email}
                                onChange={(e) =>
                                    setData("company_email", e.target.value)
                                }
                                className="w-full p-2 border rounded"
                            />
                            {errors.company_email && (
                                <div className="text-red-500">
                                    {errors.company_email}
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="block">Contact Number</label>
                            <input
                                type="text"
                                value={data.contact_number}
                                onChange={(e) =>
                                    setData("contact_number", e.target.value)
                                }
                                className="w-full p-2 border rounded"
                            />
                            {errors.contact_number && (
                                <div className="text-red-500">
                                    {errors.contact_number}
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="block">Website</label>
                            <input
                                type="url"
                                value={data.website}
                                onChange={(e) =>
                                    setData("website", e.target.value)
                                }
                                className="w-full p-2 border rounded"
                            />
                            {errors.website && (
                                <div className="text-red-500">
                                    {errors.website}
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="block">Description</label>
                            <textarea
                                value={data.description}
                                onChange={(e) =>
                                    setData("description", e.target.value)
                                }
                                className="w-full p-2 border rounded"
                            />
                            {errors.description && (
                                <div className="text-red-500">
                                    {errors.description}
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="block">Profile Picture</label>
                            <input
                                type="file"
                                onChange={(e) =>
                                    setData(
                                        "profile_picture",
                                        e.target.files[0]
                                    )
                                }
                                className="w-full"
                            />
                            {errors.profile_picture && (
                                <div className="text-red-500">
                                    {errors.profile_picture}
                                </div>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            {processing ? "Saving..." : "Create Profile"}
                        </button>
                    </form>
                )}
            </div>
        </EmployerLayout>
    );
}
