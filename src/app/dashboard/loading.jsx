import { Spinner } from "@heroui/react";

export default function DashboardLoading() {
  return (
    <div className="bg-black min-h-screen flex flex-col items-center justify-center p-4">
      <Spinner size="lg" color="secondary" />
      <p className="text-zinc-400 mt-3 text-sm font-medium animate-pulse">
        Loading dashboard...
      </p>
    </div>
  );
}
