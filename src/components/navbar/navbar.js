import "bulma/css/bulma.css";
import "./navbar_style.css";
import 'bootstrap/dist/css/bootstrap.min.css';

function Navbar() {
  return (
    <div className="">
      <nav
      className="navbar is-dark box-height"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <div className="brand-font">Open Authenticator</div>
      </div>
    </nav>
    </div>
  );
}

export default Navbar;
