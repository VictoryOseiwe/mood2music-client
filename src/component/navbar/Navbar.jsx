import Button from "../Button";
import "./Navbar.css";
import { NavLink, useNavigate } from "react-router-dom";
import { UpRightArrow } from "../Icons";
import ListItem from "../ListItem";

export default function Navbar() {
  const navigate = useNavigate();

  const signUP = () => {
    //Handle navigation to sign page here
    navigate("/signup");
    alert("Sign up button clicked");
  };

  return (
    <>
      <nav className="navbar-container">
        <NavLink to={"/"}>
          <h1 className="logo">m2m</h1>
        </NavLink>
        <ul className="navbar-list">
          <ListItem>
            <NavLink to={"/Home"}>Home</NavLink>
          </ListItem>
          <ListItem>
            <NavLink to={"/about"}>About</NavLink>
          </ListItem>
          <ListItem>
            <NavLink to={"/contact"}>Contact</NavLink>
          </ListItem>
        </ul>
        <Button className={"navbar-button"} onClick={signUP}>
          Try it
          <UpRightArrow size={25} />
        </Button>
      </nav>
    </>
  );
}
