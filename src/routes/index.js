import React, { useContext } from "react";
import { AuthContext } from "../contexts/auth";
import Loading from "../Components/Loading";

import AuthRoutes from "./auth.routes";
import AppRoutes from "./app.routes";

const Routes = () => {
  const { signed, loading } = useContext(AuthContext);

  if (loading) {
    return <Loading load={true} />;
  }

  return signed ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;
