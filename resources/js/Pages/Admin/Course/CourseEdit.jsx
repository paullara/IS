import AdminLayout from "@/Layouts/AdminLayout";
import { useForm, Link, usePage } from "@inertiajs/react";

export default function CourseEdit() {
    const { course, coordinators } = usePage().props;
    const { data, setData, put, processing, errors } = useForm({
        name: course.name || "",
        code: course.code || "",
        description: course.description || "",
        coordinator_id:
            course.coordinator_id ||
            (coordinators.length > 0 ? coordinators[0].id : ""),
    });

    function handleSubmit(e) {
        e.preventDefault();
        put(route("courses.update", course.id));
    }

    return (
        <AdminLayout title="Edit Course">
            <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
                <h1 className="text-2xl font-bold mb-4">Edit Course</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block mb-1">Course Name</label>
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
                        <label className="block mb-1">Course Code</label>
                        <input
                            type="text"
                            className="w-full border rounded px-3 py-2"
                            value={data.code}
                            onChange={(e) => setData("code", e.target.value)}
                        />
                        {errors.code && (
                            <div className="text-red-500 text-sm">
                                {errors.code}
                            </div>
                        )}
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">Description</label>
                        <textarea
                            className="w-full border rounded px-3 py-2"
                            value={data.description}
                            onChange={(e) =>
                                setData("description", e.target.value)
                            }
                        />
                        {errors.description && (
                            <div className="text-red-500 text-sm">
                                {errors.description}
                            </div>
                        )}
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">Coordinator</label>
                        <select
                            className="w-full border rounded px-3 py-2"
                            value={data.coordinator_id}
                            onChange={(e) =>
                                setData("coordinator_id", e.target.value)
                            }
                        >
                            {coordinators.map((coordinator) => (
                                <option
                                    key={coordinator.id}
                                    value={coordinator.id}
                                >
                                    {coordinator.name}
                                </option>
                            ))}
                        </select>
                        {errors.coordinator_id && (
                            <div className="text-red-500 text-sm">
                                {errors.coordinator_id}
                            </div>
                        )}
                    </div>
                    <div className="flex justify-between items-center">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                            disabled={processing}
                        >
                            Update
                        </button>
                        <Link
                            href={route("courses.index")}
                            className="text-gray-600 hover:underline"
                        >
                            Cancel
                        </Link>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
