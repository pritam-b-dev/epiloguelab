"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { authHeader } from "../../../lib/core/server";
import { authClient } from "../../../lib/auth-client";

export default function PricingPage() {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const features = [
    { label: "Create lessons", free: "Up to 5", premium: "Unlimited" },
    { label: "Premium lesson access", free: "❌", premium: "✅" },
    { label: "View premium content", free: "❌", premium: "✅" },
    { label: "Ad-free experience", free: "❌", premium: "✅" },
    { label: "Priority listing", free: "❌", premium: "✅" },
    { label: "Community badge", free: "❌", premium: "✅ Verified" },
    { label: "Export lessons PDF", free: "❌", premium: "✅" },
    { label: "Priority support", free: "❌", premium: "✅" },
  ];

  const handleCheckout = async () => {
    if (!user) {
      router.push("/signin?redirect=/pricing");
      return;
    }

    setLoading(true);
    try {
      const auth = await authHeader();
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...auth,
        },
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error("Checkout error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-2">
            Choose Your Plan
          </h1>
          <p className="text-zinc-400">Unlock the full power of life wisdom</p>
        </div>

        {user?.isPremium ? (
          /* Premium Status */
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-8 max-w-md mx-auto text-center">
            <h2 className="text-amber-400 text-2xl font-bold">
              You are already Premium! ⭐
            </h2>
            <p className="text-zinc-400 text-sm mt-2">
              Enjoy unlimited access to all premium content.
            </p>
            <button
              onClick={() => router.push("/dashboard")}
              className="mt-6 w-full bg-white text-black font-semibold py-3 rounded-xl hover:bg-zinc-200 transition"
            >
              Go to Dashboard
            </button>
          </div>
        ) : (
          /* Pricing Table & Card */
          <>
            <div className="bg-[#121212] border border-zinc-800 rounded-2xl overflow-hidden mb-8">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-zinc-800">
                    <th className="p-4 text-zinc-400">Features</th>
                    <th className="p-4 text-zinc-400 text-center">Free</th>
                    <th className="p-4 text-white text-center">Premium</th>
                  </tr>
                </thead>
                <tbody>
                  {features.map((item, idx) => (
                    <tr
                      key={idx}
                      className="border-b border-zinc-800 last:border-0"
                    >
                      <td className="p-4 text-zinc-300">{item.label}</td>
                      <td className="p-4 text-zinc-500 text-center">
                        {item.free}
                      </td>
                      <td className="p-4 text-indigo-400 font-semibold text-center">
                        {item.premium}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="max-w-sm mx-auto bg-[#121212] border border-indigo-500/30 rounded-2xl p-8 text-center">
              <div className="mb-4">
                <span className="text-4xl font-bold text-white">৳1,500</span>
                <p className="text-zinc-400 text-sm">one-time / lifetime</p>
              </div>
              <button
                onClick={handleCheckout}
                disabled={loading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition disabled:opacity-50"
              >
                {loading ? "Processing..." : "Upgrade to Premium"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
