import React from "react";
import headerLogo from "../images/logo.svg";

function Header() {
  return (
    <div>
      <header className="header">
        <img src={headerLogo} alt="Логотип" className="header__logo" />
        Social Network
        </header>
    </div>
  );
}

export default Header;
