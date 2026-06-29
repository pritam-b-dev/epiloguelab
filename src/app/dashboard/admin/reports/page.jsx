import AdminReportsTable from "../../../../components/dashboard/AdminReportsTable";
import { getReports } from "../../../../lib/api/reports";

export default async function AdminReportsPage() {
  const reportsData = await getReports();

  const reports = Array.isArray(reportsData)
    ? reportsData
    : reportsData?.reports || reportsData?.data || [];

  return (
    <div className="max-w-5xl mx-auto px-2 py-4">
      <AdminReportsTable initialReports={reports} />
    </div>
  );
}
