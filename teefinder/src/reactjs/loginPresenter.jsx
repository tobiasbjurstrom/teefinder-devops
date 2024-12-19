import { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import LoginView from "../views/loginView";
import { useNavigate } from "react-router-dom";

const LoginPresenter = observer(({ model }) => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Monitor authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        model.setUser(user);
        const redirectPath = sessionStorage.getItem("redirectAfterLogin") || "/";
        sessionStorage.removeItem("redirectAfterLogin");
        navigate(redirectPath);
      } else {
        model.user = null;
      }
    });
    return () => unsubscribe();
  }, [auth, model, navigate]);

  // Handle Google login
  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      setErrors((prevErrors) => ({ ...prevErrors, google: "Google login failed. Please try again." }));
    }
  };

  // Handle email/password login
  const handleEmailPasswordLogin = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setErrors((prevErrors) => ({ ...prevErrors, email: "Invalid email or password. Please try again." }));
    }
  };

  return (
    <LoginView
      onLogin={handleEmailPasswordLogin}
      onGoogleLogin={handleGoogleLogin}
      isLoggedIn={!!model.user}
      errors={errors}
    />
  );
});

export default LoginPresenter;
