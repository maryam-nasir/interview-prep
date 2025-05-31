"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { AUTH_TYPE } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import { toast } from "sonner";
import InputField from "./InputField";
import { useRouter } from "next/navigation";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "@/firebase/client";
import { signIn, signUp } from "@/lib/actions/auth.action";

const getAuthFormSchema = (type: FormType) => {
  return z.object({
    name:
      type === AUTH_TYPE.SIGN_UP ? z.string().min(3) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(6),
  });
};

type FormType = keyof typeof AUTH_TYPE;

const AuthForm = ({ type }: { type: FormType }) => {
  const router = useRouter();
  const isSignInForm = type === AUTH_TYPE.SIGN_IN;

  const formSchema = getAuthFormSchema(type);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (type === AUTH_TYPE.SIGN_UP) {
        const { name, email, password } = values;

        const userCredentials = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        const result = await signUp({
          uid: userCredentials.user.uid,
          name: name!,
          email,
          password,
        });

        if (!result?.success) {
          toast.error(result?.message);
          return;
        }

        toast.success("Account created successfully. Please sign in.");
        router.push(ROUTES.SIGN_IN);
      } else {
        const { email, password } = values;

        const userCredentials = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        const idToken = await userCredentials.user.getIdToken();

        if (!idToken) {
          toast.error("Sign in failed");
          return;
        }

        await signIn({ email, idToken });
        toast.success("Signed in successfully.");
        router.push(ROUTES.HOME);
      }
    } catch (error: any) {
      if (error?.code === "auth/email-already-in-use") {
        toast.error("This email is already in use. Please try another one.");
        return;
      }
      toast.error(`An error occurred: ${error}`);
    }
  }
  return (
    <div className="card-border lg:min-w-[566px]">
      <div className="flex flex-col gap-6 card py-14 px-10">
        <div className="flex flex-row gap-2 justify-center">
          <Image src="/logo.svg" alt="logo" height={32} width={38} />
          <h2 className="text-primary-100">PrepWise</h2>
        </div>

        <h3>Practice job interviews with AI</h3>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6 mt-4 form"
          >
            {!isSignInForm && (
              <InputField
                control={form.control}
                name="name"
                label="Name"
                placeholder="Enter your name"
              />
            )}

            <InputField
              control={form.control}
              name="email"
              label="Email address"
              placeholder="Enter your email address"
              type="email"
            />

            <InputField
              control={form.control}
              name="password"
              label="Password"
              placeholder="Enter your password"
              type="password"
            />

            <Button className="btn" type="submit">
              {isSignInForm ? "Sign in" : "Create an account"}
            </Button>
          </form>
        </Form>

        <p className="text-center">
          {isSignInForm ? "No account yet?" : "Have an account already?"}
          <Link
            href={isSignInForm ? ROUTES.SIGN_UP : ROUTES.SIGN_IN}
            className="font-bold ml-1"
          >
            {isSignInForm ? "Sign up" : "Sign in"}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
