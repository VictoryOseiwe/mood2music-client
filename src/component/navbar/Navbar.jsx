import Button from "../Button";
import "./Navbar.css";
import { NavLink, useNavigate } from "react-router-dom";
import { UpRightArrow } from "../Icons";
import ListItem from "../ListItem";
import { Menu, CloseMenu } from "../Icons";
import { useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const [sideBar, setSideBar] = useState(false);

  const signUP = () => {
    //Handle navigation to sign page here
    navigate("/signup");
  };

  const showSideBar = () => {
    setSideBar(!sideBar);
  };

  return (
    <>
      <nav className="navbar-container">
        <NavLink to={"/"}>
          <h1 className="logo">m2m</h1>
        </NavLink>
        <div className="navbar-list">
          <NavLink className={"nav-link"} to={"/"}>
            <ListItem>Home</ListItem>
          </NavLink>
          <NavLink className={"nav-link"} to={"/about"}>
            <ListItem>About</ListItem>
          </NavLink>
          <NavLink className={"nav-link"} to={"/contact"}>
            <ListItem>Contact</ListItem>
          </NavLink>
        </div>
        <Button className={"navbar-button"} onClick={signUP}>
          Try it
          <UpRightArrow size={25} />
        </Button>
        <div className="mobile-menu-icon" onClick={showSideBar}>
          <Menu size={25} />
        </div>
      </nav>
      {/* mobile menu  */}
      <div className={`sidebar ${sideBar ? "show" : ""} `}>
        <div className="mobile-menu-close" onClick={showSideBar}>
          <CloseMenu size={25} />
        </div>
        <div className="mobile-menu-content">
          <div className="mobile-menu-link">
            <NavLink className={"link"} to={"/Home"}>
              <ListItem>Home</ListItem>
            </NavLink>
            <NavLink className={"link"} to={"/about"}>
              <ListItem>About</ListItem>
            </NavLink>
            <NavLink className={"link"} to={"/contact"}>
              <ListItem>Contact</ListItem>
            </NavLink>
          </div>
          <Button className={"mobile-menu-button"} onClick={signUP}>
            Try it
            <UpRightArrow size={25} />
          </Button>
          <p
            style={{
              fontSize: "var(--xsmall)",
              color: "var(--yellow)",
              textAlign: "center",
            }}
          >
            Courtesy @victoryoseiwe
          </p>
        </div>
      </div>
      {sideBar && <div className="overlay" onClick={showSideBar}></div>}
    </>
  );
}
