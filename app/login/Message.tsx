"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * Messages component displays error or informational messages
 * based on query parameters in the URL.
 */
const Messages = () => {
  // Use the useSearchParams hook to access query parameters from the URL
  const searchParams = useSearchParams();

  // Extract error and message query parameters
  const error = searchParams.get("error");
  const message = searchParams.get("message");

  const [visibleError, setVisibleError] = useState<string | null>(null);
  const [visibleMessage, setVisibleMessage] = useState<string | null>(null);

  useEffect(() => {
    // Set a timeout to hide the error message after 5 seconds
    if (error) {
      setVisibleError(error);
      setTimeout(() => {
        setVisibleError(null);
      }, 5000); // 5000 milliseconds = 5 seconds
    }

    // Set a timeout to hide the message after 5 seconds
    if (message) {
      setVisibleMessage(message);
      setTimeout(() => {
        setVisibleMessage(null);
      }, 5000); // 5000 milliseconds = 5 seconds
    }
  }, [error, message]);

  return (
    <div className="mx-auto max-w-md">
      {visibleError && (
        <div className="mt-4 rounded-md bg-red-500 p-4 text-center text-white">
          {visibleError}
        </div>
      )}
      {visibleMessage && (
        <div className="mt-4 rounded-md bg-blue-500 p-4 text-center text-white">
          {visibleMessage}
        </div>
      )}
    </div>
  );
};

export default Messages;
