// public/firebase-messaging-sw.js
importScripts(
  "https://www.gstatic.com/firebasejs/9.6.10/firebase-app-compat.js",
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.6.10/firebase-messaging-compat.js",
);

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

messaging.onBackgroundMessage(async (payload) => {
  console.log("Background payload", payload);

  try {
    await self.registration.showNotification(
      payload.notification?.title || "Test",
      {
        body: payload.notification?.body,
        data: payload.data, // carry bookingId/event through to notificationclick too
      },
    );
  } catch (err) {
    console.error("showNotification failed", err);
  }

  // Forward to every open tab so Redux can update even when unfocused/backgrounded
  try {
    const clients = await self.clients.matchAll({
      type: "window",
      includeUncontrolled: true,
    });

    clients.forEach((client) => {
      client.postMessage({
        type: "FCM_BACKGROUND_MESSAGE",
        payload,
      });
    });
  } catch (err) {
    console.error("postMessage to clients failed", err);
  }
});
