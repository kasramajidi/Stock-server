"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "swagger-ui-react/swagger-ui.css";
import "./swagger-overrides.css";

const SwaggerUI = dynamic(
  () => import("swagger-ui-react").then((mod) => mod.default),
  { ssr: false, loading: () => <div className="p-8">در حال بارگذاری Swagger...</div> }
);

export default function ApiDocsPage() {
  const [spec, setSpec] = useState<Record<string, unknown> | null>(null);

  useEffect(() => {
    fetch("/api/swagger")
      .then((res) => res.json())
      .then(setSpec)
      .catch(() => setSpec(null));
  }, []);

  if (!spec) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <p>در حال بارگذاری مستندات API...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <SwaggerUI spec={spec} />
    </div>
  );
}
