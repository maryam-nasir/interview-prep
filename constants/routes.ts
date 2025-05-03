export const ROUTES = {
  SIGN_IN: "/sign-in",
  SIGN_UP: "/sign-up",
  HOME: "/",
  INTERVIEW: "/interview",
  TAKE_INTERVIEW: (interviewId: string) => `/interview/${interviewId}`,
  FEEDBACK: (interviewId: string) => `/interview/${interviewId}/feedback`,
};
