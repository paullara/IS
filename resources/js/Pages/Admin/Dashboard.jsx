import AdminLayout from "@/Layouts/AdminLayout";
import { Head, usePage } from "@inertiajs/react";
import { BsArrowUp, BsArrowDown } from "react-icons/bs";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import {
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

export default function Dashboard({
    studentStats,
    internshipStats,
    employerStats,
    applicationTrends,
    company = [],
}) {
    const user = usePage().props.auth.user;

    const renderChangeIcon = (change) => {
        if (change > 0) {
            return <BsArrowUp className="text-green-500" />;
        } else if (change < 0) {
            return <BsArrowDown className="text-red-500" />;
        }
        return null;
    };

    const chartData = Array.from({ length: 12 }, (_, i) => {
        const month = i + 1;
        const accepted =
            applicationTrends["accepted"]?.find((item) => item.month === month)
                ?.total || 0;
        const rejected =
            applicationTrends["rejected"]?.find((item) => item.month === month)
                ?.total || 0;

        return {
            name: new Date(0, i).toLocaleString("default", { month: "short" }),
            accepted,
            rejected,
        };
    });

    return (
        <AdminLayout>
            <Head title="Dashboard" />

            <div className="h-custom bg-white-500 mr-5 flex gap-2">
                <div className="h-full w-2/3 bg-white flex flex-col items-center justify-around">
                    <div className="flex flex-col h-1/3 w-full bg-white p-8">
                        <h1 className="text-5xl font-bold text-gray-800">
                            Welcome back,{" "}
                            <span className="text-blue-600">{user.name}</span>
                        </h1>
                        <p className="mt-2 text-xl text-gray-600">
                            Ready to manage and verify the latest student
                            internships.
                        </p>
                    </div>
                    {/* Top Container */}
                    <div className="flex items-center justify-center h-1/3 w-full bg-white p-4 gap-4">
                        {/* Students Card */}
                        <div className="w-1/3 bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
                            <h1 className="text-lg text-blue-600 font-medium tracking-wide mb-1">
                                Students
                            </h1>
                            <div className="flex items-center justify-between">
                                <h1 className="text-4xl font-bold text-blue-900">
                                    {studentStats.count}
                                </h1>
                                {renderChangeIcon(studentStats.change)}
                            </div>
                        </div>
                        {/* Internships Card */}
                        <div className="w-1/3 bg-gradient-to-br from-green-100 to-green-50 rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
                            <h1 className="text-lg text-green-600 font-medium tracking-wide mb-1">
                                Internships
                            </h1>
                            <div className="flex items-center justify-between">
                                <h1 className="text-4xl font-bold text-green-900">
                                    {internshipStats.count}
                                </h1>
                                {renderChangeIcon(internshipStats.change)}
                            </div>
                        </div>

                        {/* Companies Card */}
                        <div className="w-1/3 bg-gradient-to-br from-pink-100 to-pink-50 rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
                            <h1 className="text-lg text-pink-600 font-medium tracking-wide mb-1">
                                Companies
                            </h1>
                            <div className="flex items-center justify-between">
                                <h1 className="text-4xl font-bold text-pink-900">
                                    {employerStats.count}
                                </h1>
                                {renderChangeIcon(employerStats.change)}
                            </div>
                        </div>
                    </div>

                    <div className="w-full h-1/2 p-4 bg-white rounded shadow">
                        <h1 className="text-xl font-semibold">
                            Application Trend
                        </h1>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={chartData}>
                                <CartesianGrid stroke="#ccc" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line
                                    type="monotone"
                                    dataKey="accepted"
                                    stroke="#22c55e"
                                    name="Accepted"
                                />
                                <Line
                                    type="monotone"
                                    dataKey="rejected"
                                    stroke="#ef4444"
                                    name="Rejected"
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className="flex flex-col items-center h-full w-1/3 gap-2">
                    <div className="flex h-1/2 w-full p-2">
                        <div className="w-full h-full flex items-center justify-center">
                            <Calendar className="w-full h-full rounded-md" />
                        </div>
                    </div>
                    <div className="flex flex-col items-start h-1/2 w-full bg-green-50 p-5 overflow-y-auto">
                        <h1 className="text-lg font-semibold mb-4">
                            Top Companies
                        </h1>

                        <div className="grid grid-cols-1 gap-4 w-full">
                            {company.length > 0 ? (
                                company.map((comp) => (
                                    <div
                                        key={comp.id}
                                        className="flex items-center gap-4 bg-white rounded-lg shadow p-4"
                                    >
                                        <img
                                            src={`/${comp.profile_picture}`}
                                            alt={comp.company_name}
                                            className="w-16 h-16 rounded-full object-cover border"
                                        />
                                        <div className="flex flex-col">
                                            <h2 className="text-md font-bold">
                                                {comp.company_name}
                                            </h2>
                                            <p className="text-sm text-gray-500">
                                                {comp.company_address}
                                            </p>
                                            <p className="text-sm text-gray-400">
                                                {comp.company_email}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-sm text-gray-400">
                                    No companies found.
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
