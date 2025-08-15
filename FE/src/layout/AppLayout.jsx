import { Outlet } from "react-router-dom";
import { Footer } from "./Footer/Footer";
import { Header } from "./Header/Header";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCurrentUser } from "../features/users/userSlice";
import { fetchJobs } from "../features/jobs/jobSlice";

export const AppLayout = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCurrentUser());
    dispatch(fetchJobs());
  }, [dispatch]);
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};
