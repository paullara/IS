import { useState, useEffect } from "react";
import Coordinator from "@/Layouts/Coordinator";
import axios from "axios";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { format } from "date-fns";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";

const localizer = momentLocalizer(moment);

export default function Visitation() {
    const [visitations, setVisitations] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [selectedCompany, setSelectedCompany] = useState("");
    const [selectedDate, setSelectedDate] = useState(null);
    const [remarks, setRemarks] = useState("");

    useEffect(() => {
        fetchVisitations();
        fetchCompanies();
    }, []);

    const fetchCompanies = async () => {
        try {
            const res = await axios.get("/visitation/companies");
            setCompanies(res.data.companies);
        } catch (error) {
            console.error("Error fetching companies.", error);
        }
    };

    const fetchVisitations = async () => {
        try {
            const res = await axios.get("/visitations");
            setVisitations(
                res.data.visitations.map((v) => ({
                    id: v.id,
                    title:
                        (v.company?.company_name || v.company?.name) +
                        (v.remarks ? ` (${v.remarks})` : ""),
                    start: new Date(v.visitation_date),
                    end: new Date(v.visitation_date),
                }))
            );
        } catch (error) {
            console.error("Error fetching visitations.", error);
        }
    };

    const handleSelectSlot = ({ start }) => {
        setSelectedDate(start);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedCompany || !selectedDate) {
            alert("Please select company and date.");
            return;
        }
        try {
            await axios.post("/visitation/store", {
                company_id: selectedCompany,
                visitation_date: format(selectedDate, "yyyy-MM-dd"),
                remarks,
            });
            setSelectedCompany("");
            setRemarks("");
            setSelectedDate(null);
            fetchVisitations();
            alert("Visitation scheduled!");
        } catch (error) {
            console.error("Error scheduling visitation.", error);
        }
    };

    return (
        <Coordinator>
            <div className="p-6 grid grid-cols-3 gap-6">
                {/* Calendar */}
                <div className="col-span-2">
                    <h1 className="text-2xl font-bold mb-4">
                        Visitation Calendar
                    </h1>
                    <Calendar
                        localizer={localizer}
                        events={visitations}
                        startAccessor="start"
                        endAccessor="end"
                        style={{ height: 600 }}
                        selectable
                        onSelectSlot={handleSelectSlot}
                        views={["month", "week", "day"]}
                        dayPropGetter={(date) => {
                            if (
                                selectedDate &&
                                date.toDateString() ===
                                    selectedDate.toDateString()
                            ) {
                                return {
                                    style: {
                                        backgroundColor: "#cce5ff",
                                        border: "2px solid #007bff",
                                    },
                                };
                            }
                            return {};
                        }}
                    />
                </div>

                {/* Sidebar Form */}
                <div className="border rounded p-4 shadow bg-white">
                    <h2 className="text-xl font-semibold mb-2">
                        Schedule a Visitation
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-3">
                        <select
                            value={selectedCompany}
                            onChange={(e) => setSelectedCompany(e.target.value)}
                            className="border p-2 rounded w-full"
                            required
                        >
                            <option value="">Select Company</option>
                            {companies.map((c) => (
                                <option key={c.id} value={c.id}>
                                    {c.company_name || c.name}
                                </option>
                            ))}
                        </select>

                        {selectedDate && (
                            <div className="flex items-center justify-between">
                                <div className="px-3 py-2 bg-blue-100 text-blue-700 rounded-md text-sm font-medium">
                                    📅 Selected Date:{" "}
                                    {format(selectedDate, "PPP")}
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setSelectedDate(null)}
                                    className="text-xs text-red-500 underline ml-2"
                                >
                                    Clear
                                </button>
                            </div>
                        )}

                        <textarea
                            value={remarks}
                            onChange={(e) => setRemarks(e.target.value)}
                            placeholder="Remarks (optional)"
                            className="border p-2 rounded w-full"
                        />

                        <button
                            type="submit"
                            className={`px-4 py-2 rounded text-white w-full ${
                                selectedDate
                                    ? "bg-blue-500 hover:bg-blue-600"
                                    : "bg-gray-400 cursor-not-allowed"
                            }`}
                            disabled={!selectedDate}
                        >
                            Save
                        </button>
                    </form>
                </div>
            </div>
        </Coordinator>
    );
}
