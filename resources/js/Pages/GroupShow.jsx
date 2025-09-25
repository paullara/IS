import React, { useEffect, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Inertia } from "@inertiajs/inertia";

export default function GroupShow({ group, users = [], auth, documents = [] }) {
    // Messaging state
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [loading, setLoading] = useState(false);

    // Fetch messages on mount and set up polling for real-time updates
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
        const interval = setInterval(fetchMessages, 2000); // Poll every 2 seconds
        return () => {
            isMounted = false;
            clearInterval(interval);
        };
    }, [group.id]);

    // Send a new message
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

    return (
        <AuthenticatedLayout>
            <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 to-white flex flex-col items-center py-8">
                <div className="w-full h-full max-w-5xl flex flex-col flex-1 bg-white rounded-none md:rounded-xl shadow-lg p-0 md:p-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4 px-4 md:px-0 pt-6 md:pt-0">
                        <div>
                            <h1 className="text-3xl font-extrabold text-blue-800 mb-1">
                                {group.name}
                            </h1>
                            <div className="text-gray-600 font-medium">
                                <span className="font-semibold">
                                    Instructor:
                                </span>{" "}
                                {group.instructor?.name}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-8 flex-1 px-4 md:px-0 pb-8">
                        {/* Students Section */}
                        <div className="flex-1 min-w-[250px]">
                            <h2 className="text-xl font-bold text-blue-700 mb-2">
                                Students
                            </h2>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 list-none">
                                {(group.students || []).map((s) => (
                                    <li
                                        key={s.id}
                                        className="bg-blue-50 rounded px-4 py-2 flex items-center gap-2"
                                    >
                                        <span className="text-blue-900 font-semibold">
                                            {s.student_profile
                                                ? `${
                                                      s.student_profile
                                                          .first_name
                                                  } ${
                                                      s.student_profile
                                                          .middle_name
                                                          ? s.student_profile
                                                                .middle_name +
                                                            " "
                                                          : ""
                                                  }${
                                                      s.student_profile
                                                          .last_name
                                                  }`
                                                : s.name}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                            {group.students?.length === 0 && (
                                <div className="text-gray-400 italic mt-2">
                                    No students assigned yet.
                                </div>
                            )}
                        </div>

                        {/* Documents Section */}
                        <div className="flex-1 min-w-[250px]">
                            <h2 className="text-xl font-bold text-blue-700 mb-2">
                                Group Documents
                            </h2>
                            {documents.length === 0 ? (
                                <div className="text-gray-500 text-sm">
                                    No documents uploaded yet.
                                </div>
                            ) : (
                                <ul className="list-disc ml-6">
                                    {documents.map((doc) => (
                                        <li key={doc.id}>
                                            <a
                                                href={`/group-documents/${doc.id}/download`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-700 underline hover:text-blue-900"
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
                        <div className="flex-1 min-w-[250px] flex flex-col">
                            <h2 className="text-xl font-bold text-blue-700 mb-2">
                                Group Messages
                            </h2>
                            <div className="border rounded-lg p-4 h-64 overflow-y-auto bg-gray-50 mb-2 flex-1">
                                {messages.length === 0 && (
                                    <div className="text-gray-400 text-center">
                                        No messages yet.
                                    </div>
                                )}
                                {messages.map((msg) => (
                                    <div key={msg.id} className="mb-2">
                                        <span className="font-semibold text-blue-800">
                                            {msg.user?.name || "Unknown"}
                                        </span>
                                        <span className="text-xs text-gray-500 ml-2">
                                            {msg.created_at &&
                                                new Date(
                                                    msg.created_at
                                                ).toLocaleString()}
                                        </span>
                                        <div className="ml-2">
                                            {msg.content}
                                        </div>
                                    </div>
                                ))}
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
            </div>
        </AuthenticatedLayout>
    );
}
