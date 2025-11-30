import { useState, useEffect } from "react";
import Instructor from "@/Layouts/Instructor";
import axios from "axios";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { format } from "date-fns";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";

const localizer = momentLocalizer(moment);

export default function Visitation() {
    const [visitations, setVisitations] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [selectionMode, setSelectionMode] = useState("single"); // single or multi
    const [selectedCompany, setSelectedCompany] = useState([]);
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
            const res = await axios.get("/visitations/json");
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
        if (selectedCompany.length === 0 || !selectedDate) {
            alert("Please choose at least 1 company and a date.");
            return;
        }

        try {
            await axios.post("/visitation/store", {
                company_ids: selectedCompany,
                visitation_date: format(selectedDate, "yyyy-MM-dd"),
                remarks,
            });

            setSelectedCompany([]);
            setRemarks("");
            setSelectedDate(null);

            fetchVisitations();
            alert("Visitation request submitted!");
        } catch (error) {
            console.error("Error scheduling visitation.", error);
        }
    };

    return (
        <Instructor>
            <div className="p-6 grid grid-cols-3 gap-6">
                {/* Calendar */}
                <div className="col-span-2">
                    <h1 className="text-2xl font-bold mb-4">Calendar</h1>
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
                        Create Schedule
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-3">
                        {/* Selection Mode */}
                        <select
                            value={selectionMode}
                            onChange={(e) => {
                                setSelectionMode(e.target.value);
                                setSelectedCompany([]);
                            }}
                            className="border p-2 rounded w-full"
                        >
                            <option value="single">Single Company</option>
                            <option value="multi">Multiple Companies</option>
                        </select>

                        {/* Single Select */}
                        {selectionMode === "single" && (
                            <select
                                value={
                                    selectedCompany[0]
                                        ? String(selectedCompany[0])
                                        : ""
                                }
                                onChange={(e) =>
                                    setSelectedCompany([Number(e.target.value)])
                                }
                                className="border p-2 rounded w-full"
                            >
                                <option value="">Select Company</option>
                                {companies.map((c) => (
                                    <option key={c.id} value={String(c.id)}>
                                        {c.company_name || c.name}
                                    </option>
                                ))}
                            </select>
                        )}

                        {/* Multi Select */}
                        {selectionMode === "multi" && (
                            <>
                                {/* Show selected companies as tags */}
                                <div className="flex flex-wrap gap-2 mb-2">
                                    {selectedCompany.map((id) => {
                                        const company = companies.find(
                                            (c) => c.id === id
                                        );
                                        return (
                                            <span
                                                key={id}
                                                className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full flex items-center gap-1"
                                            >
                                                {company?.company_name ||
                                                    company?.name}
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setSelectedCompany(
                                                            (prev) =>
                                                                prev.filter(
                                                                    (c) =>
                                                                        c !== id
                                                                )
                                                        )
                                                    }
                                                    className="text-xs font-bold"
                                                >
                                                    ✕
                                                </button>
                                            </span>
                                        );
                                    })}
                                </div>

                                {/* Dropdown for selecting more */}
                                <select
                                    value=""
                                    onChange={(e) => {
                                        const val = e.target.value;
                                        const numVal = val ? Number(val) : null;
                                        if (
                                            numVal &&
                                            !selectedCompany.includes(numVal)
                                        ) {
                                            setSelectedCompany((prev) => [
                                                ...prev,
                                                numVal,
                                            ]);
                                        }
                                    }}
                                    className="border p-2 rounded w-full"
                                >
                                    <option value="">Select Company</option>
                                    {companies
                                        .filter(
                                            (c) =>
                                                !selectedCompany.includes(c.id)
                                        )
                                        .map((c) => (
                                            <option
                                                key={c.id}
                                                value={String(c.id)}
                                            >
                                                {c.company_name || c.name}
                                            </option>
                                        ))}
                                </select>
                            </>
                        )}

                        {/* Selected Date */}
                        {selectedDate && (
                            <div className="px-3 py-2 bg-blue-100 text-blue-700 rounded-md text-sm font-medium flex justify-between">
                                📅 Selected Date: {format(selectedDate, "PPP")}
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
                            className="px-4 py-2 rounded text-white w-full bg-blue-500"
                        >
                            Save
                        </button>
                    </form>
                </div>
            </div>
        </Instructor>
    );
}
