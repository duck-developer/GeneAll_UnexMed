import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBzPP0_F3WvH14SJ1GdlFYrdfAymZ0b_HA",
  authDomain: "geneall-2c69a.firebaseapp.com",
  projectId: "geneall-2c69a",
  storageBucket: "geneall-2c69a.firebasestorage.app",
  messagingSenderId: "138084664450",
  appId: "1:138084664450:web:d5afa01e1d23d4a6b4e09b",
  measurementId: "G-1D3PCZ1F3X",
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { auth, db };
