import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import axios from "axios";

export default function EditProfile({ student }) {
    const [formData, setFormData] = useState({
        firstname: student?.firstname || "",
        middlename: student?.middlename || "",
        lastname: student?.lastname || "",
        school_id: student?.school_id || "",
        year_level: student?.year_level || "4th",
        skills: student?.skills || "",
        bio: student?.bio || "",
        section: student?.section || "",
        picture: null,
    });

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: files ? files[0] : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});

        try {
            const fd = new FormData();
            Object.keys(formData).forEach((key) => {
                if (formData[key] !== null) {
                    fd.append(key, formData[key]);
                }
            });

            await axios.post(`/profile/${student.id}`, fd, {
                headers: { "Content-Type": "multipart/form-data" },
                params: { _method: "PATCH" },
            });

            // alert("Profile updated successfully!");
            window.location.href = "/student/profile";
            // redirect to show page
        } catch (error) {
            if (error.response?.status === 422) {
                setErrors(error.response.data.errors);
            }
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthenticatedLayout>
            <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
                <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>

                <form
                    onSubmit={handleSubmit}
                    encType="multipart/form-data"
                    className="space-y-6"
                >
                    {/* Firstname */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            First Name
                        </label>
                        <input
                            type="text"
                            name="firstname"
                            value={formData.firstname}
                            onChange={handleChange}
                            className="border p-2 w-full rounded"
                        />
                        {errors.firstname && (
                            <p className="text-red-500">{errors.firstname}</p>
                        )}
                    </div>

                    {/* Middlename */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Middle Name
                        </label>
                        <input
                            type="text"
                            name="middlename"
                            value={formData.middlename}
                            onChange={handleChange}
                            className="border p-2 w-full rounded"
                        />
                        {errors.middlename && (
                            <p className="text-red-500">{errors.middlename}</p>
                        )}
                    </div>

                    {/* Lastname */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Last Name
                        </label>
                        <input
                            type="text"
                            name="lastname"
                            value={formData.lastname}
                            onChange={handleChange}
                            className="border p-2 w-full rounded"
                        />
                        {errors.lastname && (
                            <p className="text-red-500">{errors.lastname}</p>
                        )}
                    </div>

                    {/* School ID */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            School ID
                        </label>
                        <input
                            type="text"
                            name="school_id"
                            value={formData.school_id}
                            onChange={handleChange}
                            className="border p-2 w-full rounded"
                        />
                        {errors.school_id && (
                            <p className="text-red-500">{errors.school_id}</p>
                        )}
                    </div>

                    {/* Year Level */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Year Level
                        </label>
                        <select
                            name="year_level"
                            value={formData.year_level}
                            onChange={handleChange}
                            className="border p-2 w-full rounded"
                        >
                            <option value="1st">1st Year</option>
                            <option value="2nd">2nd Year</option>
                            <option value="3rd">3rd Year</option>
                            <option value="4th">4th Year</option>
                        </select>
                        {errors.year_level && (
                            <p className="text-red-500">{errors.year_level}</p>
                        )}
                    </div>

                    {/* Skills */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Skills
                        </label>
                        <textarea
                            name="skills"
                            value={formData.skills}
                            onChange={handleChange}
                            rows="3"
                            className="border p-2 w-full rounded"
                        />
                        {errors.skills && (
                            <p className="text-red-500">{errors.skills}</p>
                        )}
                    </div>

                    {/* Bio */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Bio
                        </label>
                        <textarea
                            name="bio"
                            value={formData.bio}
                            onChange={handleChange}
                            rows="3"
                            className="border p-2 w-full rounded"
                        />
                        {errors.bio && (
                            <p className="text-red-500">{errors.bio}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Section
                        </label>
                        <textarea
                            name="section"
                            value={formData.section}
                            onChange={handleChange}
                            rows="3"
                            className="border p-2 w-full rounded"
                        />
                        {errors.skills && (
                            <p className="text-red-500">{errors.section}</p>
                        )}
                    </div>

                    {/* Picture */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Profile Picture
                        </label>
                        <input
                            type="file"
                            name="picture"
                            onChange={handleChange}
                        />
                        {errors.picture && (
                            <p className="text-red-500">{errors.picture}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg"
                    >
                        {loading ? "Saving..." : "Save Profile"}
                    </button>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
