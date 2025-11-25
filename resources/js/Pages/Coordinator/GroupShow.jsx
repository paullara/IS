import React, { useState, useEffect } from "react";
import axios from "axios";
import Coordinator from "@/Layouts/Coordinator";

export default function GroupShow({ group: initialGroup, users = [] }) {
    const [group, setGroup] = useState(initialGroup);
    const [activeTab, setActiveTab] = useState("members");
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(false);

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

        fetchDocuments(); // initial load
        const interval = setInterval(fetchDocuments, 5000); // repeat every 5s
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

            // Instantly show new doc in UI
            setDocuments((prev) => [res.data, ...prev]);
            fileInput.value = "";
        } catch (err) {
            console.error("Upload failed:", err);
        }
    };

    // ✅ Poll for updates (every 5 seconds)
    useEffect(() => {
        const interval = setInterval(() => {
            axios
                .get(`/coordinator/groups/${group.id}/fetch`)
                .then((res) => setGroup(res.data.group))
                .catch((err) => console.error("Polling error:", err));
        }, 5000);
        return () => clearInterval(interval);
    }, [group.id]);

    // ✅ Search instructors
    useEffect(() => {
        if (searchQuery.trim() === "") {
            setSearchResults([]);
            return;
        }

        const timeout = setTimeout(() => {
            setLoading(true);
            axios
                .get(`/coordinator/search-instructors`, {
                    params: { q: searchQuery },
                })
                .then((res) => setSearchResults(res.data))
                .catch((err) => console.error("Search error:", err))
                .finally(() => setLoading(false));
        }, 300);

        return () => clearTimeout(timeout);
    }, [searchQuery]);

    // ✅ Add instructor to the group
    const handleAddInstructor = async (instructorId) => {
        try {
            await axios.post(
                `/coordinator/groups/${group.id}/assign-instructors`,
                {
                    instructor_ids: [
                        ...group.instructors.map((i) => i.id),
                        instructorId,
                    ],
                }
            );

            // Update UI instantly
            const addedInstructor = searchResults.find(
                (i) => i.id === instructorId
            );
            setGroup((prev) => ({
                ...prev,
                instructors: [...prev.instructors, addedInstructor],
            }));

            // Clear search
            setSearchQuery("");
            setSearchResults([]);
        } catch (error) {
            console.error("Add instructor failed:", error);
        }
    };

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
        <Coordinator title={`Instructor Group: ${group.name}`}>
            <div className="min-h-screen bg-gray-50 py-10 px-6">
                {/* Tabs */}
                <div className="flex space-x-4 mb-8 border-b pb-2">
                    {["members", "documents", "chat"].map((tab) => (
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

                {activeTab === "members" && (
                    <div className="bg-white shadow-sm rounded-2xl p-6 border border-gray-100">
                        {/* 🔍 Search bar */}
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search instructor to add..."
                            className="w-full mb-3 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        />

                        {/* Search results */}
                        {loading && (
                            <p className="text-sm text-gray-500 italic">
                                Searching...
                            </p>
                        )}

                        {searchResults.length > 0 && (
                            <ul className="border rounded-lg divide-y divide-gray-100 mt-2">
                                {searchResults.map((user) => (
                                    <li
                                        key={user.id}
                                        className="p-3 flex justify-between items-center hover:bg-gray-50"
                                    >
                                        <span>{user.name}</span>
                                        <button
                                            onClick={() =>
                                                handleAddInstructor(user.id)
                                            }
                                            className="text-sm bg-indigo-600 text-white px-3 py-1 rounded-md hover:bg-indigo-700 transition"
                                        >
                                            Add
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}

                        <h2 className="text-xl font-semibold mb-5">
                            Assigned Instructors
                        </h2>

                        {/* List of assigned instructors */}
                        {group.instructors.length > 0 ? (
                            <ul className="divide-y divide-gray-200 mb-6">
                                {group.instructors.map((inst) => (
                                    <li
                                        key={inst.id}
                                        className="py-3 flex items-center justify-between"
                                    >
                                        <span className="text-gray-800 font-medium">
                                            {inst.firstname} {inst.lastname}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-500 italic mb-6">
                                No instructors assigned yet.
                            </p>
                        )}
                    </div>
                )}
                {activeTab === "chat" && (
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
                                            {msg.user?.firstname || "Unknown"}
                                        </span>
                                        <span className="text-xs text-gray-500 ml-2">
                                            {msg.created_at &&
                                                new Date(
                                                    msg.created_at
                                                ).toLocaleString()}
                                        </span>
                                        <p className="ml-2 text-gray-700">
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
                {activeTab === "documents" && (
                    <div className="bg-white shadow-sm rounded-2xl p-6 border border-gray-100">
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
                                        className="py-3 flex justify-between items-center"
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
            </div>
        </Coordinator>
    );
}
