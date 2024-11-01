"use client";

import { getAccessToken } from "@/libs/tokens";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const RequireGuest = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const accessToken = getAccessToken();

  useEffect(() => {
    if (accessToken) {
      router.replace("/");
    }
  }, [accessToken, router]);

  return !accessToken ? <>{children}</> : null;
};

export default RequireGuest;
