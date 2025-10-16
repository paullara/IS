import React, { useEffect, useState } from "react";
import Coordinator from "@/Layouts/Coordinator";
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

export default function Calendar() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchVisitations = async () => {
            try {
                const res = await axios.get("/visitation/calendar");
                const visitations = res.data.visitations.map((v) => ({
                    id: v.id,
                    title: v.company?.company_name || "Company",
                    instructor: v.instructor
                        ? `${v.instructor.firstname} ${v.instructor.lastname}`
                        : "Instructor",
                    start: v.visitation_date,
                }));
                setEvents(visitations);
            } catch (error) {
                console.error("Error fetching visitations:", error);
            }
        };
        fetchVisitations();
    }, []);

    const dayCellDidMount = (info) => {
        const visit = events.find(
            (e) => new Date(e.start).toDateString() === info.date.toDateString()
        );

        if (visit) {
            info.el.classList.add(
                "bg-sky-200",
                "rounded-lg",
                "transition",
                "duration-200",
                "hover:bg-sky-300"
            );

            const content = info.el.querySelector(".fc-daygrid-day-events");
            if (content) {
                const detailDiv = document.createElement("div");
                detailDiv.className =
                    "mt-3 text-center text-[11px] leading-tight text-sky-900";
                detailDiv.innerHTML = `
                    <p class="font-semibold">${visit.title}</p>
                    <p class="text-[10px] text-sky-800">👨‍🏫 ${visit.instructor}</p>
                `;
                content.innerHTML = "";
                content.appendChild(detailDiv);
            }
        }
    };

    return (
        <Coordinator>
            <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
                <div className="max-w-6xl mx-auto px-6 py-10">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800">
                                🗓️ Visitation Calendar
                            </h1>
                            <p className="text-gray-500 text-sm mt-1">
                                View upcoming company visits and instructor schedules.
                            </p>
                        </div>
                        <button
                            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-xl shadow-sm transition"
                            onClick={() => window.location.reload()}
                        >
                            Refresh
                        </button>
                    </div>

                    <div className="bg-white shadow-lg rounded-3xl p-6 border border-gray-100">
                        <FullCalendar
                            key={events.length} // <— forces re-render when events load
                            plugins={[dayGridPlugin, interactionPlugin]}
                            initialView="dayGridMonth"
                            events={events}
                            height="80vh"
                            headerToolbar={{
                                left: "prev,next today",
                                center: "title",
                                right: "",
                            }}
                            dayCellDidMount={dayCellDidMount}
                            eventDisplay="none"
                        />
                    </div>
                </div>
            </div>
        </Coordinator>
    );
}
