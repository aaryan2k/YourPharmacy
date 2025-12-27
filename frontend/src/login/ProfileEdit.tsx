import { useEffect, useState } from "react";
import { auth, db } from "./Firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { updateEmail, updatePassword } from "firebase/auth";
import { toast } from "react-toastify";

function ProfileEdit() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const user = auth.currentUser;
      if (!user) {
        window.location.href = "/#/login";
        return;
      }

      const docRef = doc(db, "Users", user.uid);
      const snap = await getDoc(docRef);

      if (snap.exists()) {
        const data = snap.data();
        setEmail(data.email);
        setFirstName(data.firstName);
        setLastName(data.lastName || "");
      }

      setLoading(false);
    };

    fetchUser();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const user = auth.currentUser;
      if (!user) return;

      // Update Auth email if changed
      if (email !== user.email) {
        await updateEmail(user, email);
      }

      // Update Auth password if provided
      if (newPassword.trim() !== "") {
        await updatePassword(user, newPassword);
      }

      // Update Firestore Users/{uid}
      const userRef = doc(db, "Users", user.uid);
      await updateDoc(userRef, {
        email,
        firstName,
        lastName,
      });

      toast.success("Profile updated successfully!", {position: "top-center"});
      window.location.href = "/#/profile";
    } catch (error: any) {
      console.error(error.message);
      toast.error(error.message, {position: "bottom-center"});
    }
  };

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="flex justify-center min-h-screen bg-gray-300 dark:bg-gray-800">
      <form onSubmit={handleSave} className="form-control">
        <h3 className="text-black dark:text-gray-300 font-bold text-4xl p-3">
          Edit Profile
        </h3>

        <div className="mb-3">
          <label className="block text-black dark:text-gray-300">
            Email
          </label>
          <input
            type="email"
            className="input-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="block text-black dark:text-gray-300">
            First Name
          </label>
          <input
            type="text"
            className="input-control"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="block text-black dark:text-gray-300">
            Last Name
          </label>
          <input
            type="text"
            className="input-control"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="block text-black dark:text-gray-300">
            New Password (optional)
          </label>
          <input
            type="password"
            className="input-control"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>

        <div className="d-grid gap-2">
          <button type="submit" className="button-control mt-5">
            Save Changes
          </button>

          <button type="button" className="button-control mt-5" onClick={() => window.location.href = "/#/profile"}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProfileEdit;
