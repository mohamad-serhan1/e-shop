import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function signUp() {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const { push } = useRouter();
  const signup = async (event: React.FormEvent) => {
    event.preventDefault();

    const userData = {
      userName: formData.userName,
      email: formData.email,
      password: formData.password,
    };
    try {
      const res = await fetch(`http://localhost:3000/api/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await res.json();
      console.log(data.message);
      if (!res.ok) {
        throw new Error("Something went wrong!");
      }
      // No need to return data.message here
    } catch (error) {
      console.error("Error during authentication:", error);
    }

    return null;
  };

  return (
    <main
      className=" flex pt-10 justify-center h-screen w-screen "
      style={{ backdropFilter: "blur(5px)" }}
    >
      <section className="  flex flex-col h-[350px] w-[550px] justify-center items-center bg-gray-900 text-white rounded-md">
        <div className=" w-5/6 p-14 flex flex-col gap-9 justify-center items-center">
          <div className="text-center text-4xl font-medium">Join Us</div>

          <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
            <input
              type="text"
              id="userName"
              name="userName"
              placeholder="Enter UserName"
              value={formData.userName}
              onChange={handleChange}
              autoComplete="off"
              className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
            />
          </div>

          <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email."
              value={formData.email}
              onChange={handleChange}
              autoComplete="off"
              className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none "
            />
          </div>

          <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              onChange={handleChange}
              value={formData.password}
              autoComplete="off"
              className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
            />
          </div>

          <button
            onClick={signup}
            className="transform rounded-full bg-indigo-600 py-2 font-bold duration-300 hover:bg-indigo-400 px-7 "
          >
            Sign Up
          </button>
        </div>
      </section>
    </main>
  );
}
