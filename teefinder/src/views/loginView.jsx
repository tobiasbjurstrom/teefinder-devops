import React from "react";
import { Button } from "@mui/material";

function LoginView({ onGoogleLogin, onGuestLogin, errors, user, handleSignOut }) {
  const isUserLoggedIn = user && Object.keys(user).length > 0;

  return (
    <div style={{ maxWidth: "360px", margin: "auto", textAlign: "center" }}>
      <h2>Login</h2>

      {!isUserLoggedIn && (
        <div id="signInDiv" style={{ marginBottom: "1rem" }}></div>
      )}

      {isUserLoggedIn && (
        <>
          <button onClick={handleSignOut} style={{ marginBottom: "1rem" }}>
            Sign Out
          </button>
          <div>
            <img
              src={user.picture || ""}
              alt="User profile"
              style={{ borderRadius: "50%", marginBottom: "1rem" }}
            />
            <h3>{user.name || "User"}</h3>
          </div>
        </>
      )}

      {!isUserLoggedIn && (
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={onGuestLogin}
          style={{ marginTop: "1rem" }}
        >
          <i className="fa-solid fa-user" style={{ marginRight: "8px" }} />
          Sign in as Guest
        </Button>
      )}
      
      {errors?.google && (
        <p style={{ color: "red", marginTop: "1rem" }}>{errors.google}</p>
      )}
    </div>
  );
}

export default LoginView;
