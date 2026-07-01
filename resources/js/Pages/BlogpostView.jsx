import { Head, Link } from '@inertiajs/react';
import React, { useState } from 'react';

export default function BlogpostView({ blogposts = [] }) {
    // State to handle modal view tracking
    const [selectedPost, setSelectedPost] = useState(null);
    const [activeImageIdx, setActiveImageIdx] = useState(0);

    const openModal = (post) => {
        setSelectedPost(post);
        setActiveImageIdx(0); // Reset to the first image whenever a modal opens
    };

    const closeModal = () => {
        setSelectedPost(null);
    };

    return (
        <>
            <Head title="Blog Posts - Local Roots" />
            <div className="bg-gradient-to-br from-[#F4F9F4] via-[#E8F5E9] to-[#F1F8F1] min-h-screen text-gray-800 font-sans selection:bg-emerald-500 selection:text-white relative overflow-hidden flex flex-col">
                
                {/* Background blurred decorative shapes */}
                <div className="absolute top-10 left-10 w-96 h-96 rounded-full bg-emerald-200/40 blur-3xl pointer-events-none -z-10 animate-pulse"></div>
                <div className="absolute top-80 right-20 w-[500px] h-[500px] rounded-full bg-green-200/30 blur-3xl pointer-events-none -z-10"></div>
                <div className="absolute bottom-40 left-20 w-80 h-80 rounded-full bg-lime-200/30 blur-3xl pointer-events-none -z-10"></div>

                {/* Minimal Navigation Bar */}
                <nav className="w-full bg-white/70 backdrop-blur-md shadow-sm border-b border-white/50 sticky top-0 z-50">
                    <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                        {/* Logo */}
                        <Link href={route('welcome')} className="flex items-center gap-2 group">
                            <span className="p-2 rounded-xl bg-emerald-600 text-white shadow-md shadow-emerald-600/20 group-hover:scale-105 transition-transform duration-300">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
                                </svg>
                            </span>
                            <span className="font-extrabold text-xl tracking-tight text-emerald-800">Local Roots</span>
                        </Link>

                        <Link href={route('welcome')} className="text-emerald-700 hover:text-emerald-900 font-bold text-sm flex items-center gap-1 hover:-translate-x-1 transition-transform">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back to Home
                        </Link>
                    </div>
                </nav>

                {/* Main Content */}
                <main className="flex-grow max-w-7xl mx-auto px-6 py-12 w-full z-10">
                    <div className="text-center mb-16 flex flex-col gap-3">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100/60 text-emerald-800 font-semibold text-sm w-fit border border-emerald-200/50 mx-auto">
                            Community Stories
                        </div>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-emerald-950">Local Roots Blog</h1>
                        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                            Read the latest updates, news, and stories from our local farming community and producers.
                        </p>
                    </div>

                    {blogposts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {blogposts.map((post) => (
                                <div key={post.id} className="bg-white/40 backdrop-blur-md border border-white/40 shadow-[0_8px_32px_0_rgba(46,125,50,0.08)] rounded-[24px] overflow-hidden hover:-translate-y-2 hover:shadow-2xl hover:border-emerald-200/50 transition-all duration-300 flex flex-col h-full">
                                    
                                    {/* Cover Image */}
                                    {post.pictures && post.pictures.length > 0 ? (
                                        <div className="h-56 overflow-hidden relative bg-emerald-50 w-full">
                                            <img
                                                src={`/storage/${post.pictures[0]}`}
                                                alt={post.title}
                                                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                            />
                                            <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-emerald-800 shadow-sm uppercase tracking-wider">
                                                {new Date(post.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="h-56 overflow-hidden relative bg-emerald-50/50 flex items-center justify-center text-emerald-200">
                                            <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L28 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                    )}

                                    {/* Post Content */}
                                    <div className="p-8 flex flex-col flex-grow">
                                        <h2 className="font-extrabold text-2xl text-emerald-950 mb-3 leading-tight line-clamp-2 min-h-[3.5rem]">
                                            {post.title}
                                        </h2>
                                        
                                        <div className="text-gray-600 leading-relaxed flex-grow line-clamp-3 mb-6">
                                            {post.description}
                                        </div>

                                        {/* Action Area: Author Info & View Button */}
                                        <div className="flex items-center justify-between pt-6 border-t border-emerald-100/50 mt-auto gap-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-black text-sm shadow-sm">
                                                    {post.user?.name?.charAt(0)?.toUpperCase() || "?"}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-xs font-bold text-emerald-950 line-clamp-1">
                                                        {post.user?.name || "Author"}
                                                    </span>
                                                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">
                                                        Contributor
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Read More / View Button */}
                                            <button
                                                onClick={() => openModal(post)}
                                                className="px-4 py-2 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl transition-all shadow-md shadow-emerald-700/10 active:scale-95"
                                            >
                                                View Post
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-white/45 backdrop-blur-[16px] border border-white/40 shadow-[0_8px_32px_0_rgba(46,125,50,0.08)] rounded-[32px] max-w-2xl mx-auto">
                            <div className="inline-flex items-center justify-center w-24 h-24 bg-emerald-50 rounded-full mb-6 text-emerald-300">
                                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-black text-emerald-900 mb-2">No Stories Yet</h3>
                            <p className="text-gray-600 mb-8">We haven't published any blog posts yet. Check back soon for updates!</p>
                            <Link href={route('welcome')} className="px-8 py-3.5 rounded-2xl bg-emerald-800 hover:bg-emerald-900 text-white font-semibold shadow-md shadow-emerald-900/20 hover:-translate-y-0.5 transition-all">
                                Return to Home
                            </Link>
                        </div>
                    )}
                </main>

                {/* TWO-COLUMN INTERACTIVE MODAL COMPONENT */}
                {selectedPost && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 animate-fadeIn">
                        {/* Backdrop Blur overlay click-to-close */}
                        <div 
                            className="absolute inset-0 bg-emerald-950/40 backdrop-blur-sm"
                            onClick={closeModal}
                        />
                        
                        {/* Modal Container Box */}
                        <div className="bg-white/90 backdrop-blur-lg border border-white max-w-5xl w-full max-h-[90vh] md:max-h-[85vh] rounded-[32px] shadow-2xl overflow-hidden relative z-10 flex flex-col md:flex-row animate-scaleIn">
                            
                            {/* Close Trigger Icon */}
                            <button 
                                onClick={closeModal}
                                className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-white/80 backdrop-blur-md border border-gray-100 text-gray-500 hover:text-gray-800 hover:shadow-md transition-all active:scale-90"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l18 18" />
                                </svg>
                            </button>

                            {/* LEFT SIDE COLUMN: Media / Picture Switcher View */}
                            <div className="w-full md:w-1/2 bg-emerald-950/5 p-6 flex flex-col justify-center border-b md:border-b-0 md:border-r border-gray-100 min-h-[280px] md:min-h-0">
                                {selectedPost.pictures && selectedPost.pictures.length > 0 ? (
                                    <div className="flex flex-col gap-4 h-full justify-center">
                                        {/* Dynamic Active Display Image Container */}
                                        <div className="flex-grow aspect-video md:aspect-[4/3] rounded-2xl overflow-hidden bg-black/5 relative shadow-sm max-h-[320px] md:max-h-none">
                                            <img 
                                                src={`/storage/${selectedPost.pictures[activeImageIdx]}`} 
                                                alt={selectedPost.title}
                                                className="w-full h-full object-cover transition-all duration-300"
                                            />
                                        </div>

                                        {/* Multi-Image Thumbnail Strip Slider */}
                                        {selectedPost.pictures.length > 1 && (
                                            <div className="flex gap-2 overflow-x-auto pb-1 snap-x hide-scrollbar px-1 justify-start">
                                                {selectedPost.pictures.map((pic, idx) => (
                                                    <button
                                                        key={idx}
                                                        onClick={() => setActiveImageIdx(idx)}
                                                        className={`w-16 h-16 md:w-20 md:h-20 flex-shrink-0 rounded-xl overflow-hidden snap-center border-2 transition-all shadow-sm ${
                                                            activeImageIdx === idx 
                                                                ? 'border-emerald-600 scale-95 ring-4 ring-emerald-600/10' 
                                                                : 'border-white hover:border-emerald-200 opacity-70 hover:opacity-100'
                                                        }`}
                                                    >
                                                        <img 
                                                            src={`/storage/${pic}`} 
                                                            alt={`Thumbnail view ${idx + 1}`} 
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    /* Image Fallback Icon Placeholders */
                                    <div className="flex items-center justify-center aspect-[4/3] w-full rounded-2xl bg-emerald-50 text-emerald-200">
                                        <svg className="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L28 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                )}
                            </div>

                            {/* RIGHT SIDE COLUMN: Core Post Text & Info Content */}
                            <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-between overflow-y-auto h-auto max-h-[50vh] md:max-h-none">
                                <div className="flex flex-col flex-grow">
                                    <div className="text-xs font-bold text-emerald-700 uppercase tracking-widest mb-2 flex items-center gap-2">
                                        <span>Community Story</span>
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-300"></span>
                                        <span className="text-gray-500 font-medium">
                                            {new Date(selectedPost.created_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                                        </span>
                                    </div>
                                    
                                    <h2 className="text-2xl md:text-3xl font-black text-emerald-950 mb-4 leading-tight">
                                        {selectedPost.title}
                                    </h2>

                                    {/* Description Body: Handles full length seamlessly with clean breaks */}
                                    <div className="text-gray-700 leading-relaxed whitespace-pre-wrap pr-2 text-sm md:text-base max-h-[220px] md:max-h-[340px] overflow-y-auto">
                                        {selectedPost.description}
                                    </div>
                                </div>

                                {/* Modal Footing: Author Card info row */}
                                <div className="flex items-center gap-3 pt-6 border-t border-gray-100 mt-6">
                                    <div className="w-11 h-11 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-black shadow-sm text-base">
                                        {selectedPost.user?.name?.charAt(0)?.toUpperCase() || "?"}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-bold text-emerald-950">
                                            {selectedPost.user?.name || "Author"}
                                        </span>
                                        <span className="text-xs font-medium text-gray-500">
                                            Local Roots Contributor
                                        </span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                )}

                {/* Simple Footer */}
                <footer className="w-full bg-emerald-950 text-emerald-100 py-8 relative z-10 border-t border-emerald-900/50 mt-auto">
                    <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-2 group w-fit opacity-80">
                            <span className="p-1.5 rounded-lg bg-emerald-800 text-white shadow-md">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
                                </svg>
                            </span>
                            <span className="font-extrabold tracking-tight text-white">Local Roots</span>
                        </div>
                        <div className="text-xs text-emerald-400/70">
                            &copy; 2026 Local Roots. All rights reserved.
                        </div>
                    </div>
                </footer>

                {/* Keyframes style helper for layout animations */}
                <style>{`
                    .hide-scrollbar::-webkit-scrollbar {
                        display: none;
                    }
                    .hide-scrollbar {
                        -ms-overflow-style: none;
                        scrollbar-width: none;
                    }
                    @keyframes fadeIn {
                        from { opacity: 0; }
                        to { opacity: 1; }
                    }
                    @keyframes scaleIn {
                        from { transform: scale(0.95); opacity: 0; }
                        to { transform: scale(1); opacity: 1; }
                    }
                    .animate-fadeIn {
                        animation: fadeIn 0.2s ease-out forwards;
                    }
                    .animate-scaleIn {
                        animation: scaleIn 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                    }
                `}</style>
            </div>
        </>
    );
}