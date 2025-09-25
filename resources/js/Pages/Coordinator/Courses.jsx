import Coordinator from "@/Layouts/Coordinator";
import { usePage, Link } from "@inertiajs/react";

export default function Course() {
    const { courses } = usePage().props;
    return (
        <Coordinator title="My Courses">
            <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
                <h1 className="text-2xl font-bold mb-4">My Courses</h1>
                {courses.length === 0 ? (
                    <div className="text-center text-gray-500">
                        No courses assigned.
                    </div>
                ) : (
                    <ul className="space-y-4">
                        {courses.map((course) => (
                            <li key={course.id} className="border-b pb-2">
                                <Link
                                    href={route(
                                        "coordinator.courses.show",
                                        course.id
                                    )}
                                    className="font-semibold text-lg text-blue-700 hover:underline"
                                >
                                    {course.name} ({course.code})
                                </Link>
                                <div className="text-gray-600">
                                    {course.description || "No description"}
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </Coordinator>
    );
}
