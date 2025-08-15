import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { AppLayout } from "./layout/AppLayout";
import { ErrorPage } from "./pages/ErrorPage";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { JobPortalDashboard } from "./pages/Dashboard";
import { Recruiter } from "./pages/Recruiter";
import { Candidate } from "./pages/Candidate";
import { Login } from "./pages/Login";
import { ToastContainer } from "react-toastify";
import { Apply } from "./component/Apply";
import { Hire } from "./component/Hire";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <JobPortalDashboard />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/apply",
        element: <Apply />,
      },
      {
        path: "/hire",
        element: <Hire />,
      },
    ],
  },
]);
const App = () => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <RouterProvider router={router} />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          bodyClassName="toastBody"
        />
      </AuthProvider>
    </Provider>
  );
};

export default App;
