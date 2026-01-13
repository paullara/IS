import React, { useState, useEffect } from "react";
import axios from "axios";
import Instructor from "@/Layouts/Instructor";

export default function GroupShow({ group: initialGroup }) {
    const [group, setGroup] = useState(initialGroup);
    const [activeTab, setActiveTab] = useState("documents");
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fetch documents
    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                const res = await axios.get(
                    `/coordinator/${group.id}/documents`
                );
                setDocuments(res.data);
            } catch (err) {
                console.error("Failed to fetch documents:", err);
            }
        };
        fetchDocuments();
        const interval = setInterval(fetchDocuments, 5000);
        return () => clearInterval(interval);
    }, [group.id]);

    const handleUpload = async (e) => {
        e.preventDefault();
        const fileInput = e.target.elements.document;
        if (!fileInput.files[0]) return;

        const formData = new FormData();
        formData.append("document", fileInput.files[0]);

        try {
            const res = await axios.post(
                `/coordinator/${group.id}/documents`,
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );
            setDocuments((prev) => [res.data, ...prev]);
            fileInput.value = "";
        } catch (err) {
            console.error("Upload failed:", err);
        }
    };

    // Poll group updates
    useEffect(() => {
        const interval = setInterval(() => {
            axios
                .get(`/coordinator/groups/${group.id}/fetch`)
                .then((res) => setGroup(res.data.group))
                .catch((err) => console.error("Polling error:", err));
        }, 5000);
        return () => clearInterval(interval);
    }, [group.id]);

    // Fetch messages
    useEffect(() => {
        let isMounted = true;
        const fetchMessages = () => {
            fetch(`/instructor-groups/${group.id}/messages`)
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
        setLoading(true);

        fetch(`/instructor-groups/${group.id}/messages`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Requested-With": "XMLHttpRequest",
                "X-CSRF-TOKEN": document
                    .querySelector('meta[name="csrf-token"]')
                    .getAttribute("content"),
            },
            body: JSON.stringify({ message: newMessage }),
        })
            .then((res) => res.json())
            .then((msg) => {
                setMessages((prev) => [...prev, msg]);
                setNewMessage("");
            })
            .finally(() => setLoading(false));
    };

    return (
        <Instructor title={`Instructor Group: ${group.name}`}>
            <div className="min-h-screen bg-gray-50 py-10 px-6">
                {/* Tabs */}
                <div className="flex space-x-4 mb-8 border-b pb-2">
                    {["documents", "chat"].map((tab) => (
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

                {/* Documents Tab */}
                {activeTab === "documents" && (
                    <div className="bg-white shadow-md rounded-2xl p-6 border border-gray-100">
                        <h2 className="text-xl font-semibold mb-5">
                            Group Documents
                        </h2>

                        <form
                            onSubmit={handleUpload}
                            className="flex gap-3 mb-6"
                        >
                            <input
                                type="file"
                                name="document"
                                accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                                className="border border-gray-300 rounded-lg p-2 w-full"
                            />
                            <button
                                type="submit"
                                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
                            >
                                Upload
                            </button>
                        </form>

                        {documents.length > 0 ? (
                            <ul className="divide-y divide-gray-200">
                                {documents.map((doc) => (
                                    <li
                                        key={doc.id}
                                        className="py-3 flex justify-between items-center hover:bg-gray-50 transition px-3 rounded"
                                    >
                                        <span className="text-gray-800">
                                            {doc.name}
                                        </span>
                                        <a
                                            href={doc.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-indigo-600 hover:underline text-sm"
                                        >
                                            View / Download
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-500 italic">
                                No documents uploaded yet.
                            </p>
                        )}
                    </div>
                )}

                {/* Chat Tab */}
                {activeTab === "chat" && (
                    <div className="bg-gray-50 rounded-xl p-6 shadow flex flex-col h-[500px]">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">
                            Group Messages
                        </h2>
                        <div className="flex-1 overflow-y-auto p-4 bg-white rounded-lg mb-3 flex flex-col-reverse">
                            {messages.length === 0 ? (
                                <p className="text-gray-400 text-center">
                                    No messages yet.
                                </p>
                            ) : (
                                messages
                                    .slice()
                                    .reverse()
                                    .map((msg) => (
                                        <div
                                            key={msg.id}
                                            className={`mb-2 p-2 rounded-lg max-w-[80%] ${
                                                msg.user?.id === group.user_id
                                                    ? "bg-indigo-100 self-end"
                                                    : "bg-gray-100 self-start"
                                            }`}
                                        >
                                            <span className="font-semibold text-gray-900">
                                                {msg.user?.firstname ||
                                                    "Unknown"}
                                            </span>
                                            <span className="text-xs text-gray-500 ml-2">
                                                {msg.created_at &&
                                                    new Date(
                                                        msg.created_at
                                                    ).toLocaleTimeString()}
                                            </span>
                                            <p className="text-gray-700 mt-1">
                                                {msg.message}
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
                                onChange={(e) => setNewMessage(e.target.value)}
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
                )}
            </div>
        </Instructor>
    );
}
