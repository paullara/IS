import Instructor from "@/Layouts/Instructor";

export default function Dashboard() {
    return (
        <Instructor title="Dashboard">
            <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
                <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
                <p className="text-gray-600">
                    Welcome to the Instructor Dashboard. Here you can manage
                    your courses and internships.
                </p>
            </div>
        </Instructor>
    );
}
