// public/firebase-messaging-sw.js

// Use compat version for service worker:
importScripts(
  "https://www.gstatic.com/firebasejs/9.6.10/firebase-app-compat.js",
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.6.10/firebase-messaging-compat.js",
);

// SAME config as in src/firebase.js
firebase.initializeApp({
  apiKey: "AIzaSyDcHKcg98YjDb-4VBSwJoyVgWOtTQerh1I",
  authDomain: "quikoro-fixly.firebaseapp.com",
  projectId: "quikoro-fixly",
  storageBucket: "quikoro-fixly.firebasestorage.app",
  messagingSenderId: "572442370795",
  appId: "1:572442370795:web:8a6f14928a6c726cac14ae",
  measurementId: "G-PN53DMVMW7",
});

const messaging = firebase.messaging();

// This handles background messages
messaging.onBackgroundMessage(async (payload) => {
  // console.log("Background payload", payload);

  try {
    await self.registration.showNotification(
      payload.notification?.title || "Test",
      {
        body: payload.notification?.body,
        // icon: "/notification-icon.png",
      },
    );
  } catch (err) {
    console.error("showNotification failed", err);
  }
});
