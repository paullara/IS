import React, { useState, useEffect } from "react";
import EmployerLayout from "@/Layouts/EmployerLayout";
import axios from "axios";

export default function IncidentReport() {
    const [internships, setInternships] = useState([]);
    const [data, setData] = useState({
        internship_id: "",
        severity: "Minor",
        description: "",
    });
    const [loading, setLoading] = useState(false);

    const submit = async (e) => {
        e.preventDefault();
        if (!data.internship_id) {
            alert("Please select an internship before submitting.");
            return;
        }
        try {
            setLoading(true);
            await axios.post("/incident-reports", data);
            alert("Incident report submitted successfully!");
            setData({ internship_id: "", severity: "Minor", description: "" });
        } catch (error) {
            console.error("Error posting incident report", error);
            alert("Failed to submit incident report.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchInternships = async () => {
            try {
                const res = await axios.get("/internships/report");
                setInternships(res.data.internship);
            } catch (error) {
                console.error("Error fetching internships");
            }
        };
        fetchInternships();
        const interval = setInterval(fetchInternships, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <EmployerLayout>
            <div className="grid grid-cols-3 gap-6 p-6 bg-gray-50 rounded-lg shadow">
                {/* Left Side - Description + Severity */}
                <div className="col-span-2 bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-bold mb-4">Incident Report</h2>

                    <form onSubmit={submit} className="space-y-4">
                        {/* Severity Buttons */}
                        <div>
                            <label className="block font-medium mb-2">
                                Severity
                            </label>
                            <div className="flex space-x-3">
                                {["Minor", "Moderate", "Major"].map((level) => (
                                    <button
                                        key={level}
                                        type="button"
                                        onClick={() =>
                                            setData((prev) => ({
                                                ...prev,
                                                severity: level,
                                            }))
                                        }
                                        className={`px-4 py-2 rounded-lg border transition 
                                            ${
                                                data.severity === level
                                                    ? "bg-red-500 text-white border-red-500"
                                                    : "bg-gray-100 border-gray-300 hover:bg-gray-200"
                                            }`}
                                    >
                                        {level}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block font-medium mb-2">
                                Description
                            </label>
                            <textarea
                                value={data.description}
                                onChange={(e) =>
                                    setData((prev) => ({
                                        ...prev,
                                        description: e.target.value,
                                    }))
                                }
                                rows="6"
                                className="w-full border rounded-lg p-3 focus:ring focus:ring-red-300"
                            />
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-red-600 text-white py-2 rounded-lg shadow hover:bg-red-700 disabled:opacity-50"
                        >
                            {loading
                                ? "Submitting..."
                                : "Submit Incident Report"}
                        </button>
                    </form>
                </div>

                {/* Right Side - Internship List */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-lg font-bold mb-3">
                        Select Internship
                    </h3>
                    <ul className="space-y-2 max-h-[400px] overflow-y-auto">
                        {internships.length > 0 ? (
                            internships.map((internship) => (
                                <li
                                    key={internship.id}
                                    onClick={() =>
                                        setData((prev) => ({
                                            ...prev,
                                            internship_id: internship.id,
                                        }))
                                    }
                                    className={`p-3 rounded-lg border cursor-pointer transition
                                        ${
                                            data.internship_id === internship.id
                                                ? "bg-blue-500 text-white border-blue-500"
                                                : "bg-gray-50 hover:bg-gray-100 border-gray-300"
                                        }`}
                                >
                                    {internship.title}
                                </li>
                            ))
                        ) : (
                            <li className="text-gray-500">
                                No internships available
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </EmployerLayout>
    );
}
