"use client";

import { SessionProvider } from "next-auth/react";

interface AuthContenxtPros {
  children: React.ReactNode;
}

export default function AuthContext({ children }: AuthContenxtPros) {
  return <SessionProvider>{children}</SessionProvider>;
}
