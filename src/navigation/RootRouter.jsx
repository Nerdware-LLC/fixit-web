import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { WebViewNotFound } from "./WebViewNotFound";
import {
  CheckoutWebView,
  ConnectWebView,
  CustomerPortalWebView
} from "../pages";

export const RootRouter = () => (
  <BrowserRouter basename="/assets/fixit-web">
    <Switch>
      <Route path={"/checkout"}>
        <CheckoutWebView />
      </Route>
      <Route path={"/connect"}>
        <ConnectWebView />
      </Route>
      <Route path={"/customer-portal"}>
        <CustomerPortalWebView />
      </Route>
      <WebViewNotFound />
    </Switch>
  </BrowserRouter>
);
