import React, { useState } from "react";
import CoordinatorLayout from "@/Layouts/Coordinator";
import axios from "axios";

export default function MoaStatus({ companies }) {
    const [data, setData] = useState(companies);
    const [filters, setFilters] = useState({
        moa_status: "",
        search: "",
    });

    // Update MOA status
    const handleStatusChange = (id, value) => {
        axios
            .put(`/coordinator/update-moa-status/${id}`, { moa_status: value })
            .then(() => {
                setData((prev) =>
                    prev.map((company) =>
                        company.id === id
                            ? { ...company, moa_status: value }
                            : company
                    )
                );
            });
    };

    const statuses = [
        "pending",
        "endorsed_for_legal_reviews",
        "endorsed_for_ovpass",
        "endorsed_to_por_secretary",
        "endorsed_to_university_president",
        "signed_by_the_university_president",
    ];

    // Filter companies by search & status
    const filteredData = data.filter((company) => {
        const searchMatch =
            filters.search === "" ||
            company.company_name
                .toLowerCase()
                .includes(filters.search.toLowerCase());

        return (
            searchMatch &&
            (filters.moa_status === "" ||
                company.moa_status === filters.moa_status)
        );
    });

    return (
        <CoordinatorLayout title="MOA Status">
            <div className="max-w-5xl mx-auto bg-white p-6 rounded-2xl shadow mt-4">
                <h1 className="text-2xl font-bold mb-6">
                    Company MOA Status Management
                </h1>

                {/* Filters */}
                <div className="flex flex-wrap gap-4 mb-6">
                    <input
                        type="text"
                        placeholder="Search by company name..."
                        value={filters.search}
                        onChange={(e) =>
                            setFilters({ ...filters, search: e.target.value })
                        }
                        className="border rounded-lg p-2 flex-1 min-w-[200px]"
                    />

                    <select
                        value={filters.moa_status}
                        onChange={(e) =>
                            setFilters({
                                ...filters,
                                moa_status: e.target.value,
                            })
                        }
                        className="border rounded-lg p-2"
                    >
                        <option value="">All Statuses</option>
                        {statuses.map((status) => (
                            <option key={status} value={status}>
                                {status.replaceAll("_", " ")}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Table */}
                <table className="w-full border-collapse border">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border p-2 text-left">
                                Company Name
                            </th>
                            <th className="border p-2 text-left">Address</th>
                            <th className="border p-2 text-left">MOA Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.length > 0 ? (
                            filteredData.map((company) => (
                                <tr key={company.id} className="border">
                                    <td className="border p-2">
                                        {company.company_name}
                                    </td>
                                    <td className="border p-2">
                                        {company.company_address}
                                    </td>
                                    <td className="border p-2">
                                        <select
                                            value={company.moa_status}
                                            onChange={(e) =>
                                                handleStatusChange(
                                                    company.id,
                                                    e.target.value
                                                )
                                            }
                                            className="border rounded p-1"
                                        >
                                            {statuses.map((status) => (
                                                <option
                                                    key={status}
                                                    value={status}
                                                >
                                                    {status
                                                        .replaceAll("_", " ")
                                                        .toUpperCase()}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="3"
                                    className="text-center py-4 text-gray-500"
                                >
                                    No companies found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </CoordinatorLayout>
    );
}
