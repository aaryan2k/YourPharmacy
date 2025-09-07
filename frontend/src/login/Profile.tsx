import { useEffect, useState } from "react";
import { auth, db } from "./Firebase";
import { doc, getDoc } from "firebase/firestore";

type UserDetails = {
  email: string;
  firstName: string;
  lastName?: string;
  // Add other fields as needed
};

function Profile() {
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user: any) => {
      console.log(user);

      const docRef = doc(db, "Users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setUserDetails({
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
        });
        console.log(data);
      } else {
        console.log("User is not logged in");
      }
    });
  };
  useEffect(() => {
    fetchUserData();
  }, []);

  async function handleLogout() {
    try {
      await auth.signOut();
      window.location.href = "/#/login";
      console.log("User logged out successfully!");
    } catch (error: any) {
      console.error("Error logging out:", error.message);
    }
  }
  return (
    <div className="flex justify-center min-h-screen bg-gray-300 dark:bg-gray-800">
      <div className="profile-control">
        {userDetails ? (
          <>
            <h3 className="text-black dark:text-gray-300 font-bold text-4xl p-3">Welcome {userDetails.firstName}! 🙏🙏</h3>
            <div>
              <p className="block text-left text-black dark:text-gray-300 ml-50">Email: {userDetails.email}</p>
              <p className="block text-left text-black dark:text-gray-300 ml-50">First Name: {userDetails.firstName}</p>
              <p className="block text-left text-black dark:text-gray-300 ml-50">Last Name: {userDetails.lastName}</p>
            </div>
            <button className="profile-button-control" onClick={handleLogout}>
              Logout
            </button>
            <p className="block text-center text-black dark:text-gray-300 mt-5 font-bold">Remember, we will NEVER ask for your password!</p>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}
export default Profile;