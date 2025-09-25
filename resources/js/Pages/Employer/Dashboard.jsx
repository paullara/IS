import React from "react";
import EmployerLayout from "@/Layouts/EmployerLayout";
import { Head } from "@inertiajs/react";
import { BsArrowUp, BsArrowDown } from "react-icons/bs";

export default function Dashboard({
    applicationStats,
    internshipStats,
    internStats,
    notifications,
    companyProfile,
}) {
    const renderChangeIcon = (change) => {
        if (change > 0) {
            return <BsArrowUp className="text-green-500" />;
        } else if (change < 0) {
            return <BsArrowDown className="text-red-500" />;
        }
        return null;
    };

    return (
        <EmployerLayout>
            <Head title="Dashboard" />

            <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto p-6">
                {/* Left Side: Stats and Notifications */}
                <div className="space-y-4 md:col-span-2">
                    <div className="grid sm:grid-cols-3 gap-4">
                        {/* Applications */}
                        <div className="bg-white p-5 rounded-2xl shadow border border-gray-100">
                            <h3 className="text-sm text-gray-500 font-medium">
                                Applications
                            </h3>
                            <div className="flex items-center">
                                <p className="text-3xl font-bold text-blue-600">
                                    {applicationStats.count}
                                </p>
                                {renderChangeIcon(applicationStats.change)}
                            </div>
                        </div>

                        {/* Internships */}
                        <div className="bg-white p-5 rounded-2xl shadow border border-gray-100">
                            <h3 className="text-sm text-gray-500 font-medium">
                                Internships
                            </h3>
                            <div className="flex items-center">
                                <p className="text-3xl font-bold text-blue-600">
                                    {internshipStats.count}
                                </p>
                                {renderChangeIcon(internshipStats.change)}
                            </div>
                        </div>

                        {/* Current Interns */}
                        <div className="bg-white p-5 rounded-2xl shadow border border-gray-100">
                            <h3 className="text-sm text-gray-500 font-medium">
                                Current Interns
                            </h3>
                            <div className="flex items-center">
                                <p className="text-3xl font-bold text-blue-600">
                                    {internStats.count}
                                </p>
                                {renderChangeIcon(internStats.change)}
                            </div>
                        </div>
                    </div>

                    {/* Notifications */}
                    <div className="bg-white p-6 rounded-2xl shadow border border-gray-100">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">
                            Recent Notifications
                        </h3>
                        {notifications.length > 0 ? (
                            <ul className="divide-y divide-gray-100">
                                {notifications.map((notification) => (
                                    <li
                                        key={notification.id}
                                        className="py-2 text-sm text-gray-700"
                                    >
                                        {notification.data.message}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-500 text-sm">
                                No notifications found.
                            </p>
                        )}
                    </div>

                    {/* Intern Reviews */}
                    <div className="bg-white p-6 rounded-2xl shadow border border-gray-100">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">
                            Intern Reviews
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                                {
                                    name: "Alyssa Santos",
                                    avatar: "https://i.pravatar.cc/100?img=5",
                                    rating: 5,
                                    comment:
                                        "My OJT experience here was amazing! Learned a lot and the mentors were so helpful.",
                                },
                                {
                                    name: "John Ramirez",
                                    avatar: "https://i.pravatar.cc/100?img=15",
                                    rating: 4,
                                    comment:
                                        "Great environment and team. Would be even better with more hands-on tasks!",
                                },
                                {
                                    name: "Mika Reyes",
                                    avatar: "https://i.pravatar.cc/100?img=11",
                                    rating: 5,
                                    comment:
                                        "Super supportive supervisors and fun projects. I’d totally recommend this place!",
                                },
                            ].map((review, index) => (
                                <div
                                    key={index}
                                    className="flex items-start space-x-4 p-4 border rounded-xl hover:shadow-sm transition"
                                >
                                    <img
                                        src={review.avatar}
                                        alt={review.name}
                                        className="w-12 h-12 rounded-full object-cover"
                                    />
                                    <div>
                                        <p className="font-medium text-gray-800">
                                            {review.name}
                                        </p>
                                        <div className="flex items-center text-yellow-400 text-sm mt-1">
                                            {"★".repeat(review.rating)}
                                            {"☆".repeat(5 - review.rating)}
                                        </div>
                                        <p className="text-sm text-gray-600 mt-2">
                                            {review.comment}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Side: Company Profile */}
                <div className="bg-white rounded-2xl shadow p-6 border border-gray-100 h-fit">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">
                        Company Profile
                    </h2>

                    {companyProfile ? (
                        <div className="flex flex-col items-center space-y-3 text-center">
                            {companyProfile.picture ? (
                                <img
                                    src={`/${companyProfile.picture}`}
                                    alt="Company"
                                    className="w-24 h-24 rounded-xl object-cover border"
                                />
                            ) : (
                                <div className="w-24 h-24 bg-gray-200 flex items-center justify-center text-gray-500 rounded-xl">
                                    No Image
                                </div>
                            )}

                            <div>
                                <p className="text-lg font-semibold">
                                    {companyProfile.firstname}
                                </p>
                                <p className="text-sm text-gray-600">
                                    {companyProfile.company_email}
                                </p>
                                <p className="text-sm text-gray-500 italic">
                                    {companyProfile.company_address}
                                </p>
                                {companyProfile.website && (
                                    <a
                                        href={companyProfile.website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500 text-sm underline block mt-1"
                                    >
                                        {companyProfile.website}
                                    </a>
                                )}
                            </div>

                            <a
                                href={`/employers/${companyProfile.id}/edit`}
                                className="text-blue-600 hover:underline text-sm mt-2"
                            >
                                ✏️ Edit Profile
                            </a>
                        </div>
                    ) : (
                        <p className="text-sm text-gray-500 text-center">
                            No company profile found.
                        </p>
                    )}
                </div>
            </div>
        </EmployerLayout>
    );
}
