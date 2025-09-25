import Coordinator from "@/Layouts/Coordinator";
import { usePage, useForm } from "@inertiajs/react";

export default function Documents() {
    const { course, documents } = usePage().props;
    const { data, setData, post, processing, errors, reset } = useForm({
        title: "",
        file: null,
    });

    function handleSubmit(e) {
        e.preventDefault();
        post(route("coordinator.courses.documents.store", course.id), {
            onSuccess: () => reset(),
        });
    }

    function handleDelete(id) {
        if (confirm("Delete this document?")) {
            post(
                route("coordinator.courses.documents.destroy", [course.id, id]),
                {
                    method: "delete",
                }
            );
        }
    }

    return (
        <Coordinator title={course.name + " Documents"}>
            <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
                <h1 className="text-2xl font-bold mb-4">
                    Documents for {course.name}
                </h1>
                <form
                    onSubmit={handleSubmit}
                    encType="multipart/form-data"
                    className="mb-6"
                >
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
                        <label className="block mb-1">File</label>
                        <input
                            type="file"
                            className="w-full"
                            onChange={(e) => setData("file", e.target.files[0])}
                        />
                        {errors.file && (
                            <div className="text-red-500 text-sm">
                                {errors.file}
                            </div>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        disabled={processing}
                    >
                        Upload
                    </button>
                </form>
                <h2 className="text-xl font-semibold mb-2">
                    Uploaded Documents
                </h2>
                {documents.length === 0 ? (
                    <div className="text-gray-500">
                        No documents uploaded yet.
                    </div>
                ) : (
                    <ul className="space-y-2">
                        {documents.map((doc) => (
                            <li
                                key={doc.id}
                                className="border-b pb-2 flex justify-between items-center"
                            >
                                <div>
                                    <a
                                        href={"/storage/" + doc.file_path}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-700 hover:underline font-semibold"
                                    >
                                        {doc.title}
                                    </a>
                                    <div className="text-xs text-gray-600">
                                        Uploaded by:{" "}
                                        {doc.uploader?.name || "Unknown"}
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleDelete(doc.id)}
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
