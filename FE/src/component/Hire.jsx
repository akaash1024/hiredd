import { useRef, useState } from "react";

import { CreateJob } from "./hireComponent/CreatedJobs";
import { Candidates } from "./hireComponent/Candidates";
import { useDispatch, useSelector } from "react-redux";
import { ListedJobs } from "./hireComponent/ListedJobs";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { updateAvatar } from "../features/users/userSlice";

const LoggedInUserInfo = () => {
  const { currentUser } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const [hoverState, setHoverState] = useState(false);
  const fileInputRef = useRef(null);

  if (!currentUser) return <span>Loading...</span>;

  const { name, avatar, profile } = currentUser;
  const { headline, location } = profile || {};

  // Open hidden file input on avatar click
  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  // Upload new avatar
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      await dispatch(updateAvatar({ userId: currentUser._id, file })).unwrap();
      toast.success("Avatar updated successfully!");
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Failed to update avatar");
    }
  };

  return (
    <div className="user-info">
      <div
        className="img-section"
        onClick={handleAvatarClick}
        onMouseEnter={() => setHoverState(true)}
        onMouseLeave={() => setHoverState(false)}
        style={{ position: "relative", cursor: "pointer" }}
      >
        <img className="avatar" src={avatar} alt={name} />
        {hoverState && (
          <span
            style={{
              position: "absolute",
              bottom: "5px",
              left: "50%",
              transform: "translateX(-50%)",
              backgroundColor: "rgba(0,0,0,0.6)",
              color: "white",
              padding: "2px 6px",
              borderRadius: "4px",
              fontSize: "0.8rem",
            }}
          >
            Change avatar
          </span>
        )}
        {/* Hidden file input */}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
      </div>
      <div className="user-details">
        <h2>{name}</h2>
        {headline && <h4>💼 {headline}</h4>}
        {location && <h4>📍 {location}</h4>}
      </div>
    </div>
  );
};

/*
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
*/

export const Hire = () => {
  const [actionRender, setActionRender] = useState("listedJobs"); 
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
                <h3 onClick={() => handleDashBoardRender("createJob")}>
                  Create Job
                </h3>
                <h3 onClick={() => handleDashBoardRender("listedJobs")}>
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
              {/* <SearchSection /> */}
            </div>

            {/* Main Content */}
            <div className="hire-mainSection" style={{position:"relative"}}>
              {actionRender === "createJob" && <CreateJob />}
              {actionRender === "listedJobs" && <ListedJobs />}
              {actionRender === "candidates" && <Candidates />}
            </div>
          </div>
        </section>
      </section>
    </main>
  );
};
