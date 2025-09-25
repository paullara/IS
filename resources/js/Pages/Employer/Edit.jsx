import React, { useState } from "react";
import { usePage } from "@inertiajs/react";
import axios from "axios";
import EmployerLayout from "@/Layouts/EmployerLayout";

export default function Edit() {
    const { profile } = usePage().props;

    console.log(profile.id);

    const [data, setData] = useState({
        company_name: profile.company_name || "",
        contact_number: profile.contact_number || "",
        company_address: profile.company_address || "",
        website: profile.website || "",
        picture: null,
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});

        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            if (value !== null && value !== "") {
                formData.append(key, value);
            }
        });
        formData.append("_method", "PUT");

        try {
            await axios.post(`/employers/update`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            alert("Profile updated successfully!");
            window.location.href = "/employers"; // redirect after success
        } catch (err) {
            if (err.response?.status === 422) {
                setErrors(err.response.data.errors); // Laravel validation errors
            } else {
                alert("Something went wrong!");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <EmployerLayout>
            <div className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow">
                <h1 className="text-2xl font-bold mb-4">
                    Edit Employer Profile
                </h1>
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
                                setData({
                                    ...data,
                                    company_name: e.target.value,
                                })
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
                        <label className="block">Contact Number</label>
                        <input
                            type="text"
                            value={data.contact_number}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    contact_number: e.target.value,
                                })
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
                        <label className="block">Company Address</label>
                        <input
                            type="text"
                            value={data.company_address}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    company_address: e.target.value,
                                })
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
                        <label className="block">Website</label>
                        <input
                            type="url"
                            value={data.website}
                            onChange={(e) =>
                                setData({ ...data, website: e.target.value })
                            }
                            className="w-full p-2 border rounded"
                        />
                        {errors.website && (
                            <div className="text-red-500">{errors.website}</div>
                        )}
                    </div>

                    <div>
                        <label className="block">Current Picture</label>
                        {profile.picture ? (
                            <img
                                src={`/${profile.picture}`}
                                alt="Current"
                                className="w-16 h-16 object-cover rounded mb-2"
                            />
                        ) : (
                            <div className="text-gray-500 mb-2">
                                No image uploaded.
                            </div>
                        )}
                        <input
                            type="file"
                            onChange={(e) =>
                                setData({ ...data, picture: e.target.files[0] })
                            }
                            className="w-full"
                        />
                        {errors.picture && (
                            <div className="text-red-500">{errors.picture}</div>
                        )}

                        {data.picture && typeof data.picture === "object" && (
                            <img
                                src={URL.createObjectURL(data.picture)}
                                alt="Preview"
                                className="w-16 h-16 object-cover rounded mt-2"
                            />
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                    >
                        {loading ? "Updating..." : "Update Profile"}
                    </button>
                </form>
            </div>
        </EmployerLayout>
    );
}
