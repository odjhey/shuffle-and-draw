import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import { ProjectorPage } from "./pages/projector/ProjectorPage";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/projector",
    element: <ProjectorPage></ProjectorPage>,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
