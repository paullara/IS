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
        switch (auth.user?.role) {
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
            <div className="text-gray-900 scroll-smooth">
                {/* Navbar */}
                <header className="sticky top-0 w-full bg-white/70 backdrop-blur-md flex items-center p-6 z-50 shadow-md">
                    <div className="flex items-center space-x-3">
                        <img
                            src="/logo/psu.png"
                            alt="Logo"
                            className="h-10 w-10"
                        />
                        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-yellow-400">
                            InternConnect
                        </h1>
                    </div>
                    <nav className="ml-auto space-x-6 hidden md:flex">
                        <a
                            href="#hero"
                            className="font-medium hover:text-indigo-600 transition"
                        >
                            Home
                        </a>
                        <a
                            href="#about"
                            className="font-medium hover:text-indigo-600 transition"
                        >
                            About
                        </a>
                        <a
                            href="#features"
                            className="font-medium hover:text-indigo-600 transition"
                        >
                            Features
                        </a>
                        <a
                            href="#testimonials"
                            className="font-medium hover:text-indigo-600 transition"
                        >
                            Testimonials
                        </a>
                        <a
                            href="#cta"
                            className="font-medium hover:text-indigo-600 transition"
                        >
                            Get Started
                        </a>
                    </nav>
                    <div className="ml-6 space-x-4">
                        {auth.user ? (
                            <Link
                                href={route(getDashboardRoute())}
                                className="font-medium hover:text-indigo-600 transition"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route("login")}
                                    className="font-medium hover:text-indigo-600 transition"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={route("register")}
                                    className="font-medium hover:text-indigo-600 transition"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </header>

                {/* Hero */}
                <section
                    id="hero"
                    ref={(el) => (sectionsRef.current[0] = el)}
                    className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 bg-gradient-to-b from-indigo-100 via-white to-blue-50"
                >
                    <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
                        Welcome to InternConnect
                    </h1>
                    <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl">
                        Your journey towards real-world experience starts here.
                        Connect with top employers, explore internship
                        opportunities, and kickstart your career.
                    </p>
                    <Link
                        href="#cta"
                        className="px-8 py-4 text-lg font-semibold rounded-full bg-gradient-to-r from-blue-600 to-yellow-400 text-white shadow-lg hover:from-blue-700 hover:to-yellow-500 transition"
                    >
                        Get Started
                    </Link>
                </section>

                {/* About */}
                <section
                    id="about"
                    ref={(el) => (sectionsRef.current[1] = el)}
                    className="min-h-screen flex flex-col justify-center items-center text-center px-6 py-12 bg-gray-50"
                >
                    <div className="max-w-3xl">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
                            About InternConnect
                        </h2>
                        <p className="text-gray-700 text-lg mb-4">
                            InternConnect bridges the gap between students and
                            companies. We provide a platform where students can
                            explore real-world opportunities and gain valuable
                            experience.
                        </p>
                        <p className="text-gray-700 text-lg mb-4">
                            Our mission is to empower the next generation of
                            professionals by providing tools to manage
                            applications, track progress, and connect with
                            mentors.
                        </p>
                        <p className="text-gray-700 text-lg">
                            Whether you are a student seeking an internship, or
                            a company looking for fresh talent, InternConnect
                            simplifies the process and ensures a trusted,
                            efficient experience.
                        </p>
                    </div>
                </section>

                {/* Features */}
                <section
                    id="features"
                    ref={(el) => (sectionsRef.current[2] = el)}
                    className="min-h-screen flex flex-col justify-center items-center text-center px-6 py-12 bg-white"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-12 text-gray-800">
                        Features
                    </h2>
                    <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: "📝",
                                title: "Easy Applications",
                                desc: "Create a single profile and apply to multiple companies in just a few clicks. Save time and stay organized.",
                            },
                            {
                                icon: "✅",
                                title: "Verified Employers",
                                desc: "Work with trusted companies. All employers on our platform are verified to ensure genuine opportunities.",
                            },
                            {
                                icon: "🚀",
                                title: "Career Growth",
                                desc: "Gain hands-on experience, build your portfolio, and open doors to full-time positions.",
                            },
                            {
                                icon: "💬",
                                title: "Mentorship",
                                desc: "Connect with experienced professionals for guidance and career advice.",
                            },
                            {
                                icon: "📊",
                                title: "Progress Tracking",
                                desc: "Monitor your applications and internships with a clear dashboard.",
                            },
                            {
                                icon: "🎯",
                                title: "Targeted Opportunities",
                                desc: "Receive internship recommendations tailored to your skills and interests.",
                            },
                        ].map((feature, idx) => (
                            <div
                                key={idx}
                                className="p-6 border rounded-xl flex flex-col items-center hover:shadow-xl transition duration-300 bg-white"
                            >
                                <div className="text-5xl mb-4">
                                    {feature.icon}
                                </div>
                                <h3 className="text-2xl font-semibold mb-2">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Testimonials */}
                <section
                    id="testimonials"
                    ref={(el) => (sectionsRef.current[3] = el)}
                    className="min-h-screen flex flex-col justify-center items-center text-center px-6 py-12 bg-gray-50"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-12 text-gray-800">
                        What Students Say
                    </h2>
                    <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
                        {[
                            {
                                name: "Maria Dela Cruz",
                                feedback:
                                    "InternConnect helped me land my dream internship at a top tech company. The application process was so simple!",
                            },
                            {
                                name: "Juan Reyes",
                                feedback:
                                    "I discovered amazing internship opportunities I wouldn't have found elsewhere. Highly recommended for students.",
                            },
                        ].map((t, idx) => (
                            <div
                                key={idx}
                                className="p-6 bg-white rounded-xl shadow-md"
                            >
                                <p className="text-gray-700 mb-4">
                                    "{t.feedback}"
                                </p>
                                <h4 className="font-semibold text-gray-900">
                                    {t.name}
                                </h4>
                            </div>
                        ))}
                    </div>
                </section>

                {/* CTA */}
                <section
                    id="cta"
                    ref={(el) => (sectionsRef.current[4] = el)}
                    className="min-h-screen flex flex-col justify-center items-center text-center px-6 py-12 bg-gradient-to-b from-blue-50 via-white to-indigo-50"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
                        Ready to Launch Your Career?
                    </h2>
                    <p className="text-gray-700 text-lg mb-8 max-w-xl">
                        Thousands of internship opportunities await. Take the
                        first step towards building your professional future
                        today.
                    </p>
                    <Link
                        href={route(auth.user ? "dashboard" : "register")}
                        className="inline-block px-8 py-4 text-lg font-semibold rounded-full bg-gradient-to-r from-blue-600 to-yellow-400 text-white shadow-lg hover:from-blue-700 hover:to-yellow-500 transition"
                    >
                        {auth.user ? "View Opportunities" : "Sign Up Now"}
                    </Link>
                </section>

                {/* Footer */}
                <footer className="text-center py-6 text-sm text-gray-500 bg-white">
                    © {new Date().getFullYear()} InternConnect. All rights
                    reserved. Nigga
                </footer>
            </div>
        </>
    );
}
