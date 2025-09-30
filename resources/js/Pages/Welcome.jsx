import { useEffect, useRef } from "react";
import { Head, Link } from "@inertiajs/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function Welcome({ auth }) {
    const sectionsRef = useRef([]);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        sectionsRef.current.forEach((section) => {
            gsap.from(section, {
                opacity: 0,
                y: 50,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: section,
                    start: "top 80%",
                    toggleActions: "play none none none",
                },
            });
        });
    }, []);

    const getDashboardRoute = () => {
        switch (auth.user.role) {
            case "admin":
                return "admin.dashboard";
            case "employer":
                return "employer.dashboard";
            case "student":
                return "dashboard";
            case "coordinator":
                return "coordinator.dashboard";
            default:
                return "dashboard";
        }
    };

    return (
        <>
            <Head title="Welcome" />
            <div className="text-black/80 scroll-smooth">
                <div className="flex flex-col min-h-screen">
                    {/* Navbar */}
                    <header className="sticky top-0 w-full bg-white/80 backdrop-blur-md flex items-center p-6 z-50 shadow-sm relative">
                        {/* Left: Logo */}
                        <div className="flex-shrink-0">
                            <h1 className="text-2xl font-bold">
                                InternConnect
                            </h1>
                        </div>

                        {/* Center: Navigation */}
                        <nav className="absolute left-1/2 transform -translate-x-1/2 space-x-6">
                            <a
                                href="#hero"
                                className="text-black hover:text-gray-700 font-semibold"
                            >
                                Home
                            </a>
                            <a
                                href="#about"
                                className="text-black hover:text-gray-700 font-semibold"
                            >
                                About
                            </a>
                            <a
                                href="#features"
                                className="text-black hover:text-gray-700 font-semibold"
                            >
                                Features
                            </a>
                            <a
                                href="#cta"
                                className="text-black hover:text-gray-700 font-semibold"
                            >
                                Get Started
                            </a>
                        </nav>

                        {/* Right: Auth Links */}
                        <div className="flex-shrink-0 space-x-4 ml-auto">
                            {auth.user ? (
                                <Link
                                    href={route(getDashboardRoute())}
                                    className="text-black hover:text-gray-700 font-semibold"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route("login")}
                                        className="text-black hover:text-gray-700 font-semibold"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href={route("register")}
                                        className="text-black hover:text-gray-700 font-semibold"
                                    >
                                        Register
                                    </Link>
                                </>
                            )}
                        </div>
                    </header>

                    {/* Hero Section */}
                    <section
                        id="hero"
                        ref={(el) => (sectionsRef.current[0] = el)}
                        className="min-h-screen flex flex-col justify-center items-center text-center px-6 bg-white"
                    >
                        <h1 className="text-5xl md:text-7xl font-bold mb-6">
                            Welcome to Intern Connect
                        </h1>
                        <p className="text-lg text-gray-600 mb-8 max-w-xl">
                            Your journey towards real-world experience starts
                            here.
                        </p>
                        <Link
                            href="#cta"
                            className="bg-black text-white px-8 py-4 rounded-full hover:bg-gray-800 transition text-lg"
                        >
                            {"Get Started"}
                        </Link>
                    </section>

                    {/* About Section */}
                    <section
                        id="about"
                        ref={(el) => (sectionsRef.current[1] = el)}
                        className="min-h-screen flex flex-col justify-center items-center text-center px-6 bg-gray-100"
                    >
                        <div className="max-w-3xl">
                            <h2 className="text-5xl font-bold mb-6 text-gray-800">
                                About InternConnect
                            </h2>
                            <p className="text-gray-700 text-lg mb-4">
                                InternConnect bridges the gap between students
                                and companies.
                            </p>
                            <p className="text-gray-700 text-lg">
                                Our mission is to empower the next generation of
                                professionals.
                            </p>
                        </div>
                    </section>

                    {/* Features Section */}
                    <section
                        id="features"
                        ref={(el) => (sectionsRef.current[2] = el)}
                        className="min-h-screen flex flex-col justify-center items-center text-center px-6 bg-white"
                    >
                        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
                            {/* Feature Items */}
                            <div className="p-6 border rounded-xl flex flex-col items-center hover:shadow-lg transition">
                                <div className="text-4xl mb-4">📝</div>
                                <h3 className="text-2xl font-semibold mb-2">
                                    Easy Applications
                                </h3>
                                <p className="text-gray-600">
                                    Apply to multiple companies with one
                                    profile.
                                </p>
                            </div>
                            <div className="p-6 border rounded-xl flex flex-col items-center hover:shadow-lg transition">
                                <div className="text-4xl mb-4">✅</div>
                                <h3 className="text-2xl font-semibold mb-2">
                                    Verified Employers
                                </h3>
                                <p className="text-gray-600">
                                    Partnering only with trusted companies.
                                </p>
                            </div>
                            <div className="p-6 border rounded-xl flex flex-col items-center hover:shadow-lg transition">
                                <div className="text-4xl mb-4">🚀</div>
                                <h3 className="text-2xl font-semibold mb-2">
                                    Career Growth
                                </h3>
                                <p className="text-gray-600">
                                    Gain hands-on experience and open doors.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Call to Action Section */}
                    <section
                        id="cta"
                        ref={(el) => (sectionsRef.current[3] = el)}
                        className="min-h-screen flex flex-col justify-center items-center text-center px-6 bg-gray-100"
                    >
                        <h2 className="text-5xl font-bold mb-6 text-gray-800">
                            Ready to Launch Your Career?
                        </h2>
                        <p className="text-gray-700 text-lg mb-8 max-w-xl">
                            Thousands of opportunities await. Take the first
                            step.
                        </p>
                        <Link
                            href={route(auth.user ? "dashboard" : "register")}
                            className="inline-block bg-black text-white px-8 py-4 rounded-full hover:bg-gray-800 transition text-lg"
                        >
                            {auth.user ? "View Opportunities" : "Sign Up Now"}
                        </Link>
                    </section>

                    {/* Footer */}
                    <footer className="text-center py-6 text-sm text-gray-500 bg-white">
                        © {new Date().getFullYear()} InternConnect. All rights
                        reserved.
                    </footer>
                </div>
            </div>
        </>
    );
}
