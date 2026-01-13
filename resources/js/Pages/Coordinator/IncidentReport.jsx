import { useState, useEffect } from "react";
import Coordinator from "@/Layouts/Coordinator";
import axios from "axios";

export default function IncidentReport() {
    const [incidentReports, setIncidentReports] = useState([]);
    const [filter, setFilter] = useState("All");
    const [search, setSearch] = useState("");
    const [severityFilter, setSeverityFilter] = useState("All");

    useEffect(() => {
        const fetchIncidentReport = async () => {
            try {
                const res = await axios.get("/incident/report/fetch");
                setIncidentReports(res.data.report);
            } catch (error) {
                console.error("Error fetching incident report", error);
            }
        };

        fetchIncidentReport();
        const interval = setInterval(fetchIncidentReport, 1000);
        return () => clearInterval(interval);
    }, []);

    // 🔎 FILTER + SEARCH LOGIC
    const filteredReports = incidentReports.filter((report) => {
        // Filter by submitter
        const matchFilter =
            filter === "All" || report.submitted_by === filter.toLowerCase();

        // Filter by severity
        const matchSeverity =
            severityFilter === "All" || report.severity === severityFilter;

        // Searchable text
        const searchText = `
            ${report.student?.firstname ?? ""}
            ${report.student?.lastname ?? ""}
            ${report.employer?.company_name ?? ""}
            ${report.internship?.title ?? ""}
            ${report.severity ?? ""}
        `.toLowerCase();

        const matchSearch = searchText.includes(search.toLowerCase());

        return matchFilter && matchSearch && matchSeverity;
    });

    return (
        <Coordinator>
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-6">Incident Reports</h1>

                {/* Search + Filter */}
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    {/* Search Input */}
                    <input
                        type="text"
                        placeholder="Search student, company, internship, severity..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="px-4 py-2 border rounded-lg w-full md:w-1/2 focus:outline-none focus:ring focus:border-blue-400"
                    />

                    {/* Filter Buttons */}
                    <div className="flex gap-3">
                        {["All", "Student", "Employer"].map((submitter) => (
                            <button
                                key={submitter}
                                onClick={() => setFilter(submitter)}
                                className={`px-4 py-2 rounded-lg border transition ${
                                    filter === submitter
                                        ? "bg-blue-500 text-white border-blue-500"
                                        : "bg-gray-100 border-gray-300"
                                }`}
                            >
                                {submitter}
                            </button>
                        ))}

                        {/* Severity Filter Dropdown */}
                        <select
                            value={severityFilter}
                            onChange={(e) => setSeverityFilter(e.target.value)}
                            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-400 w-36"
                        >
                            <option value="All">All Severities</option>
                            <option value="Major">Major</option>
                            <option value="Moderate">Moderate</option>
                            <option value="Minor">Minor</option>
                        </select>
                    </div>
                </div>

                {/* Reports */}
                {filteredReports.length > 0 ? (
                    <div className="space-y-4">
                        {filteredReports.map((report) => (
                            <div
                                key={report.id}
                                className="p-5 border rounded-lg bg-white shadow-sm"
                            >
                                {/* Internship */}
                                <h2 className="text-lg font-bold">
                                    {report.internship?.title ??
                                        "Unknown Internship"}
                                </h2>

                                {/* Company */}
                                <p className="text-sm text-gray-700">
                                    Company:{" "}
                                    <span className="font-medium">
                                        {report.employer?.company_name ??
                                            "Unknown Company"}
                                    </span>
                                </p>

                                {/* Submitted By */}
                                <p className="text-sm text-gray-600 mt-1">
                                    Submitted by:{" "}
                                    {report.submitted_by === "student" ? (
                                        <>
                                            {report.student?.firstname ??
                                                "Unknown"}{" "}
                                            {report.student?.lastname ?? ""}{" "}
                                            <span className="text-blue-600 font-medium">
                                                (Student)
                                            </span>
                                        </>
                                    ) : (
                                        <>
                                            {report.employer?.company_name ??
                                                "Unknown Company"}{" "}
                                            <span className="text-purple-600 font-medium">
                                                (Employer)
                                            </span>
                                        </>
                                    )}
                                </p>

                                {/* Reported Entity */}
                                <p className="text-sm text-gray-600">
                                    {report.submitted_by === "student" ? (
                                        <>
                                            Reported Company:{" "}
                                            <span className="font-medium">
                                                {report.employer
                                                    ?.company_name ??
                                                    "Unknown Company"}
                                            </span>
                                        </>
                                    ) : (
                                        <>
                                            Reported Student:{" "}
                                            <span className="font-medium">
                                                {report.student?.firstname ??
                                                    "Unknown"}{" "}
                                                {report.student?.lastname ?? ""}
                                            </span>
                                        </>
                                    )}
                                </p>

                                {/* Severity */}
                                <p className="text-sm mt-2">
                                    Severity:{" "}
                                    <span
                                        className={`font-semibold ${
                                            report.severity === "Major"
                                                ? "text-red-600"
                                                : report.severity === "Moderate"
                                                ? "text-yellow-600"
                                                : "text-green-600"
                                        }`}
                                    >
                                        {report.severity}
                                    </span>
                                </p>

                                {/* Description */}
                                <p className="mt-3 text-gray-800">
                                    {report.description}
                                </p>

                                {/* Date */}
                                <p className="text-xs text-gray-400 mt-2">
                                    Submitted on{" "}
                                    {new Date(
                                        report.created_at
                                    ).toLocaleString()}
                                </p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">No incident reports found.</p>
                )}
            </div>
        </Coordinator>
    );
}
