"use server";

import { DB_COLLECTIONS } from "@/constants";
import { ROUTES } from "@/constants/routes";
import { auth, db } from "@/firebase/admin";
import { cookies } from "next/headers";

const ONE_WEEK = 60 * 60 * 24 * 7 * 1000;
const COOKIE_SESSION_KEY = "session";

export async function signUp(params: SignUpParams) {
  const { name, email, uid } = params;

  try {
    const userRecord = await db.collection(DB_COLLECTIONS.USERS).doc(uid).get();

    if (userRecord.exists) {
      return {
        success: false,
        message: "User already exists. Please sign in instead.",
      };
    }

    await db.collection(DB_COLLECTIONS.USERS).doc(uid).set({
      name,
      email,
    });

    return {
      success: true,
      message: "Account created successfully. Please sign in",
    };
  } catch (error) {
    console.log("Error while creating a user", error);

    return {
      success: false,
      message: "Failed to create an account.",
    };
  }
}

export async function signIn(params: SignInParams) {
  const { email, idToken } = params;

  try {
    const userRecord = await auth.getUserByEmail(email);

    if (!userRecord) {
      return {
        success: false,
        message: "User does not exist. Create an account instead.",
      };
    }

    await setSessionCookie(idToken);
  } catch (error) {
    console.error("Error while trying to sign in", error);

    return {
      success: false,
      message: "Failed to log into an account.",
    };
  }
}

export async function setSessionCookie(idToken: string) {
  const cookieStore = await cookies();

  const sessionCookie = await auth.createSessionCookie(idToken, {
    expiresIn: ONE_WEEK,
  });

  cookieStore.set(COOKIE_SESSION_KEY, sessionCookie, {
    maxAge: ONE_WEEK,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: ROUTES.HOME,
    sameSite: "lax",
  });
}

export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(COOKIE_SESSION_KEY)?.value;

  if (!sessionCookie) {
    return null;
  }

  try {
    const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);

    const userRecord = await db
      .collection(DB_COLLECTIONS.USERS)
      .doc(decodedClaims.uid)
      .get();

    if (!userRecord.exists) {
      return null;
    }

    return { ...userRecord.data(), id: userRecord.id } as User;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

export async function isAuthenticated() {
  const user = await getCurrentUser();
  return !!user;
}

export async function signOut() {
  const cookieStore = await cookies();

  // Remove the session cookie by expiring it and deleting it
  cookieStore.set(COOKIE_SESSION_KEY, "", {
    maxAge: 0,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: ROUTES.HOME,
    sameSite: "lax",
  });
  cookieStore.delete(COOKIE_SESSION_KEY);

  // Redirect to sign-in after clearing the session
  // Import redirect lazily to avoid edge/runtime issues in some environments
  const { redirect } = await import("next/navigation");
  redirect(ROUTES.SIGN_IN);
}
