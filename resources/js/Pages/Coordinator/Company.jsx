import React, { useState, useEffect } from "react";
import Coordinator from "@/Layouts/Coordinator";
import axios from "axios";

export default function Company() {
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const res = await axios.get("/company");
                console.log("Response from the backend:", res);
                setCompanies(res.data.partners);
            } catch (error) {
                console.error(
                    "Failed fetching companies",
                    error.response?.data || error.message
                );
            }
        };

        fetchCompanies();

        const interval = setInterval(fetchCompanies, 10000);
        return () => clearInterval(interval);
    }, []);

    return (
        <Coordinator>
            <div className="p-6 bg-white rounded-xl shadow">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">
                    Partner Companies
                </h1>

                {companies.length === 0 ? (
                    <p className="text-gray-500">No partner companies found.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full border border-gray-200 text-left text-sm">
                            <thead className="bg-gray-100 text-gray-700">
                                <tr>
                                    <th className="px-4 py-2 border">#</th>
                                    <th className="px-4 py-2 border">
                                        Company
                                    </th>
                                    <th className="px-4 py-2 border">Phone</th>
                                    <th className="px-4 py-2 border">
                                        Address
                                    </th>
                                    <th className="px-4 py-2 border">
                                        Website
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {companies.map((company, index) => {
                                    const profile = company.user;
                                    return (
                                        <tr
                                            key={company.id}
                                            className="hover:bg-gray-50"
                                        >
                                            <td className="px-4 py-2 border">
                                                {index + 1}
                                            </td>
                                            <td className="px-4 py-2 border font-medium text-gray-800">
                                                {profile?.name ??
                                                    "Unnamed Company"}
                                            </td>
                                            <td className="px-4 py-2 border">
                                                {profile?.contact_number ??
                                                    "N/A"}
                                            </td>
                                            <td className="px-4 py-2 border">
                                                {profile?.company_address ??
                                                    "N/A"}
                                            </td>
                                            <td className="px-4 py-2 border">
                                                {profile?.website ? (
                                                    <a
                                                        href={profile.website}
                                                        className="text-blue-500 underline"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        {profile.website}
                                                    </a>
                                                ) : (
                                                    "N/A"
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </Coordinator>
    );
}
