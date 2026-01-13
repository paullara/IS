import { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import axios from "axios";

export default function CreateIncidentReport() {
    const [data, setData] = useState({
        severity: "",
        description: "",
    });

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const submit = async (e) => {
        e.preventDefault();
        setErrors({});

        try {
            setLoading(true);

            await axios.post("/incident-reports", {
                severity: data.severity,
                description: data.description,
            });

            alert("Incident report submitted successfully!");
            setData({
                severity: "",
                description: "",
            });
        } catch (error) {
            if (error.response?.status === 422) {
                setErrors(error.response.data.errors);
            } else if (error.response?.status === 403) {
                alert("You do not have an accepted internship.");
            } else {
                alert("Failed to submit incident report.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthenticatedLayout>
            <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow">
                <h2 className="text-xl font-semibold mb-4">
                    Submit Incident Report
                </h2>

                <form onSubmit={submit} className="space-y-4">
                    {/* Severity */}
                    <div>
                        <InputLabel value="Severity" />
                        <select
                            className="w-full border rounded-lg px-3 py-2"
                            value={data.severity}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    severity: e.target.value,
                                })
                            }
                            required
                        >
                            <option value="">Select severity</option>
                            <option value="Minor">Minor</option>
                            <option value="Moderate">Moderate</option>
                            <option value="Major">Major</option>
                        </select>
                        <InputError message={errors.severity} />
                    </div>

                    {/* Description */}
                    <div>
                        <InputLabel value="Description" />
                        <textarea
                            className="w-full border rounded-lg px-3 py-2"
                            rows="4"
                            value={data.description}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    description: e.target.value,
                                })
                            }
                            required
                        />
                        <InputError message={errors.description} />
                    </div>

                    <PrimaryButton disabled={loading}>
                        {loading ? "Submitting..." : "Submit Report"}
                    </PrimaryButton>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
