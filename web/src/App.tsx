import { createBrowserRouter } from "react-router-dom";
import { Doenças, Home, Sintomas, DoencaDetalhe, LoginPage } from "./pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/doenças",
    element: <Doenças />,
  },
  {
    path: "/doenças/:id",
    element: <DoencaDetalhe />,
  },
  {
    path: "/sintomas",
    element: <Sintomas />,
  },
]);

export { router };
