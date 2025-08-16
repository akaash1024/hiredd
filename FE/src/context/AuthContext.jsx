import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../api/axios";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs } from "../features/jobs/jobSlice";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    skill: "",
    location: "",
    title: "",
  });
  const [sortBy, setSortBy] = useState({
    field: "company",
    direction: "asc",
  });

  const dispatch = useDispatch();
  const { jobs, status, error } = useSelector((state) => state.jobs);

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  const filteredResultsList = useMemo(() => {
    const filteredResults = jobs.filter((job) => {
      const matchSearchByCompany =
        searchTerm === "" ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase());

      const matchSearchBySkill =
        filters.skill === "" ||
        job.skills
          .map((s) => s.toLowerCase())
          .includes(filters.skill.toLowerCase());

      const matchLocationBySelect =
        filters.location === "" ||
        job.location.toLowerCase().includes(filters.location.toLowerCase());

      const matchTitleBySelect =
        filters.title === "" ||
        job.title.toLowerCase().includes(filters.title.toLowerCase());

      return (
        matchSearchByCompany &&
        matchSearchBySkill &&
        matchLocationBySelect &&
        matchTitleBySelect
      );
    });

    // sort jobs // ! later wouuld enhace cause have limited data
    filteredResults.sort((a, b) => {
      const aValue = a[sortBy.field].toLowerCase();
      const bValue = b[sortBy.field].toLowerCase();

      if (sortBy.direction === "asc") {
        return aValue.localeCompare(bValue);
      } else {
        return bValue.localeCompare(aValue);
      }
    });
    return filteredResults;
  }, [jobs, searchTerm, filters, sortBy]);

  let value = {
    api,
    user,
    isLoading,
    isLoggedIn: !!user,
    searchTerm,
    setSearchTerm,
    filters,
    setFilters,
    sortBy,
    setSortBy,
    filteredResultsList,
    // LogoutUser,
    // userAuthentication,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
