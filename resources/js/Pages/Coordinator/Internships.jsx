import Coordinator from "@/Layouts/Coordinator";
import { usePage } from "@inertiajs/react";

export default function Internships() {
    const { internships } = usePage().props;
    return (
        <Coordinator title="All Internships">
            <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
                <h1 className="text-2xl font-bold mb-4">All Internships</h1>
                {internships.length === 0 ? (
                    <div className="text-gray-500">No internships found.</div>
                ) : (
                    <ul className="space-y-4">
                        {internships.map((internship) => (
                            <li key={internship.id} className="border-b pb-2">
                                <div className="font-semibold text-lg">
                                    {internship.title}
                                </div>
                                <div className="text-gray-600 mb-1">
                                    {internship.description}
                                </div>
                                <div className="text-xs text-gray-500 mb-1">
                                    Employer:{" "}
                                    {internship.employer?.company_name || "N/A"}
                                </div>
                                <div className="text-xs text-gray-500">
                                    {internship.start_date} -{" "}
                                    {internship.end_date} | Status:{" "}
                                    {internship.status}
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </Coordinator>
    );
}
