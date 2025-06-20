"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

interface ApplyButtonProps {
  jobId: string;
}

export default function ApplyButton({ jobId }: ApplyButtonProps) {
  const { data: session } = useSession();
  const router = useRouter();

  const [applicationStatus, setApplicationStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleApply = async () => {
    if (!session) {
      router.push("/auth/signin");
      return;
    }

    setErrorMessage("");
    setApplicationStatus("idle");

    try {
      const res = await fetch(`/api/jobs/${jobId}/apply`, {
        method: "POST",
      });

      if (!res.ok) {
        const message = await res.text();
        throw new Error(message || "Failed to apply for the job");
      }

      setApplicationStatus("success");
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Something went wrong");
      }
      setApplicationStatus("error");
    }
  };

  return (
    <div className="mt-4">
      <button
        onClick={handleApply}
        className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
      >
        Apply Now
      </button>

      {applicationStatus === "success" && (
        <p className="mt-2 text-green-600">✅ Application submitted!</p>
      )}
      {applicationStatus === "error" && (
        <p className="mt-2 text-red-600">{errorMessage}</p>
      )}
    </div>
  );
}
