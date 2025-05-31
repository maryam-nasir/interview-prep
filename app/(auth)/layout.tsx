import { ROUTES } from "@/constants/routes";
import { isAuthenticated } from "@/lib/actions/auth.action";
import { redirect } from "next/navigation";
import React from "react";

const AuthLayout = async ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const isUserAuthenticated = await isAuthenticated();
  if (isUserAuthenticated) redirect(ROUTES.HOME);

  return <div className="auth-layout">{children}</div>;
};

export default AuthLayout;
