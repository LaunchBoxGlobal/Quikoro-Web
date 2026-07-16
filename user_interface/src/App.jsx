import { useEffect } from "react";
import AppRoutes from "./AppRoutes/AppRoutes";
import { SnackbarProvider } from "notistack";
import {
  listenForMessages,
  requestNotificationPermission,
} from "./notifications";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "./socket";
import { addChatNotification } from "./slices/notificationSlice";

function App() {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) return;

    socket.connect();
    console.log("SOCKET CONNECTED");

    return () => {
      socket.disconnect();
    };
  }, [user]);

  useEffect(() => {
    requestNotificationPermission();

    listenForMessages((payload) => {
      console.log("PAYLOAD >>> ", payload);
      dispatch(
        addChatNotification({
          bookingId: payload.data.bookingId,
          notification: payload,
        }),
      );

      try {
        new Notification(payload.notification.title, {
          body: payload.notification.body,
        });
      } catch (e) {
        console.error(e);
      }
    });
  }, [dispatch]);

  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    const handleServiceWorkerMessage = (event) => {
      if (event.data?.type !== "CHAT_NOTIFICATION") return;

      const payload = event.data.payload;

      console.log(payload);

      dispatch(
        addChatNotification({
          bookingId: payload.data.bookingId,
          notification: payload,
        }),
      );
    };

    navigator.serviceWorker.addEventListener(
      "message",
      handleServiceWorkerMessage,
    );

    return () => {
      navigator.serviceWorker.removeEventListener(
        "message",
        handleServiceWorkerMessage,
      );
    };
  }, [dispatch]);

  return (
    <>
      <SnackbarProvider
        autoHideDuration={3000}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        maxSnack={2}
      />
      <AppRoutes />
    </>
  );
}

export default App;
