import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function Show({ auth, student }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Student Profile" />

            <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
                <div className="relative">
                    <div className="h-48 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg shadow-lg mb-8">
                        {student?.picture && (
                            <img
                                src={`/profiles/${student.picture}`}
                                alt="Profile"
                                className="w-36 h-36 object-cover rounded-full border-4 border-white absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2"
                            />
                        )}
                    </div>

                    <h1 className="text-3xl font-bold text-gray-800 text-center">
                        {student.firstname} {student.middlename}{" "}
                        {student.lastname}
                    </h1>
                </div>

                <div className="space-y-6 mt-8">
                    <p>
                        <strong>School ID:</strong> {student.school_id}
                    </p>
                    <p>
                        <strong>Year Level:</strong> {student.year_level}
                    </p>
                    <p>
                        <strong>Skills:</strong> {student.skills || "N/A"}
                    </p>
                    <p>
                        <strong>Bio:</strong> {student.bio || "N/A"}
                    </p>
                </div>

                {/* Edit Button */}
                {auth.user.id === student.id && (
                    <div className="mt-6">
                        <Link
                            href={route("student.profile.edit", student.id)}
                            className="bg-yellow-500 text-white px-6 py-3 rounded-md"
                        >
                            Edit Profile
                        </Link>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
