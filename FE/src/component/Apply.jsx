import { useState } from "react";
import { useSelector } from "react-redux";
import { Vacancy } from "./applyComponent/Vacancy";
import { Applied } from "./applyComponent/Applied";
import { Saved } from "./applyComponent/Saved";
import { useAuth } from "../context/AuthContext";
import { SearchFilter } from "./SearchFilter";

// Logged-in user info
const LoggedInUserInfo = () => {
  const { currentUser } = useSelector((state) => state.users);

  if (!currentUser) return <h2>Loading user info...</h2>;

  const { name, avatar, profile } = currentUser;
  const { headline, location } = profile || {};

  return (
    <div className="user-info">
      <div className="img-section">
        <img src={avatar} alt={name} />
      </div>
      <div className="user-details">
        <h2>{name}</h2>
        {headline && <h4>{headline}</h4>}
        {location && <h4>{location}</h4>}
      </div>
    </div>
  );
};

// Search & filter section
export const SearchSection = () => {
  const { searchTerm, setSearchTerm, showFilters, setShowFilters } = useAuth();
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
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <span className="search-icon">🔍</span>
        </div>
        <div
          className="search-bar"
          style={{ flex: "1", display: "flex", justifyContent: "center" }}
        >
          <button>Reset</button>
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
            <input type="text" placeholder="Search by skill" />
          </div>
          <div style={{ flex: "1" }}>
            <select name="" id="">
              <option value="">Location</option>
            </select>
          </div>
          <div style={{ flex: "1" }}>
            <select name="" id="">
              <option value="">Job title</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};



// Apply Dashboard
export const Apply = () => {
  const [actionRender, setActionRender] = useState("vacancy");

  return (
    <main id="main">
      <section className="container mainContainer">
        <section className="dashboardSection">
          <div className="hire-grid--container">
            {/* Sidebar */}
            <div className="hire-asideSection">
              <div className="hire-asideSection--children">
                <h3 onClick={() => setActionRender("vacancy")}>Vacancy</h3>
                <h3 onClick={() => setActionRender("applied")}>Applied</h3>
                <h3 onClick={() => setActionRender("saved")}>Saved</h3>
              </div>
            </div>

            {/* Header */}
            <div className="hire-headingSection">
              <LoggedInUserInfo />
              <SearchFilter />
            </div>

            {/* Main Content */}
            <div className="hire-mainSection">
              {actionRender === "vacancy" && <Vacancy />}
              {actionRender === "applied" && <Applied />}
              {actionRender === "saved" && <Saved />}
            </div>
          </div>
        </section>
      </section>
    </main>
  );
};
