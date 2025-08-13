import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { AppLayout } from "./layout/AppLayout";
import { ErrorPage } from "./pages/ErrorPage";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { Dashboard } from "./pages/Dashboard";
import { Recruiter } from "./pages/Recruiter";
import { Candidate } from "./pages/Candidate";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/recruiter",
        element: <Recruiter />,
      },
      {
        path: "/candidate",
        element: <Candidate />,
      },
    ],
  },
]);
const App = () => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </Provider>
  );
};

export default App;
