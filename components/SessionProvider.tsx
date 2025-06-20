"use client";

import { SessionProvider as Provider } from "next-auth/react";
import { ReactNode } from "react";
import type { Session } from "next-auth";

interface Props {
  children: ReactNode;
  session?: Session | null;
}

export default function SessionProvider({ children, session }: Props) {
  return <Provider session={session}>{children}</Provider>;
}
