import classNames from "classnames";
import is from "is_js";
import PropTypes from "prop-types";
import React, { useContext, useEffect, useRef } from "react";
import { Collapse, Nav, Navbar } from "reactstrap";
import bgNavbarImg from "../../assets/img/generic/bg-navbar.png";
import { navbarBreakPoint, topNavbarBreakpoint } from "../../config";
import AppContext from "../../context/Context";
import { registrarRotas } from "../../routes";
import Flex from "../common/Flex";
import Logo from "./Logo";
import NavbarTopDropDownMenus from "./NavbarTopDropDownMenus";
import NavbarVerticalMenu from "./NavbarVerticalMenu";
import ToggleButton from "./ToggleButton";

import "./nav.css";

const NavbarVertical = ({ navbarStyle }) => {
  const navBarRef = useRef(null);

  const {
    showBurgerMenu,
    isNavbarVerticalCollapsed,
    setIsNavbarVerticalCollapsed,
    isCombo,
    setShowBurgerMenu,
    setNavbarCollapsed
  } = useContext(AppContext);

  const HTMLClassList = document.getElementsByTagName("html")[0].classList;
  //Control Component did mount and unmounted of hover effect
  if (isNavbarVerticalCollapsed) {
    HTMLClassList.add("navbar-vertical-collapsed");
  }

  useEffect(() => {
    console.log();

    if (is.windows()) {
      HTMLClassList.add("windows");
    }
    if (is.chrome()) {
      HTMLClassList.add("chrome");
    }
    if (is.firefox()) {
      HTMLClassList.add("firefox");
    }
    return () => {
      HTMLClassList.remove("navbar-vertical-collapsed-hover");
    };
  }, [isNavbarVerticalCollapsed, HTMLClassList]);

  //Control mouseEnter event
  let time = null;
  const handleMouseEnter = () => {
    if (isNavbarVerticalCollapsed) {
      time = setTimeout(() => {
        HTMLClassList.add("navbar-vertical-collapsed-hover");
      }, 100);
    }
  };
  return (
    <Navbar
      expand={navbarBreakPoint}
      className={classNames("navbar-vertical navbar-glass max14", {
        [`navbar-${navbarStyle}`]: navbarStyle !== "transparent"
      })}
      light
      style={{
        paddingLeft: 15
        // background: "#7208b3"
      }}
    >
      <Flex align="center">
        <ToggleButton
          isNavbarVerticalCollapsed={isNavbarVerticalCollapsed}
          setIsNavbarVerticalCollapsed={setIsNavbarVerticalCollapsed}
        />
        <Logo at="navbar-vertical" />
      </Flex>

      <Collapse
        navbar
        isOpen={showBurgerMenu}
        className="scrollbar t-n"
        innerRef={navBarRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => {
          clearTimeout(time);
          HTMLClassList.remove("navbar-vertical-collapsed-hover");
        }}
        style={
          navbarStyle === "vibrant"
            ? {
                backgroundImage: `linear-gradient(-45deg, rgba(0, 160, 255, 0.86), #0048a2),url(${bgNavbarImg})`
              }
            : {
                // background: "#7208b3",
                // transition: "0 !important"
              }
        }
      >
        <Nav navbar vertical>
          <NavbarVerticalMenu routes={registrarRotas()} />
        </Nav>
        <div className="settings px-3 px-xl-0">
          {isCombo && (
            <div className={`d-${topNavbarBreakpoint}-none`}>
              <div className="navbar-vertical-divider">
                <hr className="navbar-vertical-hr my-2" />
              </div>
              <Nav navbar>
                <NavbarTopDropDownMenus
                  setNavbarCollapsed={setNavbarCollapsed}
                  setShowBurgerMenu={setShowBurgerMenu}
                />
              </Nav>
            </div>
          )}
          <div className="navbar-vertical-divider">
            <hr className="navbar-vertical-hr my-2" />
          </div>
        </div>
      </Collapse>
    </Navbar>
  );
};

NavbarVertical.protoTypes = {
  navbarStyle: PropTypes.string
};

NavbarVertical.defaultProps = {
  navbarStyle: "transparent"
};

export default NavbarVertical;
