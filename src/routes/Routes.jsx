import { createBrowserRouter } from "react-router-dom";
import MainLaout from "../layout/MainLayout";

import Home from "../pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLaout></MainLaout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
    ],
  },

  //   {
  //     path: "*",
  //     element: <Error></Error>,
  //   },
]);

export { router };
