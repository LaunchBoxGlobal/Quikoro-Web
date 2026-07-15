import { useEffect } from "react";
import AppRoutes from "./AppRoutes/AppRoutes";
import { SnackbarProvider } from "notistack";
import {
  listenForMessages,
  requestNotificationPermission,
} from "./notifications";

function App() {
  useEffect(() => {
    requestNotificationPermission();

    listenForMessages((payload) => {
      try {
        new Notification(payload.notification.title, {
          body: payload.notification.body,
        });
      } catch (e) {
        console.error(e);
      }
    });
  }, []);

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
