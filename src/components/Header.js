import React from "react";

const Header = ({
  handleToggleDarkMode,
  darkmode,
  handleTitleClick,
  content,
}) => {
  return (
    <div className="header">
      <h1>{content === "n" ? "NOTES" : "BLOG"}</h1>
      <div>
        <button
          className="save"
          onClick={() => {
            handleTitleClick("n");
          }}
        >
          {content === "n" ? "Blog" : "Notes"}
        </button>
        <button
          onClick={() => {
            handleToggleDarkMode();
          }}
          className="save"
        >
          {darkmode ? "Light Theme" : "Dark Theme"}
        </button>
      </div>
    </div>
  );
};

export default Header;
