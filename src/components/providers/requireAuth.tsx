"use client";

import { getAccessToken } from "@/libs/tokens";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const accessToken = getAccessToken();
  useEffect(() => {
    if (!accessToken) {
      router.replace("/login");
    }
  }, [accessToken, router]);

  return accessToken ? children : null;
};

export default RequireAuth;
