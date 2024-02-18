import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Signup from "./Pages/Signup";
import SignIn from "./Pages/SignIn";
import { SnackbarProvider } from "./context/SnackbarProvider";
import Edit from "./Pages/Edit";
import Create from "./Pages/Create";
import { ForgotPassword } from "./Pages/ForgotPassword";
import { useSelector } from "react-redux";

function App() {
  const token = useSelector((state) => state.auth.token);

  return (
    <SnackbarProvider>
      <>
        <Routes>
          <Route
            path="/auth/signup"
            element={!token ? <Signup /> : <Navigate to="/" />}
          />
          <Route
            path="/auth/signin"
            element={!token ? <SignIn /> : <Navigate to="/" />}
          />
          <Route
            path="/auth/forgot-password"
            element={!token ? <ForgotPassword /> : <Navigate to="/" />}
          />
          <Route
            path="/"
            element={token ? <Home /> : <Navigate to="/auth/signin" />}
          />
          <Route
            path="/employee/new"
            element={token ? <Create /> : <Navigate to="/auth/signin" />}
          />
          <Route
            path="/employee/:id"
            element={token ? <Edit /> : <Navigate to="/auth/signin" />}
          />
        </Routes>
      </>
    </SnackbarProvider>
  );
}

export default App;
