import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 select-none">
      <div className="text-center">
        {/* Animated Error Code */}
        <h1 className="text-9xl font-black text-blue-600 tracking-widest animate-pulse">
          404
        </h1>

        {/* Error Message */}
        <h2 className="text-3xl font-bold text-gray-900 mt-4 mb-2 md:text-4xl">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="text-gray-500 mb-8 max-w-md mx-auto text-base sm:text-lg">
          Sorry, the page you are looking for does not exist, has been removed,
          or the URL is incorrect.
        </p>

        {/* Back to Home Button */}
        <Link
          href="/"
          className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg shadow-sm transition-all duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
