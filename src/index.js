import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Homepage } from "./pages/Homepage";
import { Patient } from "./pages/Patient";
import { Doctor } from "./pages/Doctor";
import { RootProvider } from "./components/RootProvider";
import { Appointments } from "./pages/Appointments";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },

  {
    path: "/patient",
    element: <Patient />,
  },
  {
    path: "/doctor",
    element: <Doctor />,
  },
  {
    path: "/appointments",
    element: <Appointments />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RootProvider>
      <RouterProvider router={router} />
    </RootProvider>
  </React.StrictMode>
);
