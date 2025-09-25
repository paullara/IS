import React, { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm, Head } from "@inertiajs/react";
import axios from "axios";

export default function Profile({ auth }) {
    const [student, setStudent] = useState(null);

    const { data, setData, post, put, processing, errors, reset } = useForm({
        firstname: "",
        middlename: "",
        lastname: "",
        school_id: "",
        year_level: "4th",
        skills: "",
        bio: "",
        picture: null,
    });

    const isEditingProfile = !!student?.id;
    const [editing, setEditing] = useState(!isEditingProfile);

    useEffect(() => {
        const fetchStudentProfile = async () => {
            try {
                const res = await axios.get("/student/edit/details");
                setStudent(res.data);

                // update form with fetched data
                setData({
                    firstname: res.data.firstname || "",
                    middlename: res.data.middlename || "",
                    lastname: res.data.lastname || "",
                    school_id: res.data.school_id || "",
                    year_level: res.data.year_level || "4th",
                    skills: res.data.skills || "",
                    bio: res.data.bio || "",
                    picture: null,
                });

                console.log("From Profile", res.data);
            } catch (error) {
                console.error("Error fetching student profile", error);
            }
        };
        fetchStudentProfile();
    }, []); // run once

    const handleSubmit = (e) => {
        e.preventDefault();
        const formAction = isEditingProfile ? put : post;

        formAction(
            isEditingProfile
                ? route("student.profile.update")
                : route("student.profile.store"),
            {
                // 👈 ensures file uploads correctly
                onSuccess: () => {
                    setEditing(false);
                },
            }
        );
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Student Profile" />

            <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
                <div className="relative">
                    <div className="h-48 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg shadow-lg mb-8">
                        {student?.picture && (
                            <img
                                src={`/storage/${student.picture}`}
                                alt="Profile"
                                className="w-36 h-36 object-cover rounded-full border-4 border-white absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2"
                            />
                        )}
                    </div>

                    <h1 className="text-3xl font-bold text-gray-800">
                        {editing
                            ? isEditingProfile
                                ? "Edit Profile"
                                : "Complete Your Profile"
                            : ""}
                    </h1>
                </div>

                {editing ? (
                    <form
                        onSubmit={handleSubmit}
                        encType="multipart/form-data"
                        className="space-y-6 mt-8"
                    >
                        {/* --- FORM FIELDS --- */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Firstname */}
                            <div>
                                <label className="block text-sm font-medium text-gray-600">
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    name="firstname"
                                    value={data.firstname}
                                    onChange={(e) =>
                                        setData("firstname", e.target.value)
                                    }
                                    className="w-full border rounded-md p-3 mt-1"
                                />
                                {errors.firstname && (
                                    <p className="text-red-500 text-sm">
                                        {errors.firstname}
                                    </p>
                                )}
                            </div>

                            {/* Middlename */}
                            <div>
                                <label className="block text-sm font-medium text-gray-600">
                                    Middle Name
                                </label>
                                <input
                                    type="text"
                                    name="middlename"
                                    value={data.middlename}
                                    onChange={(e) =>
                                        setData("middlename", e.target.value)
                                    }
                                    className="w-full border rounded-md p-3 mt-1"
                                />
                            </div>
                        </div>

                        {/* Lastname */}
                        <div>
                            <label className="block text-sm font-medium text-gray-600">
                                Last Name
                            </label>
                            <input
                                type="text"
                                name="lastname"
                                value={data.lastname}
                                onChange={(e) =>
                                    setData("lastname", e.target.value)
                                }
                                className="w-full border rounded-md p-3 mt-1"
                            />
                            {errors.lastname && (
                                <p className="text-red-500 text-sm">
                                    {errors.lastname}
                                </p>
                            )}
                        </div>

                        {/* School ID */}
                        <div>
                            <label className="block text-sm font-medium text-gray-600">
                                School ID
                            </label>
                            <input
                                type="text"
                                name="school_id"
                                value={data.school_id}
                                onChange={(e) =>
                                    setData("school_id", e.target.value)
                                }
                                className="w-full border rounded-md p-3 mt-1"
                            />
                        </div>

                        {/* Year Level */}
                        <div>
                            <label className="block text-sm font-medium text-gray-600">
                                Year Level
                            </label>
                            <select
                                name="year_level"
                                value={data.year_level}
                                onChange={(e) =>
                                    setData("year_level", e.target.value)
                                }
                                className="w-full border rounded-md p-3 mt-1"
                            >
                                <option value="1st">1st Year</option>
                                <option value="2nd">2nd Year</option>
                                <option value="3rd">3rd Year</option>
                                <option value="4th">4th Year</option>
                            </select>
                        </div>

                        {/* Skills */}
                        <div>
                            <label className="block text-sm font-medium text-gray-600">
                                Skills
                            </label>
                            <textarea
                                name="skills"
                                value={data.skills}
                                onChange={(e) =>
                                    setData("skills", e.target.value)
                                }
                                className="w-full border rounded-md p-3 mt-1"
                                rows="3"
                            />
                        </div>

                        {/* Bio */}
                        <div>
                            <label className="block text-sm font-medium text-gray-600">
                                Bio
                            </label>
                            <textarea
                                name="bio"
                                value={data.bio}
                                onChange={(e) => setData("bio", e.target.value)}
                                className="w-full border rounded-md p-3 mt-1"
                                rows="3"
                            />
                        </div>
                        {/* Picture Upload */}
                        <div>
                            <label className="block text-sm font-medium text-gray-600">
                                Profile Picture
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                    setData("picture", e.target.files[0])
                                }
                                className="w-full border rounded-md p-3 mt-1"
                            />
                            {errors.picture && (
                                <p className="text-red-500 text-sm">
                                    {errors.picture}
                                </p>
                            )}
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-4 mt-6">
                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-blue-600 text-white px-6 py-3 rounded-md"
                            >
                                Save Profile
                            </button>
                            {isEditingProfile && (
                                <button
                                    type="button"
                                    onClick={() => setEditing(false)}
                                    className="bg-gray-300 text-gray-800 px-6 py-3 rounded-md"
                                >
                                    Cancel
                                </button>
                            )}
                        </div>
                    </form>
                ) : (
                    student && (
                        <div className="space-y-6 mt-8">
                            <div className="flex items-center space-x-4">
                                <div>
                                    <h2 className="text-2xl font-semibold text-gray-800">
                                        {student.firstname} {student.middlename}{" "}
                                        {student.lastname}
                                    </h2>

                                    <p className="text-gray-600">
                                        School ID: {student.school_id}
                                    </p>
                                </div>
                            </div>

                            <div>
                                <strong>Skills:</strong>{" "}
                                {student.skills || "N/A"}
                            </div>
                            <div>
                                <strong>Bio:</strong> {student.bio || "N/A"}
                            </div>

                            <button
                                onClick={() => setEditing(true)}
                                className="mt-4 bg-yellow-500 text-white px-6 py-3 rounded-md"
                            >
                                Edit Profile
                            </button>
                        </div>
                    )
                )}
            </div>
        </AuthenticatedLayout>
    );
}
