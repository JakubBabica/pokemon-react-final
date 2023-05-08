import React from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import MainPage from "./routes/MainPage";
import Detail from "./routes/Detail";

function App() {
  return (
    <Routes>
      <Route path="/*">
        <Route index element={<MainPage />} />
        <Route path="detail/:id" element={<Detail />} />
      </Route>
    </Routes>
  );
}

export default App;