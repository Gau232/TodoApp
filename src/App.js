import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./AppRouter";
import ContextProvider from "./context/ContextProvider";

function App() {
  return (
    <BrowserRouter>
      <ContextProvider>
        <AppRouter />
      </ContextProvider>
    </BrowserRouter>
  );
}

export default App;
