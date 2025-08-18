import { useState, useEffect } from "react";
import { SideMenu } from "../../component/Header/SideMenu";
import "./header.css";
import { Link, NavLink } from "react-router-dom";

export const Header = () => {
  const [showmenu, setShowMenu] = useState(false);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setShowMenu(false); // close menu on Esc
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <header className="header">
      <nav className="header-container">
        <div className="header-content">
          <div className="logo-section">
            <Link to="/">
              <h1 className="logo">hiredd</h1>
            </Link>
          </div>

          <div style={{ display: "flex", gap: "1rem" }}>
            <NavLink to="/apply">
              <div style={{ display: "flex", gap: ".5rem" }}>
                <img src="./briefcase.svg" alt="apply-icon" />
                <h4>Apply</h4>
              </div>
            </NavLink>
            <NavLink to="/hire">
              <div style={{ display: "flex", gap: ".5rem" }}>
                <h4>Hire</h4>
                <img src="/users.svg" alt="hire-icon" />
              </div>
            </NavLink>
          </div>

          <div className="header-actions">
            <div
              onClick={() => setShowMenu((prev) => !prev)}
              style={{ zIndex: "10" }}
            >
              <img
                src={showmenu ? "/x-square.svg" : "menu.svg"}
                alt="menu"
                style={{ height: "3.53rem" }}
              />
            </div>
            {showmenu && <SideMenu />}
          </div>
        </div>
      </nav>
    </header>
  );
};
