"use client";

import { useState } from "react";
import { Table, Modal, Button } from "@heroui/react";
import toast from "react-hot-toast";
import { deleteLesson } from "../../lib/actions/lessons";
import { ignoreReports } from "../../lib/actions/reports";

export default function AdminReportsTable({ initialReports = [] }) {
  const [reportsList, setReportsList] = useState(initialReports);
  const [selectedGroup, setSelectedGroup] = useState(null);

  const handleDeleteLesson = async (lessonId) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this reported lesson permanently?",
      )
    )
      return;

    try {
      const res = await deleteLesson(lessonId);
      if (res?.success || res) {
        setReportsList((prev) =>
          prev.filter((group) => group.lessonId !== lessonId),
        );
        toast.success("Lesson deleted and reports cleared");
      } else {
        toast.error("Failed to delete lesson");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const handleIgnoreAll = async (lessonId) => {
    if (!window.confirm("Ignore all reports for this lesson?")) return;

    try {
      const res = await ignoreReports(lessonId);
      if (res?.success || res) {
        setReportsList((prev) =>
          prev.filter((group) => group.lessonId !== lessonId),
        );
        toast.success("Reports cleared successfully");
      } else {
        toast.error("Failed to clear reports");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="space-y-6">
      {/* Heading & Badge */}
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-bold text-white">Review Reports</h1>
        <div className="bg-red-500/20 text-red-400 font-semibold px-2.5 py-0.5 text-sm rounded-full border border-red-500/20">
          {reportsList.length} Unique Lessons
        </div>
      </div>

      {/* HeroUI v3 Table */}
      {reportsList.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-zinc-800 rounded-2xl text-zinc-500 text-sm">
          No active reports found. Platform is clean!
        </div>
      ) : (
        <div className="w-full bg-[#121212] border border-zinc-800 rounded-2xl overflow-hidden">
          <Table.ScrollContainer>
            <Table aria-label="Admin content reports table" className="w-full">
              <Table.Content>
                <Table.Header>
                  <Table.Column className="bg-zinc-900 text-zinc-400 font-medium p-4 text-left">
                    LESSON ID
                  </Table.Column>
                  <Table.Column className="bg-zinc-900 text-zinc-400 font-medium p-4 text-left">
                    REPORT COUNT
                  </Table.Column>
                  <Table.Column className="bg-zinc-900 text-zinc-400 font-medium p-4 text-right">
                    ACTIONS
                  </Table.Column>
                </Table.Header>

                <Table.Body>
                  {reportsList.map((group) => (
                    <Table.Row
                      key={group.lessonId}
                      className="border-b border-zinc-800/60 hover:bg-zinc-900/30 transition-all"
                    >
                      {/* Lesson ID Shortened */}
                      <Table.Cell className="p-4 text-sm font-mono text-zinc-400">
                        {group.lessonId
                          ? `${group.lessonId.substring(0, 12)}...`
                          : "N/A"}
                      </Table.Cell>

                      {/* Report Count Badge */}
                      <Table.Cell className="p-4">
                        <span className="px-2.5 py-1 text-xs font-semibold bg-red-500/10 text-red-400 rounded-md border border-red-500/20">
                          🚩 {group.count || group.reports?.length || 0} Reports
                        </span>
                      </Table.Cell>

                      {/* Action Buttons */}
                      <Table.Cell className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setSelectedGroup(group)}
                            className="text-xs font-medium bg-zinc-800 border border-zinc-700 text-zinc-200 hover:text-white px-3 py-1.5 rounded-xl transition-all cursor-pointer"
                          >
                            View Details
                          </button>

                          <button
                            onClick={() => handleIgnoreAll(group.lessonId)}
                            className="text-xs font-medium bg-zinc-800 text-zinc-400 border border-zinc-700 hover:bg-zinc-700 px-3 py-1.5 rounded-xl transition-all cursor-pointer"
                          >
                            Ignore All
                          </button>

                          <button
                            onClick={() => handleDeleteLesson(group.lessonId)}
                            className="text-xs font-medium bg-red-600/10 text-red-400 border border-red-500/20 hover:bg-red-600 hover:text-white px-3 py-1.5 rounded-xl transition-all cursor-pointer"
                          >
                            Delete Lesson
                          </button>
                        </div>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Content>
            </Table>
          </Table.ScrollContainer>
        </div>
      )}

      {/* HeroUI v3 Modal for Report Details */}
      <Modal
        isOpen={selectedGroup !== null}
        onOpenChange={(open) => !open && setSelectedGroup(null)}
        className="dark text-white bg-[#121212] border border-zinc-800 rounded-2xl max-w-lg mx-auto"
      >
        <Modal.Content>
          <Modal.Header className="flex flex-col gap-1 border-b border-zinc-800 p-4 font-bold text-lg">
            Reports for this Lesson
          </Modal.Header>

          <Modal.Body className="p-4 max-h-[400px] overflow-y-auto space-y-3">
            {selectedGroup?.reports?.map((report, idx) => (
              <div
                key={report._id || idx}
                className="bg-[#1a1a1a] border border-zinc-800 p-3 rounded-xl space-y-2"
              >
                <div className="flex justify-between items-start gap-2">
                  <span
                    className="text-sm font-medium text-zinc-200 truncate"
                    title={report.reporterEmail}
                  >
                    {report.reporterEmail || "Anonymous User"}
                  </span>
                  <span className="text-[11px] text-zinc-500 whitespace-nowrap shrink-0">
                    {report.timestamp
                      ? new Date(report.timestamp).toLocaleDateString()
                      : "N/A"}
                  </span>
                </div>
                <div>
                  <span className="inline-block px-2 py-0.5 text-xs font-medium bg-zinc-800 text-red-400 rounded-md border border-zinc-700/60">
                    {report.reason || "No reason specified"}
                  </span>
                </div>
              </div>
            ))}
          </Modal.Body>

          <Modal.Footer className="border-t border-zinc-800 p-4">
            <Button
              className="bg-zinc-800 text-zinc-300 font-medium text-sm rounded-xl px-4 py-2 hover:bg-zinc-700 w-full"
              onClick={() => setSelectedGroup(null)}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </div>
  );
}
