import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth, db } from "./Firebase";
import { setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import "./Login.css";

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log(user);
            if (user) {
                await setDoc(doc(db, "Users", user.uid), {
                    email: user.email,
                    firstName: fname,
                    lastName: lname
                });
            }
            window.location.href = "/#/login";
            console.log("User registered successfully");
            toast.success("Registered Successfully", {position: "top-center"});
        } catch(error: any) {
            console.log(error.message);
            toast.error(error.message, {position: "bottom-center"});
        }
    }

    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-300 dark:bg-gray-800 p-6">
        <form onSubmit={handleRegister} className="form-control">
          <h3 className="text-black dark:text-gray-300 font-bold text-4xl p-3">Sign Up</h3>

      <div className="mb-3">
        <label className="block text-left text-black dark:text-gray-300">First name</label>
        <input
          type="text"
          className="input-control"
          placeholder="First name"
          onChange={(e) => setFname(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label className="block text-left text-black dark:text-gray-300">Last name</label>
        <input
          type="text"
          className="input-control"
          placeholder="Last name"
          onChange={(e) => setLname(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="block text-left text-black dark:text-gray-300">Email address</label>
        <input
          type="email"
          className="input-control"
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label className="block text-left text-black dark:text-gray-300">Password</label>
        <input
          type="password"
          className="input-control"
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <div className="d-grid">
        <button type="submit" className="button-control">
          Sign Up
        </button>
      </div>
      <p className="forgot-password text-right text-black dark:text-gray-300" >
        Already registered? <a href="/#/login">Login</a>
      </p>
    </form>
    </div>
  );
}

export default Register;