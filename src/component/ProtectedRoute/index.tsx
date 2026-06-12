"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, ReactNode } from "react";
import { getAuthToken } from "@/utils/auth";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({
  children,
}: ProtectedRouteProps) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    const token = getAuthToken();

    if (!token) {
      router.replace("/login");
      setIsAuthorized(false);
    } else {
      setIsAuthorized(true);
    }
  }, [router]);

  if (isAuthorized === null) {
    return <div>Loading...</div>;
  }

  if (!isAuthorized) {
    return null;
  }

  return <>{children}</>;
}