import React from "react";
import EmployerLayout from "@/Layouts/EmployerLayout";
import { Head } from "@inertiajs/react";
import {
    BsArrowUp,
    BsArrowDown,
    BsFileText,
    BsBriefcase,
    BsPeople,
    BsBell,
    BsStar,
} from "react-icons/bs";

export default function Dashboard({
    applicationStats,
    internshipStats,
    internStats,
    notifications,
    companyProfile,
}) {
    const renderChangeIcon = (change) => {
        if (change > 0) {
            return <BsArrowUp className="text-green-500 ml-2" />;
        } else if (change < 0) {
            return <BsArrowDown className="text-red-500 ml-2" />;
        }
        return null;
    };

    const renderStars = (rating) => {
        return (
            <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                    <BsStar
                        key={i}
                        className={`w-4 h-4 ${
                            i < rating
                                ? "text-yellow-400 fill-current"
                                : "text-gray-300"
                        }`}
                    />
                ))}
            </div>
        );
    };

    return (
        <EmployerLayout>
            <Head title="Dashboard" />

            <div className="min-h-screen bg-gray-50 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-8">
                        <p className="text-gray-900 text-3xl">
                            Welcome back! Here's an overview of your internship
                            program.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Side: Stats and Content */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Stats Cards */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {/* Applications */}
                                <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-xl shadow-lg text-white transform hover:scale-105 transition-transform duration-200">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <BsFileText className="w-8 h-8 opacity-80" />
                                        </div>
                                        <div className="flex items-center">
                                            {renderChangeIcon(
                                                applicationStats.change
                                            )}
                                        </div>
                                    </div>
                                    <h3 className="text-sm font-medium opacity-90 mt-4">
                                        Applications
                                    </h3>
                                    <p className="text-3xl font-bold mt-2">
                                        {applicationStats.count}
                                    </p>
                                </div>

                                {/* Internships */}
                                <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-xl shadow-lg text-white transform hover:scale-105 transition-transform duration-200">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <BsBriefcase className="w-8 h-8 opacity-80" />
                                        </div>
                                        <div className="flex items-center">
                                            {renderChangeIcon(
                                                internshipStats.change
                                            )}
                                        </div>
                                    </div>
                                    <h3 className="text-sm font-medium opacity-90 mt-4">
                                        Internships
                                    </h3>
                                    <p className="text-3xl font-bold mt-2">
                                        {internshipStats.count}
                                    </p>
                                </div>

                                {/* Current Interns */}
                                <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-xl shadow-lg text-white transform hover:scale-105 transition-transform duration-200">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <BsPeople className="w-8 h-8 opacity-80" />
                                        </div>
                                        <div className="flex items-center">
                                            {renderChangeIcon(
                                                internStats.change
                                            )}
                                        </div>
                                    </div>
                                    <h3 className="text-sm font-medium opacity-90 mt-4">
                                        Current Interns
                                    </h3>
                                    <p className="text-3xl font-bold mt-2">
                                        {internStats.count}
                                    </p>
                                </div>
                            </div>

                            {/* Notifications */}
                            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                                <div className="flex items-center mb-4">
                                    <BsBell className="w-6 h-6 text-gray-600 mr-2" />
                                    <h3 className="text-xl font-semibold text-gray-800">
                                        Recent Notifications
                                    </h3>
                                </div>
                                {notifications.length > 0 ? (
                                    <div className="space-y-3">
                                        {notifications.map((notification) => (
                                            <div
                                                key={notification.id}
                                                className="flex items-start p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                                            >
                                                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                                <p className="text-sm text-gray-700">
                                                    {notification.data.message}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-500 text-sm italic">
                                        No notifications found.
                                    </p>
                                )}
                            </div>

                            {/* Intern Reviews */}
                            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                                <div className="flex items-center mb-4">
                                    <BsStar className="w-6 h-6 text-yellow-500 mr-2" />
                                    <h3 className="text-xl font-semibold text-gray-800">
                                        Intern Reviews
                                    </h3>
                                </div>
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
                                                "Super supportive supervisors and fun projects. I'd totally recommend this place!",
                                        },
                                    ].map((review, index) => (
                                        <div
                                            key={index}
                                            className="flex items-start space-x-4 p-4 border border-gray-200 rounded-xl hover:shadow-md hover:border-gray-300 transition-all duration-200 bg-gradient-to-r from-white to-gray-50"
                                        >
                                            <img
                                                src={review.avatar}
                                                alt={review.name}
                                                className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
                                            />
                                            <div className="flex-1">
                                                <p className="font-semibold text-gray-800">
                                                    {review.name}
                                                </p>
                                                <div className="mt-1">
                                                    {renderStars(review.rating)}
                                                </div>
                                                <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                                                    {review.comment}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Side: Company Profile */}
                        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 h-fit">
                            <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">
                                Company Profile
                            </h2>

                            {companyProfile ? (
                                <div className="flex flex-col items-center space-y-4 text-center">
                                    {companyProfile.picture ? (
                                        <img
                                            src={`/${companyProfile.picture}`}
                                            alt="Company"
                                            className="w-28 h-28 rounded-xl object-cover border-4 border-gray-100 shadow-md"
                                        />
                                    ) : (
                                        <div className="w-28 h-28 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-gray-500 rounded-xl shadow-md">
                                            <BsBriefcase className="w-10 h-10" />
                                        </div>
                                    )}

                                    <div className="space-y-2">
                                        <p className="text-xl font-bold text-gray-900">
                                            {companyProfile.company_name}
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
                                                className="text-blue-600 hover:text-blue-800 text-sm font-medium underline transition-colors"
                                            >
                                                Visit Website
                                            </a>
                                        )}
                                    </div>

                                    <a
                                        href={`/employers/${companyProfile.id}/edit`}
                                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-md"
                                    >
                                        <span className="mr-2">✏️</span>
                                        Edit Profile
                                    </a>
                                </div>
                            ) : (
                                <div className="text-center">
                                    <div className="w-28 h-28 bg-gray-200 flex items-center justify-center text-gray-500 rounded-xl mx-auto mb-4">
                                        <BsBriefcase className="w-10 h-10" />
                                    </div>
                                    <p className="text-sm text-gray-500 italic">
                                        No company profile found.
                                    </p>
                                    <a
                                        href="/employers/create"
                                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-md mt-4"
                                    >
                                        Create Profile
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </EmployerLayout>
    );
}
