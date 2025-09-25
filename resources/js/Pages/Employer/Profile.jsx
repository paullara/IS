// resources/js/Pages/Employer/Profile/Show.jsx
import React from "react";
import { Link } from "@inertiajs/react";
import EmployerLayout from "@/Layouts/EmployerLayout";

export default function CompanyProfile({ profile }) {
    return (
        <EmployerLayout>
            {" "}
            <div>
                <h1>Company Profile</h1>
                {profile ? (
                    <div className="profile-card">
                        <p>
                            <strong>Company Name:</strong>{" "}
                            {profile.company_name}
                        </p>
                        <p>
                            <strong>Contact Name:</strong>{" "}
                            {profile.contact_name}
                        </p>
                        <p>
                            <strong>Contact Number:</strong>{" "}
                            {profile.contact_number}
                        </p>
                        <p>
                            <strong>Contac Email:</strong>{" "}
                            {profile.company_email}
                        </p>
                        <p>
                            <strong>Company Address:</strong>{" "}
                            {profile.company_address}
                        </p>
                        <p>
                            <strong>Description:</strong> {profile.description}
                        </p>
                        <p>
                            <strong>Website:</strong>{" "}
                            <a href={profile.website}>{profile.website}</a>
                        </p>

                        {profile.profile_picture && (
                            <div>
                                <strong>Profile Picture:</strong>
                                <img
                                    src={`/profiles/${profile.profile_picture}`}
                                    alt="Profile"
                                    className="w-32 h-32 object-cover rounded-full mt-2"
                                />
                            </div>
                        )}
                        <Link
                            href={route("employer.profile.edit")}
                            className="btn btn-primary"
                        >
                            Edit Profile
                        </Link>
                    </div>
                ) : (
                    <p>
                        No profile found. Please{" "}
                        <Link href={route("employer.profile.edit")}>
                            create your profile
                        </Link>
                        .
                    </p>
                )}
            </div>
        </EmployerLayout>
    );
}
