import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Class({ verification }) {
    return (
        <AuthenticatedLayout>
            <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                    Student verification is now automatic when you are added to
                    a group. If you are in a group, you are already verified.
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
