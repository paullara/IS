import React, { useEffect, useState } from "react";
import Coordinator from "@/Layouts/Coordinator";
import axios from "axios";

export default function Notification() {
    const [notifications, setNotifications] = useState([]);
    const [activeTab, setActiveTab] = useState("general");
    const [companies, setCompanies] = useState([]);
    const [selectedCompany, setSelectedCompany] = useState(null);

    // Notification types
    const generalTypes = [
        "App\\Notifications\\NewIncidentReport",
        "App\\Notifications\\VisitationStatusNotification",
        "App\\Notifications\\VerificationStatusNotification",
        "App\\Notifications\\NewStudentVerificationRequest",
    ];

    const companyTypes = [
        "App\\Notifications\\NewApplicantNotification",
        "App\\Notifications\\ApplicationStatusNotification",
        "App\\Notifications\\NewRequirementsSubmitted",
        "App\\Notifications\\RequirementStatusChanged",
        "App\\Notifications\\VisitationEmployer",
        "App\\Notifications\\NewIncidentReport",
    ];

    // Fetch notifications
    const fetchNotifications = async () => {
        try {
            const res = await axios.get("/notifications/json");
            setNotifications(res.data);
        } catch (error) {
            console.error("Error fetching notifications:", error);
        }
    };

    // Fetch companies
    const fetchCompanies = async () => {
        try {
            const res = await axios.get("/visitation/companies");
            setCompanies(res.data.companies || []);
        } catch (error) {
            console.error("Error fetching companies:", error);
        }
    };

    useEffect(() => {
        fetchNotifications();
        fetchCompanies();
        const interval = setInterval(fetchNotifications, 5000);
        return () => clearInterval(interval);
    }, []);

    // Mark as read
    const markAsRead = async (id) => {
        try {
            await axios.post(`/notifications/${id}/read`);
            fetchNotifications();
        } catch (error) {
            console.error(error);
        }
    };

    const markAllAsRead = async () => {
        try {
            await axios.post(`/notifications/read-all`);
            fetchNotifications();
        } catch (error) {
            console.error(error);
        }
    };

    // Filter notifications
    const filteredGeneralNotifications = notifications
        .filter((n) => generalTypes.includes(n.type))
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    const getUnreadCountForCompany = (companyId) => {
        return notifications.filter(
            (n) =>
                companyTypes.includes(n.type) &&
                Number(n.data.company_id || 0) === Number(companyId) &&
                !n.read_at
        ).length;
    };

    const filteredCompanyNotifications = selectedCompany
        ? notifications
              .filter(
                  (n) =>
                      companyTypes.includes(n.type) &&
                      Number(n.data.company_id || 0) ===
                          Number(selectedCompany.id)
              )
              .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        : [];

    const NotificationCard = ({ n }) => (
        <div
            key={n.id}
            className={`p-3 mb-3 border rounded-lg flex justify-between items-start transition ${
                n.read_at
                    ? "bg-gray-100 text-gray-500"
                    : "bg-blue-50 text-gray-800"
            }`}
        >
            <div>
                <p
                    className={`font-semibold ${
                        n.read_at ? "text-gray-500" : "text-gray-800"
                    }`}
                >
                    {n.data.message || n.data.internship || "Notification"}
                </p>
                {n.data.severity && (
                    <p className="text-sm">
                        Severity:{" "}
                        <span
                            className={`${
                                n.data.severity === "Critical"
                                    ? "text-red-700 font-bold"
                                    : n.data.severity === "High"
                                    ? "text-red-500 font-semibold"
                                    : "text-gray-700"
                            }`}
                        >
                            {n.data.severity}
                        </span>
                    </p>
                )}
                {n.data.description && (
                    <p className="text-sm text-gray-600">
                        {n.data.description}
                    </p>
                )}
                <p className="text-xs text-gray-400 mt-1">
                    {n.created_at
                        ? new Date(n.created_at).toLocaleString()
                        : ""}
                </p>
            </div>
            {!n.read_at ? (
                <button
                    onClick={() => markAsRead(n.id)}
                    className="text-xs text-blue-500 hover:underline"
                >
                    Mark as read
                </button>
            ) : (
                <span className="text-xs italic text-gray-400">Read</span>
            )}
        </div>
    );

    const generalUnreadCount = filteredGeneralNotifications.filter(
        (n) => !n.read_at
    ).length;

    return (
        <Coordinator>
            <div className="flex w-full">
                <div className="w-full bg-white shadow-lg border-l h-screen overflow-y-auto p-4">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold">Notifications 🔔</h2>
                        {notifications.length > 0 && (
                            <button
                                onClick={markAllAsRead}
                                className="text-sm text-blue-600 hover:underline"
                            >
                                Mark all as read
                            </button>
                        )}
                    </div>

                    {/* Tabs */}
                    <div className="flex mb-4">
                        <button
                            onClick={() => setActiveTab("general")}
                            className={`px-4 py-2 mr-2 rounded ${
                                activeTab === "general"
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-200 text-gray-700"
                            }`}
                        >
                            General{" "}
                            {generalUnreadCount > 0 && (
                                <span className="ml-1 bg-red-500 text-white px-2 py-0.5 rounded-full text-xs">
                                    {generalUnreadCount}
                                </span>
                            )}
                        </button>
                        <button
                            onClick={() => setActiveTab("company")}
                            className={`px-4 py-2 rounded ${
                                activeTab === "company"
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-200 text-gray-700"
                            }`}
                        >
                            Company
                        </button>
                    </div>

                    {/* General Notifications */}
                    {activeTab === "general" && (
                        <>
                            {filteredGeneralNotifications.length > 0 ? (
                                filteredGeneralNotifications.map((n) => (
                                    <NotificationCard key={n.id} n={n} />
                                ))
                            ) : (
                                <p className="text-gray-500 text-sm">
                                    No notifications in this category
                                </p>
                            )}
                        </>
                    )}

                    {/* Company Notifications */}
                    {activeTab === "company" && (
                        <div className="mt-6">
                            <h3 className="text-lg font-semibold mb-3">
                                Partner Companies
                            </h3>
                            {companies.length > 0 ? (
                                companies.map((company) => {
                                    const unreadCount =
                                        getUnreadCountForCompany(company.id);
                                    const isSelected =
                                        selectedCompany?.id === company.id;
                                    return (
                                        <div key={company.id} className="mb-2">
                                            <div
                                                className={`p-3 border rounded-lg bg-gray-50 cursor-pointer flex justify-between items-center ${
                                                    isSelected
                                                        ? "bg-blue-100 border-blue-300"
                                                        : ""
                                                }`}
                                                onClick={() =>
                                                    setSelectedCompany(
                                                        isSelected
                                                            ? null
                                                            : company
                                                    )
                                                }
                                            >
                                                <div>
                                                    <p className="font-semibold">
                                                        {company.company_name}
                                                    </p>
                                                </div>
                                                {unreadCount > 0 && (
                                                    <span className="bg-red-500 text-white px-2 py-0.5 rounded-full text-xs">
                                                        {unreadCount}
                                                    </span>
                                                )}
                                            </div>

                                            {/* Show company notifications if selected */}
                                            {isSelected &&
                                                filteredCompanyNotifications.length >
                                                    0 && (
                                                    <div className="mt-3 ml-4">
                                                        {filteredCompanyNotifications.map(
                                                            (n) => (
                                                                <NotificationCard
                                                                    key={n.id}
                                                                    n={n}
                                                                />
                                                            )
                                                        )}
                                                    </div>
                                                )}
                                            {isSelected &&
                                                filteredCompanyNotifications.length ===
                                                    0 && (
                                                    <p className="text-gray-500 text-sm ml-4 mt-2">
                                                        No notifications from
                                                        this company
                                                    </p>
                                                )}
                                        </div>
                                    );
                                })
                            ) : (
                                <p className="text-gray-500 text-sm">
                                    No companies found
                                </p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </Coordinator>
    );
}
