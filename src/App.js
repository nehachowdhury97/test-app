import React from "react";
import { Routes, Route } from "react-router-dom";
import { PublicRoute } from "./Routes";
import { Home } from "./pages/Home";
import { CreateEmployee } from "./pages/CreateEmployee";
import { EditEmployee } from "./pages/EditEmployee";
import { AppContextProvider } from "./context/AppContext";

function App() {
  return (
    <AppContextProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/employee-form/create"
          element={
            <PublicRoute>
              <CreateEmployee />
            </PublicRoute>
          }
        />
        <Route
          path="/employee-form/edit/:id"
          element={
            <PublicRoute>
              <EditEmployee />
            </PublicRoute>
          }
        />
      </Routes>
    </AppContextProvider>
  );
}

export default App;
