import AdminLayout from "@/Layouts/AdminLayout";
import { Link, usePage } from "@inertiajs/react";

export default function CourseIndex() {
    const { courses } = usePage().props;
    return (
        <AdminLayout title="Courses">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Courses</h1>
                <Link
                    href={route("courses.create")}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Add Course
                </Link>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 border">Name</th>
                            <th className="px-4 py-2 border">Code</th>
                            <th className="px-4 py-2 border">Coordinator</th>
                            <th className="px-4 py-2 border">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courses.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="text-center py-4">
                                    No courses found.
                                </td>
                            </tr>
                        ) : (
                            courses.map((course) => (
                                <tr key={course.id}>
                                    <td className="px-4 py-2 border">
                                        {course.name}
                                    </td>
                                    <td className="px-4 py-2 border">
                                        {course.code}
                                    </td>
                                    <td className="px-4 py-2 border">
                                        {course.coordinator
                                            ? course.coordinator.name
                                            : "-"}
                                    </td>
                                    <td className="px-4 py-2 border space-x-2">
                                        <Link
                                            href={route(
                                                "courses.show",
                                                course.id
                                            )}
                                            className="text-blue-600 hover:underline"
                                        >
                                            View
                                        </Link>
                                        <Link
                                            href={route(
                                                "courses.edit",
                                                course.id
                                            )}
                                            className="text-yellow-600 hover:underline"
                                        >
                                            Edit
                                        </Link>
                                        <Link
                                            as="button"
                                            method="delete"
                                            href={route(
                                                "courses.destroy",
                                                course.id
                                            )}
                                            className="text-red-600 hover:underline"
                                            onClick={(e) => {
                                                if (!confirm("Are you sure?"))
                                                    e.preventDefault();
                                            }}
                                        >
                                            Delete
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    );
}
