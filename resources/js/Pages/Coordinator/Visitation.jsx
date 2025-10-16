import { useState, useEffect } from "react";
import Coordinator from "@/Layouts/Coordinator";
import axios from "axios";

export default function Visitation() {
    const [requestVisitations, setRequestVisitations] = useState([]);

    useEffect(() => {
        const fetchRequestVisit = async () => {
            try {
                const res = await axios.get('/visitation/request');
                setRequestVisitations(res.data.visitations || []);
            } catch (err) {
                console.error("Error fetching visitation requests", err);
            }
        };
        fetchRequestVisit();
        const interval = setInterval(fetchRequestVisit, 2000);
        return () => clearInterval(interval);
    }, []);

    const handleStatusUpdate = async (id, status) => {
        try {
            const res = await axios.put(`/visitation/update-status/${id}`, { status });
            alert(res.data.message);
            setRequestVisitations(prev =>
                prev.map(v => v.id === id ? { ...v, status } : v)
            );
        } catch (err) {
            console.error("Error updating visitation status", err);
            alert("Failed to update visitation status");
        }
    };

    return (
        <Coordinator>
            <div className="p-4">
                <h1 className="text-xl font-bold mb-4">Pending Visitations</h1>
                {Array.isArray(requestVisitations) && requestVisitations.length > 0 ? (
                    <ul className="space-y-2">
                        {requestVisitations.map((visit) => (
                            <li key={visit.id} className="border p-3 rounded-md bg-white shadow-sm">
                                <p><strong>Date:</strong> {visit.visitation_date}</p>
                                <p><strong>Remarks:</strong> {visit.remarks || "—"}</p>
                                <p><strong>Status:</strong> 
                                    <span className={`ml-2 px-2 py-1 rounded text-white text-sm ${
                                        visit.status === 'approved' ? 'bg-green-500' :
                                        visit.status === 'rejected' ? 'bg-red-500' :
                                        'bg-yellow-500'
                                    }`}>
                                        {visit.status}
                                    </span>
                                </p>
                                {visit.status === 'pending' && (
                                    <div className="mt-3 flex space-x-2">
                                        <button
                                            onClick={() => handleStatusUpdate(visit.id, 'approved')}
                                            className="px-3 py-1 bg-green-500 text-white rounded-md"
                                        >
                                            Approve
                                        </button>
                                        <button
                                            onClick={() => handleStatusUpdate(visit.id, 'rejected')}
                                            className="px-3 py-1 bg-red-500 text-white rounded-md"
                                        >
                                            Reject
                                        </button>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No pending visitations.</p>
                )}
            </div>
        </Coordinator>
    );
}
