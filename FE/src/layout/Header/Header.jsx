import { useState } from "react";
import { SideMenu } from "../../component/Header/SideMenu";
import "./header.css";
import { Link, NavLink } from "react-router-dom";

export const Header = () => {
  const [showmenu, setShowMenu] = useState(false);

  return (
    <>
      <header className="header">
        <nav className="header-container">
          <div className="header-content">
            <div className="logo-section">
              <Link>
                <h1 className="logo">hiredd</h1>
              </Link>
            </div>

            <div>
              <div style={{ display: "flex", gap: "1rem" }}>
                <NavLink to="/apply">
                  <h4>
                    <img src="./briefcase.svg" alt="apply-icon" />
                    Apply
                  </h4>
                </NavLink>
                <NavLink to="/hire">
                  <h4>
                    <img src="/users.svg" alt="hire-icony" />
                    Hire
                  </h4>
                </NavLink>
              </div>
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
    </>
  );
};
