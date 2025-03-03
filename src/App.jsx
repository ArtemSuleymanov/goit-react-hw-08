import { useDispatch, useSelector } from "react-redux";
import { lazy, Suspense, useEffect } from "react";
import { selectIsLoggedIn, selectIsRefreshing } from "./redux/auth/selectors";
import { refreshUser } from "./redux/auth/operations";
import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { RestrictedRoute } from "./components/RestrictedRoute";
import { PrivateRoute } from "./components/PrivateRoute";

const HomePage = lazy(() => import("./pages/Home/HomePage"));
const RegisterPage = lazy(() => import("./pages/Register/RegisterPage"));
const LoginPage = lazy(() => import("./pages/Login/LoginPage"));
const ContactsPage = lazy(() => import("./pages/Contacts/ContactsPage"));

const App = () => {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  if (isRefreshing) {
    return <b>Refreshing user...</b>;
  }

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route
            path="/register"
            element={
              <RestrictedRoute
                redirectTo="/contacts"
                component={<RegisterPage />}
                isLoggedIn={isLoggedIn}
              />
            }
          />
          <Route
            path="/login"
            element={
              <RestrictedRoute
                redirectTo="/contacts"
                component={<LoginPage />}
                isLoggedIn={isLoggedIn}
              />
            }
          />
          <Route
            path="/contacts"
            element={
              <PrivateRoute
                redirectTo="/login"
                component={<ContactsPage />}
                isLoggedIn={isLoggedIn}
              />
            }
          />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
