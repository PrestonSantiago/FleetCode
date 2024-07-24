import HomePage from "./pages/HomePage";
import SettingsPage from "./pages/SettingsPage";
import StatsPage from "./pages/StatsPage";
import PracticePage from "./pages/PracticePage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import RootLayout from "./pages/RootLayout";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/practice", element: <PracticePage /> },
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/stats", element: <StatsPage /> },
      { path: "/settings", element: <SettingsPage /> },
    ],
  },
]);

function App() {
  return (
    <div className="bg-primary-dark w-full h-screen">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
