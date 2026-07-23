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
import { setLastBookingEvent } from "./slices/bookingEventsSlice";
import {
  notificationApi,
  useGetNotificationsQuery,
} from "./services/notificationApi/notificationApi";

function App() {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const { data, refetch } = useGetNotificationsQuery(
    { page: 1 },
    {
      skip: !user,
    },
  );

  // Connect socket after login
  useEffect(() => {
    if (!user) return;

    socket.connect();
    console.log("SOCKET CONNECTED");

    return () => {
      socket.disconnect();
    };
  }, [user]);

  // Ask notification permission & register/update FCM after login
  useEffect(() => {
    if (!user) return;
    requestNotificationPermission();
  }, [user]);

  // Listen for foreground FCM messages once
  useEffect(() => {
    const unsubscribe = listenForMessages((payload) => {
      console.log("NOTIFICATION PAYLOAD >>> ", payload);
      dispatch(notificationApi.util.invalidateTags(["Notifications"]));

      const data = payload?.data ?? {};

      if (data.event === "new-message") {
        // chat message flow
        dispatch(
          addChatNotification({
            bookingId: data.bookingId,
            notification: payload,
          }),
        );
      } else if (data.bookingId) {
        // no `event` key at all → treat as a booking status change
        dispatch(
          setLastBookingEvent({
            bookingId: data.bookingId,
            title: payload?.notification?.title, // fallback signal, see caveat below
          }),
        );
      }

      try {
        new Notification(payload.notification.title, {
          body: payload.notification.body,
        });
      } catch (e) {
        console.error(e);
      }
    });

    return unsubscribe;
  }, [dispatch]);

  // Listen for background messages from service worker
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    const handleServiceWorkerMessage = (event) => {
      if (event.data?.type !== "FCM_BACKGROUND_MESSAGE") return;
      // refetch();
      dispatch(notificationApi.util.invalidateTags(["Notifications"]));

      const payload = event.data.payload;
      const data = payload?.data ?? {};

      console.log("SW PAYLOAD >>>", payload);

      if (data.event === "new-message") {
        dispatch(
          addChatNotification({
            bookingId: data.bookingId,
            notification: payload,
          }),
        );
      } else if (data.bookingId) {
        dispatch(setLastBookingEvent({ bookingId: data.bookingId }));
      }
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
        autoHideDuration={3500}
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
