import { useState } from "react";
import { useSelector } from "react-redux";
import { Vacancy } from "./applyComponent/Vacancy";
import { Applied } from "./applyComponent/Applied";
import { Saved } from "./applyComponent/Saved";

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
          width: "7rem",
          height: "7rem",
          borderRadius: "50%",
          objectFit: "cover",
          marginBottom: "0.5rem",
        }}
      />
      <div style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
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

export const Apply = () => {
  const [actionRender, setActionRender] = useState("vacancy"); // store which component to render
  const handleDashBoardRender = (section) => {
    setActionRender(section);
  };

  return (
    <main id="main">
      <section className="container mainContainer">
        <section className="dashboardSection">
          <div className="hire-grid--container">
            {/* Sidebar */}
            <div className="hire-asideSection">
              <div className="hire-asideSection--children">
                <h3 onClick={() => handleDashBoardRender("vacancy")}>
                  Vacancy
                </h3>
                <h3 onClick={() => handleDashBoardRender("applied")}>
                  Applied
                </h3>
                <h3 onClick={() => handleDashBoardRender("saved")}>Saved</h3>
                <h3 onClick={() => handleDashBoardRender("saved")}>Advance Filter</h3>
              </div>
            </div>

            {/* Header */}
            <div className="hire-headingSection">
              <LoggedInUserInfo />
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
