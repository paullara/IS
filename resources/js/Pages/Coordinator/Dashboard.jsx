import Coordinator from "@/Layouts/Coordinator";
import { usePage } from "@inertiajs/react";

export default function Dashboard() {
    const { instructors = [], internships = [], groups = [] } = usePage().props;

    const stats = [
        {
            label: "Groups",
            value: groups.length,
            icon: (
                <svg
                    className="w-8 h-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                </svg>
            ),
            color: "from-blue-500 to-blue-600",
            bgColor: "bg-blue-50",
            textColor: "text-blue-700",
        },
        {
            label: "Internships",
            value: internships.length,
            icon: (
                <svg
                    className="w-8 h-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m8 0V8a2 2 0 01-2 2H8a2 2 0 01-2-2V6m8 0H8m0 0V4"
                    />
                </svg>
            ),
            color: "from-yellow-500 to-amber-500",
            bgColor: "bg-yellow-50",
            textColor: "text-yellow-700",
        },
        {
            label: "Instructors",
            value: instructors.length,
            icon: (
                <svg
                    className="w-8 h-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                </svg>
            ),
            color: "from-blue-500 to-indigo-600",
            bgColor: "bg-blue-50",
            textColor: "text-blue-700",
        },
    ];

    return (
        <Coordinator title="Dashboard">
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-20 left-20 w-72 h-72 bg-blue-400 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-20 right-20 w-96 h-96 bg-yellow-400 rounded-full blur-3xl"></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-6 py-8 space-y-8">
                    {/* Hero Header */}
                    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 p-8 md:p-12 text-white shadow-2xl">
                        {/* Decorative Elements */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-yellow-400/10 rounded-full translate-y-24 -translate-x-24"></div>

                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 bg-yellow-400 rounded-xl flex items-center justify-center">
                                    <svg
                                        className="w-6 h-6 text-blue-900"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <h1 className="text-4xl md:text-5xl font-bold">
                                        Coordinator Dashboard
                                    </h1>
                                    <div className="w-24 h-1 bg-yellow-400 rounded-full mt-2"></div>
                                </div>
                            </div>
                            <p className="text-xl text-blue-100 max-w-2xl leading-relaxed">
                                Welcome back! Monitor your internship program,
                                track instructor activities, and manage student
                                groups all in one place.
                            </p>
                        </div>
                    </div>

                    {/* Enhanced Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {stats.map((stat, index) => (
                            <div
                                key={stat.label}
                                className="group relative overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                                style={{ animationDelay: `${index * 150}ms` }}
                            >
                                {/* Gradient Background */}
                                <div
                                    className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                                ></div>

                                {/* Content */}
                                <div className="relative p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <div
                                            className={`p-3 rounded-xl ${stat.bgColor} ${stat.textColor} group-hover:scale-110 transition-transform duration-300`}
                                        >
                                            {stat.icon}
                                        </div>
                                        <div className="text-right">
                                            <div className="text-3xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                                                {stat.value}
                                            </div>
                                            <div className="text-sm text-gray-500 uppercase tracking-wide">
                                                {stat.label}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Progress Bar */}
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className={`h-2 rounded-full bg-gradient-to-r ${stat.color} transition-all duration-500`}
                                            style={{
                                                width: `${Math.min(
                                                    (stat.value / 10) * 100,
                                                    100
                                                )}%`,
                                            }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Instructors Section */}
                    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                                    <svg
                                        className="w-6 h-6 text-white"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                        />
                                    </svg>
                                </div>
                                <h2 className="text-2xl font-bold text-white">
                                    Instructors
                                </h2>
                            </div>
                        </div>

                        <div className="p-8">
                            {instructors.length === 0 ? (
                                <div className="text-center py-12">
                                    <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                        <svg
                                            className="w-8 h-8 text-gray-400"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-.98-5.5-2.5M12 4.5a7.5 7.5 0 100 15 7.5 7.5 0 000-15z"
                                            />
                                        </svg>
                                    </div>
                                    <p className="text-gray-500 font-medium">
                                        No instructors available
                                    </p>
                                    <p className="text-gray-400 text-sm mt-1">
                                        Instructors will appear here once added
                                    </p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {instructors.map((ins, index) => (
                                        <div
                                            key={ins.id}
                                            className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-gradient-to-br from-white to-gray-50 p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                                            style={{
                                                animationDelay: `${
                                                    index * 100
                                                }ms`,
                                            }}
                                        >
                                            {/* Avatar */}
                                            <div className="flex items-center gap-4 mb-4">
                                                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                                                    {ins.firstname?.charAt(0) ||
                                                        "I"}
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                                                        {ins.firstname}{" "}
                                                        {ins.lastname}
                                                    </h3>
                                                    <p className="text-sm text-gray-500">
                                                        {ins.email}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Details */}
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                                    <svg
                                                        className="w-4 h-4"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                                        />
                                                    </svg>
                                                    {ins.year_level}{" "}
                                                    {ins.section}
                                                </div>
                                            </div>

                                            {/* Hover Effect */}
                                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Internships Section */}
                    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                        <div className="bg-gradient-to-r from-yellow-500 to-amber-500 px-8 py-6">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                                    <svg
                                        className="w-6 h-6 text-white"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m8 0V8a2 2 0 01-2 2H8a2 2 0 01-2-2V6m8 0H8m0 0V4"
                                        />
                                    </svg>
                                </div>
                                <h2 className="text-2xl font-bold text-white">
                                    Internships
                                </h2>
                            </div>
                        </div>

                        <div className="p-8">
                            {internships.length === 0 ? (
                                <div className="text-center py-12">
                                    <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                        <svg
                                            className="w-8 h-8 text-gray-400"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                            />
                                        </svg>
                                    </div>
                                    <p className="text-gray-500 font-medium">
                                        No internships posted
                                    </p>
                                    <p className="text-gray-400 text-sm mt-1">
                                        Internship opportunities will appear
                                        here
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {internships.map((intern, index) => (
                                        <div
                                            key={intern.id}
                                            className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-gradient-to-r from-white to-gray-50 p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                                            style={{
                                                animationDelay: `${
                                                    index * 100
                                                }ms`,
                                            }}
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-amber-500 rounded-xl flex items-center justify-center text-white">
                                                        <svg
                                                            className="w-6 h-6"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m8 0V8a2 2 0 01-2 2H8a2 2 0 01-2-2V6m8 0H8m0 0V4"
                                                            />
                                                        </svg>
                                                    </div>
                                                    <div>
                                                        <h3 className="font-semibold text-gray-900 group-hover:text-yellow-600 transition-colors">
                                                            {intern.title ||
                                                                `Internship ${intern.id}`}
                                                        </h3>
                                                        <p className="text-sm text-gray-500">
                                                            Posted recently
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-3">
                                                    <span
                                                        className={`px-4 py-2 text-xs font-semibold rounded-full border ${
                                                            intern.status ===
                                                            "active"
                                                                ? "bg-green-50 text-green-700 border-green-200"
                                                                : intern.status ===
                                                                  "pending"
                                                                ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                                                                : "bg-gray-50 text-gray-700 border-gray-200"
                                                        }`}
                                                    >
                                                        {intern.status ??
                                                            "Unknown"}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Hover Effect */}
                                            <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Groups Section */}
                    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                                    <svg
                                        className="w-6 h-6 text-white"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                        />
                                    </svg>
                                </div>
                                <h2 className="text-2xl font-bold text-white">
                                    Groups
                                </h2>
                            </div>
                        </div>

                        <div className="p-8">
                            {groups.length === 0 ? (
                                <div className="text-center py-12">
                                    <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                        <svg
                                            className="w-8 h-8 text-gray-400"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                            />
                                        </svg>
                                    </div>
                                    <p className="text-gray-500 font-medium">
                                        No groups created yet
                                    </p>
                                    <p className="text-gray-400 text-sm mt-1">
                                        Student groups will appear here once
                                        created
                                    </p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {groups.map((group, index) => (
                                        <div
                                            key={group.id}
                                            className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-gradient-to-br from-white to-gray-50 p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                                            style={{
                                                animationDelay: `${
                                                    index * 100
                                                }ms`,
                                            }}
                                        >
                                            {/* Group Icon */}
                                            <div className="flex items-center gap-4 mb-4">
                                                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white">
                                                    <svg
                                                        className="w-6 h-6"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                                        />
                                                    </svg>
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                                                        {group.name}
                                                    </h3>
                                                    <p className="text-sm text-gray-500">
                                                        Student Group
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Instructor Info */}
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <svg
                                                    className="w-4 h-4"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                                    />
                                                </svg>
                                                <span>
                                                    Instructor:{" "}
                                                    {group.instructor
                                                        ?.firstname ??
                                                        "Unassigned"}
                                                </span>
                                            </div>

                                            {/* Hover Effect */}
                                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Coordinator>
    );
}
