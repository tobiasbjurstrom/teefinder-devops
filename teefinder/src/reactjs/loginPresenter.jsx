import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { model } from "../GolfCourseModel";
import LoginView from "../views/loginView";
import { initializeGoogleLogin, renderGoogleButton } from "../firebaseModel";

const loginStore = model.loginStore;

const LoginPresenter = observer(() => {
  useEffect(() => {
    loginStore.fetchAllUsers();
    loginStore.reloadCurrentUser();

    initializeGoogleLogin((response) => loginStore.handleGoogleLogin(response));
    renderGoogleButton();
  }, []);

  useEffect(() => {
    if (!loginStore.currentUser) {
      renderGoogleButton(); 
    }
  }, [loginStore.currentUser]);

  return (
    <LoginView
      onGoogleLogin={loginStore.handleGoogleLogin.bind(loginStore)}
      onGuestLogin={loginStore.handleGuestLogin.bind(loginStore)}
      errors={loginStore.errors}
      user={loginStore.currentUser}
      handleSignOut={loginStore.handleSignOut.bind(loginStore)}
    />
  );
});

export default LoginPresenter;
