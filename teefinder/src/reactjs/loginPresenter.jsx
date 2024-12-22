import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { model } from "../GolfCourseModel";
import LoginView from "../views/loginView";
import { initializeGoogleLogin, renderGoogleButton } from "../firebaseModel";

const loginStore = model.loginStore;

const LoginPresenter = observer(function LoginRender(props) {

if (!props.model.loginStore.isLoaded){
    props.model.loginStore.initializeLogin();
    console.log("inti: ")
    props.model.loginStore.isLoaded = true;
}
if (!props.model.loginStore.currentUser){
    props.model.loginStore.checkAndRenderGoogleButton();
}

  return (
    <LoginView
    model = {props.model}
      onGoogleLogin={props.model.loginStore.handleGoogleLogin.bind(loginStore)}
      onGuestLogin={props.model.loginStore.handleGuestLogin.bind(loginStore)}
      errors={loginStore.errors}
      user={props.model.loginStore.currentUser}
      handleSignOut={loginStore.handleSignOut.bind(loginStore)}
    />
  );
});

export default LoginPresenter;
