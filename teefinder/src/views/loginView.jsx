import React from "react";
import { Button } from "@mui/material";

function LoginView({ onGoogleLogin, onGuestLogin, errors }) {
  return (
    <div style={{ maxWidth: "360px", margin: "auto", textAlign: "center" }}>
      <h2>Login</h2>
      <Button
        fullWidth
        variant="outlined"
        style={{ marginBottom: "1rem" }}
        onClick={onGoogleLogin}
      >
        <i className="fa-brands fa-google" style={{ marginRight: "8px" }} />
        Sign in with Google
      </Button>
      <Button
        fullWidth
        variant="contained"
        color="primary"
        onClick={onGuestLogin}
      >
        <i className="fa-solid fa-user" style={{ marginRight: "8px" }} />
        Sign in as Guest
      </Button>
      {errors?.google && <p style={{ color: "red", marginTop: "1rem" }}>{errors.google}</p>}
    </div>
  );
}

export default LoginView;
