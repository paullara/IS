import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        firstname: "",
        middlename: "",
        lastname: "",
        email: "",
        password: "",
        password_confirmation: "",
        role: "student",
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("register"), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <form onSubmit={submit}>
                <div className="mt-4">
                    <InputLabel htmlFor="role" value="Registering As" />

                    <select
                        id="role"
                        name="role"
                        value={data.role}
                        onChange={(e) => setData("role", e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        required
                    >
                        <option value="">Select Role</option>
                        <option value="student">Student</option>
                        <option value="employer">Employer</option>
                        <option value="instructor">Instructor</option>
                        <option value="coordinator">Coordinator</option>
                    </select>

                    <InputError message={errors.role} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="firstname" value="First Name" />

                    <TextInput
                        id="firstname"
                        name="firstname"
                        value={data.firstname}
                        className="mt-1 block w-full"
                        autoComplete="firstname"
                        isFocused={true}
                        onChange={(e) => setData("firstname", e.target.value)}
                        required
                    />

                    <InputError message={errors.firstname} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="middlename" value="Middle Name" />

                    <TextInput
                        id="middlename"
                        name="middlename"
                        value={data.middlename}
                        className="mt-1 block w-full"
                        autoComplete="middlename"
                        isFocused={true}
                        onChange={(e) => setData("middlename", e.target.value)}
                    />

                    <InputError message={errors.middlename} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="lastname" value="Last Name" />

                    <TextInput
                        id="lastname"
                        name="lastname"
                        value={data.lastname}
                        className="mt-1 block w-full"
                        autoComplete="lastname"
                        isFocused={true}
                        onChange={(e) => setData("lastname", e.target.value)}
                        required
                    />

                    <InputError message={errors.lastname} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData("email", e.target.value)}
                        required
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="course" value="Course" />

                    <TextInput
                        id="course"
                        type="text"
                        name="course"
                        value={data.course}
                        className="mt-1 block w-full"
                        autoComplete="course"
                        onChange={(e) => setData("course", e.target.value)}
                    />

                    <InputError message={errors.course} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData("password", e.target.value)}
                        required
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel
                        htmlFor="password_confirmation"
                        value="Confirm Password"
                    />

                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) =>
                            setData("password_confirmation", e.target.value)
                        }
                        required
                    />

                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2"
                    />
                </div>

                <div className="mt-4 flex items-center justify-end">
                    <Link
                        href={route("login")}
                        className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Already registered?
                    </Link>

                    <PrimaryButton className="ms-4" disabled={processing}>
                        Register
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
