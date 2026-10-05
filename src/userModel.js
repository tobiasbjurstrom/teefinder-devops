import { observable } from "mobx";

const userModel = observable({
  user: null, // Tracks the current user

  // Sets the user to a guest account
  setUserToGuestAccount() {
    this.user = { id: "guest", name: "Guest User" };
    console.log("Guest user set:", this.user);
  },

  // Sets the user to a logged-in account
  setUser(user) {
    this.user = user;
    console.log("Logged-in user set:", this.user);
  },

  // Clears the user state
  clearUser() {
    this.user = null;
    console.log("User cleared");
  },

  // Returns whether a user is logged in
  isLoggedIn() {
    return this.user !== null && this.user.id !== "guest";
  },

  // Returns whether the user is a guest
  isGuest() {
    return this.user && this.user.id === "guest";
  },
});

export default userModel;
