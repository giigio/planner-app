import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Landing } from "./pages/landing";
import { Details } from "./pages/details";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/trips/:tripId",
    element: <Details />,
  },
]);

export function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
