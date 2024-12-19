import React, { useState } from "react";
import { Button, TextField } from "@mui/material";

function LoginView({ onLogin, onGoogleLogin, errors }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const validateEmail = () => {
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    setEmailError(!isValidEmail);
  };

  const validatePassword = () => setPasswordError(password.length === 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!emailError && !passwordError) {
      onLogin(email, password);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} style={{ maxWidth: "360px", margin: "auto" }}>
        <h2>Login</h2>
        <div style={{ marginBottom: "1rem" }}>
          <TextField
            fullWidth
            type="email"
            label="Email"
            value={email}
            onChange={handleEmailChange}
            onBlur={validateEmail}
            error={emailError || !!errors?.email}
            helperText={emailError ? "Enter a valid email address" : errors?.email || ""}
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <TextField
            fullWidth
            type="password"
            label="Password"
            value={password}
            onChange={handlePasswordChange}
            onBlur={validatePassword}
            error={passwordError || !!errors?.password}
            helperText={
              passwordError ? "Password cannot be empty" : errors?.password || ""
            }
          />
        </div>
        <Button fullWidth type="submit" variant="contained" style={{ marginBottom: "1rem" }}>
          Log In
        </Button>
        <Button fullWidth variant="outlined" onClick={onGoogleLogin}>
          Sign in with Google
        </Button>
        {errors.google && <p style={{ color: "red" }}>{errors.google}</p>}
      </form>
    </div>
  );
}

export default LoginView;
