import Coordinator from "@/Layouts/Coordinator";
import { usePage, useForm } from "@inertiajs/react";

export default function Announcements() {
    const { course, announcements } = usePage().props;
    const { data, setData, post, processing, errors, reset } = useForm({
        title: "",
        body: "",
    });

    function handleSubmit(e) {
        e.preventDefault();
        post(route("coordinator.courses.announcements.store", course.id), {
            onSuccess: () => reset(),
        });
    }

    function handleDelete(id) {
        if (confirm("Delete this announcement?")) {
            post(
                route("coordinator.courses.announcements.destroy", [
                    course.id,
                    id,
                ]),
                {
                    method: "delete",
                }
            );
        }
    }

    return (
        <Coordinator title={course.name + " Announcements"}>
            <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
                <h1 className="text-2xl font-bold mb-4">
                    Announcements for {course.name}
                </h1>
                <form onSubmit={handleSubmit} className="mb-6">
                    <div className="mb-2">
                        <label className="block mb-1">Title</label>
                        <input
                            type="text"
                            className="w-full border rounded px-3 py-2"
                            value={data.title}
                            onChange={(e) => setData("title", e.target.value)}
                        />
                        {errors.title && (
                            <div className="text-red-500 text-sm">
                                {errors.title}
                            </div>
                        )}
                    </div>
                    <div className="mb-2">
                        <label className="block mb-1">Body</label>
                        <textarea
                            className="w-full border rounded px-3 py-2"
                            value={data.body}
                            onChange={(e) => setData("body", e.target.value)}
                        />
                        {errors.body && (
                            <div className="text-red-500 text-sm">
                                {errors.body}
                            </div>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        disabled={processing}
                    >
                        Post
                    </button>
                </form>
                <h2 className="text-xl font-semibold mb-2">
                    Posted Announcements
                </h2>
                {announcements.length === 0 ? (
                    <div className="text-gray-500">No announcements yet.</div>
                ) : (
                    <ul className="space-y-2">
                        {announcements.map((a) => (
                            <li
                                key={a.id}
                                className="border-b pb-2 flex justify-between items-center"
                            >
                                <div>
                                    <div className="font-semibold">
                                        {a.title}
                                    </div>
                                    <div className="text-gray-700 text-sm mb-1">
                                        {a.body}
                                    </div>
                                    <div className="text-xs text-gray-600">
                                        By: {a.user?.name || "Unknown"} |{" "}
                                        {new Date(
                                            a.created_at
                                        ).toLocaleString()}
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleDelete(a.id)}
                                    className="text-red-600 hover:underline text-sm"
                                >
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </Coordinator>
    );
}
