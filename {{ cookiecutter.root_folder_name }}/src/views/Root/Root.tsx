import React, { Suspense } from "react";
import "./Root.css";
import { ExampleComponent } from "components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { APP_ROUTES } from "commons/appRoutes";
import {
  QueryClient,
  QueryClientProvider,
  useQueryErrorResetBoundary,
} from "react-query";
import { ErrorBoundary } from "react-error-boundary";
import createTokenQuery from "../../commons/tokenQuery";
import axios from "axios";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      // suspense: true,
    },
  },
});

const exampleQuery = createTokenQuery<
  { access: string; refresh: string },
  { username: string; password: string }
>({
  queryKey: "token",
  tokenExpired: ({ access }) =>
    axios
      .post("/api/auth/jwt/verify/", {
        token: access,
      })
      .then(({ data }) => data.code !== "token_not_valid"),
  refreshExpired: ({ refresh }) =>
    axios
      .post("/api/auth/jwt/verify/", {
        token: refresh,
      })
      .then(({ data }) => data.code !== "token_not_valid"),
  sendLogin: (loginParams) =>
    axios.post("/api/auth/jwt/create/", loginParams).then(({ data }) => data),
  sendRefresh: ({ refresh }) =>
    axios
      .post("/api/auth/jwt/refresh/", {
        refresh,
      })
      .then(({ data }) => data),
  retry: () => false,
  refreshExpiredError: new Error("401-Refresh token expired"),
  shouldRefreshOnBackground: () => false,
});

const { init, useLogin, logout, refresh, getToken } = exampleQuery;
init(queryClient);

export const Root = () => {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary
        fallbackRender={({ resetErrorBoundary }) => (
          <div>
            <h2>Error occurred</h2>
            <button onClick={() => resetErrorBoundary()}>Try again</button>
          </div>
        )}
        onReset={reset}
      >
        <Suspense fallback={<div>Loading...</div>}>
          <Router>
            <Switch>
              <Route path={APP_ROUTES.MAIN} exact>
                <ExampleComponent useLogin={useLogin} />
              </Route>
            </Switch>
          </Router>
        </Suspense>
      </ErrorBoundary>
    </QueryClientProvider>
  );
};
