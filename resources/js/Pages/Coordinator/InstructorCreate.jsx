import CoordinatorLayout from "@/Layouts/Coordinator";
import { useForm, Link } from "@inertiajs/react";

export default function InstructorCreate() {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        course: "",
        picture: null,
    });

    function handleSubmit(e) {
        e.preventDefault();
        post(route("coordinator.instructors.store"));
    }

    return (
        <CoordinatorLayout title="Add Instructor">
            <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
                <h1 className="text-2xl font-bold mb-4">Add Instructor</h1>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="mb-4">
                        <label className="block mb-1">Name</label>
                        <input
                            type="text"
                            className="w-full border rounded px-3 py-2"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                        />
                        {errors.name && (
                            <div className="text-red-500 text-sm">
                                {errors.name}
                            </div>
                        )}
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">Email</label>
                        <input
                            type="email"
                            className="w-full border rounded px-3 py-2"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                        />
                        {errors.email && (
                            <div className="text-red-500 text-sm">
                                {errors.email}
                            </div>
                        )}
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">Password</label>
                        <input
                            type="password"
                            className="w-full border rounded px-3 py-2"
                            value={data.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                        />
                        {errors.password && (
                            <div className="text-red-500 text-sm">
                                {errors.password}
                            </div>
                        )}
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">Confirm Password</label>
                        <input
                            type="password"
                            className="w-full border rounded px-3 py-2"
                            value={data.password_confirmation}
                            onChange={(e) =>
                                setData("password_confirmation", e.target.value)
                            }
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">Course</label>
                        <input
                            type="text"
                            className="w-full border rounded px-3 py-2"
                            value={data.course}
                            onChange={(e) => setData("course", e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">
                            Profile Picture (optional)
                        </label>
                        <input
                            type="file"
                            className="w-full"
                            onChange={(e) =>
                                setData("picture", e.target.files[0])
                            }
                        />
                        {errors.picture && (
                            <div className="text-red-500 text-sm">
                                {errors.picture}
                            </div>
                        )}
                    </div>
                    <div className="flex justify-between items-center">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                            disabled={processing}
                        >
                            Create
                        </button>
                        <Link
                            href={route("coordinator.instructors.index")}
                            className="text-gray-600 hover:underline"
                        >
                            Cancel
                        </Link>
                    </div>
                </form>
            </div>
        </CoordinatorLayout>
    );
}
