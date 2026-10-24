
"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Button,
  Card,
  Description,
  FieldError,
  FieldGroup,
  Fieldset,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import { redirect } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import {Icon} from "@iconify/react";

export default function SignInPage() {
  const [isLoading,setIsLoading] = useState(false)
   const [toast, setToast] = useState<{
    visible: boolean;
    message: string;
    type: "success" | "error";
  }>({
    visible: false,
    message: "",
    type: "success",
  });

  const showToast = (
    message: string,
    type: "success" | "error" = "success"
  ) => {
    setToast({ visible: true, message, type });

    setTimeout(() => {
      setToast((previous) => ({
        ...previous,
        visible: false,
      }));
    }, 3500);
  };

   
     const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
       e.preventDefault();
   
       const formData = new FormData(e.currentTarget);
       const user= Object.fromEntries(formData.entries()) as {email:string, password:string};

      console.log('user',user)
       const {data,error} = await authClient.signIn.email({
           ...user,
            
         });
   
         if(data) {
           showToast("Account created successfully!")
           redirect('/');
           
         }
         if (error) {
           showToast(
             error.message || "Please try again",
             "error"
           );
           return;
         }
   
  };

    const handleGoogleSignIn = async()=>{
              const resData = await authClient.signIn.social({
              provider: "google",
            });
            if(resData){
              showToast("you've Log In successfully!")
              redirect('/');
            }
    }

    const handleGithubSignIn = async()=>{
        const resData = await authClient.signIn.social({
              provider: "github"
        });
         if(resData){
              showToast("you've Log In successfully!")
              redirect('/');
        }
        setIsLoading(true);
    }
      
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-green-50 via-white to-emerald-100 px-4 py-12">
       
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-green-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-emerald-200/40 blur-3xl" />

       
      <div
        role="status"
        aria-live="polite"
        className={`fixed right-4 top-5 z-50 flex max-w-sm items-start gap-3 rounded-2xl border bg-white p-4 shadow-xl transition-all duration-300 ${
          toast.visible
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-4 opacity-0"
        } ${
          toast.type === "success"
            ? "border-green-200 text-green-900"
            : "border-red-200 text-red-800"
        }`}
      >
        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-lg ${
            toast.type === "success"
              ? "bg-green-100"
              : "bg-red-100"
          }`}
        >
          {toast.type === "success" ? "✓" : "!"}
        </span>

        <div className="min-w-0 flex-1">
          <p className="font-semibold">
            {toast.type === "success" ? "Success!" : "Sign-in failed"}
          </p>
          <p className="mt-1 break-words text-sm text-gray-600">
            {toast.message}
          </p>
        </div>

        <button
          type="button"
          aria-label="Close notification"
          onClick={() =>
            setToast((previous) => ({
              ...previous,
              visible: false,
            }))
          }
          className="text-xl leading-none text-gray-400 hover:text-gray-700"
        >
          ×
        </button>
      </div>

      <Card className="relative z-10 w-full max-w-md rounded-3xl border border-white/80 bg-white/95 p-6 shadow-2xl shadow-green-900/10 sm:p-9">
        <div className="mb-8 text-center">

          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Welcome back
          </h1>

          <p className="mt-3 text-sm leading-6 text-gray-500">
            Sign in to explore market prices and stay updated every day.
          </p>
        </div>

        <Form className="w-full" onSubmit={onSubmit}>
          <Fieldset className="w-full">
            <Fieldset.Legend className="sr-only">
              Sign in to your account
            </Fieldset.Legend>

            <FieldGroup className="gap-5">
              <TextField
                isRequired
                name="email"
                type="email"
                validate={(value) => {
                  if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
                  ) {
                    return "Please enter a valid email address.";
                  }
                  return null;
                }}
              >
                <Label className="mb-2 text-sm font-semibold text-gray-700">
                  Email address
                </Label>

                <Input
                  placeholder="you@example.com"
                  autoComplete="email"
                  className="rounded-xl"
                />

                <FieldError />
              </TextField>

              <TextField
                isRequired
                name="password"
                type="password"
                minLength={8}
                validate={(value) => {
                  if (value.length < 8) {
                    return "Password must be at least 8 characters.";
                  }
                  if (!/[A-Z]/.test(value)) {
                    return "Include at least one uppercase letter.";
                  }
                  if (!/[0-9]/.test(value)) {
                    return "Include at least one number.";
                  }
                  return null;
                }}
              >
                <div className="mb-2 flex items-center justify-between gap-2">
                  <Label className="text-sm font-semibold text-gray-700">
                    Password
                  </Label>
                </div>

                <Input
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  className="rounded-xl"
                />

                <Description className="mt-1 text-xs text-gray-500">
                  At least 8 characters, including an uppercase letter and a number.
                </Description>
                    <div className="mt-5 flex items-center justify-between gap-2">
                        <Link
                            href="/forgot-password"
                            className="text-xs font-semibold text-green-800 hover:text-green-600"
                        >
                            Forgot password?
                        </Link>
                    </div>
                <FieldError />
              </TextField>
            </FieldGroup>

            <Fieldset.Actions className="w-full">
              <Button
                type="submit"
                isDisabled={isLoading}
                className="h-12 w-full rounded-xl bg-green-900 font-semibold text-white shadow-lg shadow-green-900/20 transition-all hover:bg-green-800 hover:shadow-xl"
              >
                {isLoading ? "Signing in..." : "Sign In →"}
              </Button>
            </Fieldset.Actions>
            <Fieldset.Actions className="w-full">
               <Button onClick={handleGoogleSignIn}  className="w-full" variant="tertiary">
                  <Icon icon="devicon:google" />
                  Sign in with Google
                </Button>
                <Button onClick={handleGithubSignIn} className="w-full" variant="tertiary">
                  <Icon icon="mdi:github" />
                  Sign in with GitHub
                </Button>
            </Fieldset.Actions>
          </Fieldset>
        </Form>

        <div className="my-6 flex items-center gap-4">
          <div className="h-px flex-1 bg-gray-200" />
          <span className="text-xs text-gray-400">NEW TO BAZAR DOR?</span>
          <div className="h-px flex-1 bg-gray-200" />
        </div>

        <Link
          href="/sign-up"
          className="flex h-12 w-full items-center justify-center rounded-xl border border-green-800 font-semibold text-green-900 transition-colors hover:bg-green-50"
        >
          Create an account
        </Link>

        <p className="mt-6 border-t border-gray-100 pt-5 text-center text-xs leading-5 text-gray-400">
          Your daily market companion.
        </p>
      </Card>
    </main>
  );
}