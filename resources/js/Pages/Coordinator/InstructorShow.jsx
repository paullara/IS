import CoordinatorLayout from "@/Layouts/Coordinator";
import { Link, usePage } from "@inertiajs/react";

export default function InstructorShow() {
    const { instructor } = usePage().props;
    return (
        <CoordinatorLayout title="Instructor Details">
            <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
                <h1 className="text-2xl font-bold mb-4">Instructor Details</h1>
                <div className="mb-4">
                    <strong>Name:</strong> {instructor.name}
                </div>
                <div className="mb-4">
                    <strong>Email:</strong> {instructor.email}
                </div>
                {instructor.picture && (
                    <div className="mb-4">
                        <strong>Profile Picture:</strong>
                        <br />
                        <img
                            src={"/images/" + instructor.picture}
                            alt="Profile"
                            className="w-32 h-32 object-cover rounded-full mt-2"
                        />
                    </div>
                )}
                <div className="flex justify-end">
                    <Link
                        href={route("coordinator.sample")}
                        className="text-gray-600 hover:underline"
                    >
                        Back to List
                    </Link>
                </div>
            </div>
        </CoordinatorLayout>
    );
}
