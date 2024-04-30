import { createBrowserRouter } from "react-router-dom";
import Error from "../Error/Error";
import App from "../../App";
import Home from "../../Components/Home/Home";
import Addbookmark from "../../Components/AddBookmark/Addbookmark";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "search",
        element: <Home />,
      },
      {
        path: "addBookmark",
        element: <Addbookmark />,
      },
      {
        path: "addBookmark/:id",
        element: <Addbookmark />,
      },
      {
        path: "*",
        element: <Error />,
      },
    ],
  },
]);

export default Router;
