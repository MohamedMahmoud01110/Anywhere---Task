import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import { Provider } from "react-redux";
import MainLayout from "./layouts/MainLayout";
import AnnouncementPage from "./pages/AnnouncementPage";
import CoursesPage from "./pages/CoursesPage";
import DashboardPage from "./pages/DashboardPage";
import GradebookPage from "./pages/GradebookPage";
import HomePage from "./pages/HomePage";
import PerformancePage from "./pages/PerformancePage";
import SchedulePage from "./pages/SchedulePage";
import { store } from "./store";
const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/dashboard",
        element: <DashboardPage />,
      },
      {
        path: "/courses",
        element: <CoursesPage />,
      },
      {
        path: "/gradebook",
        element: <GradebookPage />,
      },
      {
        path: "/performance",
        element: <PerformancePage />,
      },
      {
        path: "/schedule",
        element: <SchedulePage />,
      },
      {
        path: "/announcement",
        element: <AnnouncementPage />,
      },
    ],
  },
  {
    path: "/",
    element: <HomePage />,
  },
]);

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);
