import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ContextProvider } from "./Context.tsx";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import "./css/normalize.css";
import "./css/general.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ContextProvider>
    <App />
  </ContextProvider>
);
