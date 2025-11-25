import React, { useEffect, useState } from "react";
import Instructor from "@/Layouts/Instructor";
import { Inertia } from "@inertiajs/inertia";
import { Link } from "@inertiajs/react";

export default function Groups({
    groups: initialGroups = [],
    users = [],
    auth,
}) {
    const [groups, setGroups] = useState(initialGroups);
    const [editingGroup, setEditingGroup] = useState(null);
    const [editName, setEditName] = useState("");
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [studentIds, setStudentIds] = useState([]);
    const [students, setStudents] = useState(
        users.filter((u) => u.role === "student")
    );
    const [createError, setCreateError] = useState("");

    // Refresh groups after actions
    const fetchGroups = () => {
        Inertia.get(
            "/groups",
            {},
            {
                preserveState: true,
                onSuccess: (page) => setGroups(page.props.groups),
            }
        );
    };

    // Edit group
    const startEdit = (group) => {
        setEditingGroup(group);
        setEditName(group.name);
    };
    const handleEditGroup = (e) => {
        e.preventDefault();
        Inertia.put(
            `/groups/${editingGroup.id}`,
            { name: editName },
            {
                onSuccess: () => {
                    setEditingGroup(null);
                    setEditName("");
                    fetchGroups();
                },
            }
        );
    };

    // Delete group
    const handleDeleteGroup = (groupId) => {
        if (confirm("Are you sure you want to delete this group?")) {
            Inertia.delete(`/groups/${groupId}`, {
                onSuccess: fetchGroups,
            });
        }
    };

    // Assign Students Modal
    const [assigningGroup, setAssigningGroup] = useState(null);
    const [assignStudentIds, setAssignStudentIds] = useState([]);

    const openAssignModal = (group) => {
        setAssigningGroup(group);
        setAssignStudentIds(group.students.map((s) => s.id));
    };
    const closeAssignModal = () => {
        setAssigningGroup(null);
        setAssignStudentIds([]);
    };
    const handleAssignStudents = (e) => {
        e.preventDefault();
        if (!assigningGroup) return;
        Inertia.post(
            `/groups/${assigningGroup.id}/assign-students`,
            { student_ids: assignStudentIds },
            {
                onSuccess: () => {
                    closeAssignModal();
                    fetchGroups();
                },
            }
        );
    };

    // When a group is clicked, open assign modal for that group
    const handleGroupClick = (group) => {
        setAssigningGroup(group);
        setAssignStudentIds(group.students.map((s) => s.id));
    };

    return (
        <Instructor title="Groups">
            <div className="max-w-5xl mx-auto p-6">
                {/* Header Section */}
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">
                        Groups Management
                    </h1>

                    <Link
                        href={route("instructor.groups.create")}
                        className="bg-indigo-600 text-white px-5 py-2 rounded-lg shadow hover:bg-indigo-700 transition"
                    >
                        + Create Group
                    </Link>
                </div>

                {/* Groups List */}
                <div className="bg-white shadow rounded-xl p-6">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">
                        Your Groups
                    </h2>

                    {groups.length === 0 ? (
                        <p className="text-gray-500">No groups created yet.</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {groups.map((group) => (
                                <Link
                                    key={group.id}
                                    href={route(
                                        "interns.groups.show",
                                        group.id
                                    )}
                                    className="border rounded-xl p-5 shadow-sm hover:shadow-md transition bg-white"
                                >
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-800">
                                                {group.name}
                                            </h3>
                                            <p className="text-sm text-gray-500 mt-1">
                                                {group.students?.length || 0}{" "}
                                                students
                                            </p>
                                        </div>

                                        <div className="text-gray-400">➜</div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </Instructor>
    );
}
