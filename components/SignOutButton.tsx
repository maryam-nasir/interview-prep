"use client";

import { Button } from "@/components/ui/button";
import { auth } from "@/firebase/client";
import { signOut as serverSignOut } from "@/lib/actions/auth.action";
import { signOut as firebaseSignOut } from "firebase/auth";
import {useTransition} from "react";

export default function SignOutButton() {
  const [isPending, startTransition] = useTransition();

  async function handleClick() {
    try {
      // Best-effort client sign-out; don't block on errors
      await firebaseSignOut(auth);
    } catch (error) {
      // no-op
    }

    startTransition(async () => {
      // Clears session cookie and redirects on the server
      await serverSignOut();
    });
  }

  return (
    <Button variant="outline" onClick={handleClick} disabled={isPending}>
      {isPending ? "Signing out..." : "Sign out"}
    </Button>
  );
}


