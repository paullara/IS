import React, { useState, useEffect } from "react";
import Instructor from "@/Layouts/Instructor";
import { useForm } from "@inertiajs/react";
import axios from "axios";

export default function GroupShow({
    group: initialGroup,
    users = [],
    documents = [],
}) {
    const [group, setGroup] = useState(initialGroup);

    // Students
    const [showAssign, setShowAssign] = useState(false);
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [loadingSearch, setLoadingSearch] = useState(false);

    const { data, setData, post, errors } = useForm({
        student_ids: users
            .filter((u) => u.assigned)
            .map((u) => u.id.toString()),
    });

    const toggleStudent = (id) => {
        const strId = id.toString();
        if (data.student_ids.includes(strId)) {
            setData(
                "student_ids",
                data.student_ids.filter((v) => v !== strId)
            );
        } else {
            setData("student_ids", [...data.student_ids, strId]);
        }
    };

    const handleAssignStudents = () => {
        post(`/groups/${group.id}/assign-students`, {
            onSuccess: () => setShowAssign(false),
        });
    };

    useEffect(() => {
        if (!search.trim()) {
            setSearchResults([]);
            return;
        }

        setLoadingSearch(true);
        const timeout = setTimeout(() => {
            axios
                .get(`/groups/${group.id}/students/search`, {
                    params: { q: search },
                })
                .then((res) => setSearchResults(res.data))
                .finally(() => setLoadingSearch(false));
        }, 300);

        return () => clearTimeout(timeout);
    }, [search, group.id]);

    // Documents
    const [showUpload, setShowUpload] = useState(false);
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [uploadError, setUploadError] = useState("");
    const [documentsState, setDocuments] = useState(documents);
    const [previewDoc, setPreviewDoc] = useState(null);

    // Chat
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [loadingMessage, setLoadingMessage] = useState(false);
    // Add this inside your GroupShow component
    const handleUpload = async (e) => {
        e.preventDefault();

        if (!file) {
            setUploadError("Please select a file.");
            return;
        }

        setUploading(true);
        setUploadError("");

        const formData = new FormData();
        formData.append("document", file); // ✅ Important: must match Laravel validation

        try {
            const res = await axios.post(
                `/instructor/${group.id}/documents`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "X-CSRF-TOKEN": document
                            .querySelector('meta[name="csrf-token"]')
                            .getAttribute("content"),
                    },
                }
            );

            setDocuments((prev) => [...prev, res.data]);
            setShowUpload(false);
            setFile(null);
        } catch (err) {
            console.error(err);
            setUploadError(
                err.response?.data?.message || "Failed to upload file."
            );
        } finally {
            setUploading(false);
        }
    };

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

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        setLoadingMessage(true);
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
            .then((msg) => setMessages((prev) => [...prev, msg]))
            .finally(() => {
                setNewMessage("");
                setLoadingMessage(false);
            });
    };

    const [activeTab, setActiveTab] = useState("students"); // students, documents, chat

    return (
        <Instructor title={`Group: ${group.name}`}>
            <div className="min-h-screen bg-gray-50 py-10 px-6 space-y-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-blue-900">
                            {group.name} {group.section}
                        </h1>
                        <p className="text-gray-600 mt-1">
                            <span className="font-medium">Instructor:</span>{" "}
                            {group.instructor?.firstname || "Unknown"}
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={() => setShowAssign(true)}
                            className="bg-green-600 text-white px-4 py-2 rounded-xl shadow hover:bg-green-700 transition"
                        >
                            Assign Students
                        </button>
                        <button
                            onClick={() => setShowUpload(true)}
                            className="bg-blue-600 text-white px-4 py-2 rounded-xl shadow hover:bg-blue-700 transition"
                        >
                            Upload Document
                        </button>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-4 border-b pb-2">
                    {["students", "documents", "chat"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-2 font-medium rounded-t-lg transition ${
                                activeTab === tab
                                    ? "bg-indigo-600 text-white"
                                    : "text-gray-600 hover:text-indigo-600"
                            }`}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div className="grid md:grid-cols-3 gap-6">
                    {/* Students */}
                    {activeTab === "students" && (
                        <div className="md:col-span-3 bg-gray-50 rounded-xl p-6 shadow space-y-4">
                            <h2 className="text-lg font-semibold text-gray-800">
                                Students in Group
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
                                            className="bg-white p-3 rounded-xl shadow border"
                                        >
                                            <span className="font-medium">
                                                {s.firstname}{" "}
                                                {s.middlename || ""}{" "}
                                                {s.lastname}
                                            </span>
                                            <p className="text-sm text-gray-500">
                                                {s.company_name
                                                    ? `Accepted at: ${s.company_name}`
                                                    : s.section}
                                            </p>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    )}

                    {/* Documents */}
                    {activeTab === "documents" && (
                        <div className="md:col-span-3 bg-gray-50 rounded-xl p-6 shadow space-y-4">
                            <h2 className="text-lg font-semibold text-gray-800">
                                Group Documents
                            </h2>
                            {documentsState.length === 0 ? (
                                <p className="text-gray-500 italic">
                                    No documents uploaded yet.
                                </p>
                            ) : (
                                <ul className="space-y-4">
                                    {documentsState.map((doc) => (
                                        <li
                                            key={doc.id}
                                            className="border p-3 rounded-lg bg-white shadow flex justify-between items-center"
                                        >
                                            <span className="font-medium text-blue-700">
                                                {doc.name}
                                            </span>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() =>
                                                        setPreviewDoc(doc)
                                                    }
                                                    className="text-sm text-indigo-600 hover:underline"
                                                >
                                                    Preview
                                                </button>
                                                <a
                                                    href={doc.url}
                                                    target="_blank"
                                                >
                                                    Open
                                                </a>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    )}

                    {/* Chat */}
                    {activeTab === "chat" && (
                        <div className="md:col-span-3 bg-gray-50 rounded-xl p-6 shadow flex flex-col">
                            <h2 className="text-lg font-semibold text-gray-800 mb-4">
                                Group Chat
                            </h2>
                            <div className="border rounded-lg p-4 h-64 overflow-y-auto bg-white flex-1 mb-3">
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
                                            <span className="font-semibold">
                                                {msg.user?.firstname ||
                                                    "Unknown"}
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
                                className="flex gap-2"
                                onSubmit={handleSendMessage}
                            >
                                <input
                                    type="text"
                                    value={newMessage}
                                    onChange={(e) =>
                                        setNewMessage(e.target.value)
                                    }
                                    placeholder="Type a message..."
                                    className="border rounded-lg p-2 flex-1"
                                    disabled={loadingMessage}
                                />
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                                    disabled={loadingMessage}
                                >
                                    Send
                                </button>
                            </form>
                        </div>
                    )}
                </div>

                {/* Assign Students Modal */}
                {showAssign && (
                    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
                        <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-lg space-y-4">
                            <h3 className="text-xl font-semibold">
                                Assign Students
                            </h3>
                            <input
                                type="text"
                                placeholder="Search students..."
                                className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-200"
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <div className="max-h-64 overflow-y-auto space-y-2">
                                {loadingSearch && (
                                    <p className="text-gray-500 text-sm text-center">
                                        Searching...
                                    </p>
                                )}
                                {!loadingSearch &&
                                    searchResults.length === 0 && (
                                        <p className="text-gray-500 text-sm text-center">
                                            No students found
                                        </p>
                                    )}
                                {searchResults.map((student) => {
                                    const isSelected =
                                        data.student_ids.includes(
                                            student.id.toString()
                                        );
                                    return (
                                        <div
                                            key={student.id}
                                            onClick={() =>
                                                toggleStudent(student.id)
                                            }
                                            className={`p-3 border rounded-xl cursor-pointer transition ${
                                                isSelected
                                                    ? "bg-blue-600 text-white"
                                                    : "bg-gray-50 hover:bg-gray-100"
                                            }`}
                                        >
                                            <div className="font-medium">
                                                {student.firstname}{" "}
                                                {student.middlename || ""}{" "}
                                                {student.lastname}
                                            </div>
                                            <div
                                                className={`text-sm ${
                                                    isSelected
                                                        ? "text-blue-100"
                                                        : "text-gray-500"
                                                }`}
                                            >
                                                {student.company_name ||
                                                    "No Company"}{" "}
                                                • {student.section}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            {errors.student_ids && (
                                <p className="text-red-500 text-sm">
                                    {errors.student_ids}
                                </p>
                            )}
                            <div className="flex justify-end gap-2 mt-4">
                                <button
                                    onClick={() => setShowAssign(false)}
                                    className="bg-gray-400 text-white px-4 py-2 rounded-lg"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleAssignStudents}
                                    className="bg-green-600 text-white px-4 py-2 rounded-lg"
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Upload Document Modal */}
                {showUpload && (
                    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
                        <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md space-y-4">
                            <h3 className="text-lg font-semibold">
                                Upload Document
                            </h3>
                            <form onSubmit={handleUpload} className="space-y-2">
                                <input
                                    type="file"
                                    onChange={(e) => setFile(e.target.files[0])}
                                />
                                {uploadError && (
                                    <p className="text-red-500 text-sm">
                                        {uploadError}
                                    </p>
                                )}
                                <div className="flex justify-end gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setShowUpload(false)}
                                        className="bg-gray-400 text-white px-4 py-2 rounded-lg"
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

                {/* Document Preview Modal */}
                {previewDoc && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-xl shadow-lg w-full max-w-4xl p-6 relative">
                            <button
                                onClick={() => setPreviewDoc(null)}
                                className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 font-bold text-lg"
                            >
                                &times;
                            </button>
                            <h3 className="text-lg font-semibold mb-4">
                                {previewDoc.name}
                            </h3>
                            {previewDoc.name.endsWith(".pdf") ? (
                                <iframe
                                    src={previewDoc.url}
                                    className="w-full h-[600px]"
                                />
                            ) : (
                                <img
                                    src={previewDoc.url}
                                    className="w-full h-auto"
                                />
                            )}
                        </div>
                    </div>
                )}
            </div>
        </Instructor>
    );
}
