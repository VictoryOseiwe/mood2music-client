import "./Footer.css";
import FooterMenuItem from "./footerMenuItem/footerMenuItem";
import { NavLink } from "react-router-dom";
import ListItem from "../ListItem";
import { Youtube, LinkedIn, GitHub, X } from "../Icons";

export default function Footer() {
  return (
    <>
      <div className="footer-container">
        <div className="footer-menu-container">
          <FooterMenuItem className="footer-menu-items">
            <h2>Quick Links</h2>
            <NavLink className={"nav-link"} to={"/"}>
              <ListItem>Home</ListItem>
            </NavLink>
            <NavLink className={"nav-link"} to={"/about"}>
              <ListItem>About m2m</ListItem>
            </NavLink>
            <NavLink className={"nav-link"} to={"/contact"}>
              <ListItem>Contact</ListItem>
            </NavLink>
          </FooterMenuItem>
          <FooterMenuItem className="footer-menu-items">
            <h2>Legal Links</h2>
            <NavLink className={"nav-link"} to={"/about"}>
              <ListItem>Terms Of Service</ListItem>
            </NavLink>
            <NavLink className={"nav-link"} to={"/contact"}>
              <ListItem>Privacy Policy</ListItem>
            </NavLink>
          </FooterMenuItem>
          <FooterMenuItem className="footer-menu-items">
            <h2>Support</h2>
            <NavLink className={"nav-link"} to={"/contact"}>
              <ListItem>Email Support</ListItem>
            </NavLink>
          </FooterMenuItem>
          <FooterMenuItem className="footer-menu-items">
            <h2>Stay Connected</h2>
            <div className="footer-menu-icons">
              <NavLink
                className={"icon-wrapper"}
                to={"https://www.youtube.com/@victory.oseiwe"}
              >
                <Youtube size={25} />
              </NavLink>
              <NavLink
                className={"icon-wrapper"}
                to={"https://linkedin.com/in/victoryoseiwe"}
              >
                <LinkedIn size={25} />
              </NavLink>
              <NavLink
                className={"icon-wrapper"}
                to={"https://github.com/victoryoseiwe"}
              >
                <GitHub size={25} />
              </NavLink>
              <NavLink
                className={"icon-wrapper"}
                to={"https://x.com/VictoryOseiwe"}
              >
                <X size={25} />
              </NavLink>
            </div>
          </FooterMenuItem>
        </div>
        <div className="horizontal-rule" />
        <h1 className="footer-headnote">MOOD2MUSIC</h1>
      </div>
    </>
  );
}
