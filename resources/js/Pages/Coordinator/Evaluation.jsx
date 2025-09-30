import { useState, useEffect } from "react";
import Coordinator from "@/Layouts/Coordinator";
import axios from "axios";

export default function Evaluation() {
    const [evaluation, setEvaluation] = useState([]);

    useEffect(() => {
        const fetchEvaluation = async () => {
            try {
                const res = await axios.get("/evaluation/fetch");
                console.log("Evaluation:", res.data.evaluated);
                setEvaluation(res.data.evaluated);
            } catch (error) {
                console.error("Error fetching evaluations", error);
            }
        };
        fetchEvaluation();
        const interval = setInterval(fetchEvaluation, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <Coordinator>
            <div className="p-6 bg-white rounded-xl shadow">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">
                    Student Evaluations
                </h1>

                {evaluation.length === 0 ? (
                    <p className="text-gray-500">No evaluations yet.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full border border-gray-200 text-left text-sm">
                            <thead className="bg-gray-100 text-gray-700">
                                <tr>
                                    <th className="px-4 py-2 border">#</th>
                                    <th className="px-4 py-2 border">
                                        Student
                                    </th>
                                    <th className="px-4 py-2 border">
                                        School ID
                                    </th>
                                    <th className="px-4 py-2 border">Score</th>
                                    <th className="px-4 py-2 border">
                                        Comments
                                    </th>
                                    <th className="px-4 py-2 border">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {evaluation.map((evalItem, index) => (
                                    <tr
                                        key={evalItem.id}
                                        className="hover:bg-gray-50"
                                    >
                                        <td className="px-4 py-2 border">
                                            {index + 1}
                                        </td>
                                        <td className="px-4 py-2 border flex items-center gap-3">
                                            <img
                                                src={`/profiles/${evalItem.application?.student?.picture}`}
                                                alt="student"
                                                className="w-10 h-10 rounded-full object-cover border"
                                            />
                                            <span>
                                                {
                                                    evalItem.application
                                                        ?.student?.firstname
                                                }{" "}
                                                {
                                                    evalItem.application
                                                        ?.student?.lastname
                                                }
                                            </span>
                                        </td>
                                        <td className="px-4 py-2 border">
                                            {
                                                evalItem.application?.student
                                                    ?.school_id
                                            }
                                        </td>
                                        <td className="px-4 py-2 border">
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                                    evalItem.score >= 4
                                                        ? "bg-green-100 text-green-700"
                                                        : evalItem.score === 3
                                                        ? "bg-yellow-100 text-yellow-700"
                                                        : "bg-red-100 text-red-700"
                                                }`}
                                            >
                                                {evalItem.score}
                                            </span>
                                        </td>
                                        <td className="px-4 py-2 border text-gray-600 italic">
                                            {evalItem.comments || "—"}
                                        </td>
                                        <td className="px-4 py-2 border text-gray-500 text-xs">
                                            {new Date(
                                                evalItem.created_at
                                            ).toLocaleString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </Coordinator>
    );
}
