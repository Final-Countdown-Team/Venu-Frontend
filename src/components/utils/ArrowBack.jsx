import "./_ArrowBack.scss";
import { NavLink } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";

function ArrowBack({ className, userType }) {
  return (
    <div className="arrow-container">
      <NavLink
        to="/"
        className={`arrow-back ${className} arrow-back--${userType}`}
      >
        <MdArrowBack className="arrow-back-icon" />
        <span className="arrow-back-text">back</span>
      </NavLink>
    </div>
  );
}

export default ArrowBack;
