"use client";

import { useState } from "react";
import { Button, Modal } from "@heroui/react";
import { toast } from "react-hot-toast";
import { reportLesson } from "../../lib/actions/reports";

export function ReportModal({ lessonId, user, isOpen, onClose }) {
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
      setReason(""); // Reset
      onClose(); // Close modal
    } catch (error) {
      toast.error("Failed to submit report");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal open={isOpen} onOpenChange={onClose}>
      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog className="bg-[#121212] border border-zinc-800 text-white sm:max-w-md">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Heading className="text-xl font-bold">
                Report This Lesson
              </Modal.Heading>
            </Modal.Header>

            <Modal.Body>
              <p className="text-zinc-300 text-sm mb-2">
                Why are you reporting this lesson?
              </p>
              <select
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="bg-[#1a1a1a] text-white border border-zinc-700 rounded-xl px-3 py-2 w-full focus:outline-none focus:border-indigo-500 transition-colors"
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

            <Modal.Footer>
              <Button variant="ghost" slot="close" className="text-zinc-400">
                Cancel
              </Button>
              <Button
                onPress={handleSubmit}
                isLoading={isSubmitting}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                Submit Report
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
