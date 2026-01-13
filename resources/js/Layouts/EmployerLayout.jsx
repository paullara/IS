import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";

export default function EmployerLayout({ header, children }) {
    const user = usePage().props.auth.user;

    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="h-screen flex bg-gradient-to-br from-blue-50 to-indigo-50">
            {/* SIDEBAR */}
            <aside
                className={`${
                    sidebarOpen ? "block" : "hidden"
                } sm:flex w-64 flex-col bg-gradient-to-b from-blue-600 via-blue-700 to-indigo-800 text-white relative`}
            >
                {/* Decorative (NON-CLICKABLE) */}
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-blue-500/20 to-indigo-600/20" />
                <div className="absolute top-0 right-0 pointer-events-none w-32 h-32 bg-yellow-400/10 rounded-full -translate-y-16 translate-x-16" />
                <div className="absolute bottom-0 left-0 pointer-events-none w-24 h-24 bg-yellow-400/10 rounded-full translate-y-12 -translate-x-12" />

                {/* CONTENT */}
                <div className="relative z-10 flex flex-col h-full">
                    {/* LOGO */}
                    <div className="px-6 py-6 border-b border-white/10">
                        <Link
                            href={route("employer.dashboard")}
                            className="flex items-center gap-3"
                        >
                            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                                🏢
                            </div>
                            <h1 className="text-xl font-bold">InternConnect</h1>
                        </Link>
                    </div>

                    {/* NAV */}
                    <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                        <NavLink
                            href={route("employer.dashboard")}
                            active={route().current("employer.dashboard")}
                        >
                            📊 Dashboard
                        </NavLink>
                        <NavLink
                            href={route("internships.index")}
                            active={route().current("internships.index")}
                        >
                            💼 Internships
                        </NavLink>
                        <NavLink
                            href={route("employer.applicants")}
                            active={route().current("employer.applicants")}
                        >
                            👥 Applicants
                        </NavLink>
                        <NavLink
                            href={route("employer.notification")}
                            active={route().current("employer.notification")}
                        >
                            🔔 Notifications
                        </NavLink>
                        <NavLink
                            href={route("employer.requirements.index")}
                            active={route().current(
                                "employer.requirements.index"
                            )}
                        >
                            📋 Requirements
                        </NavLink>
                        <NavLink
                            href={route("interns")}
                            active={route().current("interns")}
                        >
                            👨‍🎓 Interns
                        </NavLink>
                        <NavLink
                            href={route("company.verify")}
                            active={route().current("company.verify")}
                        >
                            ✅ Verify
                        </NavLink>
                        <NavLink
                            href={route("incident.report.employer")}
                            active={route().current("incident.report.employer")}
                        >
                            ⚠️ Incident Report
                        </NavLink>
                    </nav>

                    {/* USER */}
                    <div className="px-4 py-4 border-t border-white/10">
                        <p className="text-sm font-medium">{user.name}</p>
                        <Link
                            href={route("logout")}
                            method="post"
                            as="button"
                            className="mt-3 w-full px-3 py-2 rounded-lg bg-red-500/20 hover:bg-red-500/30"
                        >
                            🚪 Logout
                        </Link>
                    </div>
                </div>
            </aside>

            {/* MAIN */}
            <div className="flex-1 flex flex-col relative">
                {/* TOP BAR (FORCE ABOVE EVERYTHING) */}
                <header className="h-16 bg-white/80 backdrop-blur border-b flex items-center justify-between px-6 relative z-50">
                    <button
                        className="sm:hidden text-xl"
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                    >
                        ☰
                    </button>

                    <h1 className="font-semibold text-gray-800">
                        Employer Panel
                    </h1>

                    {/* NOTIFICATION */}
                    <Link
                        href={route("employer.notification")}
                        className="relative p-2 rounded-xl text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition"
                    >
                        🔔
                        <span className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full border-2 border-white"></span>
                    </Link>
                </header>

                {/* CONTENT */}
                <main className="flex-1 overflow-y-auto">
                    {header && (
                        <div className="bg-white border-b p-6">{header}</div>
                    )}
                    {children}
                </main>
            </div>
        </div>
    );
}

function NavLink({ href, active, children }) {
    return (
        <Link
            href={href}
            className={`block px-4 py-3 rounded-xl transition ${
                active
                    ? "bg-white/20 text-white"
                    : "text-white/80 hover:bg-white/10"
            }`}
        >
            {children}
        </Link>
    );
}
