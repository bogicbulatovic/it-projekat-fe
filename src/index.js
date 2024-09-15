import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { Homepage } from "./pages/Homepage";
import { Patient } from "./pages/Patient";
import { Doctor } from "./pages/Doctor";

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
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);
