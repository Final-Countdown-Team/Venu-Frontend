import React from "react";
import "./_Footer.scss";

export default function Footer() {
  return (
    <div className="main-footer">
      <div className="footer-content">
        <p>&copy;{new Date().getFullYear()}</p>
        <p>Impressum</p>
      </div>
    </div>
  );
}
