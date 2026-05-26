import AppRoutes from "./AppRoutes/AppRoutes";
import { SnackbarProvider } from "notistack";

function App() {
  return (
    <>
      <SnackbarProvider />
      <AppRoutes />
    </>
  );
}

export default App;
