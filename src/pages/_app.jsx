import "@/styles/globals.css";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { useState } from "react";

const firebaseConfig = {
  apiKey: "AIzaSyAYbDDiZ1F05AvYwLxvnrAg0r4XxnbRcGI",
  authDomain: "next-iic3585.firebaseapp.com",
  projectId: "next-iic3585",
  storageBucket: "next-iic3585.appspot.com",
  messagingSenderId: "483252396778",
  appId: "1:483252396778:web:2af1e2b2a4b37f029e6d93",
};

export default function App({ Component, pageProps }) {
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const [user, setUser] = useState(null);

  onAuthStateChanged(auth, (u) => {
    if (u) {
      setUser(u);
      console.log("User is signed in.");
    } else {
      setUser(null);
      console.log("No user is signed in.");
    }
  });

  return (
    <div className="container">
      <div className="navBar">
        {user ? (
          <button className="loginButton" onClick={() => signOut(auth)}>
            Sign out
          </button>
        ) : (
          <button className="loginButton" onClick={() => signInWithPopup(auth, provider)}>
            Sign in with Google
          </button>
        )}
      </div>
      <Component {...pageProps} />
    </div>
  );
}
