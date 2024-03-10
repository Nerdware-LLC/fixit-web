import "./initSentry";
import { StrictMode as ReactStrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "@/app";

createRoot(document.getElementById("root")!).render(
  <ReactStrictMode>
    <App />
  </ReactStrictMode>
);
