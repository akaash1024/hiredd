import { useState } from "react";

import {  CreateJob } from "./hireComponent/CreatedJobs";
import { Candidates } from "./hireComponent/Candidates";
import { useSelector } from "react-redux";
import { Jobs } from "./hireComponent/Jobs";
import { useAuth } from "../context/AuthContext";

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
export const SearchSection = () => {
  const { searchTerm, setSearchTerm, showFilters, setShowFilters } = useAuth();
  return (
    <div className="search-section">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by HR name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <span className="search-icon">🔍</span>
      </div>
    </div>
  );
};

export const Hire = () => {
  const [actionRender, setActionRender] = useState("jobs"); // store which component to render
  const handleDashBoardRender = (section) => {
    setActionRender(section);
  }

  

  return (
    <main id="main">
      <section className="container mainContainer">
        <section className="dashboardSection">
          <div className="hire-grid--container">
            {/* Sidebar */}
            <div className="hire-asideSection">
              <div className="hire-asideSection--children">
                <h3 onClick={() => handleDashBoardRender("createJob")}>
                  Create Job
                </h3>
                <h3 onClick={() => handleDashBoardRender("jobs")}>
                  Listed Jobs
                </h3>
                <h3 onClick={() => handleDashBoardRender("candidates")}>
                  Candidates
                </h3>
              </div>
            </div>

            {/* Header */}
            <div className="hire-headingSection">
              <LoggedInUserInfo />
              <SearchSection />
              
            </div>

            {/* Main Content */}
            <div className="hire-mainSection">
              {actionRender === "createJob" && <CreateJob />}
              {actionRender === "jobs" && <Jobs />}
              {actionRender === "candidates" && <Candidates />}
            </div>
          </div>
        </section>
      </section>
    </main>
  );
};
