import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            <div className="max-w-sm w-full bg-white rounded-xl p-6">
                {/* Logo */}
                <div className="flex flex-col items-center mb-4">
                    <img
                        src="/logo/psu.png"
                        alt="Logo"
                        className="h-10 w-10 mb-1"
                    />
                    <h1 className="text-xl font-semibold text-gray-800">
                        InternConnect
                    </h1>
                </div>

                {/* Status message */}
                {status && (
                    <div className="mb-3 text-center text-sm font-medium text-green-600">
                        {status}
                    </div>
                )}

                {/* Login Form */}
                <form onSubmit={submit} className="space-y-3">
                    <div>
                        <InputLabel htmlFor="email" value="Email" />
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-sm"
                            autoComplete="username"
                            isFocused={true}
                            onChange={(e) => setData("email", e.target.value)}
                        />
                        <InputError
                            message={errors.email}
                            className="mt-1 text-xs"
                        />
                    </div>

                    <div>
                        <InputLabel htmlFor="password" value="Password" />
                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-sm"
                            autoComplete="current-password"
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                        />
                        <InputError
                            message={errors.password}
                            className="mt-1 text-xs"
                        />
                    </div>

                    <div className="flex items-center justify-between mt-1 text-sm">
                        <label className="flex items-center space-x-2">
                            <Checkbox
                                name="remember"
                                checked={data.remember}
                                onChange={(e) =>
                                    setData("remember", e.target.checked)
                                }
                            />
                            <span className="text-gray-600">Remember me</span>
                        </label>

                        {canResetPassword && (
                            <Link
                                href={route("password.request")}
                                className="text-indigo-600 hover:text-indigo-800 underline"
                            >
                                Forgot password?
                            </Link>
                        )}
                    </div>

                    <PrimaryButton
                        className="w-full mt-3 py-2 text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg text-sm focus:ring-2 focus:ring-indigo-300 focus:outline-none"
                        disabled={processing}
                    >
                        Log in
                    </PrimaryButton>
                </form>

                <p className="mt-4 text-center text-xs text-gray-500">
                    Don’t have an account?{" "}
                    <Link
                        href={route("register")}
                        className="text-indigo-600 hover:text-indigo-800 font-medium"
                    >
                        Sign up
                    </Link>
                </p>
            </div>
        </GuestLayout>
    );
}
