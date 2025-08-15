import { useState } from "react";

import {  CreateJob } from "./hireComponent/CreatedJobs";
import { Candidates } from "./hireComponent/Candidates";
import { useSelector } from "react-redux";
import { Jobs } from "./hireComponent/Jobs";

const LoggedInUserInfo = () => {
  const { currentUser } = useSelector((state) => state.users);

  if (!currentUser) {
    return <h2>Loading user info...</h2>;
  }

  const { name, avatar, role, profile } = currentUser;
  const { headline, bio, skills, location } = profile || {};

  return (
    <div className="user-info" style={{ display: "flex" }}>
      <img
        src={avatar}
        alt={name}
        style={{
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          objectFit: "cover",
          marginBottom: "0.5rem",
        }}
      />
      <div style={{display: "flex", flexDirection: "column", gap: "1px"}}>
        <h2> {name}</h2>
        {headline && <p>{headline}</p>}
      </div>
      {bio && (
        <p>
          <strong>Bio:</strong> {bio}
        </p>
      )}
      {role && (
        <p>
          <strong>Role:</strong> {role}
        </p>
      )}
      {location && (
        <p>
          <strong>Location:</strong> {location}
        </p>
      )}
      {skills?.length > 0 && (
        <p>
          <strong>Skills:</strong> {skills.join(", ")}
        </p>
      )}
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
