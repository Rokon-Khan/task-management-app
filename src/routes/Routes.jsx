import { createBrowserRouter } from "react-router-dom";
import MainLaout from "../layout/MainLayout";

import AddTask from "../components/Form/AddTask";
import Home from "../pages/Home";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLaout></MainLaout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/add-task",
        element: <AddTask></AddTask>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/sign-up",
        element: <SignUp></SignUp>,
      },
    ],
  },

  //   {
  //     path: "*",
  //     element: <Error></Error>,
  //   },
]);

export { router };
