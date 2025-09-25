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
            <h1 className="text-2xl font-bold mb-6">Partner Companies</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {companies.map((company) => {
                    const profile = company.user;
                    return (
                        <div
                            key={company.id}
                            className="border p-4 rounded-lg shadow bg-white"
                        >
                            <h2 className="text-xl font-semibold mb-2">
                                {profile?.name ?? "Unnamed Company"}
                            </h2>

                            <p>
                                <strong>Phone:</strong>{" "}
                                {profile?.contact_number ?? "N/A"}
                            </p>

                            <p>
                                <strong>Address:</strong>{" "}
                                {profile?.company_address ?? "N/A"}
                            </p>
                            <p>
                                <strong>Website:</strong>{" "}
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
                            </p>
                        </div>
                    );
                })}
            </div>
        </Coordinator>
    );
}
