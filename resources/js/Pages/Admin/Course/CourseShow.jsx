import AdminLayout from "@/Layouts/AdminLayout";
import { Link, usePage } from "@inertiajs/react";

export default function CourseShow() {
    const { course } = usePage().props;
    return (
        <AdminLayout title="Course Details">
            <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
                <h1 className="text-2xl font-bold mb-4">Course Details</h1>
                <div className="mb-4">
                    <strong>Name:</strong> {course.name}
                </div>
                <div className="mb-4">
                    <strong>Code:</strong> {course.code}
                </div>
                <div className="mb-4">
                    <strong>Description:</strong> {course.description || "-"}
                </div>
                <div className="mb-4">
                    <strong>Coordinator:</strong>{" "}
                    {course.coordinator ? course.coordinator.name : "-"}
                </div>
                <div className="flex justify-end">
                    <Link
                        href={route("courses.index")}
                        className="text-gray-600 hover:underline"
                    >
                        Back to List
                    </Link>
                </div>
            </div>
        </AdminLayout>
    );
}
