import React from "react";
import ReactDOM from "react-dom/client";
import Root from "./routes/root";
import Pokemon from "./routes/Pokemon"
import About from "./routes/About"
import { RouterProvider,createHashRouter } from "react-router-dom";


const router =  createHashRouter([
    {
      path: "/",
          element: <Root />,
          children: [
            {
              path: "pokemons",
              element: <Pokemon />,
          },
          {
              path: "about",
              element: <About />,
          },
      
       ],
  },
  ])

  const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);