import React from 'react';
import PropTypes from 'prop-types';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, CardBody } from 'reactstrap';
// import { Link } from 'react-router-dom';
import Background from '../common/Background';
import corner1 from '../../assets/img/illustrations/corner-1.png';
import corner2 from '../../assets/img/illustrations/corner-2.png';
import corner3 from '../../assets/img/illustrations/corner-3.png';

const getImage = color => {
  switch (color) {
    case 'warning':
      return corner1;
    case 'info':
      return corner2;
    case 'success':
      return corner3;
    default:
      return '';
  }
};

const getContentClassNames = color => {
  const contentClassNames = 'display-4 fs-4 mb-2 font-weight-normal text-sans-serif';
  if (color === 'success') return contentClassNames;
  return `${contentClassNames} text-${color}`;
};

const CardSummary = ({ title, rate, linkText, to, color, children, font }) => {
  return (
    <Card className="mb-3 overflow-hidden" style={{ minWidth: '12rem' }}>
      <Background image={getImage(color ? color : '')} className="bg-card" />
      <CardBody className="position-relative">
        <h6>{title}</h6>
        <div className={getContentClassNames(color ? color : '')}>{children}</div>
      </CardBody>
    </Card>
  );
};

CardSummary.propTypes = {
  title: PropTypes.string.isRequired,
  rate: PropTypes.string.isRequired,
  linkText: PropTypes.string,
  to: PropTypes.string,
  color: PropTypes.string,
  children: PropTypes.node
};

CardSummary.defaultProps = {
  linkText: 'See all',
  to: '#!',
  color: 'primary'
};

export default CardSummary;
