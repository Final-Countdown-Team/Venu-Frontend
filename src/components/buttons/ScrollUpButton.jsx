import { MdKeyboardArrowUp } from "react-icons/md";
import "./_ScrollUpButton.scss";

const ScrollUpButton = ({ userType }) => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      className={`scroll-up-container ${
        userType === "artists" ? "bgColor--artists" : "bgColor--venues"
      }`}
      onClick={scrollToTop}
    >
      <span>
        <MdKeyboardArrowUp />
      </span>
    </button>
  );
};

export default ScrollUpButton;
