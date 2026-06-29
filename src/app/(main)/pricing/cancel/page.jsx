import { AlertTriangle } from "lucide-react";
import Link from "next/link";

export default function CancelPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <div className="bg-[#121212] border border-zinc-800 rounded-3xl p-10 max-w-md w-full text-center">
        {/* Amber Circle */}
        <div className="bg-amber-500/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-10 h-10 text-amber-500" />
        </div>

        <h1 className="text-2xl font-bold text-white">Payment Cancelled</h1>
        <p className="text-zinc-400 mt-2">No charges were made.</p>

        <div className="flex flex-col gap-3 mt-8">
          <Link
            href="/pricing"
            className="w-full py-3 bg-white text-black font-semibold rounded-xl hover:bg-zinc-200 transition"
          >
            Try Again
          </Link>
          <Link
            href="/"
            className="w-full py-3 bg-zinc-800 text-white font-semibold rounded-xl hover:bg-zinc-700 transition"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
