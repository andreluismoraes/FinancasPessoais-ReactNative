import React, { useContext } from "react";
import { AuthContext } from "../contexts/auth";
import Loading from "../Components/Loading";

import AuthRoutes from "./auth.routes";
import NormalStack from "./normal.routes";

const Routes = () => {
  const { signed, loading } = useContext(AuthContext);

  if (loading) {
    return <Loading load={true} />;
  }

  return signed ? <NormalStack /> : <AuthRoutes />;
};

export default Routes;
