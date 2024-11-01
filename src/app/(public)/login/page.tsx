"use client";
import { loginUser } from "@/apis/auth";
import { useRouter } from "next/navigation";

const inputClassname = "p-4 rounded-md text-background";

const LoginPage = () => {
  const router = useRouter();

  async function handleLoginUser(formData: FormData) {
    try {
      const username = formData.get("username") as string;
      const password = formData.get("password") as string;

      const res = await loginUser({ username, password });

      if (res.data.accessToken) {
        router.push("/users");
      }
    } catch (error) {
      // toast error
      console.log({ error });
    }
  }
  return (
    <div className="container h-full bg-foreground flex flex-col gap-2 justify-center items-center mx-auto">
      <form
        action={handleLoginUser}
        className="bg-background flex flex-col justify-center items-center w-[400px] h-[400px] p-8 gap-4 rounded-md"
      >
        <div className="w-full flex justify-center">
          <p>Login form</p>
        </div>
        <input
          name="username"
          placeholder="enter your username"
          required
          className={inputClassname}
        />
        <input
          name="password"
          placeholder="enter your password"
          required
          type="password"
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
        onClick={() => router.push("/register")}
      >
        GO TO REGISTER PAGE
      </button>
    </div>
  );
};

export default LoginPage;
