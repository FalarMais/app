import React, { useContext } from "react";
import {
  Collapse,
  Navbar,
  // NavItem,
  Nav
} from "reactstrap";
import classNames from "classnames";
import AppContext from "../../context/Context";
import Logo from "./Logo";
// import SearchBox from './SearchBox';
import TopNavRightSideNavItem from "./TopNavRightSideNavItem";
import NavbarTopDropDownMenus from "./NavbarTopDropDownMenus";
import { navbarBreakPoint, topNavbarBreakpoint } from "../../config";
// import autoCompleteInitialItem from '../../data/autocomplete/autocomplete';

const NavbarTop = () => {
  const {
    showBurgerMenu,
    setShowBurgerMenu,
    isTopNav,
    isVertical,
    isCombo,
    navbarCollapsed,
    setNavbarCollapsed
  } = useContext(AppContext);
  const handleBurgerMenu = () => {
    isTopNav && !isCombo && setNavbarCollapsed(!navbarCollapsed);
    (isCombo || isVertical) && setShowBurgerMenu(!showBurgerMenu);
  };
  return (
    <Navbar
      light
      className="navbar-glass fs--1 font-weight-semi-bold row navbar-top sticky-kit"
      expand={isTopNav && topNavbarBreakpoint}
      // style={{ backgroundColor: "#29154A" }}
    >
      <div
        className={classNames("toggle-icon-wrapper mr-md-3 mr-2", {
          "d-lg-none": isTopNav && !isCombo,
          [`d-${navbarBreakPoint}-none`]: isVertical || isCombo
        })}
        style={{ paddingLeft: 20 }}
      >
        <button
          className="navbar-toggler-humburger-icon btn btn-link d-flex flex-center"
          onClick={handleBurgerMenu}
          id="burgerMenu"
        >
          <span className="navbar-toggle-icon">
            <span className="toggle-line" />
          </span>
        </button>
      </div>
      <Logo at="navbar-top" width={100} id="topLogo" />
      {isTopNav && (
        <Collapse navbar isOpen={navbarCollapsed} className="scrollbar">
          <Nav navbar>
            <NavbarTopDropDownMenus setNavbarCollapsed={setNavbarCollapsed} />
          </Nav>
        </Collapse>
      )}

      <TopNavRightSideNavItem />
    </Navbar>
  );
};

export default NavbarTop;
