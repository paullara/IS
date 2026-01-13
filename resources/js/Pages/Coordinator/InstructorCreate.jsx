import CoordinatorLayout from "@/Layouts/Coordinator";
import { useForm, Link } from "@inertiajs/react";

export default function InstructorCreate() {
    const { data, setData, post, processing, errors } = useForm({
        firstname: "",
        middlename: "",
        lastname: "",
        email: "",
        password: "",
        password_confirmation: "",
        year_level: "",
        section: "",
        course: "",
        picture: null,
    });

    function handleSubmit(e) {
        e.preventDefault();
        post(route("coordinator.instructors.store"));
    }

    return (
        <CoordinatorLayout title="Add Instructor">
            <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-200 p-8 space-y-6 mt-4">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-800">
                        Add New Instructor
                    </h1>
                    <p className="text-gray-500 text-sm">
                        Fill in all required details to create an instructor.
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    encType="multipart/form-data"
                    className="space-y-5"
                >
                    {/* Name */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                First Name
                            </label>
                            <input
                                type="text"
                                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
                                value={data.firstname}
                                onChange={(e) =>
                                    setData("firstname", e.target.value)
                                }
                            />
                            {errors.firstname && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.firstname}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Middle Name (Optional)
                            </label>
                            <input
                                type="text"
                                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
                                value={data.middlename}
                                onChange={(e) =>
                                    setData("middlename", e.target.value)
                                }
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Last Name
                            </label>
                            <input
                                type="text"
                                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
                                value={data.lastname}
                                onChange={(e) =>
                                    setData("lastname", e.target.value)
                                }
                            />
                            {errors.lastname && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.lastname}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                        />
                        {errors.email && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.email}
                            </p>
                        )}
                    </div>

                    {/* Year + Section + Course */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Year Level
                            </label>
                            <input
                                type="number"
                                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
                                value={data.year_level}
                                onChange={(e) =>
                                    setData("year_level", e.target.value)
                                }
                            />
                            {errors.year_level && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.year_level}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Section
                            </label>
                            <input
                                type="text"
                                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
                                value={data.section}
                                onChange={(e) =>
                                    setData("section", e.target.value)
                                }
                            />
                            {errors.section && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.section}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Course
                            </label>
                            <input
                                type="text"
                                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
                                value={data.course}
                                onChange={(e) =>
                                    setData("course", e.target.value)
                                }
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                type="password"
                                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
                                value={data.password}
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                            />
                            {errors.password && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.password}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
                                value={data.password_confirmation}
                                onChange={(e) =>
                                    setData(
                                        "password_confirmation",
                                        e.target.value
                                    )
                                }
                            />
                        </div>
                    </div>

                    {/* Picture */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Profile Picture (optional)
                        </label>
                        <input
                            type="file"
                            className="mt-1 w-full text-sm"
                            onChange={(e) =>
                                setData("picture", e.target.files[0])
                            }
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex items-center justify-end gap-3 pt-2">
                        <Link
                            href={route("instructor.list")}
                            className="text-gray-600 text-sm hover:underline"
                        >
                            Cancel
                        </Link>

                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-5 py-2 rounded-lg"
                        >
                            Create Instructor
                        </button>
                    </div>
                </form>
            </div>
        </CoordinatorLayout>
    );
}
