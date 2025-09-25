import Coordinator from "@/Layouts/Coordinator";
import { usePage } from "@inertiajs/react";

export default function Dashboard() {
    const { instructors = [], internships = [], groups = [] } = usePage().props;

    const stats = [
        {
            label: "Groups",
            value: groups.length,
            icon: "👥",
            color: "bg-blue-100 text-blue-700",
        },
        {
            label: "Internships",
            value: internships.length,
            icon: "💼",
            color: "bg-green-100 text-green-700",
        },
        {
            label: "Instructors",
            value: instructors.length,
            icon: "🧑‍🏫",
            color: "bg-yellow-100 text-yellow-700",
        },
    ];

    return (
        <Coordinator title="Dashboard">
            <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-10">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-3xl font-extrabold text-blue-900 mb-2">
                        Welcome, Coordinator!
                    </h1>
                    <p className="text-gray-600 mb-8">
                        Here's an overview of your groups and activities.
                    </p>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
                        {stats.map((stat) => (
                            <div
                                key={stat.label}
                                className={`rounded-xl shadow p-6 flex items-center gap-4 ${stat.color}`}
                            >
                                <span className="text-4xl">{stat.icon}</span>
                                <div>
                                    <div className="text-2xl font-bold">
                                        {stat.value}
                                    </div>
                                    <div className="text-gray-700 font-medium">
                                        {stat.label}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Instructors Table */}
                    <div className="bg-white rounded-xl shadow p-6 mb-8">
                        <h2 className="text-xl font-bold text-blue-800 mb-4">
                            Instructors
                        </h2>
                        {instructors.length === 0 ? (
                            <div className="text-gray-400">
                                No instructors found.
                            </div>
                        ) : (
                            <ul className="divide-y divide-gray-100">
                                {instructors.map((ins) => (
                                    <li
                                        key={ins.id}
                                        className="py-2 flex justify-between items-center"
                                    >
                                        <span className="font-medium text-gray-800">
                                            {ins.name}
                                        </span>
                                        <span className="text-xs text-gray-500">
                                            {ins.email}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* Internships Table */}
                    <div className="bg-white rounded-xl shadow p-6 mb-8">
                        <h2 className="text-xl font-bold text-blue-800 mb-4">
                            Internships
                        </h2>
                        {internships.length === 0 ? (
                            <div className="text-gray-400">
                                No internships found.
                            </div>
                        ) : (
                            <ul className="divide-y divide-gray-100">
                                {internships.map((intern) => (
                                    <li
                                        key={intern.id}
                                        className="py-2 flex justify-between items-center"
                                    >
                                        <span className="font-medium text-gray-800">
                                            {intern.title || intern.id}
                                        </span>
                                        <span className="text-xs text-gray-500">
                                            {intern.status || "-"}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* Groups Table */}
                    <div className="bg-white rounded-xl shadow p-6 mb-8">
                        <h2 className="text-xl font-bold text-blue-800 mb-4">
                            Groups
                        </h2>
                        {groups.length === 0 ? (
                            <div className="text-gray-400">
                                No groups found.
                            </div>
                        ) : (
                            <ul className="divide-y divide-gray-100">
                                {groups.map((group) => (
                                    <li
                                        key={group.id}
                                        className="py-2 flex justify-between items-center"
                                    >
                                        <span className="font-medium text-gray-800">
                                            {group.name}
                                        </span>
                                        <span className="text-xs text-gray-500">
                                            {group.instructor?.name ||
                                                "No instructor"}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </Coordinator>
    );
}
