import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";

export default function EmployerLayout({ header, children }) {
    const user = usePage().props.auth.user;

    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gray-100 flex">
            <div
                className={`${
                    sidebarOpen ? "block" : "hidden"
                } sm:block sm:flex flex-col w-64 bg-white text-black min-h-screen`}
            >
                <div className="px-6 py-4">
                    <Link
                        href="/employer/dashboard"
                        className="text-white text-xl font-bold"
                    >
                        <h1 className="text-2xl font-bold text-black">
                            InternX
                        </h1>
                    </Link>
                </div>
                <nav className="flex items-start p-8 flex-col space-y-1 flex-grow gap-5">
                    <NavLink
                        href={route("employer.dashboard")}
                        active={route().current("employer.dashboard")}
                    >
                        <h1 className="text-lg font-medium">Dashboard</h1>
                    </NavLink>
                    <NavLink
                        href={route("employers.index")}
                        active={route().current("employers.index")}
                    >
                        <h1 className="text-lg font-medium">Company Profile</h1>
                    </NavLink>
                    <NavLink
                        href={route("internships.index")}
                        active={route().current("internships.index")}
                    >
                        <h1 className="text-lg font-medium">Internships</h1>
                    </NavLink>
                    <NavLink
                        href={route("employer.applicants")}
                        active={route().current("employer.applicants")}
                    >
                        <h1 className="text-lg font-medium">Applicants</h1>
                    </NavLink>
                    <NavLink
                        href={route("employer.notification")}
                        active={route().current("employer.notification")}
                    >
                        <h1 className="text-lg font-medium">Notifications</h1>
                    </NavLink>
                    <NavLink
                        href={route("employer.requirements.index")}
                        active={route().current("employer.requirements.index")}
                    >
                        <h1 className="text-lg font-medium">Requirements</h1>
                    </NavLink>
                    <NavLink
                        href={route("interns")}
                        active={route().current("interns")}
                    >
                        <h1 className="text-lg font-medium">Interns</h1>
                    </NavLink>
                    <NavLink
                        href={route("company.verify")}
                        active={route().current("company.verify")}
                    >
                        <h1 className="text-lg font-medium">Verify</h1>
                    </NavLink>
                    <NavLink
                        href={route("incident.report.employer")}
                        active={route().current("incident.report.employer")}
                    >
                        <h1 className="text-lg font-medium">Incident Report</h1>
                    </NavLink>
                </nav>

                <div className="p-4 border-t bg-white sticky bottom-0 z-10">
                    <NavLink
                        href={route("profile.edit")}
                        active={route().current("profile.edit")}
                        className="w-full px-3 py-2 rounded-md text-sm font-medium text-gray-500"
                    >
                        <h1 className="text-lg font-medium">Profile</h1>
                    </NavLink>
                    <Link
                        href={route("logout")}
                        method="post"
                        as="button"
                        className="w-full px-3 py-2 text-left rounded-md text-sm font-medium text-red-500 hover:text-red-800"
                    >
                        <h1 className="text-lg font-medium">Log out</h1>
                    </Link>
                </div>
            </div>
            <div className="flex-1 flex flex-col">
                <nav className="border-b border-gray-100 bg-white">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 justify-between">
                            <div className="flex items-center">
                                {route().current("employer.dashboard") && (
                                    <h1 className="text-xl font-semibold">
                                        Dashboard
                                    </h1>
                                )}
                                {route().current("employers.index") && (
                                    <h1 className="text-xl font-semibold">
                                        Company Profile
                                    </h1>
                                )}
                                {route().current("internships.index") && (
                                    <h1 className="text-xl font-semibold">
                                        Manage Internships
                                    </h1>
                                )}
                                {route().current("employer.applicants") && (
                                    <h1 className="text-xl font-semibold">
                                        Applicants
                                    </h1>
                                )}
                                {route().current("employer.notification") && (
                                    <h1 className="text-xl font-semibold">
                                        Notification
                                    </h1>
                                )}
                                {route().current(
                                    "employer.requirements.index"
                                ) && (
                                    <h1 className="text-xl font-semibold">
                                        Requirements
                                    </h1>
                                )}
                                {route().current("interns") && (
                                    <h1 className="text-xl font-semibold">
                                        Interns
                                    </h1>
                                )}
                            </div>

                            <div className="flex items-center">
                                <button
                                    onClick={() => setSidebarOpen(!sidebarOpen)}
                                    className="sm:hidden inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-500 focus:outline-none"
                                >
                                    <svg
                                        className="h-6 w-6"
                                        stroke="currentColor"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            className={
                                                !sidebarOpen
                                                    ? "inline-flex"
                                                    : "hidden"
                                            }
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                        <path
                                            className={
                                                sidebarOpen
                                                    ? "inline-flex"
                                                    : "hidden"
                                            }
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>

                                <div className="flex sm:hidden ml-4">
                                    <Link href="/">
                                        <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
                                    </Link>
                                </div>
                            </div>

                            <div className="hidden sm:flex sm:items-center">
                                <div className="relative ms-3">{user.name}</div>
                            </div>
                        </div>
                    </div>
                </nav>
                <main className="flex-1 bg-gray-50">
                    {header && (
                        <header className="bg-white shadow">
                            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                                {header}
                            </div>
                        </header>
                    )}
                    {children}
                </main>
            </div>
        </div>
    );
}
