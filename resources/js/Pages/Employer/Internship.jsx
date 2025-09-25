import EmployerLayout from "@/Layouts/EmployerLayout";
import { Link } from "@inertiajs/react";

export default function Index({ internships }) {
    return (
        <EmployerLayout>
            <div className="max-w-6xl mx-auto p-6">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">
                        My Internships
                    </h1>
                    <Link href={route("internships.create")}>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                            + Create New Internship
                        </button>
                    </Link>
                </div>

                {internships.length > 0 ? (
                    <div className="grid gap-6">
                        {internships.map((internship) => (
                            <div
                                key={internship.id}
                                className="bg-white p-6 rounded-2xl shadow border border-gray-100 flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0"
                            >
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800">
                                        {internship.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm mt-1">
                                        {internship.description.length > 100
                                            ? internship.description.slice(
                                                  0,
                                                  100
                                              ) + "..."
                                            : internship.description}
                                    </p>
                                    <div className="text-sm text-gray-500 mt-2 space-x-2">
                                        <span>
                                            📅 {internship.start_date} -{" "}
                                            {internship.end_date}
                                        </span>
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                internship.status === "active"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-gray-100 text-gray-600"
                                            }`}
                                        >
                                            {internship.status
                                                .charAt(0)
                                                .toUpperCase() +
                                                internship.status.slice(1)}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <Link
                                        href={route(
                                            "internships.edit",
                                            internship.id
                                        )}
                                        className="w-48 bg-green-400 hover:bg-green-500 text-white px-3 py-1.5 rounded-md text-sm transition text-center"
                                    >
                                        Edit
                                    </Link>
                                    <Link
                                        href={route(
                                            "internships.destroy",
                                            internship.id
                                        )}
                                        method="delete"
                                        as="button"
                                        className="w-48 bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-md text-sm transition"
                                    >
                                        Delete
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-gray-500 mt-20">
                        No internships found. Start by creating one!
                    </div>
                )}
            </div>
        </EmployerLayout>
    );
}
