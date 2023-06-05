import React from "react";
import { MyAuthProvider } from "./MyContext";

function ContextProvider({ children }) {
  return <MyAuthProvider>{children}</MyAuthProvider>;
}

export default ContextProvider;
