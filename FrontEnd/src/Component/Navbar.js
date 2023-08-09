import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="customNavbar">
      <div className="customNavContainer">
        <span className="customLogo">lamabooking</span>
        <div className="customNavItems">
          <button className="customNavButton">Register</button>
          <button className="customNavButton">Login</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
