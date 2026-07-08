import AppRoutes from "./AppRoutes/AppRoutes";
import { SnackbarProvider } from "notistack";

function App() {
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
