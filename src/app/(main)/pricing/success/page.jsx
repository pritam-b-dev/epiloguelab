import { redirect } from "next/navigation";
import { Check } from "lucide-react";
import Link from "next/link";
import { stripe } from "../../../../lib/stripe";
import { confirmPayment } from "../../../../lib/actions/payment";

export default async function SuccessPage({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id) {
    redirect("/pricing");
  }

  const session = await stripe.checkout.sessions.retrieve(session_id);

  if (session.payment_status === "paid") {
    await confirmPayment({ sessionId: session_id });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <div className="bg-[#121212] border border-zinc-800 rounded-3xl p-10 max-w-md w-full text-center">
        {/* Green Circle */}
        <div className="bg-green-500/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="w-10 h-10 text-green-500" />
        </div>

        <h1 className="text-3xl font-bold text-white">
          Payment Successful! 🎉
        </h1>
        <p className="text-zinc-400 mt-2">Welcome to Premium!</p>

        <div className="mt-6 p-4 bg-zinc-900/50 rounded-xl">
          <p className="text-sm text-zinc-500">Email:</p>
          <p className="text-indigo-400 font-medium">
            {session.customer_details?.email}
          </p>
        </div>

        <div className="flex flex-col gap-3 mt-8">
          <Link
            href="/dashboard"
            className="w-full py-3 bg-white text-black font-semibold rounded-xl hover:bg-zinc-200 transition"
          >
            Go to Dashboard
          </Link>
          <Link
            href="/lessons"
            className="w-full py-3 bg-zinc-800 text-white font-semibold rounded-xl hover:bg-zinc-700 transition"
          >
            Explore Lessons
          </Link>
        </div>
      </div>
    </div>
  );
}
