import Link from "next/link";

export default function NotFound() {
  return (
    <div className="bg-black min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden select-none">
      {/* Huge Background Text */}
      <div className="absolute text-[120px] sm:text-[180px] font-black text-zinc-900 tracking-tighter leading-none z-0 pointer-events-none opacity-60">
        404
      </div>

      {/* Content Content Content */}
      <div className="z-10 flex flex-col items-center text-center space-y-2 mt-12">
        <h1 className="text-3xl font-bold text-white tracking-tight sm:text-4xl">
          Page Not Found
        </h1>
        <p className="text-zinc-400 text-sm max-w-sm px-4">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-6 w-full max-w-xs sm:max-w-none justify-center">
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm rounded-xl transition-all text-center"
          >
            Go Home
          </Link>
          <Link
            href="/lessons"
            className="w-full sm:w-auto px-6 py-3 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white font-medium text-sm rounded-xl transition-all text-center"
          >
            Browse Lessons
          </Link>
        </div>
      </div>
    </div>
  );
}
