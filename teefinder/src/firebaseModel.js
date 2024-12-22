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
  get(usersRef)
  .then((snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val(); 
      callback(data || {});  
    } else {
      console.log("No data found");
      callback({});  
    }
  })
  .catch((error) => {
    console.error("Error fetching data:", error);  
    callback({});  
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

async function initializeGoogleLogin(callback) {
  /* global google */
 google.accounts.id.initialize({
    client_id: "1045087013406-e8n8tcn3ibcdvq5o4heh17p5qg1h805d.apps.googleusercontent.com",
    callback,
  });
  console.log("google init")
}

async function renderGoogleButton() {
    const checkForSignInDiv = () => {
      const signInDiv = document.getElementById("signInDiv");
      if (signInDiv) {
        google.accounts.id.renderButton(signInDiv, {
          theme: "outline",
          size: "large",
        });
        clearInterval(intervalId);  
      } else {
        console.warn("Sign-in div not found. Retrying...");
      }
    };
    const intervalId = setInterval(checkForSignInDiv, 500);
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