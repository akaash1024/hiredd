import { useAuth } from "../context/AuthContext";
import { locations, jobTitles } from "../staticData";

export const SearchFilter = () => {
  const {
    searchTerm,
    setSearchTerm,
    setSortBy,
    sortBy,
    setCurrentPage,
    filters,
    setFilters,
    resetFilters,
  } = useAuth();

  const handleSortChange = (field) => {
    setSortBy((prev) => ({
      field,
      direction:
        prev.field === field && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
    // setCurrentPage(1);
  };

  const getSortIcon = (field) => {
    if (sortBy.field === field) {
      return sortBy.direction === "asc" ? "↑" : "↓";
    }
    return "↕️";
  };

  return (
    <div
      className="search-section"
      style={{
        display: "flex",
        flexDirection: "column",
        // border: "1px solid red",
      }}
    >
      <div
        className="form-group-inline"
        style={{
          display: "flex",
          width: "100%",
          // border: "1px solid red",
          justifyContent: "space-between",
        }}
      >
        <div className="search-bar" style={{ flex: "4" }}>
          <input
            type="text"
            placeholder="Search by Company name..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
          <span className="search-icon">🔍</span>
        </div>
        <div
          className="search-bar"
          style={{ flex: "1", display: "flex", justifyContent: "center" }}
        >
          <button onClick={() => handleSortChange("company")}>
            {getSortIcon("company")}Company
          </button>
          <button onClick={() => handleSortChange("jobType")}>
            {getSortIcon("jobType")}Type
          </button>
        </div>
      </div>

      <div
        className="advance-search-bar"
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          gap: "2rem",
        }}
      >
        <div style={{ display: "flex", gap: "3rem", width: "70%" }}>
          <div style={{ flex: "3" }}>
            <input
              name="skill"
              id="skill"
              type="text"
              placeholder="Search by skill"
              value={filters.skill}
              onChange={handleFilterChange}
            />
          </div>
          <div style={{ flex: "1" }}>
            <select
              name="location"
              id="location"
              value={filters.location}
              onChange={handleFilterChange}
            >
              <option value="">Location</option>
              {locations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>
          <div style={{ flex: "1" }}>
            <select
              name="title"
              id="title"
              value={filters.title}
              onChange={handleFilterChange}
            >
              <option value="">--Title--</option>
              {jobTitles.map((jobTitle) => (
                <option key={jobTitle} value={jobTitle}>
                  {jobTitle}
                </option>
              ))}
            </select>
          </div>

          <div style={{ flex: "1" }}>
            <button onClick={resetFilters}>Reset</button>
          </div>
        </div>
      </div>
    </div>
  );
};
