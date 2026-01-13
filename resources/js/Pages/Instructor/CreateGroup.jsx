import React from "react";
import { useForm, Link } from "@inertiajs/react";
import Instructor from "@/Layouts/Instructor";

export default function CreateGroup() {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        section: "",
    });

    function handleSubmit(e) {
        e.preventDefault();
        post(route("groups.store"));
    }

    return (
        <Instructor title="Create Group">
            <div className="max-w-lg mx-auto mt-10">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">
                    Create Group
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-5"
                >
                    {/* Group Name */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">
                            Group Name
                        </label>
                        <input
                            type="text"
                            className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                                errors.name
                                    ? "border-red-500"
                                    : "border-gray-300"
                            }`}
                            value={data.name}
                            placeholder="Enter group name"
                            onChange={(e) => setData("name", e.target.value)}
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.name}
                            </p>
                        )}
                    </div>

                    {/* Section */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">
                            Section
                        </label>
                        <input
                            type="text"
                            className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                                errors.section
                                    ? "border-red-500"
                                    : "border-gray-300"
                            }`}
                            value={data.section}
                            placeholder="Enter section"
                            onChange={(e) => setData("section", e.target.value)}
                        />
                        {errors.section && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.section}
                            </p>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-3">
                        <Link
                            href={route("groups.index")}
                            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
                            disabled={processing}
                        >
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </Instructor>
    );
}
