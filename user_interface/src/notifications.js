import { messaging } from "./firebase";
import { getToken, onMessage } from "firebase/messaging";
import axios from "axios";
import Cookies from "js-cookie";
import { v4 as uuidv4 } from "uuid";
import { BASE_URL } from "./utils/base-url";
import { VAPID_KEY } from "./utils/vapid-key";

const getOrCreateDeviceId = () => {
  let deviceId = localStorage.getItem("quikoroBrowserDeviceId");
  if (!deviceId) {
    deviceId = uuidv4();
    localStorage.setItem("quikoroBrowserDeviceId", deviceId);
  }
  return deviceId;
};

export const requestNotificationPermission = async () => {
  const permission = await Notification.requestPermission();

  if (permission !== "granted") {
    console.log("Permission not granted");
    return;
  }

  console.log("Notification permission granted!");

  try {
    const currentToken = await getToken(messaging, {
      vapidKey: VAPID_KEY,
    });

    if (!currentToken) {
      return;
    }

    const storedToken = localStorage.getItem("quikoroFcmToken");

    const userToken = Cookies.get("accessToken");

    if (!userToken) {
      console.log("User not logged in — skipping FCM update");
      return;
    }

    if (storedToken !== currentToken) {
      const browserDeviceId = getOrCreateDeviceId();

      const url = `${BASE_URL}notification-token`;

      const res = await axios.post(
        url,
        {
          fcmToken: currentToken,
          deviceInfo: browserDeviceId,
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
          },
        },
      );

      console.log("RESPONSE >> ", res);

      if (res?.status === 200) {
        console.log("FCM sent to server");
      }

      localStorage.setItem("quikoroFcmToken", currentToken);
    } else {
    }
  } catch (err) {
    console.log(err);
  }
};

// Listen for messages while app is in foreground
export const listenForMessages = (callback) => {
  // console.log("Registering FCM listener...");

  return onMessage(messaging, (payload) => {
    console.log("Foreground msg payload:", payload);
    callback?.(payload);
  });
};
