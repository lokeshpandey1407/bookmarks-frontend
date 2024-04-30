import React from "react";
import { RouterProvider } from "react-router-dom";
import ReactDOM from "react-dom/client";
import "./index.css";
import Router from "./common/Route/Router.jsx";
import { BookmarksProvider } from "./Contexts/Bookmarks.context.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BookmarksProvider>
      <RouterProvider router={Router} />
    </BookmarksProvider>
  </React.StrictMode>
);
