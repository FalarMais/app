import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import rocket from "../../assets/img/illustrations/rocket.png";
import Cookies from "js-cookie";

const LogoutContent = ({ layout, titleTag: TitleTag }) => {
  useEffect(() => {
    Cookies.remove("context");
    Cookies.remove("context");
    Cookies.remove("acesso");
  }, []);
  return (
    <Fragment>
      <img
        className="d-block mx-auto mb-4"
        src={rocket}
        alt="shield"
        width={70}
      />
      <TitleTag>Você foi deslogado com sucesso!</TitleTag>
      <Button
        tag={Link}
        color="falar"
        size="sm"
        className="mt-3"
        to={`/authentication/${layout}/login`}
      >
        <FontAwesomeIcon
          icon="chevron-left"
          transform="shrink-4 down-1"
          className="mr-1"
        />
        Retorne ao Login.
      </Button>
    </Fragment>
  );
};

LogoutContent.propTypes = {
  layout: PropTypes.string,
  titleTag: PropTypes.string
};

LogoutContent.defaultProps = {
  layout: "basic",
  titleTag: "h4"
};

export default LogoutContent;
