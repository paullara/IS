import { useForm } from "@inertiajs/react";
import EmployerLayout from "@/Layouts/EmployerLayout";

export default function EditJobForm({ internship }) {
    const { data, setData, patch, processing, errors } = useForm({
        title: internship.title,
        description: internship.description,
        requirements: internship.requirements,
        start_date: internship.start_date,
        end_date: internship.end_date,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        patch(route("internships.update", internship.id));
    };

    return (
        <EmployerLayout>
            <div className="max-w-4xl mx-auto p-6">
                <h1 className="text-2xl font-bold mb-6 text-gray-800">
                    Edit Internship
                </h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold mb-1 text-gray-700">
                            Title
                        </label>
                        <input
                            type="text"
                            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={data.title}
                            onChange={(e) => setData("title", e.target.value)}
                            placeholder="Internship Title"
                        />
                        {errors.title && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.title}
                            </p>
                        )}
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm font-semibold mb-1 text-gray-700">
                            Description
                        </label>
                        <textarea
                            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={data.description}
                            onChange={(e) =>
                                setData("description", e.target.value)
                            }
                            placeholder="Job Description"
                            rows="4"
                        />
                        {errors.description && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.description}
                            </p>
                        )}
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm font-semibold mb-1 text-gray-700">
                            Requirements
                        </label>
                        <textarea
                            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={data.requirements}
                            onChange={(e) =>
                                setData("requirements", e.target.value)
                            }
                            placeholder="Job Requirements"
                            rows="3"
                        />
                        {errors.requirements && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.requirements}
                            </p>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col">
                            <label className="text-sm font-semibold mb-1 text-gray-700">
                                Start Date
                            </label>
                            <input
                                type="date"
                                className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                value={data.start_date}
                                onChange={(e) =>
                                    setData("start_date", e.target.value)
                                }
                            />
                            {errors.start_date && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.start_date}
                                </p>
                            )}
                        </div>

                        <div className="flex flex-col">
                            <label className="text-sm font-semibold mb-1 text-gray-700">
                                End Date
                            </label>
                            <input
                                type="date"
                                className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                value={data.end_date}
                                onChange={(e) =>
                                    setData("end_date", e.target.value)
                                }
                            />
                            {errors.end_date && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.end_date}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                        >
                            {processing ? "Saving..." : "Update Internship"}
                        </button>
                    </div>
                </form>
            </div>
        </EmployerLayout>
    );
}
