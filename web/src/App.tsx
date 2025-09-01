import { createBrowserRouter } from "react-router-dom";
import { Home, LoginPage } from "./pages";
import Private from "./routes/private";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/home",
    element: (
      <Private>
        <Home />
      </Private>
    ),
  },
]);

export { router };
