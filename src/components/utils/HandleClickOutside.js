import { useEffect } from "react";

export default function HandleClickOutside(ref, setIsOpen) {
  useEffect(() => {
    function clickHandler(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", clickHandler);
    return () => {
      document.removeEventListener("mousedown", clickHandler);
    };
  }, [ref, setIsOpen]);
}
