import './App.css'
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes";
import { useEffect, useState } from "react";
import { auth } from "./login/Firebase";
import { ToastContainer } from "react-toastify";

import type { User } from "firebase/auth";

function App() {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  });
  return (
    <div className="App">
      <div>
        <div>
          <RouterProvider router={router} />
          <ToastContainer />
        </div>
      </div>
    </div>
  );
}

export default App;
