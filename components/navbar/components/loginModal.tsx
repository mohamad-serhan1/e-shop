"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/components/auth-userId";

export default function Login() {
  const { isAuthenticated, setIsAuthenticated, setUserId } = useAuthStore(); // Use Zustand store
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  });

  const { push } = useRouter();

  useEffect(() => {
    if (isAuthenticated == true) {
      // Redirect to home page after authentication
      window.location.reload();
    }
  }, [isAuthenticated, push]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const auth = async (event: React.FormEvent) => {
    event.preventDefault();

    const userData = {
      userName: formData.userName,
      password: formData.password,
    };
    try {
      const res = await fetch(`http://localhost:3000/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await res.json();
      console.log(data);
      if (data.message === "Authenticated") {
        setIsAuthenticated(true);
        setUserId(data.userId);
      }
      //if (data.user) // set global user state = data.user

      console.log(isAuthenticated);
    } catch (error) {
      console.error("Error during authentication:", error);
    }
  };

  if (isAuthenticated == true) {
    return null;
  }
  return (
    <main
      // ref={loginBoxRef}
      className="flex pt-10 justify-center h-screen w-screen"
      style={{ backdropFilter: "blur(5px)" }}
    >
      <section className="flex flex-col h-[400px] w-[500px] justify-center items-center bg-gray-900 text-white rounded-md">
        <div className="w-5/6 p-14 flex flex-col gap-5 justify-center items-center">
          <div className="text-center text-4xl font-medium">Log In</div>

          <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
            <input
              type="email"
              id="userName"
              name="userName"
              placeholder="Enter your email."
              autoComplete="off"
              value={formData.userName}
              onChange={handleChange}
              className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
            />
          </div>

          <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              autoComplete="off"
              value={formData.password}
              onChange={handleChange}
              className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
            />
          </div>
          <div className="">
            <div className="absolute pl-32">
              {isAuthenticated && <p> successfully</p>}
            </div>
            <Button
              onClick={auth}
              className="transform rounded-full relative bg-indigo-600 py-2 font-bold duration-300 hover:bg-indigo-400 px-7"
            >
              LOG IN
            </Button>
          </div>

          <a
            href="#"
            className="transform text-center font-semibold text-gray-500 duration-300 hover:text-gray-300"
          >
            FORGOT PASSWORD?
          </a>

          <p className="text-center text-lg">
            No account?
            <a
              href="./signupModal.tsx"
              className="font-medium text-indigo-500 underline-offset-4 hover:underline"
            >
              Create One
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}
