import { ref, set, onValue } from "firebase/database";
import { db } from "../index"; 
import jwtDecode from "jwt-decode";

const saveUserToFirebase = async (userData) => {
  const userRef = ref(db, "users/currentUser");
  await set(userRef, userData);
};

const fetchUserFromFirebase = (callback) => {
  const userRef = ref(db, "users/currentUser");
  onValue(userRef, (snapshot) => {
    callback(snapshot.val());
  });
};

const decodeGoogleToken = (token) => {
  try {
    return jwtDecode(token);
  } catch (error) {
    console.error("Error decoding token:", error);
    throw new Error("Invalid token");
  }
};

export { saveUserToFirebase, fetchUserFromFirebase, decodeGoogleToken };
