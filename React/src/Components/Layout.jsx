import React from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";

function Layout({ children }) {
  return (
    <div className="flex">
      <Sidebar />
      <div>{children}</div>
      <Outlet />
    </div>
  );
}

export default Layout;
