import { Head, useForm, usePage } from "@inertiajs/react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import React, { useState, useEffect } from "react";

export default function Blogpost({ blogposts = [] }) {
    const { flash } = usePage().props;
    const [showSuccess, setShowSuccess] = useState(false);
    const [previews, setPreviews] = useState([]);

    const { data, setData, post, processing, errors, reset } = useForm({
        title: "",
        description: "",
        pictures: [],
    });

    // Show success toast when flash message arrives
    useEffect(() => {
        if (flash?.success) {
            setShowSuccess(true);
            const timer = setTimeout(() => setShowSuccess(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [flash?.success]);

    // Clean up preview URLs on unmount
    useEffect(() => {
        return () => {
            previews.forEach((p) => URL.revokeObjectURL(p.url));
        };
    }, []);

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        const validFiles = files.filter((f) =>
            ["image/jpeg", "image/png", "image/jpg"].includes(f.type)
        );

        const newPreviews = validFiles.map((file) => ({
            file,
            url: URL.createObjectURL(file),
        }));

        const updatedPreviews = [...previews, ...newPreviews];
        setPreviews(updatedPreviews);
        setData("pictures", updatedPreviews.map((p) => p.file));

        // Reset the input so the same file can be re-selected
        e.target.value = "";
    };

    const removeImage = (index) => {
        URL.revokeObjectURL(previews[index].url);
        const updatedPreviews = previews.filter((_, i) => i !== index);
        setPreviews(updatedPreviews);
        setData("pictures", updatedPreviews.map((p) => p.file));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("superadmin.blogpost.store"), {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setPreviews([]);
            },
        });
    };

    return (
        <DashboardLayout>
            <Head title="Blog Post" />

            <div className="max-w-5xl mx-auto">
                {/* Success Toast */}
                {showSuccess && (
                    <div className="fixed top-6 right-6 z-50 animate-slide-in">
                        <div className="flex items-center gap-3 bg-emerald-600 text-white px-6 py-4 rounded-2xl shadow-2xl shadow-emerald-500/30">
                            <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="font-bold">{flash.success}</span>
                        </div>
                    </div>
                )}

                {/* Page Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-extrabold text-green-800 dark:text-green-300 mb-2 border-b-2 border-green-300 dark:border-green-700 pb-1 w-max">
                        Blog Post Management
                    </h1>
                    <p className="text-green-700 dark:text-green-200 text-sm">
                        Create and manage blog posts to share updates, news, and
                        information with your audience.
                    </p>
                </div>

                {/* ─── Creation Form ─── */}
                <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-emerald-100 dark:border-gray-700 overflow-hidden mb-10">
                    <div className="p-8">
                        <h2 className="text-xl font-black text-emerald-950 dark:text-white uppercase tracking-tight mb-6 flex items-center gap-2">
                            <span className="inline-flex items-center justify-center w-8 h-8 bg-emerald-100 dark:bg-emerald-900/50 rounded-xl">
                                <svg className="w-4 h-4 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                                </svg>
                            </span>
                            Create New Post
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Title */}
                            <div>
                                <label
                                    htmlFor="blogpost-title"
                                    className="block text-[10px] font-black uppercase text-emerald-700/60 dark:text-emerald-400/60 mb-2 tracking-widest"
                                >
                                    Title
                                </label>
                                <input
                                    id="blogpost-title"
                                    type="text"
                                    value={data.title}
                                    onChange={(e) =>
                                        setData("title", e.target.value)
                                    }
                                    className={`w-full px-4 py-3 border rounded-2xl bg-white dark:bg-gray-900 dark:text-white font-bold focus:ring-emerald-500 focus:border-emerald-500 transition-colors ${
                                        errors.title
                                            ? "border-red-400"
                                            : "border-emerald-100 dark:border-gray-600"
                                    }`}
                                    placeholder="Enter your blog post title..."
                                />
                                {errors.title && (
                                    <p className="mt-1.5 text-xs font-bold text-red-500">
                                        {errors.title}
                                    </p>
                                )}
                            </div>

                            {/* Description */}
                            <div>
                                <label
                                    htmlFor="blogpost-description"
                                    className="block text-[10px] font-black uppercase text-emerald-700/60 dark:text-emerald-400/60 mb-2 tracking-widest"
                                >
                                    Description
                                </label>
                                <textarea
                                    id="blogpost-description"
                                    value={data.description}
                                    onChange={(e) =>
                                        setData("description", e.target.value)
                                    }
                                    rows={5}
                                    className={`w-full px-4 py-3 border rounded-2xl bg-white dark:bg-gray-900 dark:text-white font-medium focus:ring-emerald-500 focus:border-emerald-500 transition-colors resize-none ${
                                        errors.description
                                            ? "border-red-400"
                                            : "border-emerald-100 dark:border-gray-600"
                                    }`}
                                    placeholder="Write the content of your blog post..."
                                />
                                {errors.description && (
                                    <p className="mt-1.5 text-xs font-bold text-red-500">
                                        {errors.description}
                                    </p>
                                )}
                            </div>

                            {/* Pictures Upload */}
                            <div>
                                <label className="block text-[10px] font-black uppercase text-emerald-700/60 dark:text-emerald-400/60 mb-2 tracking-widest">
                                    Pictures
                                </label>

                                {/* Drop Zone */}
                                <label
                                    htmlFor="blogpost-pictures"
                                    className={`group relative flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-2xl cursor-pointer transition-all duration-200 ${
                                        errors.pictures
                                            ? "border-red-400 bg-red-50/30 dark:bg-red-900/10"
                                            : "border-emerald-200 dark:border-gray-600 bg-emerald-50/30 dark:bg-gray-900 hover:border-emerald-400 hover:bg-emerald-50 dark:hover:bg-gray-800"
                                    }`}
                                >
                                    <div className="flex flex-col items-center gap-2 text-emerald-500 dark:text-emerald-400 group-hover:scale-105 transition-transform">
                                        <svg
                                            className="w-10 h-10"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={1.5}
                                                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                                            />
                                        </svg>
                                        <div className="text-center">
                                            <p className="text-sm font-bold">
                                                Click to upload images
                                            </p>
                                            <p className="text-[10px] font-semibold text-emerald-400/60 dark:text-emerald-500/60 uppercase tracking-wider">
                                                JPG, JPEG, PNG • Max 2MB each
                                            </p>
                                        </div>
                                    </div>
                                    <input
                                        id="blogpost-pictures"
                                        type="file"
                                        accept=".jpg,.jpeg,.png"
                                        multiple
                                        onChange={handleFileChange}
                                        className="hidden"
                                    />
                                </label>

                                {errors.pictures && (
                                    <p className="mt-1.5 text-xs font-bold text-red-500">
                                        {errors.pictures}
                                    </p>
                                )}
                                {/* Check for per-file errors */}
                                {Object.keys(errors)
                                    .filter((key) =>
                                        key.startsWith("pictures.")
                                    )
                                    .map((key) => (
                                        <p
                                            key={key}
                                            className="mt-1 text-xs font-bold text-red-500"
                                        >
                                            {errors[key]}
                                        </p>
                                    ))}

                                {/* Image Previews */}
                                {previews.length > 0 && (
                                    <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                        {previews.map((preview, index) => (
                                            <div
                                                key={index}
                                                className="relative group rounded-2xl overflow-hidden border border-emerald-100 dark:border-gray-700 shadow-sm hover:shadow-lg hover:shadow-emerald-200/40 dark:hover:shadow-none transition-all duration-300"
                                            >
                                                <img
                                                    src={preview.url}
                                                    alt={`Preview ${index + 1}`}
                                                    className="w-full h-32 object-cover"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        removeImage(index)
                                                    }
                                                    className="absolute top-2 right-2 w-7 h-7 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-lg transform group-hover:scale-100 scale-75"
                                                >
                                                    <svg
                                                        className="w-3.5 h-3.5"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={3}
                                                            d="M6 18L18 6M6 6l12 12"
                                                        />
                                                    </svg>
                                                </button>
                                                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/50 to-transparent p-2">
                                                    <p className="text-[9px] font-bold text-white/80 truncate">
                                                        {preview.file.name}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Submit Button */}
                            <button
                                id="blogpost-submit"
                                type="submit"
                                disabled={processing}
                                className="w-full py-4 rounded-2xl text-lg font-black text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-emerald-200 dark:shadow-none transition-all duration-200 flex items-center justify-center gap-3"
                            >
                                {processing ? (
                                    <>
                                        <svg
                                            className="animate-spin h-5 w-5 text-white"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            />
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            />
                                        </svg>
                                        Publishing...
                                    </>
                                ) : (
                                    "Create Blog Post"
                                )}
                            </button>
                        </form>
                    </div>
                </div>

                {/* ─── Existing Blog Posts ─── */}
                {blogposts.length > 0 && (
                    <div className="mb-10">
                        <h2 className="text-xl font-black text-emerald-950 dark:text-white uppercase tracking-tight mb-6 flex items-center gap-2">
                            <span className="inline-flex items-center justify-center w-8 h-8 bg-emerald-100 dark:bg-emerald-900/50 rounded-xl">
                                <svg className="w-4 h-4 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                                </svg>
                            </span>
                            Published Posts ({blogposts.length})
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {blogposts.map((post) => (
                                <div
                                    key={post.id}
                                    className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-sm border border-emerald-100 dark:border-gray-700 hover:shadow-xl hover:shadow-emerald-200/50 dark:hover:shadow-none transition-all duration-300 group"
                                >
                                    {/* Image Banner */}
                                    {post.pictures && post.pictures.length > 0 && (
                                        <div className="h-48 overflow-hidden">
                                            <img
                                                src={`/storage/${post.pictures[0]}`}
                                                alt={post.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                            {post.pictures.length > 1 && (
                                                <div className="absolute top-3 right-3 bg-black/50 text-white text-[10px] font-bold px-2.5 py-1 rounded-full backdrop-blur-sm">
                                                    +{post.pictures.length - 1} more
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* Content */}
                                    <div className="p-6">
                                        <h3 className="font-black text-lg text-emerald-950 dark:text-emerald-50 mb-2 line-clamp-1">
                                            {post.title}
                                        </h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 mb-4 leading-relaxed">
                                            {post.description}
                                        </p>
                                        <div className="flex items-center justify-between pt-3 border-t border-emerald-50 dark:border-gray-700">
                                            <div className="flex items-center gap-2">
                                                <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center">
                                                    <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-400">
                                                        {post.user?.name?.charAt(0)?.toUpperCase() || "?"}
                                                    </span>
                                                </div>
                                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                                                    {post.user?.name || "Unknown"}
                                                </span>
                                            </div>
                                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                                                {new Date(post.created_at).toLocaleDateString("en-US", {
                                                    month: "short",
                                                    day: "numeric",
                                                    year: "numeric",
                                                })}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Empty State */}
                {blogposts.length === 0 && (
                    <div className="text-center py-16">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-50 dark:bg-emerald-900/20 rounded-full mb-4">
                            <svg className="w-10 h-10 text-emerald-300 dark:text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-black text-gray-400 dark:text-gray-500 uppercase tracking-tight">
                            No Posts Yet
                        </h3>
                        <p className="text-sm text-gray-400 dark:text-gray-600 mt-1">
                            Create your first blog post using the form above.
                        </p>
                    </div>
                )}
            </div>

            {/* Inline styles for the slide-in animation */}
            <style>{`
                @keyframes slide-in {
                    from {
                        opacity: 0;
                        transform: translateX(100px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
                .animate-slide-in {
                    animation: slide-in 0.3s ease-out forwards;
                }
            `}</style>
        </DashboardLayout>
    );
}