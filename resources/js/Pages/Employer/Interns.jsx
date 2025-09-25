import EmployerLayout from "@/Layouts/EmployerLayout";
import { usePage } from "@inertiajs/react";
import { useState } from "react";

export default function Interns() {
    const { internships } = usePage().props;
    const [selectedInternship, setSelectedInternship] = useState(null);

    const handleSelectInternship = (internship) => {
        setSelectedInternship(internship);
    };

    const countAcceptedInterns = (internship) => {
        const fromApplications =
            internship.applications?.filter(
                (a) => a.status === "accepted" && a.student
            ).length || 0;

        const fromAssigned =
            internship.students?.filter((s) => s.student?.status === "accepted")
                .length || 0;

        return fromApplications + fromAssigned;
    };

    return (
        <EmployerLayout>
            <div className="flex">
                {/* Left Sidebar */}
                {selectedInternship && (
                    <div className="w-1/3 bg-gray-100 p-4 transition-all duration-300 overflow-y-auto">
                        <ul className="list-none pl-0">
                            {/* Applications (accepted) */}
                            {selectedInternship.applications
                                ?.filter(
                                    (app) =>
                                        app.status === "accepted" && app.student
                                )
                                .map((application) => {
                                    const student = application.student;
                                    return (
                                        <li
                                            key={`app-${application.id}`}
                                            className="flex items-center gap-4 mb-4"
                                        >
                                            <img
                                                src={
                                                    student.picture
                                                        ? `/profiles/${student.picture}`
                                                        : "/images/placeholder.jpg"
                                                }
                                                alt={`${student.firstname} ${student.lastname}`}
                                                className="w-12 h-12 rounded-full object-cover border-2 border-white shadow"
                                            />
                                            <div>
                                                <p className="font-semibold">
                                                    {student.firstname}{" "}
                                                    {student.middlename}{" "}
                                                    {student.lastname}
                                                </p>
                                                <p className="text-gray-500 text-sm">
                                                    Source: Applied
                                                </p>
                                            </div>
                                        </li>
                                    );
                                })}

                            {/* Assigned students with accepted status */}
                            {selectedInternship.students
                                ?.filter(
                                    (student) =>
                                        student.student?.status === "accepted"
                                )
                                .map((student) => {
                                    const profile = student.student;
                                    return (
                                        <li
                                            key={`assigned-${student.id}`}
                                            className="flex items-center gap-4 mb-4"
                                        >
                                            <img
                                                src={
                                                    profile?.picture
                                                        ? `/profiles/${profile.picture}`
                                                        : "/images/placeholder.jpg"
                                                }
                                                alt={`${profile.firstname} ${profile.lastname}`}
                                                className="w-12 h-12 rounded-full object-cover border-2 border-white shadow"
                                            />
                                            <div>
                                                <p className="font-semibold">
                                                    {profile.firstname}{" "}
                                                    {profile.middlename}{" "}
                                                    {profile.lastname}
                                                </p>
                                                <p className="text-gray-500 text-sm">
                                                    Source: Assigned
                                                </p>
                                            </div>
                                        </li>
                                    );
                                })}

                            {/* Empty message */}
                            {selectedInternship.applications.filter(
                                (a) => a.status === "accepted" && a.student
                            ).length === 0 &&
                                selectedInternship.students.filter(
                                    (s) => s.student?.status === "accepted"
                                ).length === 0 && (
                                    <p className="text-gray-500">
                                        No accepted interns yet.
                                    </p>
                                )}
                        </ul>
                    </div>
                )}

                {/* Main Internship Cards */}
                <div className="flex-1 p-6">
                    <h1 className="text-2xl font-bold mb-6">Internships</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {internships?.map((internship) => (
                            <div
                                key={internship.id}
                                className="border p-6 rounded-lg cursor-pointer hover:bg-gray-100 transition shadow"
                                onClick={() =>
                                    handleSelectInternship(internship)
                                }
                            >
                                <h2 className="text-lg font-semibold mb-2">
                                    {internship.title}
                                </h2>
                                <p className="text-gray-600 text-sm">
                                    {countAcceptedInterns(internship)} Accepted
                                    Intern
                                    {countAcceptedInterns(internship) !== 1 &&
                                        "s"}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </EmployerLayout>
    );
}
