// firebase/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database"; // ✅ You forgot this import!

const firebaseConfig = {
  apiKey: "AIzaSyAHnNPba9LbaiHMBYn_k2nCnIiHU3BXFuI",
  authDomain: "kishanstore-e3be9.firebaseapp.com",
  databaseURL: "https://kishanstore-e3be9-default-rtdb.firebaseio.com",
  projectId: "kishanstore-e3be9",
  storageBucket: "kishanstore-e3be9.appspot.com",
  messagingSenderId: "480901324416",
  appId: "1:480901324416:web:ef5ae2bc27fb987d015065",
  measurementId: "G-ELFCK9GHG8"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);
getAnalytics(app);

export { auth, app };
export default db;
