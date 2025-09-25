import InstructorLayout from "@/Layouts/Instructor";
import { Link, usePage } from "@inertiajs/react";

export default function CourseIndex() {
    const { courses } = usePage().props;

    return (
        <InstructorLayout title="My Courses">
            <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
                <h1 className="text-2xl font-bold mb-6">My Courses</h1>

                {courses.length === 0 ? (
                    <div className="text-gray-500">
                        You are not assigned to any courses.
                    </div>
                ) : (
                    <ul className="space-y-4">
                        {courses.map((course) => (
                            <li
                                key={course.id}
                                className="border rounded p-4 hover:shadow"
                            >
                                <Link
                                    href={route("courses.show", course.id)}
                                    className="text-blue-600 hover:underline text-lg font-medium"
                                >
                                    {course.name} ({course.code})
                                </Link>
                                <p className="text-sm text-gray-600">
                                    {course.description}
                                </p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </InstructorLayout>
    );
}
