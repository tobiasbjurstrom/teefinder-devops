import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, set, onValue} from "firebase/database";
import { firebaseConfig } from "./firebaseConfig";
import { fetchGolfCourses } from "./golfCourseSource"; 
import { jwtDecode } from "jwt-decode";

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const usersRef = ref(db, "users");

const PATH = "golfModel";

let googleInitialized = false;

function modelToPersistence(model) {
  return {
    favourites: model.getFavourites().map(fav => fav.club_name).sort(),
    courses: model.getCourseNames()
  };
}


function persistenceToModel(data, model) {
  const favouriteNames = (data && data.favourites) || [];
  const courseNames = (data && data.courses) || [];

  courseNames.forEach(courseName => model.setSelectedCourse(courseName));
  model.favourites = [];
  favouriteNames.forEach(favName => {
    const course = model.clubinformation.find(club => club.club_name === favName);
    if (course) {
      model.addToFavourites(course);
    }
  });
}

function saveToFirebase(model) {
  if (model.ready) {
    set(ref(db, PATH), modelToPersistence(model));
  }
}

async function readFromFirebase(model) {
  model.ready = false;
  const snapshot = await get(ref(db, PATH));
  await persistenceToModel(snapshot.val(), model);
  model.ready = true;
}

function connectToFirebase(model, watchFunction) {
  readFromFirebase(model);

  function isValidChangeACB() {
    return [model.favourites.slice(), model.clubinformation.slice()];
  }

  function onValidACB() {
    saveToFirebase(model);
  }

  watchFunction(isValidChangeACB, onValidACB);
}

function saveUserToFirebase(userData) {
  if (!userData || !userData.id) {
    console.log("No user data to save. Skipping Firebase save.");
    return Promise.resolve();
  }

  const userRef = ref(db, `users/${userData.id}`);
  console.log("Saving user to Firebase:", userData);
  return set(userRef, userData);
}

function fetchAllUsersFromFirebase(callback) {
  const usersRef = ref(db, "users");
  onValue(usersRef, (snapshot) => {
    const data = snapshot.val();
    callback(data || {});
  });
}

function decodeGoogleToken(token) {
  try {
    return jwtDecode(token);
  } catch (error) {
    console.error("Error decoding token:", error);
    throw new Error("Invalid token");
  }
}

function initializeGoogleLogin(callback) {
  /* global google */
  google.accounts.id.initialize({
    client_id: "1045087013406-e8n8tcn3ibcdvq5o4heh17p5qg1h805d.apps.googleusercontent.com",
    callback,
  });
  console.log("google init")
}

function renderGoogleButton() {
  const signInDiv = document.getElementById("signInDiv");
  if (!signInDiv) {
    console.warn("Sign-in div not found. Retrying...");
 // Retry after 100ms
    return;
  }

  google.accounts.id.renderButton(signInDiv, {
    theme: "outline",
    size: "large",
  });
}

export { 
  connectToFirebase, 
  modelToPersistence, 
  persistenceToModel, 
  saveToFirebase, 
  readFromFirebase,
  saveUserToFirebase,
  fetchAllUsersFromFirebase,
  decodeGoogleToken, 
  db,
  initializeGoogleLogin,
  renderGoogleButton,
};