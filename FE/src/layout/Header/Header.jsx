import { useState } from "react";
import { SideMenu } from "../../component/Header/SideMenu";
import "./header.css"



export const Header = () => {
  const [showmenu, setShowMenu] = useState(false);
  
  return (
    <>
      <header className="header">
        <nav className="header-container">
          <div className="header-content">
            <div className="logo-section">
              <h1 className="logo">hiredd</h1>
            </div>

            <div className="header-actions">
              <div
                onClick={() => setShowMenu((prev) => !prev)}
                style={{ zIndex: "10" }}
              >
                <img
                  src={showmenu ? "/x-square.svg" : "menu.svg"}
                  alt="menu"
                  style={{ height: "4rem" }}
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
