import { Head, Link } from '@inertiajs/react';
import React, { useState, useEffect } from 'react';

export default function Welcome({ auth }) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Smooth scroll helper
    const scrollToSection = (e, id) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setIsMobileMenuOpen(false);
        }
    };

    const products = [
        {
            id: 1,
            name: "Fresh Organic Eggs",
            description: "Farm-fresh organic eggs rich in nutrients, laid by free-range pasture-raised chickens.",
            price: "$5.99 / dozen",
            image: "/images/egg_product.png"
        },
        {
            id: 2,
            name: "Organic Vegetables Basket",
            description: "A seasonal selection of freshly harvested organic greens and root vegetables.",
            price: "$18.50 / basket",
            image: "/images/veg_product.png"
        },
        {
            id: 3,
            name: "Raw Wildflower Honey",
            description: "Pure, unfiltered honey harvested sustainably from local community bee apiaries.",
            price: "$12.00 / jar",
            image: "/images/honey_product.png"
        },
        {
            id: 4,
            name: "Fresh Farm Milk",
            description: "Rich, creamy whole milk pasteurized and bottled daily at local dairy farms.",
            price: "$4.50 / bottle",
            image: "/images/milk_product.png"
        },
        {
            id: 5,
            name: "Organic Farm Strawberries",
            description: "Sweet, juicy hand-picked red strawberries grown without synthetic pesticides.",
            price: "$6.20 / pint",
            image: "/images/veg_product.png" // reused veg image
        },
        {
            id: 6,
            name: "Homegrown Potted Herbs",
            description: "Assorted culinary herbs (basil, rosemary, mint) in biodegradable starter pots.",
            price: "$8.00 / set",
            image: "/images/egg_product.png" // reused egg image
        }
    ];

    const services = [
        {
            id: 1,
            name: "Local Product Marketing",
            description: "Elevate your brand in the local ecosystem. We help small farms and artisanal producers showcase their products through digital marketing, storytelling, and local campaigns.",
            icon: (
                <svg className="w-12 h-12 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                </svg>
            )
        },
        {
            id: 2,
            name: "Delivery Services",
            description: "Farm-to-table delivery made easy. Our localized logistics network ensures fresh harvests and hand-crafted goods reach consumers quickly and sustainably.",
            icon: (
                <svg className="w-12 h-12 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                </svg>
            )
        },
        {
            id: 3,
            name: "Business Promotion",
            description: "Boost your presence in the neighborhood. We sponsor community markets, host local business directories, and run promotional events to drive foot traffic.",
            icon: (
                <svg className="w-12 h-12 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
            )
        },
        {
            id: 4,
            name: "Community Partnerships",
            description: "Stronger together. We bridge the gap between local growers, craftspeople, schools, and restaurants to create circular economic growth.",
            icon: (
                <svg className="w-12 h-12 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            )
        },
        {
            id: 5,
            name: "Agricultural Support",
            description: "Grow with confidence. Access local farming experts, tools sharing, soil analysis clinics, and eco-friendly farming guides tailored to our region.",
            icon: (
                <svg className="w-12 h-12 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
            )
        },
        {
            id: 6,
            name: "Training and Workshops",
            description: "Knowledge is seed. We run regular training workshops on organic farming practices, digital seller tools, zero-waste packaging, and small business accounting.",
            icon: (
                <svg className="w-12 h-12 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
            )
        }
    ];

    return (
        <>
            <Head title="Welcome to Local Roots" />
            <div className="bg-gradient-to-br from-[#F4F9F4] via-[#E8F5E9] to-[#F1F8F1] min-h-screen text-gray-800 font-sans selection:bg-emerald-500 selection:text-white relative overflow-hidden">
                
                {/* Background blurred decorative shapes */}
                <div className="absolute top-10 left-10 w-96 h-96 rounded-full bg-emerald-200/40 blur-3xl pointer-events-none -z-10 animate-pulse"></div>
                <div className="absolute top-[800px] right-20 w-[500px] h-[500px] rounded-full bg-green-200/30 blur-3xl pointer-events-none -z-10"></div>
                <div className="absolute bottom-40 left-20 w-80 h-80 rounded-full bg-lime-200/30 blur-3xl pointer-events-none -z-10"></div>

                {/* Navigation Bar */}
                <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/70 backdrop-blur-md shadow-md py-4' : 'bg-transparent py-6'}`}>
                    <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                        {/* Logo */}
                        <a href="#home" onClick={(e) => scrollToSection(e, 'home')} className="flex items-center gap-2 group">
                            <span className="p-2 rounded-xl bg-emerald-600 text-white shadow-md shadow-emerald-600/20 group-hover:scale-105 transition-transform duration-300">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
                                </svg>
                            </span>
                            <span className="font-extrabold text-xl tracking-tight text-emerald-800">Local Roots</span>
                        </a>

                        {/* Centered navigation links */}
                        <div className="hidden md:flex items-center gap-8 font-medium">
                            <a href="#home" onClick={(e) => scrollToSection(e, 'home')} className="text-gray-700 hover:text-emerald-700 transition-colors">Home</a>
                            <a href="#products" onClick={(e) => scrollToSection(e, 'products')} className="text-gray-700 hover:text-emerald-700 transition-colors">Products</a>
                            <a href="#services" onClick={(e) => scrollToSection(e, 'services')} className="text-gray-700 hover:text-emerald-700 transition-colors">Services</a>
                            <a href="#about" onClick={(e) => scrollToSection(e, 'about')} className="text-gray-700 hover:text-emerald-700 transition-colors">About</a>
                        </div>

                        {/* Authentication links */}
                        <div className="hidden md:flex items-center gap-4">
                            {auth.user ? (
                                auth.user.role === "superadmin" ? (
                                    <Link href={route('superadmin.dashboard')} className="px-5 py-2.5 rounded-xl bg-emerald-700 text-white hover:bg-emerald-800 shadow-md shadow-emerald-700/20 transition-all font-semibold">
                                        Superadmin Dashboard
                                    </Link>
                                ) : auth.user.role === "admin" ? (
                                    <Link href={route('admin.dashboard')} className="px-5 py-2.5 rounded-xl bg-emerald-700 text-white hover:bg-emerald-800 shadow-md shadow-emerald-700/20 transition-all font-semibold">
                                        Admin Dashboard
                                    </Link>
                                ) : (
                                    <Link href={route('user.homepage')} className="px-5 py-2.5 rounded-xl bg-emerald-700 text-white hover:bg-emerald-800 shadow-md shadow-emerald-700/20 transition-all font-semibold">
                                        User Dashboard
                                    </Link>
                                )
                            ) : (
                                <>
                                    <Link href={route('login')} className="px-5 py-2.5 rounded-xl border-2 border-emerald-600 text-emerald-700 hover:bg-emerald-50 transition-all font-semibold">
                                        Login
                                    </Link>
                                    <Link href={route('register')} className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 shadow-md shadow-emerald-600/20 transition-all font-semibold">
                                        Register
                                    </Link>
                                </>
                            )}
                        </div>

                        {/* Mobile Menu Button */}
                        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden p-2 rounded-lg text-emerald-800 hover:bg-emerald-50 focus:outline-none">
                            {isMobileMenuOpen ? (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>

                    {/* Mobile Menu Drawer */}
                    {isMobileMenuOpen && (
                        <div className="md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-md shadow-lg border-t border-emerald-100 py-6 px-6 flex flex-col gap-6 font-medium animate-fadeIn">
                            <a href="#home" onClick={(e) => scrollToSection(e, 'home')} className="text-gray-700 hover:text-emerald-700 transition-colors">Home</a>
                            <a href="#products" onClick={(e) => scrollToSection(e, 'products')} className="text-gray-700 hover:text-emerald-700 transition-colors">Products</a>
                            <a href="#services" onClick={(e) => scrollToSection(e, 'services')} className="text-gray-700 hover:text-emerald-700 transition-colors">Services</a>
                            <a href="#about" onClick={(e) => scrollToSection(e, 'about')} className="text-gray-700 hover:text-emerald-700 transition-colors">About</a>
                            <hr className="border-emerald-100" />
                            <div className="flex flex-col gap-3">
                                {auth.user ? (
                                    auth.user.role === "superadmin" ? (
                                        <Link href={route('superadmin.dashboard')} className="w-full text-center py-3 rounded-xl bg-emerald-600 text-white font-semibold">
                                            Superadmin Dashboard
                                        </Link>
                                    ) : auth.user.role === "admin" ? (
                                        <Link href={route('admin.dashboard')} className="w-full text-center py-3 rounded-xl bg-emerald-600 text-white font-semibold">
                                            Admin Dashboard
                                        </Link>
                                    ) : (
                                        <Link href={route('user.homepage')} className="w-full text-center py-3 rounded-xl bg-emerald-600 text-white font-semibold">
                                            User Dashboard
                                        </Link>
                                    )
                                ) : (
                                    <>
                                        <Link href={route('login')} className="w-full text-center py-3 rounded-xl border border-emerald-600 text-emerald-700 font-semibold hover:bg-emerald-50">
                                            Login
                                        </Link>
                                        <Link href={route('register')} className="w-full text-center py-3 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700">
                                            Register
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                </nav>

                {/* Hero Section */}
                <header id="home" className="pt-32 pb-20 md:pt-40 md:pb-28 max-w-7xl mx-auto px-6 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
                        {/* Left Side Content */}
                        <div className="flex flex-col gap-6 text-left">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100/60 text-emerald-800 font-semibold text-sm w-fit border border-emerald-200/50">
                                <span className="flex h-2 w-2 relative">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                </span>
                                Locally Sourced & Eco-friendly
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-emerald-950">
                                Connecting Communities Through <span className="text-emerald-600 bg-gradient-to-r from-emerald-600 to-green-500 bg-clip-text text-transparent">Local Products</span>
                            </h1>
                            <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
                                Local Roots is a community-driven platform that promotes locally produced goods, supports small businesses, and connects consumers with quality local products and services.
                            </p>
                            <div className="flex flex-wrap items-center gap-4 mt-2">
                                <a href="#products" onClick={(e) => scrollToSection(e, 'products')} className="px-8 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-lg shadow-emerald-600/20 hover:-translate-y-0.5 transition-all text-center">
                                    Explore Products
                                </a>
                                <a href="#about" onClick={(e) => scrollToSection(e, 'about')} className="px-8 py-4 rounded-2xl border-2 border-emerald-600 text-emerald-700 hover:bg-emerald-50 font-semibold hover:-translate-y-0.5 transition-all text-center">
                                    Learn More
                                </a>
                            </div>
                        </div>

                        {/* Right Side Illustration */}
                        <div className="relative flex justify-center items-center">
                            {/* main image */}
                            <div className="relative w-full max-w-[500px] h-[400px] rounded-[40px] overflow-hidden shadow-2xl border border-white/20 p-2 bg-white/45 backdrop-blur-[16px] border border-white/40 shadow-[0_8px_32px_0_rgba(46,125,50,0.08)]">
                                <img
                                    src="/images/local_roots_hero.png"
                                    alt="Sustainable Farming and Products"
                                    className="w-full h-full object-cover rounded-[32px]"
                                />
                            </div>

                            {/* Floating Glassmorphism Cards */}
                            <div className="absolute -top-6 -left-6 md:-left-12 bg-white/30 backdrop-blur-[12px] border border-white/30 shadow-[0_4px_24px_0_rgba(46,125,50,0.04)] rounded-2xl p-4 flex items-center gap-3 border border-white/40 max-w-[200px] animate-float">
                                <span className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </span>
                                <div>
                                    <h4 className="font-bold text-xs text-emerald-950">100% Organic</h4>
                                    <p className="text-[10px] text-gray-500">Certified local items</p>
                                </div>
                            </div>

                            <div className="absolute -bottom-6 -right-6 md:-right-10 bg-white/30 backdrop-blur-[12px] border border-white/30 shadow-[0_4px_24px_0_rgba(46,125,50,0.04)] rounded-2xl p-4 flex items-center gap-3 border border-white/40 max-w-[220px] animate-float-delayed">
                                <span className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </span>
                                <div>
                                    <h4 className="font-bold text-xs text-emerald-950">Community First</h4>
                                    <p className="text-[10px] text-gray-500">Supports family growers</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Products Section */}
                <section id="products" className="py-20 max-w-7xl mx-auto px-6 relative z-10">
                    <div className="text-center mb-12 flex flex-col gap-3">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-emerald-950">Products in Local Roots</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Discover quality locally sourced products from trusted community producers.
                        </p>
                    </div>

                    {/* Large glassmorphism container */}
                    <div className="bg-white/45 backdrop-blur-[16px] border border-white/40 shadow-[0_8px_32px_0_rgba(46,125,50,0.08)] rounded-[32px] p-8 md:p-12 border border-white/30 backdrop-blur-xl">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {products.map((product) => (
                                <div key={product.id} className="bg-white/30 backdrop-blur-[12px] border border-white/30 shadow-[0_4px_24px_0_rgba(46,125,50,0.04)] rounded-2xl overflow-hidden border border-white/20 hover:-translate-y-2 hover:shadow-2xl hover:border-emerald-200/50 transition-all duration-300 group flex flex-col h-full bg-white/25">
                                    <div className="h-48 overflow-hidden relative">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <span className="absolute top-4 right-4 bg-emerald-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                                            {product.price}
                                        </span>
                                    </div>
                                    <div className="p-6 flex flex-col justify-between flex-grow gap-4">
                                        <div className="flex flex-col gap-2">
                                            <h3 className="font-bold text-lg text-emerald-950 group-hover:text-emerald-800 transition-colors">
                                                {product.name}
                                            </h3>
                                            <p className="text-sm text-gray-600 leading-relaxed">
                                                {product.description}
                                            </p>
                                        </div>
                                        <button className="w-full py-2.5 rounded-xl border border-emerald-600/50 text-emerald-800 hover:bg-emerald-600 hover:text-white font-semibold transition-all text-sm mt-2 flex items-center justify-center gap-1.5">
                                            View Details
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Centered button */}
                        <div className="flex justify-center mt-12">
                            <button className="px-8 py-3.5 rounded-2xl bg-emerald-800 hover:bg-emerald-900 text-white font-semibold shadow-md shadow-emerald-900/20 hover:-translate-y-0.5 transition-all">
                                See More Products
                            </button>
                        </div>
                    </div>
                </section>

                {/* Services Section */}
                <section id="services" className="py-20 max-w-7xl mx-auto px-6 relative z-10">
                    <div className="text-center mb-16 flex flex-col gap-3">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-emerald-950">Services</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Local Roots provides services that support local businesses, producers, and community growth.
                        </p>
                    </div>

                    {/* Services horizontal cards layout */}
                    <div className="flex flex-col gap-8 max-w-4xl mx-auto">
                        {services.map((service, index) => (
                            <div
                                key={service.id}
                                className={`bg-white/30 backdrop-blur-[12px] border border-white/30 shadow-[0_4px_24px_0_rgba(46,125,50,0.04)] rounded-[24px] p-8 border border-white/20 shadow-md hover:shadow-lg transition-all duration-300 flex flex-col md:items-center gap-6 ${
                                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                                }`}
                            >
                                {/* Left/Right graphic */}
                                <div className="flex-shrink-0 w-24 h-24 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-emerald-600/20 flex items-center justify-center border border-emerald-500/10 shadow-inner">
                                    {service.icon}
                                </div>
                                {/* Left/Right content */}
                                <div className="flex-grow flex flex-col gap-2">
                                    <h3 className="text-xl font-bold text-emerald-950">{service.name}</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">{service.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* About Section */}
                <section id="about" className="py-20 max-w-7xl mx-auto px-6 relative z-10 mb-10">
                    <div className="text-center mb-12 flex flex-col gap-3">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-emerald-950">About Local Roots</h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
                        {/* Left Column: Details */}
                        <div className="bg-white/45 backdrop-blur-[16px] border border-white/40 shadow-[0_8px_32px_0_rgba(46,125,50,0.08)] rounded-[32px] p-8 md:p-10 border border-white/30 shadow-xl flex flex-col justify-between gap-8 backdrop-blur-xl bg-white/30">
                            <div className="flex flex-col gap-4">
                                <h3 className="text-2xl font-bold text-emerald-900">Our Mission</h3>
                                <p className="text-gray-700 leading-relaxed">
                                    Local Roots is dedicated to empowering local communities by promoting locally produced goods, supporting small enterprises, and creating sustainable economic opportunities.
                                </p>
                            </div>

                            {/* Contact Container with modern design */}
                            <div className="flex flex-col gap-4">
                                <h4 className="font-bold text-emerald-950 text-lg border-b border-emerald-200/50 pb-2">Contact Details</h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="flex items-center gap-3 p-3 rounded-xl bg-emerald-50/50 border border-emerald-100">
                                        <span className="text-emerald-700">
                                            📍
                                        </span>
                                        <div>
                                            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Address</p>
                                            <p className="text-xs font-semibold text-emerald-950">Local Roots Community Center</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 p-3 rounded-xl bg-emerald-50/50 border border-emerald-100">
                                        <span className="text-emerald-700">
                                            📞
                                        </span>
                                        <div>
                                            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Phone</p>
                                            <p className="text-xs font-semibold text-emerald-950">+63 912 345 6789</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 p-3 rounded-xl bg-emerald-50/50 border border-emerald-100">
                                        <span className="text-emerald-700">
                                            ✉️
                                        </span>
                                        <div>
                                            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Email</p>
                                            <p className="text-xs font-semibold text-emerald-950">info@localroots.com</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 p-3 rounded-xl bg-emerald-50/50 border border-emerald-100">
                                        <span className="text-emerald-700">
                                            📘
                                        </span>
                                        <div>
                                            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Facebook</p>
                                            <p className="text-xs font-semibold text-emerald-950">Local Roots Official</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 p-3 rounded-xl bg-emerald-50/50 border border-emerald-100 sm:col-span-2">
                                        <span className="text-emerald-700">
                                            📸
                                        </span>
                                        <div>
                                            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Instagram</p>
                                            <p className="text-xs font-semibold text-emerald-950">@localroots</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Community Graphic Placeholder */}
                        <div className="relative rounded-[32px] overflow-hidden shadow-xl border border-white/20 bg-white/45 backdrop-blur-[16px] border border-white/40 shadow-[0_8px_32px_0_rgba(46,125,50,0.08)] p-3 min-h-[300px]">
                            <div className="w-full h-full relative rounded-[24px] overflow-hidden bg-emerald-50">
                                <img
                                    src="/images/local_roots_hero.png" // reused illustration for community map placeholder
                                    alt="Local roots community map"
                                    className="w-full h-full object-cover brightness-95"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-emerald-950/20 to-transparent flex items-end p-8">
                                    <div className="flex flex-col gap-2">
                                        <span className="bg-emerald-500 text-white font-bold text-xs uppercase px-2.5 py-1 rounded w-fit">Community Center Map</span>
                                        <h4 className="text-white text-lg font-bold">Local Roots Community Center Map & Directory</h4>
                                        <p className="text-emerald-200 text-xs leading-relaxed">Stop by our flagship location in the city plaza. Get directions, meet the growers, and pickup online orders in person.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-emerald-950 text-emerald-100 py-16 relative z-10 border-t border-emerald-900/50">
                    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
                        {/* Col 1: Logo and details */}
                        <div className="flex flex-col gap-4 col-span-1 md:col-span-2">
                            <a href="#home" onClick={(e) => scrollToSection(e, 'home')} className="flex items-center gap-2 group w-fit">
                                <span className="p-2 rounded-xl bg-emerald-600 text-white shadow-md">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
                                    </svg>
                                </span>
                                <span className="font-extrabold text-xl tracking-tight text-white">Local Roots</span>
                            </a>
                            <p className="text-emerald-300 text-sm max-w-sm leading-relaxed">
                                Empowering local growers, supporting sustainability, and connecting community members with fresh, pesticide-free products and specialized resources.
                            </p>
                        </div>

                        {/* Col 2: Quick Links */}
                        <div className="flex flex-col gap-4">
                            <h4 className="text-white font-bold text-sm uppercase tracking-wider">Quick Links</h4>
                            <div className="flex flex-col gap-2.5 text-sm text-emerald-300">
                                <a href="#home" onClick={(e) => scrollToSection(e, 'home')} className="hover:text-white transition-colors">Home</a>
                                <a href="#products" onClick={(e) => scrollToSection(e, 'products')} className="hover:text-white transition-colors">Products</a>
                                <a href="#services" onClick={(e) => scrollToSection(e, 'services')} className="hover:text-white transition-colors">Services</a>
                                <a href="#about" onClick={(e) => scrollToSection(e, 'about')} className="hover:text-white transition-colors">About</a>
                            </div>
                        </div>

                        {/* Col 3: Social Media */}
                        <div className="flex flex-col gap-4">
                            <h4 className="text-white font-bold text-sm uppercase tracking-wider">Follow Us</h4>
                            <div className="flex items-center gap-3.5">
                                <a href="#" aria-label="Facebook" className="p-2.5 rounded-full bg-emerald-900/60 hover:bg-emerald-800 text-emerald-200 hover:text-white transition-all border border-emerald-900">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.8c4.56-.93 8-4.96 8-9.8z" />
                                    </svg>
                                </a>
                                <a href="#" aria-label="Instagram" className="p-2.5 rounded-full bg-emerald-900/60 hover:bg-emerald-800 text-emerald-200 hover:text-white transition-all border border-emerald-900">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01"/>
                                    </svg>
                                </a>
                                <a href="#" aria-label="Twitter" className="p-2.5 rounded-full bg-emerald-900/60 hover:bg-emerald-800 text-emerald-200 hover:text-white transition-all border border-emerald-900">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="max-w-7xl mx-auto px-6 border-t border-emerald-900/60 mt-12 pt-8 text-center text-xs text-emerald-400">
                        &copy; 2026 Local Roots. All rights reserved. Built for sustainable and eco-friendly community marketplaces.
                    </div>
                </footer>
            </div>
        </>
    );
}