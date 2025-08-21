import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "./Firebase";
import { toast } from "react-toastify";
import SignInWithGoogle from "./SignInWithGoogle";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in Successfully");
      window.location.href = "/#/profile";
      toast.success("User logged in Successfully", {
        position: "top-center",
      });
    } catch (error: any) {
      console.log(error.message);

      toast.error(error.message, {
        position: "bottom-center",
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-300 dark:bg-gray-800 p-6">
    <form onSubmit={handleSubmit} className="form-control">
      <h3 className="text-black dark:text-gray-300 font-bold text-4xl p-3">Login</h3>
      <div className="flex flex-col space-y-4">
      <div className="mb-3">
        <label className="block text-left text-black dark:text-gray-300">Email address</label>
        <input
          type="email"
          className="input-control"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="block text-left text-black dark:text-gray-300">Password</label>
        <input
          type="password"
          className="input-control"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div>
        <button type="submit" className="bg-blue-500 text-white p-3 rounded-lg w-full text-lg hover:bg-blue-600 transition-color">
          Submit
        </button>
      </div>
      </div>
      <p className="forgot-password text-right text-black dark:text-gray-300">
        New user? <a href="/#/register">Register Here</a>
      </p>
      <SignInWithGoogle />
    </form>
    </div>

  );
}

export default Login;