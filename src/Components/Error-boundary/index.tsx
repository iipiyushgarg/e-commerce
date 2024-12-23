import React, { useState, useEffect } from "react";

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

const useErrorBoundary = () => {
  const [hasError, setHasError] = useState(false);

  const handleError = (error: Error) => {
    setHasError(true);
    throw new Error("Caught an error: " + error);
  };

  return { hasError, handleError };
};

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children }) => {
  const { hasError, handleError } = useErrorBoundary();

  useEffect(() => {
    const errorHandler = (event: ErrorEvent) => {
      handleError(event.error);
    };

    window.addEventListener("error", errorHandler);

    return () => {
      window.removeEventListener("error", errorHandler);
    };
  }, [handleError]);

  if (hasError) {
    return (
      <div>
        <h1>Something went wrong.</h1>
        <p>Please try again later.</p>
      </div>
    );
  }

  return <>{children}</>;
};

export default ErrorBoundary;
