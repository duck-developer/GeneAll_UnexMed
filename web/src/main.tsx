import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { RouterProvider } from "react-router-dom";
import { router } from "./App";
import { ContextProvider } from "./context/Context";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ContextProvider>
      <ToastContainer autoClose={2000} />
      <RouterProvider router={router} />
    </ContextProvider>
  </StrictMode>
);
