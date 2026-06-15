import { Provider } from "react-redux";
import { store } from "./index";

const ReduxProvider = ({ children }) => (
  <Provider store={store}>{children}</Provider>
);

export default ReduxProvider;
