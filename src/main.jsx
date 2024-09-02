import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <div className="min-h-screen bg-zinc-800 dark:bg-zinc-800">
    <RouterProvider router={router} />
  </div>
);
