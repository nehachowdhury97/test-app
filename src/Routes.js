import React from "react";
import { Navigate } from "react-router-dom";
import { HomeLayout } from "./layouts/HomeLayout";

export function PrivateRoute({ children }) {
  const isLogin = true;
  isLogin ?
    <HomeLayout>
      {children}
    </HomeLayout>
    :
    <Navigate to='/' />
}

export function PublicRoute({ children }) {
  const isLogin = true;
  return (
    isLogin ?
      <HomeLayout>
        {children}
      </HomeLayout>
      :
      <Navigate to='/' />
  )

}

