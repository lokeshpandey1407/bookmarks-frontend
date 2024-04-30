import { Link } from "react-router-dom";
import "./Navbar.css";
const Navbar = () => {
  return (
    <div className="navbar-container">
      <div className="navbar">
        <h3>BM</h3>
        <div className="navigation-links">
          <Link to={"/addBookmark"}>Add Bookmark</Link>
          <Link to={"/"}>Bookmarks list</Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
