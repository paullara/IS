import { useState, useEffect } from "react";
import Coordinator from "@/Layouts/Coordinator";
import axios from "axios";

export default function IncidentReport() {
    const [incidentReports, setIncidentReports] = useState([]);
    const [filter, setFilter] = useState("All"); // default = all

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

    // Filtered list based on severity
    const filteredReports =
        filter === "All"
            ? incidentReports
            : incidentReports.filter((r) => r.severity === filter);

    return (
        <Coordinator>
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">Incident Reports</h1>

                {/* Filter Buttons */}
                <div className="flex gap-3 mb-6">
                    {["All", "minor", "moderate", "major"].map((level) => (
                        <button
                            key={level}
                            onClick={() => setFilter(level)}
                            className={`px-4 py-2 rounded-lg border transition ${
                                filter === level
                                    ? "bg-red-500 text-white border-red-500"
                                    : "bg-gray-100 hover:bg-gray-200 border-gray-300"
                            }`}
                        >
                            {level.charAt(0).toUpperCase() + level.slice(1)}
                        </button>
                    ))}
                </div>

                {/* Reports List */}
                {filteredReports.length > 0 ? (
                    <div className="space-y-4">
                        {filteredReports.map((report) => (
                            <div
                                key={report.id}
                                className="p-4 border rounded-lg shadow-sm bg-white"
                            >
                                <h2 className="font-bold text-lg">
                                    {report.internship?.title ??
                                        "Unknown Internship"}
                                </h2>
                                <h2 className="font-bold text-lg">
                                    {report.employer?.company_name ??
                                        "Unknown Company"}
                                </h2>
                                <p className="text-sm text-gray-600">
                                    Severity:{" "}
                                    <span
                                        className={`${
                                            report.severity === "Major"
                                                ? "text-red-600 font-bold"
                                                : report.severity === "Moderate"
                                                ? "text-yellow-600 font-semibold"
                                                : "text-green-600"
                                        }`}
                                    >
                                        {report.severity
                                            .charAt(0)
                                            .toUpperCase() +
                                            report.severity.slice(1)}
                                    </span>
                                </p>
                                <p className="mt-2">{report.description}</p>
                                <p className="text-xs text-gray-400 mt-1">
                                    Submitted:{" "}
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
