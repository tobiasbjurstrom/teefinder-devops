import { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import LoginView from "../views/loginView";
import userModel from "../userModel";
import { useNavigate } from "react-router-dom";

const LoginPresenter = observer(() => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        userModel.setUser(user);
        const redirectPath = sessionStorage.getItem("redirectAfterLogin") || "/";
        sessionStorage.removeItem("redirectAfterLogin");
        navigate(redirectPath);
      } else {
        userModel.clearUser();
      }
    });
    return () => unsubscribe();
  }, [auth, navigate]);

  // Handle Google login
  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      setErrors((prevErrors) => ({ ...prevErrors, google: "Google login failed. Please try again." }));
    }
  };

  // Handle guest login
  const handleGuestLogin = () => {
    userModel.setUserToGuestAccount();
    navigate("/");
  };

  return (
    <LoginView
      onGoogleLogin={handleGoogleLogin}
      onGuestLogin={handleGuestLogin}
      isLoggedIn={!!userModel.user}
      errors={errors}
    />
  );
});

export default LoginPresenter;
