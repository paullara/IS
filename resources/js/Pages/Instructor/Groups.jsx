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
            <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
                <h1 className="text-2xl font-bold mb-4">Groups Management</h1>
                <Link href={route("instructor.groups.create")}>
                    Create new Group
                </Link>
                {/* Groups List */}
                <h2 className="text-xl font-semibold mb-2">Groups List</h2>
                <div>
                    {groups.map((group) => (
                        <Link
                            key={group.id}
                            href={route("groups.show", group.id)}
                            className="block border rounded p-3 mb-2 hover:bg-gray-50"
                        >
                            <div className="font-bold">{group.name}</div>
                        </Link>
                    ))}
                </div>

                {/* Assign Students Modal */}
                {assigningGroup && (
                    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
                            <h3 className="text-lg font-bold mb-4">
                                Assign Students to {assigningGroup.name}
                            </h3>
                            <form onSubmit={handleAssignStudents}>
                                <select
                                    className="border p-2 w-full mb-4"
                                    multiple
                                    value={assignStudentIds}
                                    onChange={(e) =>
                                        setAssignStudentIds(
                                            Array.from(
                                                e.target.selectedOptions,
                                                (o) => o.value
                                            )
                                        )
                                    }
                                >
                                    {students.map((s) => (
                                        <option key={s.id} value={s.id}>
                                            {s.name}
                                        </option>
                                    ))}
                                </select>
                                <div className="flex justify-end gap-2">
                                    <button
                                        type="button"
                                        className="bg-gray-400 text-white px-4 py-2 rounded"
                                        onClick={closeAssignModal}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-green-600 text-white px-4 py-2 rounded"
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
