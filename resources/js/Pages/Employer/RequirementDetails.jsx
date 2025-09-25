import React from "react";
import { Head, Link } from "@inertiajs/react";
import EmployerLayout from "@/Layouts/EmployerLayout";
import { Inertia } from "@inertiajs/inertia";

export default function RequirementDetails({ requirement }) {
    const handleAction = (action) => {
        Inertia.post(`/employer/requirement/${requirement.id}/${action}`);
    };

    return (
        <EmployerLayout>
            <Head title="Requirement Details" />

            <Link
                href={route("employer.requirements.index")}
                className="text-blue-500 underline mb-6 inline-block"
            >
                Go Back
            </Link>

            <div className="max-w-4xl mx-auto p-8">
                <h1 className="text-3xl font-bold mb-10 text-center">
                    Requirement Details
                </h1>
                <section className="bg-white border rounded-2xl p-6 shadow-sm mb-8 space-y-4">
                    <InfoRow label="Student" value={requirement.user.name} />
                    <InfoRow label="Status" value={requirement.status} />
                </section>

                {/* Documents section */}
                <section className="space-y-6">
                    {requirement.resume && (
                        <DocumentCard
                            title="Resume"
                            link={`/${requirement.resume}`}
                        />
                    )}
                    {requirement.endorsement_letter && (
                        <DocumentCard
                            title="Endorsement Letter"
                            link={`/${requirement.endorsement_letter}`}
                        />
                    )}
                    {requirement.good_moral && (
                        <DocumentCard
                            title="Good Moral"
                            link={`/${requirement.good_moral}`}
                        />
                    )}
                    {requirement.tor && (
                        <DocumentCard
                            title="Transcript of Records (TOR)"
                            link={`/${requirement.tor}`}
                        />
                    )}
                    {requirement.moa && (
                        <DocumentCard
                            title="Memorandum of Agreement (MOA)"
                            link={`/${requirement.moa}`}
                        />
                    )}
                    {requirement.clearance && (
                        <DocumentCard
                            title="Clearance"
                            link={`/${requirement.clearance}`}
                        />
                    )}
                </section>

                {requirement.status === "pending" && (
                    <div className="flex justify-center gap-6 mt-10">
                        <button
                            onClick={() => handleAction("approve")}
                            className="px-8 py-3 border border-black text-black rounded-full hover:bg-black hover:text-white transition"
                        >
                            Approve
                        </button>
                        <button
                            onClick={() => handleAction("reject")}
                            className="px-8 py-3 border border-black text-black rounded-full hover:bg-black hover:text-white transition"
                        >
                            Reject
                        </button>
                    </div>
                )}
            </div>
        </EmployerLayout>
    );
}

const InfoRow = ({ label, value }) => (
    <div className="flex justify-between text-sm">
        <span className="text-gray-500">{label}</span>
        <span className="font-medium">{value}</span>
    </div>
);

const DocumentCard = ({ title, link }) => (
    <div className="bg-white border rounded-xl p-4 flex justify-between items-center shadow-sm">
        <div className="text-lg font-medium">{title}</div>
        <a
            href={`${window.location.origin}${link}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 border border-black rounded-full text-sm hover:bg-black hover:text-white transition"
        >
            View
        </a>
    </div>
);
