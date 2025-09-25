import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import React from "react";
import { useForm } from "@inertiajs/react";

export default function StudentProfile({ profile }) {
    const { data, setData, put, processing, errors } = useForm({
        school_id: profile?.school_id || "",
        year_level: profile?.year_level || "4th",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("student.profile.update"));
    };

    return (
        <AuthenticatedLayout>
            <h2 className="text-xl font-semibold mb-4">Student Profile</h2>

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block mb-1">School ID Number</label>
                    <input
                        type="text"
                        value={data.school_id}
                        onChange={(e) => setData("school_id", e.target.value)}
                        className="border rounded p-2 w-full"
                    />
                    {errors.school_id && (
                        <p className="text-red-600">{errors.school_id}</p>
                    )}
                </div>

                <div className="mb-4">
                    <label className="block mb-1">Year Level</label>
                    <select
                        value={data.year_level}
                        onChange={(e) => setData("year_level", e.target.value)}
                        className="border rounded p-2 w-full"
                    >
                        <option value="1st">1st Year</option>
                        <option value="2nd">2nd Year</option>
                        <option value="3rd">3rd Year</option>
                        <option value="4th">4th Year</option>
                    </select>
                    {errors.year_level && (
                        <p className="text-red-600">{errors.year_level}</p>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Save Profile
                </button>
            </form>
        </AuthenticatedLayout>
    );
}
