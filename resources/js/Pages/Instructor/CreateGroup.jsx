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
        <Instructor>
            <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
                <h1>Create Group</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block mb-4">Group Name</label>
                        <input
                            type="text"
                            className="w-full border rounded px-3 py-2"
                            value={data.name}
                            placeholder="Group Name"
                            onChange={(e) => setData("name", e.target.value)}
                        />
                        {errors.name && (
                            <div className="text-red-500 text-sm">
                                {errors.name}
                            </div>
                        )}
                    </div>
                    <div className="mb-4">
                        <label className="block mb-4">Section</label>
                        <input
                            type="text"
                            className="w-full border rounded px-3 py-2"
                            value={data.section}
                            placeholder="Section"
                            onChange={(e) => setData("section", e.target.value)}
                        />
                        {errors.section && (
                            <div className="text-red-500 text-sm">
                                {errors.section}
                            </div>
                        )}
                    </div>
                    <div className="flex justify-between items-center">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                            disabled={processing}
                        >
                            Create
                        </button>
                        <Link
                            href={route("groups.index")}
                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                        >
                            Cancel
                        </Link>
                    </div>
                </form>
            </div>
        </Instructor>
    );
}
