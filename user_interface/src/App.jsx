import { useEffect, useCallback } from "react";
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
import { useNavigate } from "react-router-dom";
import { useGetUserProfileQuery } from "./services/userService/userApi";
import { setUser } from "./services/userService/userSlice";
import getToken from "./utils/getToken";

function App() {
  const user = useSelector((state) => state.user.user);
  const token = getToken();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useGetNotificationsQuery(
    { page: 1 },
    {
      skip: !user,
    },
  );

  const { refetch: refetchUser } = useGetUserProfileQuery(undefined, {
    skip: !token,
  });

  // Connect socket
  useEffect(() => {
    if (!user) return;

    socket.connect();
    console.log("SOCKET CONNECTED");

    return () => {
      socket.disconnect();
    };
  }, [user]);

  // Ask notification permission
  useEffect(() => {
    if (!user) return;

    requestNotificationPermission();
  }, [user]);

  /**
   * Common notification handler
   */
  const handleNotification = useCallback(
    async (payload) => {
      console.log("NOTIFICATION PAYLOAD >>>", payload);
      dispatch(notificationApi.util.invalidateTags(["Notifications"]));
      const data = payload?.data ?? {};

      // Chat notification
      if (data.event === "new-message") {
        dispatch(
          addChatNotification({
            bookingId: data.bookingId,
            notification: payload,
          }),
        );
        return;
      }

      // Account approved
      if (data.accountStatus === "ACTIVE") {
        const result = await refetchUser();

        if (result?.data?.data) {
          dispatch(setUser(result?.data?.data));
        }

        navigate("/", { replace: true });

        return;
      }

      // Account rejected
      if (data.accountStatus === "REJECTED") {
        const result = await refetchUser();

        if (result?.data?.data) {
          dispatch(setUser(result?.data?.data));
        }

        navigate("/account", { replace: true });

        return;
      }

      // Booking update
      if (data.bookingId) {
        dispatch(
          setLastBookingEvent({
            bookingId: data.bookingId,
            title: payload?.notification?.title,
          }),
        );
      }

      // Show browser notification
      try {
        if (Notification.permission === "granted") {
          new Notification(payload?.notification?.title || "", {
            body: payload?.notification?.body || "",
          });
        }
      } catch (err) {
        console.error(err);
      }
    },
    [dispatch, navigate, refetchUser],
  );

  // Foreground notifications
  useEffect(() => {
    const unsubscribe = listenForMessages(handleNotification);

    return unsubscribe;
  }, [handleNotification]);

  // Background notifications
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    const handleServiceWorkerMessage = (event) => {
      if (event.data?.type !== "FCM_BACKGROUND_MESSAGE") return;

      handleNotification(event.data.payload);
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
  }, [handleNotification]);

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
