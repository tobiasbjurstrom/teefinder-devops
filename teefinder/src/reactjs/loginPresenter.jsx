import { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { jwtDecode } from "jwt-decode";
import { getDatabase, ref, set, get } from "firebase/database";
import LoginView from "../views/loginView";
import { firebaseConfig } from "../firebaseConfig";
import { initializeApp } from "firebase/app";
import { useNavigate } from "react-router";

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const LoginPresenter = observer(() => {
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState({});
 // const navigate = useNavigate();

  useEffect(() => {
    const fetchUserFromFirebase = async () => {
      const userRef = ref(db, "users/currentUser");
      const snapshot = await get(userRef);
      if (snapshot.exists()) {
        setUser(snapshot.val());
        document.getElementById("signInDiv").hidden = true;
      }
    };

    fetchUserFromFirebase();

    /* global google */
    google.accounts.id.initialize({
      client_id: "1045087013406-e8n8tcn3ibcdvq5o4heh17p5qg1h805d.apps.googleusercontent.com",
      callback: handleGoogleLogin,
    });

    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      { theme: "outline", size: "large" }
    );

    google.accounts.id.prompt();
  }, []);

  const saveUserToFirebase = async (userData) => {
    const userRef = ref(db, "users/currentUser");
    await set(userRef, userData);
  };

  function handleGoogleLogin(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    try {
      const userObject = jwtDecode(response.credential);
      console.log(userObject);
      setUser(userObject);
      saveUserToFirebase(userObject); 
      document.getElementById("signInDiv").hidden = true; 
    } catch (error) {
      console.error("Error decoding token:", error);
      setErrors((prev) => ({ ...prev, google: "Google login failed." }));
    }
  }

  function handleGuestLogin() {
    const guestUser = { id: "guest", name: "Guest User" }; 
    setUser(guestUser); 
    saveUserToFirebase(guestUser); 
    document.getElementById("signInDiv").hidden = true; 
    console.log("Logged in as guest:", guestUser);
   // navigate("/"); 
  }

  function handleSignOut() {
    setUser(null); 
    saveUserToFirebase(null); 
    document.getElementById("signInDiv").hidden = false; 
    console.log("User signed out");
   // navigate("/login"); 
  }

  return (
    <LoginView
      onGoogleLogin={handleGoogleLogin}
      onGuestLogin={handleGuestLogin}
      errors={errors}
      user={user}
      handleSignOut={handleSignOut}
    />
  );
});

export default LoginPresenter;
