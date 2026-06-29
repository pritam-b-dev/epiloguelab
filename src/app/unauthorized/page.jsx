import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <div className="bg-black min-h-screen flex flex-col items-center justify-center p-4 text-center">
      <div className="space-y-6 max-w-md flex flex-col items-center">
        {/* Access Denied Icon */}
        <div className="text-6xl animate-pulse">🚫</div>

        {/* Text Content */}
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-white sm:text-3xl tracking-tight">
            Access Denied
          </h1>
          <p className="text-zinc-400 text-sm">
            You don&apos;t have permission to view this page. Restricted area.
          </p>
        </div>

        {/* Action Button */}
        <div className="pt-4 w-full max-w-xs">
          <Link
            href="/"
            className="inline-block w-full px-6 py-3 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-white font-medium text-sm rounded-xl transition-all"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
