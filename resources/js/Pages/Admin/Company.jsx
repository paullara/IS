import AdminLayout from "@/Layouts/AdminLayout";

export default function Company({ companies }) {
    return (
        <AdminLayout>
            <div className="h-custom bg-white p-6 overflow-auto">
                <h1 className="text-2xl font-bold mb-4">Companies</h1>
                <table className="min-w-full bg-white border border-gray-200 shadow rounded-md">
                    <thead>
                        <tr className="bg-gray-100 text-left text-sm text-gray-600 uppercase tracking-wider">
                            <th className="p-4">Logo</th>
                            <th className="p-4">Company Name</th>
                            <th className="p-4">Contact Person</th>
                            <th className="p-4">Email</th>
                            <th className="p-4">Address</th>
                            <th className="p-4">Website</th>
                        </tr>
                    </thead>
                    <tbody>
                        {companies.length > 0 ? (
                            companies.map((company) => (
                                <tr
                                    key={company.id}
                                    className="border-t border-gray-100 hover:bg-gray-50"
                                >
                                    <td className="p-4">
                                        <img
                                            src={`/${company.profile_picture}`}
                                            alt="Profile"
                                            className="h-12 w-12 rounded-full object-cover"
                                        />
                                    </td>
                                    <td className="p-4 font-medium">
                                        {company.company_name}
                                    </td>
                                    <td className="p-4">
                                        {company.contact_name}
                                    </td>
                                    <td className="p-4">
                                        {company.company_email}
                                    </td>
                                    <td className="p-4">
                                        {company.company_address}
                                    </td>
                                    <td className="p-4">
                                        <a
                                            href={company.website}
                                            className="text-blue-500 hover:underline"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Visit
                                        </a>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="p-4 text-center">
                                    No companies found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    );
}
