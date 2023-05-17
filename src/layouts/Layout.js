import "./preloader.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { CloseButton, Fade } from "../components/common/Toast";

import DashboardLayout from "./DashboardLayout";
import ErrorLayout from "./ErrorLayout";

import loadable from "@loadable/component";
import { ModalChamada } from "../becape-components/Components/ModalChamada/ModalChamada";
import Logo from "../components/navbar/Logo";
const AuthBasicLayout = loadable(() => import("./AuthBasicLayout"));
const Landing = loadable(() => import("../components/landing/Landing"));
const WizardLayout = loadable(() =>
  import("../components/auth/wizard/WizardLayout")
);
const AuthCardRoutes = loadable(() =>
  import("../components/auth/card/AuthCardRoutes")
);
const AuthSplitRoutes = loadable(() =>
  import("../components/auth/split/AuthSplitRoutes")
);

const Layout = () => {
  const [loading, setLoading] = useState(
    process.env.NODE_ENV === "production" ? true : false
  );

  useEffect(() => {
    AuthBasicLayout.preload();
    Landing.preload();
    WizardLayout.preload();
    AuthCardRoutes.preload();
    AuthSplitRoutes.preload();

    setTimeout(() => {
      setLoading(false);
    }, 2500);

    window.$(window).on("load", function() {
      // window.$(".loader-container").fadeOut('2497');
    });
  }, []);

  // if (loading) {
  //   return (
  //     <div className="loader-container">
  //       {/* <div className="spinner" /> */}
  //       <Logo logo="http://www.falarmais.com.br/wp-content/uploads/2023/03/logo-1.png" />
  //     </div>
  //   );
  // } else

  return (
    <>
      <div style={{ display: loading ? "block" : "none" }}>
        <div className="loader-container">
          <Logo logo="http://www.falarmais.com.br/wp-content/uploads/2023/03/logo-1.png" />
        </div>
      </div>
      <div style={{ display: loading ? "none" : "block" }}>
        <Router fallback={<span />}>
          <Switch>
            <Route path="/errors" component={ErrorLayout} />
            <Route path="/authentication/basic" component={AuthBasicLayout} />
            <Route component={DashboardLayout} />
          </Switch>
          <ModalChamada />
          <ToastContainer
            transition={Fade}
            closeButton={<CloseButton />}
            position={toast.POSITION.BOTTOM_LEFT}
          />
        </Router>
      </div>
    </>
  );
};

export default Layout;
