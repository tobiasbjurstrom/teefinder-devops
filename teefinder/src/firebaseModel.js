import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, set } from "firebase/database";
import { firebaseConfig } from "./firebaseConfig";
import { fetchGolfCourses } from "./golfCourseSource"; 


const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const PATH = "golfModel";


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

export { connectToFirebase, modelToPersistence, persistenceToModel, saveToFirebase, readFromFirebase };