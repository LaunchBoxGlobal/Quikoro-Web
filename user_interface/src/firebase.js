import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDcHKcg98YjDb-4VBSwJoyVgWOtTQerh1I",
  authDomain: "quikoro-fixly.firebaseapp.com",
  projectId: "quikoro-fixly",
  storageBucket: "quikoro-fixly.firebasestorage.app",
  messagingSenderId: "572442370795",
  appId: "1:572442370795:web:8a6f14928a6c726cac14ae",
  measurementId: "G-PN53DMVMW7",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const messaging = getMessaging(app);

export { app, messaging };
