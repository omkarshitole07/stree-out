import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getDatabase, ref, set, get, update } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB5fS7iwQXfD8VbD2akAf5HkYgwpkct6Rk",
  authDomain: "stress-out-a0631.firebaseapp.com",
  projectId: "stress-out-a0631",
  storageBucket: "stress-out-a0631.appspot.com",
  messagingSenderId: "60699392109",
  appId: "1:60699392109:web:c31440cd87f5e973316764",
  measurementId: "G-PT24Y6ZW1Y",
  // Your Firebase config here
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const auth = getAuth(app);

// Function to write user data to the database
async function writeUserData(
  userId,
  name,
  gender,
  age,
  dateOfBirth,
  medicalHistory,
  activityHistory,
  lastQuizResults
) {
  const db = getDatabase(app);
  const userRef = ref(db, "users/" + userId);

  try {
    await set(userRef, {
      name: name,
      gender: gender,
      age: age,
      dateOfBirth: dateOfBirth,
      medicalHistory: medicalHistory,
      activityHistory: activityHistory,
      lastQuizResults: lastQuizResults,
    });
    console.log("Data written successfully.");
  } catch (error) {
    console.error("Error writing data to Firebase:", error);
  }
}

// Function to get user data by UID
async function getUserData(userId) {
  const db = getDatabase();
  const userRef = ref(db, "users/" + userId);

  try {
    const snapshot = await get(userRef);
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.log("No data available");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
}

export { auth, storage, writeUserData, getUserData };
