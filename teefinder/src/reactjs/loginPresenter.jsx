import { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { jwtDecode } from "jwt-decode";
import userModel from "../userModel";
import LoginView from "../views/loginView";
import { useNavigate } from "react-router-dom";

const LoginPresenter = observer(() => {
  const [user, setUser] = useState({});
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
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

  function handleGoogleLogin(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    try {
      const userObject = jwtDecode(response.credential);
      console.log(userObject);
      setUser(userObject);
      document.getElementById("signInDiv").hidden = true;
    } catch (error) {
      console.error("Error decoding token:", error);
      setErrors((prev) => ({ ...prev, google: "Google login failed." }));
    }
  }

  const handleGuestLogin = () => {
    document.getElementById("signInDiv").hidden = true;
  };
  
  function handleSignOut() {
    setUser({});
    document.getElementById("signInDiv").hidden = false;
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
