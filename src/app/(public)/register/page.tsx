"use client";
import { registerUser } from "@/apis/auth";
import { useRouter } from "next/navigation";
import React from "react";

const inputClassname = "p-4 rounded-md text-background";

const RegisterUser = () => {
  const router = useRouter();

  const handleRegister = async (data: any) => {
    try {
      const username = data.get("username") as string;
      const password = data.get("password") as string;
      const email = data.get("email") as string;

      const response = await registerUser({ username, password, email });
      if (response.data.accessToken) {
        router.push("/users");
      }
    } catch (error) {
      // toast error
      console.log({ error });
    }
  };

  return (
    <div className="container h-full bg-foreground flex flex-col gap-2 justify-center items-center mx-auto">
      <form
        action={handleRegister}
        className="bg-background flex flex-col justify-center items-center w-[400px] h-[400px] p-8 gap-4 rounded-md"
      >
        <div className="w-full flex justify-center">
          <p>Register form</p>
        </div>
        <input
          name="username"
          placeholder="enter your username"
          required
          className={inputClassname}
        />
        <input
          name="email"
          placeholder="enter your email"
          required
          className={inputClassname}
        />
        <input
          name="password"
          placeholder="enter your password"
          type="password"
          required
          className={inputClassname}
        />
        <button
          type="submit"
          className="p-4 bg-foreground text-background rounded-sm"
        >
          Submit
        </button>
      </form>
      <button
        className="bg-blue-600 text-red-600 p-4 rounded-sm"
        onClick={() => router.push("/login")}
      >
        GO TO LOGIN PAGE
      </button>
    </div>
  );
};

export default RegisterUser;
