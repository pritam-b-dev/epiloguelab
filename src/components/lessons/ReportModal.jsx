"use client";

import React, { useState } from "react";
import { Button, Modal } from "@heroui/react";
import { toast } from "react-hot-toast";
import { reportLesson } from "../../lib/actions/reports";

export const ReportModal = ({ isOpen, onClose, lessonId, user }) => {
  const [reason, setReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!reason || reason === "Select reason...") {
      toast.error("Please select a reason");
      return;
    }

    setIsSubmitting(true);
    try {
      await reportLesson({ lessonId, reason });
      toast.success("Report submitted successfully");
      setReason("");
      onClose();
    } catch (error) {
      toast.error("Failed to submit report");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose}>
      <Modal.Backdrop className="fixed inset-0 z-[9999] bg-black/60 flex items-center justify-center backdrop-blur-sm">
        <Modal.Container>
          <Modal.Dialog className="bg-[#121212] border border-zinc-800 text-white w-full max-w-lg mx-4 shadow-2xl rounded-2xl p-2">
            <Modal.CloseTrigger className="absolute right-4 top-4 text-zinc-400 hover:text-white" />

            <Modal.Header className="p-6 pb-2">
              <Modal.Heading className="text-2xl font-bold">
                Report This Lesson
              </Modal.Heading>
            </Modal.Header>

            <Modal.Body className="p-6">
              <p className="text-zinc-400 text-sm mb-4">
                Please select a reason for reporting this content. Our team will
                review it shortly.
              </p>
              <select
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="bg-[#1a1a1a] text-white border border-zinc-700 rounded-xl px-4 py-3.5 w-full focus:outline-none focus:ring-2 focus:ring-red-500/50 transition-all"
              >
                <option value="Select reason...">Select reason...</option>
                <option value="Inappropriate Content">
                  Inappropriate Content
                </option>
                <option value="Spam">Spam</option>
                <option value="False Information">False Information</option>
                <option value="Harassment">Harassment</option>
                <option value="Other">Other</option>
              </select>
            </Modal.Body>

            <Modal.Footer className="p-6 pt-0 flex gap-3 justify-end">
              <Button
                variant="light"
                onClick={onClose}
                className="text-zinc-400 hover:bg-zinc-800 rounded-md px-6 py-3 cursor-pointer"
              >
                Cancel
              </Button>
              <Button
                color="primary"
                onClick={handleSubmit}
                isLoading={isSubmitting}
                className="bg-primary hover:bg-primary/70 cursor-pointer text-white font-semibold rounded-md px-6 py-3"
              >
                Submit Report
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};
