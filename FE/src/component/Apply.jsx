import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Vacancy } from "./applyComponent/Vacancy";
import { Applied } from "./applyComponent/Applied";
import { Saved } from "./applyComponent/Saved";

import { SearchFilter } from "./SearchFilter";
import { Pagination } from "./applyComponent/Pagination";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// Logged-in user info
const LoggedInUserInfo = () => {
  const { currentUser } = useSelector((state) => state.users);


  const handleAvatarUpdate = () => {
    //
  };

  if (!currentUser) return <h2>Loading user info...</h2>;

  const { name, avatar, profile } = currentUser;
  const { headline, location } = profile || {};

  return (
    <div className="user-info">
      <div className="img-section" onClick={handleAvatarUpdate}>
        <img className="avatar" src={avatar} alt={name} />
      </div>
      <div className="user-details">
        <h2>{name}</h2>
        {headline && <h4>💼 {headline}</h4>}
        {location && <h4>📍 {location}</h4>}
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
              <Pagination />

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
