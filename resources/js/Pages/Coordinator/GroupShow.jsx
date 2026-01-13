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
    const [previewUrl, setPreviewUrl] = useState(null);

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
                { headers: { "Content-Type": "multipart/form-data" } }
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

    // Search instructors
    useEffect(() => {
        if (!searchQuery.trim()) {
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
            const addedInstructor = searchResults.find(
                (i) => i.id === instructorId
            );
            setGroup((prev) => ({
                ...prev,
                instructors: [...prev.instructors, addedInstructor],
            }));
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

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        setLoading(true);
        try {
            const res = await axios.post(
                `/instructor-groups/${group.id}/messages`,
                { message: newMessage }
            );
            setMessages((prev) => [...prev, res.data]);
            setNewMessage("");
        } catch (err) {
            console.error("Send message failed:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Coordinator title={`Instructor Group: ${group.name}`}>
            <div className="min-h-screen bg-gray-50 py-10 px-6">
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

                {/* Members Tab */}
                {activeTab === "members" && (
                    <div className="bg-white shadow rounded-2xl p-6 border border-gray-100">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search instructor to add..."
                            className="w-full mb-3 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        />

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
                                        className="p-3 flex justify-between items-center hover:bg-gray-50 transition"
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

                        <h2 className="text-xl font-semibold mb-5 mt-6">
                            Assigned Instructors
                        </h2>
                        {group.instructors.length > 0 ? (
                            <ul className="divide-y divide-gray-200">
                                {group.instructors.map((inst) => (
                                    <li
                                        key={inst.id}
                                        className="py-3 flex items-center justify-between hover:bg-gray-50 px-3 rounded transition"
                                    >
                                        <span className="text-gray-800 font-medium">
                                            {inst.firstname} {inst.lastname}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-500 italic">
                                No instructors assigned yet.
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
                        <div className="flex-1 overflow-y-auto p-4 border rounded-lg bg-white mb-3 flex flex-col-reverse">
                            {messages.length === 0 ? (
                                <p className="text-gray-400 text-center">
                                    No messages yet.
                                </p>
                            ) : (
                                messages
                                    .slice()
                                    .reverse()
                                    .map((msg) => (
                                        <div key={msg.id} className="mb-3">
                                            <span className="font-semibold text-gray-900">
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

                {/* Documents Tab */}
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
                                        className="py-3 flex justify-between items-center hover:bg-gray-50 transition px-3 rounded"
                                    >
                                        <span className="text-gray-800">
                                            {doc.name}
                                        </span>

                                        <div className="flex items-center gap-3">
                                            <button
                                                onClick={() =>
                                                    setPreviewUrl(doc.url)
                                                }
                                                className="text-indigo-600 hover:underline text-sm"
                                            >
                                                Preview
                                            </button>

                                            <a
                                                href={doc.url}
                                                download
                                                className="text-gray-500 hover:underline text-xs"
                                            >
                                                Download
                                            </a>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-500 italic">
                                No documents uploaded yet.
                            </p>
                        )}

                        {/* Built-In Viewer */}
                        {previewUrl && (
                            <div className="mt-6">
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="text-lg font-semibold text-gray-800">
                                        Document Preview
                                    </h3>
                                    <button
                                        onClick={() => setPreviewUrl(null)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        Close
                                    </button>
                                </div>

                                <iframe
                                    src={previewUrl}
                                    className="w-full h-[600px] border rounded-lg"
                                />
                            </div>
                        )}
                    </div>
                )}
            </div>
        </Coordinator>
    );
}
