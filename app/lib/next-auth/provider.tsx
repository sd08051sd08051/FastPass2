"use client";

import { SessionProvider } from "next-auth/react";
import React from "react";
import { FC, PropsWithChildren } from "react";

export const NextAuthProvider: FC<PropsWithChildren> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};
