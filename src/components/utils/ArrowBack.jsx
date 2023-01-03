import "./_ArrowBack.scss";
import { Link } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import { useContext } from "react";
import { MainContext } from "../contexts/MainContext";

function ArrowBack({ className, to }) {
  const { globalUserType } = useContext(MainContext);

  return (
    <div className="arrow-container">
      <Link
        to={to ? to : "/"}
        className={`arrow-back ${className} arrow-back--${globalUserType}`}
      >
        <MdArrowBack className="arrow-back-icon" />
        <span className="arrow-back-text">back</span>
      </Link>
    </div>
  );
}

export default ArrowBack;
