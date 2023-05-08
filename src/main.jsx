import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createHashRouter } from "react-router-dom"

import './index.css'
import Root from "./routes/root"
import Pokemon from "./routes/Pokemon";
import About from "./routes/About";


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
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>,
)
