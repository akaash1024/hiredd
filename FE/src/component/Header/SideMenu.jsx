import { useState, useEffect } from "react";

import { Login } from "../../pages/Login";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { logoutUser, updateUserData } from "../../features/users/userSlice.js";
import { useNavigate } from "react-router-dom";

export const SideMenu = () => {
  const currentUser = useSelector((state) => state.users.currentUser);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    profile: {
      headline: "",
      location: "",
      skills: "",
      resumeUrl: "",
      bio: "",
    },
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      setFormData({
        name: currentUser.name || "",
        email: currentUser.email || "",
        profile: {
          headline: currentUser.profile?.headline || "",
          location: currentUser.profile?.location || "",
          skills: currentUser.profile?.skills || "",
          resumeUrl: currentUser.profile?.resumeUrl || "",
          bio: currentUser.profile?.bio || "",
        },
      });
    }
  }, [currentUser]);

  const handleValueChange = (e) => {
    setIsEditing(true);
    const { name, value } = e.target;

    if (name.startsWith("profile.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        profile: {
          ...prev.profile,
          [key]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleLogout = async () => {
    try {
      const result = await dispatch(logoutUser()).unwrap();
      toast.success(result.message);
    } catch (err) {
      toast.error(err.message || "Login failed");
    } finally {
      navigate("/");
    }
  };

  const handleFormSubmit = async (e) => {
    try {
      e.preventDefault();
      const result = await dispatch(updateUserData(formData)).unwrap();
      toast.success(result.message);
    } catch (error) {
      toast.error(error.message || "Updation failed");
    } finally {
      setIsEditing(false);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div className="form-overlay">
        <div className="form-container">
          <section
            className="section section-1"
            style={{
              height: "8.3rem",
              background:
                "linear-gradient(135deg,var(--btn-color) 0%,var(--btn-hover) 100%)",
            }}
          ></section>
          
          {currentUser && <button style={{margin:"1rem"}} onClick={handleLogout}>Logout</button>}
          {!currentUser ? (
            <Login />
          ) : (
            <section
              className="section section-1"
              style={{ padding: "1rem", backgroundColor: "#f5f5f5" }}
            >
              <div className="user-profile">
                <form onSubmit={handleFormSubmit}>
                  {/* Top-level fields */}
                  <div>
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleValueChange}
                    />
                  </div>

                  <div>
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleValueChange}
                    />
                  </div>

                  <div>
                    <label htmlFor="headline">Headline</label>
                    <input
                      type="text"
                      id="headline"
                      name="profile.headline"
                      value={formData.profile?.headline}
                      onChange={handleValueChange}
                    />
                  </div>

                  <div>
                    <label htmlFor="location">Location</label>
                    <input
                      type="text"
                      id="location"
                      name="profile.location"
                      value={formData.profile?.location}
                      onChange={handleValueChange}
                    />
                  </div>

                  <div>
                    <label htmlFor="skills">Skills</label>
                    <input
                      type="text"
                      id="skills"
                      name="profile.skills"
                      value={formData.profile?.skills}
                      onChange={handleValueChange}
                    />
                  </div>

                  <div>
                    <label htmlFor="resumeUrl">Resume URL</label>
                    <input
                      type="text"
                      id="resumeUrl"
                      name="profile.resumeUrl"
                      value={formData.profile?.resumeUrl}
                      onChange={handleValueChange}
                    />
                  </div>

                  <div className="full-width">
                    <label htmlFor="bio">Bio</label>
                    <textarea
                      id="bio"
                      name="profile.bio"
                      value={formData.profile?.bio}
                      onChange={handleValueChange}
                    />
                  </div>

                  <button type="submit" disabled={isEditing == false}>
                    {isEditing ? "Save" : "Edit"}
                  </button>
                </form>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};
