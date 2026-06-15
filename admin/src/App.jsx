import { SnackbarProvider } from "notistack";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <>
      <SnackbarProvider
        maxSnack={3}
        autoHideDuration={3000}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      ></SnackbarProvider>
      <AppRoutes />
    </>
  );
}

export default App;
