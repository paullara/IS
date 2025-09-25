import React, { useState } from "react";
import { useForm, Link, router } from "@inertiajs/react";
import CoordinatorLayout from "@/Layouts/Coordinator";

export default function GroupCreate({ instructors }) {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        section: "",
        instructor_id: "",
    });

    function handleSubmit(e) {
        e.preventDefault();
        post(route("groups.store"));
    }

    return (
        <CoordinatorLayout title="Create Group">
            <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
                <h1 className="text-2xl font-bold mb-4">Create Group</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block mb-1">Group Name</label>
                        <input
                            type="text"
                            className="w-full border rounded px-3 py-2"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                        />
                        {errors.name && (
                            <div className="text-red-500 text-sm">
                                {errors.name}
                            </div>
                        )}
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">Section</label>
                        <input
                            type="text"
                            className="w-full border rounded px-3 py-2"
                            value={data.section}
                            onChange={(e) => setData("section", e.target.value)}
                        />
                        {errors.section && (
                            <div className="text-red-500 text-sm">
                                {errors.section}
                            </div>
                        )}
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">Instructor</label>
                        <select
                            className="w-full border rounded px-3 py-2"
                            value={data.instructor_id}
                            onChange={(e) =>
                                setData("instructor_id", e.target.value)
                            }
                        >
                            <option value="">Select Instructor</option>
                            {instructors.map((inst) => (
                                <option key={inst.id} value={inst.id}>
                                    {inst.name}
                                </option>
                            ))}
                        </select>
                        {errors.instructor_id && (
                            <div className="text-red-500 text-sm">
                                {errors.instructor_id}
                            </div>
                        )}
                    </div>
                    <div className="flex justify-between items-center">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                            disabled={processing}
                        >
                            Create
                        </button>
                        <Link
                            href={route("coordinator.groups")}
                            className="text-gray-600 hover:underline"
                        >
                            Cancel
                        </Link>
                    </div>
                </form>
            </div>
        </CoordinatorLayout>
    );
}
