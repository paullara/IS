import React, { useEffect, useState } from "react";
import Instructor from "@/Layouts/Instructor";
import { useForm } from "@inertiajs/react";

export default function GroupShow({ group, users = [], auth, documents = [] }) {
    const [showAssign, setShowAssign] = useState(false);
    const [showUpload, setShowUpload] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [uploadError, setUploadError] = useState("");
    const [file, setFile] = useState(null);

    const [documentsState, setDocuments] = useState(documents);

    // Messaging state
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const { data, setData, post, processing, errors } = useForm({
        student_ids: group.students.map((s) => s.id),
    });

    // Fetch messages
    useEffect(() => {
        let isMounted = true;
        const fetchMessages = () => {
            fetch(`/groups/${group.id}/messages`)
                .then((res) => res.json())
                .then((data) => {
                    if (isMounted) setMessages(data);
                });
        };
        fetchMessages();
        const interval = setInterval(fetchMessages, 2000);
        return () => {
            isMounted = false;
            clearInterval(interval);
        };
    }, [group.id]);

    // Send message
    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;
        setLoading(true);
        fetch(`/groups/${group.id}/messages`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Requested-With": "XMLHttpRequest",
                "X-CSRF-TOKEN": document
                    .querySelector('meta[name="csrf-token"]')
                    .getAttribute("content"),
            },
            body: JSON.stringify({ content: newMessage }),
        })
            .then((res) => res.json())
            .then((msg) => {
                setMessages((prev) => [...prev, msg]);
                setNewMessage("");
            })
            .finally(() => setLoading(false));
    };

    // Assign students
    const handleAssignStudents = (e) => {
        e.preventDefault();
        post(`/groups/${group.id}/assign-students`, {
            onSuccess: () => setShowAssign(false),
        });
    };

    // Upload document
    const handleUpload = (e) => {
        e.preventDefault();
        setUploadError("");
        if (!file) {
            setUploadError("Please select a file.");
            return;
        }
        setUploading(true);
        const formData = new FormData();
        formData.append("document", file);
        fetch(`/groups/${group.id}/documents`, {
            method: "POST",
            headers: {
                "X-Requested-With": "XMLHttpRequest",
                "X-CSRF-TOKEN": document
                    .querySelector('meta[name="csrf-token"]')
                    .getAttribute("content"),
            },
            body: formData,
        })
            .then((res) => res.json())
            .then(() => {
                fetch(`/groups/${group.id}/documents`)
                    .then((res) => res.json())
                    .then((docs) => setDocuments(docs));
                setFile(null);
                setShowUpload(false);
            })
            .catch(() => setUploadError("Upload failed."))
            .finally(() => setUploading(false));
    };

    const students = users.filter((u) => u.role === "student");

    return (
        <Instructor title={`Group: ${group.name}`}>
            <div className="h-screen w-full bg-gray-50 py-10">
                <div className="h-full w-full max-w-7xl mx-auto bg-white rounded-2xl shadow-lg p-8">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">
                                {group.name}
                            </h1>
                            <p className="text-gray-600 mt-1">
                                <span className="font-medium">Instructor:</span>{" "}
                                {group.instructor?.firstname}
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <button
                                className="bg-green-600 text-white px-4 py-2 rounded-xl shadow-sm hover:bg-green-700 transition"
                                onClick={() => setShowAssign(true)}
                            >
                                Assign Students
                            </button>
                            <button
                                className="bg-blue-600 text-white px-4 py-2 rounded-xl shadow-sm hover:bg-blue-700 transition"
                                onClick={() => setShowUpload(true)}
                            >
                                Upload Document
                            </button>
                        </div>
                    </div>

                    <div className="h-full grid md:grid-cols-3 gap-8">
                        {/* Students Section */}
                        <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
                            <h2 className="text-lg font-semibold text-gray-800 mb-4">
                                Students
                            </h2>
                            {group.students.length === 0 ? (
                                <p className="text-gray-500 italic">
                                    No students assigned yet.
                                </p>
                            ) : (
                                <ul className="space-y-2">
                                    {group.students.map((s) => (
                                        <li
                                            key={s.id}
                                            className="bg-white p-3 rounded-lg shadow border"
                                        >
                                            <span className="text-gray-900 font-medium">
                                                {s.student
                                                    ? `${s.student.firstname} ${
                                                          s.student.middlename
                                                              ? s.student
                                                                    .middlename +
                                                                " "
                                                              : ""
                                                      }${s.student.lastname}`
                                                    : s.firstname}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        {/* Documents Section */}
                        <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
                            <h2 className="text-lg font-semibold text-gray-800 mb-4">
                                Group Documents
                            </h2>
                            {documentsState.length === 0 ? (
                                <p className="text-gray-500 text-sm">
                                    No documents uploaded yet.
                                </p>
                            ) : (
                                <ul className="space-y-2">
                                    {documentsState.map((doc) => (
                                        <li key={doc.id}>
                                            <a
                                                href={`/group-documents/${doc.id}/download`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-700 font-medium hover:underline"
                                            >
                                                {doc.name ||
                                                    doc.original_name ||
                                                    "Document"}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        {/* Messaging Section */}
                        <div className="bg-gray-50 rounded-xl p-6 shadow-sm flex flex-col">
                            <h2 className="text-lg font-semibold text-gray-800 mb-4">
                                Group Messages
                            </h2>
                            <div className="border rounded-lg p-4 h-64 overflow-y-auto bg-white mb-3 flex-1">
                                {messages.length === 0 ? (
                                    <p className="text-gray-400 text-center">
                                        No messages yet.
                                    </p>
                                ) : (
                                    messages.map((msg) => (
                                        <div
                                            key={msg.id}
                                            className="mb-3 border-b pb-2"
                                        >
                                            <span className="font-semibold text-gray-900">
                                                {msg.user?.name || "Unknown"}
                                            </span>
                                            <span className="text-xs text-gray-500 ml-2">
                                                {msg.created_at &&
                                                    new Date(
                                                        msg.created_at
                                                    ).toLocaleString()}
                                            </span>
                                            <p className="ml-2 text-gray-700">
                                                {msg.content}
                                            </p>
                                        </div>
                                    ))
                                )}
                            </div>
                            <form
                                onSubmit={handleSendMessage}
                                className="flex gap-2 mt-auto"
                            >
                                <input
                                    className="border rounded-lg p-2 flex-1"
                                    value={newMessage}
                                    onChange={(e) =>
                                        setNewMessage(e.target.value)
                                    }
                                    placeholder="Type a message..."
                                    disabled={loading}
                                />
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                                    disabled={loading}
                                >
                                    Send
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Upload Modal */}
                {showUpload && (
                    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
                            <h3 className="text-lg font-bold mb-4">
                                Upload Document for {group.name}
                            </h3>
                            <form onSubmit={handleUpload}>
                                <input
                                    type="file"
                                    className="mb-4"
                                    onChange={(e) => setFile(e.target.files[0])}
                                />
                                {uploadError && (
                                    <p className="text-red-500 text-sm mb-2">
                                        {uploadError}
                                    </p>
                                )}
                                <div className="flex justify-end gap-2">
                                    <button
                                        type="button"
                                        className="bg-gray-400 text-white px-4 py-2 rounded-lg"
                                        onClick={() => setShowUpload(false)}
                                        disabled={uploading}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                                        disabled={uploading}
                                    >
                                        {uploading ? "Uploading..." : "Upload"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Assign Students Modal */}
                {showAssign && (
                    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
                            <h3 className="text-lg font-bold mb-4">
                                Assign Students to {group.name}
                            </h3>
                            <form onSubmit={handleAssignStudents}>
                                <select
                                    className="border p-2 w-full mb-4 rounded-lg"
                                    multiple
                                    value={data.student_ids}
                                    onChange={(e) =>
                                        setData(
                                            "student_ids",
                                            Array.from(
                                                e.target.selectedOptions,
                                                (o) => o.value
                                            )
                                        )
                                    }
                                >
                                    {students.map((s) => (
                                        <option key={s.id} value={s.id}>
                                            {s.firstname}
                                        </option>
                                    ))}
                                </select>
                                {errors.student_ids && (
                                    <p className="text-red-500 text-sm mb-2">
                                        {errors.student_ids}
                                    </p>
                                )}
                                <div className="flex justify-end gap-2">
                                    <button
                                        type="button"
                                        className="bg-gray-400 text-white px-4 py-2 rounded-lg"
                                        onClick={() => setShowAssign(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-green-600 text-white px-4 py-2 rounded-lg"
                                        disabled={processing}
                                    >
                                        Save
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </Instructor>
    );
}
